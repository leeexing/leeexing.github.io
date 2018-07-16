---
title: Vue 数据绑定学习
date: 2018-01-12 10:01:50
tags:
- 前端
- js
- vue
categories: 前端
image: http://p2msyzjlz.bkt.clouddn.com/vue.instance.png
---

## 双向数据绑定

<div class="note success no-icon"><p>将DOM与Vue实例的data数据绑定在一起，彼此之间相互影响</p></div>

<!-- more -->

### 简单的数据绑定知识

    Object.defineProperty

用法： Object.defineProperty(obj, 'key', descriptor)

```js
let obj = {}
let foo
Object.defineProperty(obj, 'lee', {
  value: 'ing',
  // 几个描述符的值 默认都为 false
  wirtabel: false,  // 可更改
  configurable: false,  // 属性是否可删除，以及其他特性是否可被修改
  enumerable: false  // 可枚举 for ... in 和 Object.keys()

  // or
  // get，set 不能和value一起出现
  get() {
    // 返回值,必须要指定返回值
    // return foo
    return obj.msg
  },
  set(val) {
    //
    obj.lee = val
  }
})
```

### 原理

Object.defineProperty 中的 get 和 set 方法 -- 访问器：会随着数据的变化而直接变化

当我们将一个普通的 js 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter
用户看不到 getter/setter， 但是内部他们让 Vue 追踪依赖，在属性被访问和修改的时候通知变化。
每个组件实例都有相应的 watcher 实例对象，他会在组件渲染的过程中把属性记录为依赖，之后依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新

### 一个简单的数据双向绑定的例子

```js
<input type="text" id="txt" />
<span id="sp"></span>

<script>
var txt = document.getElementById('txt'),
    sp = document.getElementById('sp'),
    obj = {}

// 给对象obj添加msg属性，并设置setter访问器
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg  当obj.msg反生改变时set方法将会被调用  
  set: function (newVal) {
    // 当obj.msg被赋值时 同时设置给 input/span
    txt.value = newVal
    sp.innerText = newVal
  }
})

// 监听文本框的改变 当文本框输入内容时 改变obj.msg
txt.addEventListener('keyup', function (event) {
  obj.msg = event.target.value
})
</script>
```

### 注意事项

__当数据之前没有在 data 里面。但是后面的逻辑需要往 data 里面动态添加新的数据、属性的时候，这个心添加的数据是 非响应式的__
因为 Vue 在初始化实例的时候对属性执行 getter/setter 转化过程，所以属性必须在 data 对象存在才能让 Vue 转化它。这样才能实现响应。
所以对于后面动态添加进来的数据， Vue 检测不到
但是，可以使用下面两种方式实现对这些数据的再次监测

1. Vue.set(object, key, value) - 适用于添加单个属性
2. Object.assign() - 适用于添加多个属性

1、如果是实例上面的数据，可以这样

```js
this.$set(this.someObject, 'foo', someValue)
```

2、适用于向已有对象添加一些属性，可以使用 Object.assign()。但是，添加到对象上的新属性不会触发更新。这种情况可以创建一个新的对象，让它饱含对象的属性和新的属性

```js
this.someObject = Object.assign({}, this.someObject, {foo:'cat', age: 23})
```

### 和这个联系比较紧密的异步DoM更新

Vue `异步`执行 DOM 更新，只要观测到数据变化，Vue 将会开启一个队列，并缓冲在同一个事件循环中发生的所有数据变化。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲是去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后在下一个时间循环 tick 中， Vue 刷新队列并执行时机工作
当我们直接设置 vm.someData = 'new value' 该组件不会立即重新渲染。组件只会在下一个事件循环队列清空时的下一个 tick 更新。如果我们想要立即获取到更新后的数据，则需要通过 Vue.nextTick(callback) -- 在DOM 更新后，执行某个操作。实力的话调用 vm.￥nextTick（function()）

```js
methods: {
  someMethod () {
    this.msg = 'cahnge' // 假设原来的 this.msg == 'origin'
    this.$nextTick(() => {
      console.log(this.$el.children[0].innerText)
    })
    console.log(this.msg) // 还会是原来的值 origin
  }
}
```

### Vue 中的计算属性

```js
data () {
  return {
    rawData: [1,2,3,4,5,6]
  }
},
computed: {
  // 计算属性的 getter  -- 敲黑板
  showData () {
    return this.rawData.slice(0,3)
  }
}

既然计算属性有个 getter，当然也就有个 setter

computed: {
  // 注意：这里不是一个函数方法，而是一个 对象。就有点想 Object.defineProperty 中的 descriptor
  fullName: {
    // getter
    get () {
      return this.firstname + ' ' + this.lastnAME
    },
    // setter
    set (newVal) {
      // do somethig
    }
  }
}
```

### Vue 双向数据绑定 -- 源码学习

<div class="note success">核心思想是 Object.defineProperty 和 发布-订阅 模式</div>

整体结构

* 改造 Vue 实例中的 data， 通过 Object.defineProperty 将其所有属性设hi为访问器属性
* 对每个属性添加 Observer，并在 observer 中添加订阅者对象序列
* 添加订阅者对象 Watcher，每次初始化的时候添加到对应 data 属性中的 Dep 中

简而言之：监听数据变化，管理订阅者/管理者

```js
// Dep 用于订阅者的存储和收集
import Dep from 'Dep`

export default class Observer {
  constructor (value) {
    this.value = value
    this.walk(value)
  }
  walk(value) {
    Object.keys(value).forEach(key => this.convert(key, value[key]))
  }
  convert(key, val) {
    defineReactive(this.value, key, val)
  }
}

export function defineReactive(obj, key, val) {
  // 用于存放某个属性的所有订阅者
  let dep = new Dep()
  let childOb = observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
      // target指向一个Watcher实例，每个Watcher都是一个订阅者
      // Watcher实例在实例化过程中，会读取data中的某个属性，从而触发当前get方法
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set (newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

export function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value)
}
```

管理订阅者

```js
export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}
```

订阅者

```js
import Dep from 'Dep'
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm  // 被订阅的数据一定来自于当前Vue实例
    this.cb = cb  // 当数据更新时想要做的事情
    this.expOrFn = expOrFn  // 被订阅的数据
    this.val = this.get()  // 维护更新之前的数据
  }
  // 对外暴露的接口，用于在订阅的数据被更新时，由订阅者管理员(Dep)调用
  update() {
    this.run()
  }
  run() {
    const val = this.get()
    if (val !== this.val) {
      this.val = val
      this.cb.call(this.vm)
    }
  }
  get() {
    // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
    Dep.target = this
    const val = this.vm._data[this.expOrFn]
    // 置空，用于下一个Watcher使用
    Dep.target = null
    return val
  }
}
```

实例

```js
import Observer, {observe} from 'Observer'
import Watcher from 'Watcher'

export default class Vue {
  constructor(options = {}) {
    // 简化了$options的处理
    this.$options = options
    // 简化了对data的处理
    let data = this._data = this.$options.data
    // 将所有data最外层属性代理到Vue实例上
    Object.keys(data).forEach(key => this._proxy(key))
    // 监听数据
    observe(data)
  }
  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
  }
  _proxy(key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => this._data[key],
      set: (val) => {
          this._data[key] = val
      } 
    })
  }
}
```
