/**
 * 订阅发布模式
 * on: 事件监听
 * off: 事件解除绑定
 * trigger：事件触发
 * once：事件只绑定一次
 * 不足之处：不能解除某个订阅事件里面的某个特定的事件
 *            触发事件也是一样
 *            触发事件不能传参
 * 优化方案：将订阅事件类型改为内部的对象类型，而不是数组类型
 */
class App {
  constructor() {
    this.onceEvent = {}
    this.events = {}
  }
  on(topic, fn) {
    if (this.events[topic]) {
      this.events[topic].push(fn)
    } else {
      this.events[topic] = [fn]
    }
  }
  trigger(topic, fn = null) {
    if (this.events[topic]) {
      if (!fn) {
        this.events[topic].forEach(func => {
          func()
        })
      } else {

      }
    }
    if (this.onceEvent[topic]) {
      this.onceEvent[topic].forEach(func => {
        func()
      })
      this.onceEvent[topic].length = 0
    }
  }
  off(topic, fn) {
    if (this.events[topic]) {
      if (fn === null) {
        this.events[topic].length = 0
      } else {
        let index = this.events[topic].findIndex(item => item == fn)
        this.events.splice(index, 1)
      }
    }
  }
  once(topic, fn) {
    if (this.onceEvent[topic]) {
      this.onceEvent[topic].push(fn)
    } else {
      this.onceEvent[topic] = [fn]
    }
  }
  isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]'
    // return fn instanceof Function
  }
  hasSubscribe(topic, fn) {
    return this.events[topic].includes(fn)
  }
}

/**
 * 初步优化之后
 * 还有优化空间：
 * 1、对于onceEvents和events里面，如果订阅事件相同，怎么处理，需要作出判断
 * 2、触发事件只想发布“一次事件”，这是应该添加关键词，便于调用，或者两种类型事件不能重复订阅
 */
class App2 {
  constructor() {
    this.onceEvent = {}
    this.events = {}
  }
  on(topic, fn) {
    if (this.events[topic]) {
      if (this.isFunction(fn)) {
        this.events[topic].push(fn)
      } else {
        fn.forEach(item => {
          this.events.push(item)
        })
      }
    } else {
      this.events[topic] = [fn]
    }
  }
  trigger(topic, fn = null, ...args) {
    if (this.events[topic]) {
      if (!fn) {
        this.events[topic].forEach(func => {
          func()
        })
      } else {
        let index = this.events[topic].findIndex(func => func === fn)
        this.events[topic][index](...args)
      }
    }
    if (this.onceEvent[topic]) {
      this.onceEvent[topic].forEach(func => {
        func()
      })
      this.onceEvent[topic].length = 0
    }
  }
  off(topic, fn) {
    if (this.events[topic]) {
      if (fn === null) {
        this.events[topic].length = 0
      } else {
        let index = this.events[topic].findIndex(item => item == fn)
        this.events.splice(index, 1)
      }
    }
    // noce the same
  }
  once(topic, fn) {
    if (!this.isFunction(fn)) {
      throw new TypeError('fn must a function')
    }
    if (this.onceEvent[topic]) {
      this.onceEvent[topic].push(fn)
    } else {
      this.onceEvent[topic] = [fn]
    }
  }
  isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]'
    // return fn instanceof Function
  }
  hasSubscribed(topic, fn) {
    return this.events[topic].includes(fn)
  }
}

let app = new App2()
function fn1(){
  console.log('hello wolrd -- 01')
}
function fn2(){
  console.log('hello wolrd -- 02')
}
function fn3(){
  console.log('hello wolrd -- 03')
}
app.on('say',[fn1, fn2])
app.once('tell', fn3)

app.trigger('say', fn1)
