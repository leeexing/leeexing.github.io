---
title: vue directive 学习
date: 2018-01-11 17:55:47
tags: 
- 前端
- js
- vue
image: http://p2msyzjlz.bkt.clouddn.com/vue.data.png
---

    使用 Vue Directive 封装 `DOM 操作`

<div class="note success no-icon"><span>指令 (Directives) 是带有 v- 前缀的特殊属性 <br>作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM</span>
</div>
    
<!-- more -->

## vue directive 简介

先放一张图
![vue 大全](http://p2msyzjlz.bkt.clouddn.com/vue.all.png)

知道vue有 v-on、v-show、v-if 这些方便我们操作的指令吧
对了，就像 vue 的 filter 一样，我们可以自己全局注册或者局部定义组件的名字和相关的指令操作

![vue的相关指令](http://p2msyzjlz.bkt.clouddn.com/vue.directive.png)

之前不怎么了解（使用），是没有遇到那个需求，今天做公司一个重构的时候，突然发现这个指令，很好

![一张图先了解](http://p2msyzjlz.bkt.clouddn.com/vue.v-directive.png)

全局注册

```js
   Vue.directive('指令的名字', {
        //一些option，提供许多hook function 定义directive的具体操作，如inserted、bind...
        inserted: function (el) {
            //指令插入元素后的操作
        }
    })
```

局部注册

```js
export default {
  data () {
    return {}
  },
  directives: {
    name: {  //指令的名字
      // 指令的定义
    }
  }
}
```

### 钩子函数

在定义的时候，VUe提供了许多 hook function。例如 inserted、bind等
bind：只调用一次，在绑定的对象节点被插入父节点时调用一次的函数，可以用于初始化定义一些样式或者其他动作
unbind：只调用一次，在元素被解除绑定时调用
inserted：被绑定元素插入父节点时调用;父节点存在即可调用，不必存在于document中
update：被绑定的元素所在的模板更新的时候调用，而不论绑定的值是否发生了变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新
componentUpdated：被绑定元素所在的模板完成一次更新周期是调用

### 钩子函数参数

指令钩子函数会被传入以下参数：
el：指令所绑定的元素，可以用来直接操作 DOM 。
binding：一个对象，包含以下属性：

* name：指令名，不包括 v- 前缀。
* value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
* oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
* expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"
* arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
* modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。

vnode：Vue 编译生成的虚拟节点。
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

> 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。

## 为什么要使用这个 vue directive

  为了实现 view 和 viewModule 这两个层的分离

View 层负责页面上的显示，ViewModule 层负责`改变|操作`数据，由于Vue是基于数据驱动的，所以我们就不应该（尽量避免）在代码中操作 View 层上面的 DOM 元素
另一方面，VUeDirective 是和 DOM 元素紧密联系在一起的，随着 DOM 的创建、销毁一起变化，也就相应的出发了上面说的几个 钩子函数。
如此，vue direcitve的生命周期方法能够让我们以一种更加优雅的方式在合适的时机对 DOM 进行必要的操作。
而viewModule里面没有和DOM元素相对应的方法，vue directive又是属于 VIew 层面的东西，所以 DOM 操作应该被封装在 vue directive 中 而不是 Vue 的实例中

### demos

### 官方

```css vue
<p v-color-swatch:lee.a="#f90"></p>

Vue.directive('color-swatch', function (el, binding) {
  console.log(binding) // Object{name:'color-swatch', arg:'foo', rawName: 'v-color-swatch', value: '#f90', expression: '#f90', modifiers: {}, def: {}}
  el.style.backgroundColor = binding.value
})

还可以传入对象面量

<div v-demo="{ color: 'white', text: 'hello!' }"></div>

Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```

### 掘金学习： scroll 滚动后取数据

```js vue
1、首先将DOM操作封装到指令的option中
let scrollCallback = function(callback) {
    if (document.body.scrollHeight < 1000) {
        return
    }
    if (document.body.scrollHeight - window.scrollY - 100  document.body.clientHeight) {
        callback()
    }
}
let callBackWarpped // 新变量 保存引用
export default {
    bind: function(el, binding, vnode) {
        callBackWarpped =  scrollCallback.bind({}, binding.value)
        window.addEventListener("scroll", callBackWarpped)
    },
    unbind: function() {
        window.removeEventListener("scroll", callBackWarpped)
    }
}

2、
import scrollDirective from '../../directives/scroll'

3、在组件的directives属性中注册这个指令，值为scroll
directives: {
    scroll: scrollDirective
    //指令的名字:指令的option的名字
},

4、在相应元素上加上directive指令
v-scroll = "onScroll"
//v-'指令的名字' = "回调函数"

5、编写directive指令中的函数
在method中编写onScroll函数，也就是上文中对应的binding.value，在这个函数中我们将会请求更多数据，而Vue就会执行相应v-scroll中的值。 
```

### 自己编写

```css
<input v-leeing:foo.a="shello" placeholder="自定义指令">

export default {
  data () {
    return {}
  },
  directives: {
    chamelon: {
      inserted (el, binding) {
        el.style.background = binding.value
      }
    }
    leeing: {
      inserted (el, binding) {
        el.focus() // 插入的时候就自动聚焦
      }
    }
  }
}
```

<div class="note success no-icon"><p>参考：[2018 我所了解的 Vue 知识大全](https://juejin.im/post/5a4b78226fb9a0451a76c1a1?utm_source=gold_browser_extension)</p></div>

## 自定义事件

### v-on

    使用 v-on 绑定自定义事件

绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

<div class="note warning no-icon">用在普通元素上时，只能监听 原生 DOM 事件。<br> 用在自定义元素组件上时，也可以监听子组件触发的自定义事件。</div>

每个 Vue 实力都实现了`事件接口`

* 使用 $on(eventName) 监听事件
* 使用 $emit(eventName) 触发事件

<div class="note warning no-icon">$on 和 $emit 并不是 addEventListener 和 dispatchEvent</div>

父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。
注意：v-on 没有简写。`：`是 v-bind 的简写 ；v-on 是 @

在监听原生 DOM 事件时，方法以事件为唯一的参数

```css
<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

<!-- 缩写 -->
<button @click="doThis"></button>
```

在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：

```css
<my-component @my-event="handleThis"></my-component>

<!-- 内联语句 -->
<my-component @my-event="handleThis(123, $event)"></my-component>

<!-- 组件中的原生事件 -->
<my-component @click.native="onClick"></my-component>
```

如果需要在组件上监听一个原生事件。可以添加修饰符！ v-on:click.native="doSomething"

* .stop - 调用 event.stopPropagation()。
* .prevent - 调用 event.preventDefault()。
* .capture - 添加事件侦听器时使用 capture 模式。
* .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
* .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
* .native - 监听组件根元素的原生事件。
* .once - 只触发一次回调。
* .left - (2.2.0) 只当点击鼠标左键时触发。
* .right - (2.2.0) 只当点击鼠标右键时触发。
* .middle - (2.2.0) 只当点击鼠标中键时触发。
* .passive - (2.3.0) 以 { passive: true } 模式添加侦听器

```css
<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">
```

### v-bind

    动态地绑定一个或多个特性，或一个组件 prop 到表达式。

1. 在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象
2. 在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。
3. 没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。

### 几个语法糖

v-modle

```css
<input v-model="something">

等价于

<input
  v-bind:value="something"
  v-on:input="something = $enent.target.value"
>
```

## vue 书写规范

> 哪里都有规范

![Vue 书写规范](http://p2msyzjlz.bkt.clouddn.com/vue.w-standard.png)