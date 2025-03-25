---
title: 对低代码实现的思考
date: 2023-11-08T12:02:22.972Z
tags: [low code, system design]
---

最近公司想搞一套低码的东西出来。感觉有点意思，所以记一记。本文仅记录前端页面生成部分，不考虑后端情况。

## 开源例子

先来几个参考：

1. [TMagic]: 通过编辑器产出 DSL(Domain-specific Language)，然后根据 DSL 生成对应的页面。
2. [amis]: 通过 JSON 来描述页面，可根据一份 JSON 配置生成一个页面。
3. [lowcode-engine]: 通过页面编辑之后，直接产出一份 React 代码。

### TMagic

TMagic 生成的 DSL 可看作强化版的 JSON5，支持写一些基础 JS 代码。

[tmagic]: https://github.com/Tencent/tmagic-editor
[amis]: https://github.com/baidu/amis
[lowcode-engine]: https://github.com/alibaba/lowcode-engine
