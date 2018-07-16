/**
 * 观察者模式
 * 另一个叫法是：分发队列
 * 典型代表：redux、vue观察数据变更的时候也是用的这个模式
 * 疑惑：匿名函数能检测到是否已经加入被观察队列中？| 应该是不行的，只有明文函数名（有function.name）才行
 */

class Ob {
  constructor() {
    this.subject = []
  }
  subscribe(observe) {
    if (this.isSubed(observe)) {
      return false
    }
    this.subject.push(observe)
  }
  notify(value) {
    this.subject.forEach(ob => {
      ob(value)
    })
  }
  isSubed(observe) {
    console.log(this.subject.includes(observe))
    return this.subject.includes(observe)
  }
}

let ob = new Ob()
ob.subscribe(value => {
  // 打印日志
  console.log(value)
})
db.subscribe(value => {
  // 增加dom元素
  let content = document.createElement('h1')
  content.innerText = value
  document.querySelector('content').appendChild(content)
})
document.getElementById('input').addEventListener('click', event => {
  let value = event.target.value
  ob.notify(value)
})