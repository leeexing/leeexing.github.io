---
title: vue-sundry 杂项
date: 2018-01-17 09:27:07
tags:
- 前端
- vue
image: http://cn.bing.com/az/hprichbg/rb/BlueMushroom_ZH-CN10091152411_1920x1080.jpg
---
# vue 杂谈

    时不时会发现自己还有一些知识点是遗漏的

<!-- more -->

会按照时间顺序来，后面添加的放在前面

## statics & assets

> You will notice in the project structure we have two directories for static assets: src/assets and static/. What is the difference between them?

### Webpacked Assets

在 *.vue 组件中，所有模板和CSS都会被 vue-html-loader 及 css-loader 解析，并查找资源URL。例如，在 <img src="./logo.png">
和 background: url(./logo.png) 中，"./logo.png" 是相对的资源路径，将由Webpack解析为模块依赖。

因为 logo.png 不是 JavaScript，当被视为模块依赖时，需要使用 url-loader 和 file-loader
处理它。vue-cli 的 webpack 脚手架已经配置了这些 loader，因此可以使用相对/模块路径。

由于这些资源可能在构建过程中被内联/复制/重命名，所以它们基本上是源代码的一部分。这就是为什么建议将
Webpack 处理的静态资源放在 /src 目录中和其它源文件放一起的原因。事实上，甚至不必把它们全部放在 /src/assets：可以用模块/组件的组织方式来使用它们。例如，可以在每个放置组件的目录中存放静态资源。

### "Real" Static Assets

相比之下，static/ 目录下的文件并不会被 Webpack 处理：它们会直接被复制到最终目录（默认是dist/static）下。必须使用绝对路径引用这些文件，这是通过在 config.js 文件中的 build.assetsPublicPath 和 build.assetsSubDirectory 连接来确定的。

任何放在 static/ 中文件需要以绝对路径的形式引用：/static/[filename]。如果更改 assetSubDirectory 的值为 assets，那么路径需改为 /assets/[filename]。

assets里面的会被webpack打包进你的代码里，而static里面的，就直接引用了。
一般在static里面放一些类库的文件，在assets里面放属于该项目的资源文件。

简单的讲，static放别人家的，assets放自己写的。

## props

之前使用 `props` 的时候都是通过父组件传递一个属性到子组件，子组件内部通过一个 `props: ['prop-name']` 的属性接收来自父组件传递过来的数据
而最近重新研读 vue 的官方文档。发现遗漏了 props 在子组件中的验证
**官方**：我们可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告，这对于开发给他人使用的组件非常有用。双手赞成 -- 以后我自己也要封装一些我觉得常用的组件。或者我项目中私人定制的组件。

```js 自己尝试
export default {
  name: 'slot',
  props: {
    name: {
      type: String,
      required: true
    },
    items: {
      validator (val) {
        return Object.prototype.toString.call(val) === '[object Array]'
      }
    }
  },
  data () {
    return {
      hi: 'I dont know what this present',
      topic: '抡起巴比伦'
    }
  }
}
```

亲自测试过后，原本items 是一个需要父组件使用本组件时，传入一个数组类型的属性。如果时对象或者函数，那都是会提示错误信息的。注意到，验证 items 的时候，我使用了 validator 函数，自定义验证规则。这点很爽！

## nextTick

> 等时间