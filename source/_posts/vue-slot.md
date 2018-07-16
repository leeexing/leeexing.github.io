---
title: slot:使用插槽分发内容 学习
date: 2018-01-16 13:46:30
tags:
- js
- vue
categories: 前端
description: 制作高级复杂组件必备技能
image: http://cn.bing.com/az/hprichbg/rb/OldTownPrague_ZH-CN9399088386_1920x1080.jpg
---
# vue-slot

    父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

在编写组件的内容里面存在 `<slot>` 插口

<!-- more -->

## 单个插槽

顾名思义，组件里面只有一个插口 `<slot></slot>`

**注意**：如果子组件里面模板里面没有 插口，那么从父组件里面给子组件添加的内容加会被*抛弃*

```vue my-component
<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>
```

```html parent-component
<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </my-component>
</div>
```

```html render-output
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>
```

要是 `my-component` 组件里面没有 `slot`,那么子组件只会渲染 h2 标签里面的内容

```html youdontwant
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
  </div>
</div>
```

## 具名插槽

    插槽多了，需要给 slot 增加一个特殊的属性 name

具名插槽将匹配内容片段中对应的 `slot` 特性的元素 -- name 相同的放入对应的slot里面，没有匹配到的 slot name，放入默认的 匿名插槽里面

```js
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

// 在具体的某个页面中调用子组件，里面同时插入内容
<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>

  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>

  <p slot="footer">这里有一些联系信息</p>
</app-layout>

// 渲染出来的结果
<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>
```

## 作用于插槽（加鸡腿）

    将子组件的值传到父组件供使用
    用作一个（能被传值的）可重用模板，来代替已经渲染好的元素

传递数据的方向有点不同：
这里是子组件向父组件传递
而我们最常见的是父组件通过 `props` 向子组件传递数据

```js slot-scop
<div class="child">
  <slot text="hello from child" msg="tomorrow is wednesday"></slot>
</div>
```

``` html parent-component
// 具体调用子组件是，需要用到 <template></template> 元素 -- 作用于插槽的模板
// slot-prop 的值表示 接收 从子组件传递多来的 prop 对象。 这里是 {text："hello from child"}
<div class="parent">
  <child>
    <template slot-scope="props">
      <span>hello from parent</span>
      <span>{{ props.text }}</span>
      <p>{{ props.msg }}</p>
    </template>
  </child>
</div>
```

```js rendering-output
<div class="parent">
  <div class="child">
    <span>hello from parent</span>
    <span>hello from child</span>
    <p>tomorrow is wednesday</p>
  </div>
</div>
```

> 在 2.5.0+，slot-scope 能被用在任意元素或组件中而不再局限于 `<template>`

<div class="note warning no-icon">这里还没有消化好</div>

```html 自定义渲染
<my-slot :items="items">
  <li
    slot="item"
    slot-scope="props"
    class="slot-item"
  >
    {{ props.text}} -- {{ props.msg }}
  </li>
  // 第二版
  <h1></h1>
</my-slot>

```

```html 子组件
<!-- 列表组件的模板 -->
<template>
  <div class="slot">
    <ul>
      <slot name="item"
        v-for="item in items"
        :text="item.text"
        :msg="item.msg"
      >
      what 123
        <!-- <p>什么意思</p> -->
      </slot>
      <slot>我在这里又增加了一点内容</slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'slot',
  props: ['items']
}
</script>
```

```html output
<ul data-v-10cb672e="">
  <li data-v-80180a8e="" data-v-10cb672e="" class="slot-item">
    what you -- haha
  </li><li data-v-80180a8e="" data-v-10cb672e="" class="slot-item">
    hello -- world
  </li>
  // 第二版
  我在这里又增加了一点内容   // 这里并没有渲染出 h1 标签
</ul>
```

还不是很理解这里的使用套路

**摘自知乎的一个回答**：vue的作用域插槽本质上就是一个具名slot，将父组件作用域的`<template>`与子组件的具名slot绑定，从而让子组件能直接在slot中写v-for、v-if等渲染DOM结构;并借`<template>`的scope特性接收子slot传递的数据，在template中填充其内容。

更具上面的提示，修改一下之前的代码

``` html update
<template>
  <div class="slot">
    <ul>
      <slot name="item"
        v-for="item in items"
        :text="item.text"
        :msg="item.msg"
      >
        what 123
        <!-- <p>什么意思</p> -->
        <!-- 这里写入备用内容 -->
      </slot>
      <slot name="test" info="I dont know what this present">
        我也不知道这里些什么
      </slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'slot',
  props: ['items'],
  data () {
    return {
      hi: 'I dont know what this present',
      topic: '抡起巴比伦'
    }
  }
}
</script>


// parent
<my-slot :items="items">
  <li
    slot="item"
    slot-scope="props"
    class="slot-item"
  >
    {{ props.text}} -- {{ props.msg }}
  </li>
  <h1 slot="test" slot-scope="props">{{ props.info }}</h1>
</my-slot>

// output
<ul data-v-10cb672e="">
  <li data-v-80180a8e="" data-v-10cb672e="" class="slot-item">
    what you -- haha
  </li><li data-v-80180a8e="" data-v-10cb672e="" class="slot-item">
    hello -- world
  </li>
  <h1 data-v-80180a8e="" data-v-10cb672e="">I dont know what this present</h1>  // 这个时候渲染出了 h1 标签
</ul>
```

<div class="note primary no-icon">能再来一个实际一点的例子就好了</div>

```html 实际例子

```

### 别人优秀的使用

1. <el-table>组件中存在slot插槽，使其能够将父组件作用域的内容渲染子组件中
2. 
2. template中scope对象包含的值主要是在子组件上通过作用域插槽slot的属性决定的

## 再读杂项

在编写组件时，最好考虑好以后是否要进行复用。一次性的组件间有紧密的耦合没有关系。但是可服用组件应该定义一个清晰的公开接口，同时也不要对其使用的外层数据做出任何假设

Vue 组件的API来自三个部分 -- prop、事件、插槽

* **Prop** 允许外部环境传递数据给组件
* **事件** 允许组件内触发外部环境的副作用
* **插槽** 允许外部环境将额外的内容组合在组件内

这里的第三条，给了我一点对 slot 的理解

```html
<my-component
  :foo="baz"
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat"
>
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```

### 组件命名

当注册组件或者 prop 时，可以使用 kebab-case（短横线分割命名）、camelCase（驼峰式命名）、PascalCase（单词首字母大写命名）

```js
// 在组件定义中
components: {
  // 使用 kebab-case 注册
  'kebab-cased-component': { /* ... */ },
  // 使用 camelCase 注册
  'camelCasedComponent': { /* ... */ },
  // 使用 PascalCase 注册
  'PascalCasedComponent': { /* ... */ }
}
```

但是在 HTML 模板中，请使用 kebab-case：

```js
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<pascal-cased-component></pascal-cased-component>
```

如果组件未经 slot 元素传入内容，你甚至可以在组件名后使用 / 使其自闭合：

    <my-component/>