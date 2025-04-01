import{_ as r,b as t,o as a,a6 as s}from"./chunks/framework.YPUXRzUu.js";const g=JSON.parse('{"title":"WebAssembly 入门","description":"","frontmatter":{"title":"WebAssembly 入门","date":"2022-03-27T14:25:25.000Z","tags":["Rust","WebAssembly"],"read":{"text":"4 min read","minutes":3.025,"time":181500,"words":605}},"headers":[{"level":2,"title":"WebAssembly 简介","slug":"webassembly-简介","link":"#webassembly-简介","children":[]},{"level":2,"title":"实践","slug":"实践","link":"#实践","children":[]},{"level":2,"title":"结语","slug":"结语","link":"#结语","children":[]}],"relativePath":"posts/intro-webassembly.md","filePath":"posts/intro-webassembly.md"}'),l={name:"posts/intro-webassembly.md"};function b(o,e,n,m,h,p){return a(),t("div",null,e[0]||(e[0]=[s('<blockquote><p>这篇文章本来是上个月就应该写好的，不过中途去准备晋升了，有点累，就拖了拖，现在总算是差不多了 Orz。</p></blockquote><p>这篇文章主要介绍一下 <a href="https://webassembly.org/" target="_blank" rel="noreferrer">WebAssembly</a>，以及记录通过 <a href="https://www.rust-lang.org/" target="_blank" rel="noreferrer">Rust</a> 实践的结果。</p><h2 id="webassembly-简介" tabindex="-1"><a href="https://webassembly.org/" target="_blank" rel="noreferrer">WebAssembly</a> 简介 <a class="header-anchor" href="#webassembly-简介" aria-label="Permalink to &quot;[WebAssembly] 简介&quot;">​</a></h2><p>借用官网的一段话：</p><blockquote><p>WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications. <br><br> WebAssembly（缩写为 Wasm）是一种用于基于堆栈的虚拟机的二进制指令格式。Wasm 被设计为编程语言的可移植编译目标，支持部署在 web 端以及服务器端。</p></blockquote><p>这么看来， <a href="https://webassembly.org/" target="_blank" rel="noreferrer">Wasm</a> 就是一个中间产物，不管你用什么编程语言写，只要编译成 <a href="https://webassembly.org/" target="_blank" rel="noreferrer">Wasm</a>，那么，其他应用程序，只要支持执行 <a href="https://webassembly.org/" target="_blank" rel="noreferrer">Wasm</a>，就可以执行你编写的程序。</p><p>而且，<a href="https://webassembly.org/" target="_blank" rel="noreferrer">Wasm</a> 的运行速度也非常不错，Talk is Cheap, Show me the speed.</p><h2 id="实践" tabindex="-1">实践 <a class="header-anchor" href="#实践" aria-label="Permalink to &quot;实践&quot;">​</a></h2><p><a href="https://webassembly.org/" target="_blank" rel="noreferrer">Wasm</a> 官网已经列举了有哪些编程语言支持编译到 <a href="https://webassembly.org/" target="_blank" rel="noreferrer">Wasm</a>，请参考 <a href="https://webassembly.org/getting-started/developers-guide/" target="_blank" rel="noreferrer">支持列表</a>。</p><p>我选择了 <a href="https://www.rust-lang.org/" target="_blank" rel="noreferrer">Rust</a>，主要是想趁机入门一下 <a href="https://www.rust-lang.org/" target="_blank" rel="noreferrer">Rust</a> 这门语言。毕竟这本语言已经被吹成是未来前端工具链的基石了。<a href="https://www.rust-lang.org/" target="_blank" rel="noreferrer">Rust</a> 相关的知识，可参考 <a href="https://github.com/sunface/rust-course" target="_blank" rel="noreferrer">Rust 语言圣经</a>。</p><p>具体相关的代码仓库 <a href="https://github.com/0x-jerry/mmcq.js" target="_blank" rel="noreferrer">mmcq.js</a>。这是一个提取图片主题色的库，计算量较大，所以用 <a href="https://webassembly.org/" target="_blank" rel="noreferrer">Wasm</a> 实现，速度上的对比应该 会比较明显。</p><p>就起结果来看，速度大概提升 75% 左右。JavaScript 实现 vs Rust 实现， 不同图片大小耗时对比：</p><table tabindex="0"><thead><tr><th>JavaScript</th><th>WebAssembly</th></tr></thead><tbody><tr><td>13 ms</td><td>3 ms</td></tr><tr><td>147 ms</td><td>17 ms</td></tr><tr><td>205 ms</td><td>34 ms</td></tr><tr><td>403 ms</td><td>103 ms</td></tr></tbody></table><p>由此可见，<a href="https://webassembly.org/" target="_blank" rel="noreferrer">WebAssembly</a> 的提升效果还是蛮明显的。</p><p>不过，<a href="https://webassembly.org/" target="_blank" rel="noreferrer">WebAssembly</a> 相关的工具链目前还不是特别完美，拿 <a href="https://github.com/rustwasm/wasm-pack" target="_blank" rel="noreferrer">wasm-pack</a> 来举例子，目前打包的产物，配合 Webpack 引入 Wasm 还需要一些额外的配置，无法做到无缝衔接。最佳实践，还需要探索。</p><h2 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h2><p><a href="https://webassembly.org/" target="_blank" rel="noreferrer">WebAssembly</a> 应用的场景主要重在计算方面，在计算量不高的场景下，JS 已经足够了。另附一些相关参考的资料：</p><ul><li><a href="https://github.com/rustwasm/wasm-pack" target="_blank" rel="noreferrer">wasm-pack</a></li><li><a href="https://webassembly.org/" target="_blank" rel="noreferrer">WebAssembly</a></li><li><a href="https://github.com/0x-jerry/mmcq.js" target="_blank" rel="noreferrer">mmcq.js</a></li></ul>',18)]))}const f=r(l,[["render",b]]);export{g as __pageData,f as default};
