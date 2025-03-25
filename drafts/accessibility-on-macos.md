---
title: macOS 上的 Accessibility
date: 2025-03-25T01:56:44.118Z
tags: [macOS, accessibility, rust]
publish: false
---

> 本文记录一个在 macOS 上获取选中文本的坑，以此方便后来之人

## 上下文

最近在写一个应用，其中一个核心功能就是获取鼠标选中的文本，最开始探索了一圈普遍的实现方式，都是通过 Accessibility 获取聚焦的元素，进而获取选中的文本。
备用方案则是通过模拟复制操作，再通过粘贴板获取对应的文本。但是备用方案在 macOS 上有两个缺点：

1. 污染粘贴板
2. 在视觉上，会触发 macOS 上的顶部菜单栏高亮一下

基于以上两个缺点，所以尽量不要用备用方案。

## Accessibility 的坑

macOS 上获取 accessibility 相关的 api 为 [AXUIElement.h][accessibility-api]，目前已有的方案如 [get-selected-text]，其核心代码如下：


```rs
use accessibility_ng::{AXAttribute, AXUIElement};
use accessibility_sys_ng::{kAXFocusedUIElementAttribute, kAXSelectedTextAttribute};

fn get_selected_text_by_ax() -> Result<String, Box<dyn std::error::Error>> {
    let system_element = AXUIElement::system_wide();
    let Some(selected_element) = system_element
        .attribute(&AXAttribute::new(&CFString::from_static_string(
            kAXFocusedUIElementAttribute,
        )))
        .map(|element| element.downcast_into::<AXUIElement>())
        .ok()
        .flatten()
    else {
        return Err(Box::new(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "No selected element",
        )));
    };
    let Some(selected_text) = selected_element
        .attribute(&AXAttribute::new(&CFString::from_static_string(
            kAXSelectedTextAttribute,
        )))
        .map(|text| text.downcast_into::<CFString>())
        .ok()
        .flatten()
    else {
        return Err(Box::new(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "No selected text",
        )));
    };
    Ok(selected_text.to_string())
}
```


`accessibility_ng` 和 `accessibility_sys_ng` 是对 [AXUIElement.h][accessibility-api] 相关 api 的 [rust] 绑定，核心原理倒是挺简单的，
但在实际使用过程中，却经常遇到错误 [AXError(-25204)][axerror-25204] 和 [AXError(25212)][axerror-25212]，本以为是很常见的错误，又在网上搜索了一波，
但却很遗憾的没有得到解决。那这个时候，不就应该是 AI 发力的时候了嘛！遗憾的是，AI 给的解决方案也都大同小异，和以上代码差不多，并不能解决问题。

幸运的是，最近偶然发现了一款软件，名为 [PopClip]，在使用的过程中，其可以流畅的获取选中的文本，而且有一个很奇怪的现象：如果我先用 PopClip 在某个软件中获取
触发一次 PopClip 的悬浮窗口，那么再执行上述 rust 代码，就能正常获取到选中的文本，即使后面关闭 PopClip，也能正常获取选中的文本，但如果我重新打开一次某个应用，
上述 rust 代码就再次失效。真实个奇怪的现象🤔。于是猜测，这其中一定有针对进程的某个开关。无奈的是，靠着现有搜索引擎搜索了一圈，并无解决方案。

中间尝试了各种方案，也用 swift 写了一版对应的代码，结果都是一样，都是错误 [AXError(-25204)][axerror-25204] 和 [AXError(25212)][axerror-25212]。

最后还是在 Github 上直接搜索 [AXUIElement.h][accessibility-api] api 相关的代码，最后找到了一个代码片段 [#L131-L153]：

```rs
unsafe fn configure_application(application: AXUIElementRef) {
    AXUIElementSetMessagingTimeout(application, 5.0);
    AXUIElementCopyAttributeValue(
        application,
        CFString::new(kAXFocusedApplicationAttribute).as_concrete_TypeRef(),
        ptr::null_mut(),
    );
    let _ = AXUIElementSetAttributeValue(
        application,
        CFString::new("AXInspectorEnabled").as_concrete_TypeRef(),
        CFBoolean::true_value().as_CFTypeRef(),
    );
    let _ = AXUIElementSetAttributeValue(
        application,
        CFString::new("AXEnhancedUserInterface").as_concrete_TypeRef(),
        CFBoolean::true_value().as_CFTypeRef(),
    );
    let _ = AXUIElementSetAttributeValue(
        application,
        CFString::new("AXManualAccessibility").as_concrete_TypeRef(),
        CFBoolean::true_value().as_CFTypeRef(),
    );
}
```

上述代码中，主要是设置了 `AXEnhancedUserInterface` 和 `AXManualAccessibility` 这两个属性，我尝试了一下上述代码，问题就这么解决了！

## 结语

之后搜索了一下 `AXEnhancedUserInterface` 和 `AXManualAccessibility` 这两个属性是干啥的，却没有找到很官方的文档，但相关的文章大多都指出，
这两个属性可以让应用开启 Accessibility 相关能力，如果不设置的话，应用默认应该是关闭的。因此才会经常遇到 [AXError(-25204)][axerror-25204] 
和 [AXError(25212)][axerror-25212] 这两个错误。

就这么一个问题，如果有正式的文档，也不至于前前后后花费约两周的时间才处理掉问题，这也证明了文档是多么的重要！好了，这个问题就到此为止吧！


[rust]: https://www.rust-lang.org/
[accessibility-api]: https://developer.apple.com/documentation/applicationservices/axuielement_h?language=objc
[get-selected-text]: https://github.com/yetone/get-selected-text
[axerror-25204]: https://developer.apple.com/documentation/applicationservices/axerror/kaxerrorcannotcomplete
[axerror-25212]: https://developer.apple.com/documentation/applicationservices/axerror/kaxerrornovalue
[PopClip]: https://www.popclip.app/
[#L131-L153]: https://github.com/stritefax/heelixchat/blob/8aadc34bff78717b1f8a0429f34ee01f8ecf5d7b/src-tauri/src/window_details_collector/macos/macos_accessibility_engine.rs#L131-L153