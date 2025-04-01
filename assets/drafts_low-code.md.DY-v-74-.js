import{_ as a,b as t,o as i,a6 as r}from"./chunks/framework.YPUXRzUu.js";const _=JSON.parse('{"title":"对低代码实现的思考","description":"","frontmatter":{"title":"对低代码实现的思考","date":"2023-11-08T12:02:22.972Z","tags":["low code","system design"],"read":{"text":"1 min read","minutes":0.855,"time":51300,"words":171}},"headers":[{"level":2,"title":"开源例子","slug":"开源例子","link":"#开源例子","children":[{"level":3,"title":"TMagic","slug":"tmagic","link":"#tmagic","children":[]}]}],"relativePath":"drafts/low-code.md","filePath":"drafts/low-code.md"}'),l={name:"drafts/low-code.md"};function o(n,e,c,s,d,m){return i(),t("div",null,e[0]||(e[0]=[r('<p>最近公司想搞一套低码的东西出来。感觉有点意思，所以记一记。本文仅记录前端页面生成部分，不考虑后端情况。</p><h2 id="开源例子" tabindex="-1">开源例子 <a class="header-anchor" href="#开源例子" aria-label="Permalink to &quot;开源例子&quot;">​</a></h2><p>先来几个参考：</p><ol><li><a href="https://github.com/Tencent/tmagic-editor" target="_blank" rel="noreferrer">TMagic</a>: 通过编辑器产出 DSL(Domain-specific Language)，然后根据 DSL 生成对应的页面。</li><li><a href="https://github.com/baidu/amis" target="_blank" rel="noreferrer">amis</a>: 通过 JSON 来描述页面，可根据一份 JSON 配置生成一个页面。</li><li><a href="https://github.com/alibaba/lowcode-engine" target="_blank" rel="noreferrer">lowcode-engine</a>: 通过页面编辑之后，直接产出一份 React 代码。</li></ol><h3 id="tmagic" tabindex="-1">TMagic <a class="header-anchor" href="#tmagic" aria-label="Permalink to &quot;TMagic&quot;">​</a></h3><p>TMagic 生成的 DSL 可看作强化版的 JSON5，支持写一些基础 JS 代码。</p>',6)]))}const h=a(l,[["render",o]]);export{_ as __pageData,h as default};
