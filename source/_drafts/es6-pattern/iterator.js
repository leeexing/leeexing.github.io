/**
 * 迭代器模式
 * 其实就是一个简单的闭包应用
 * 缺陷：不能使用 for of 进行迭代消费
 */
const iterotorLX = (arr) => {
  let index = 0
  let len = arr.length
  return {
    next() {
      if (index < len) {
        return {
          value: arr[index++],
          done: false
        }
      } else {
        return {
          done: true
        }
      }
    }
  }
}
let it = iterotorLX([1,2,3,4,5])
it.next() // {}

/**
 * 升级
 * 可以使用原生js 的 for of 进行迭代消费
 * 关键一步：给这个对象增加一个 Symbol.iterator 方法，同时返回这个 this
 * 
 */
const rangeLx = (start, end, skip) => {
  return {
    [Symbol.iterator]() {
      return this
    },
    next() {
      if (start < end) {
        return {
          value: start++,
          done: false
        }
      } else {
        return {
          done: true,
          value: end
        }
      }
    }
  }
}


/**
 * 试试这样行不行
 * 
 * @class Range
 */
class Range {
  constructor(start=0, end, skip=1) {
    Object.assign(this,{start, end, skip})
    this.init()
  }
  init() {
    if (!this.end) {
      this.end = this.start
      this.start = 0
    }
  }
  [Symbol.iterator]() {
    return this
  }
  next() {
    if (this.start < this.end) {
      let value = this.start
      this.start += this.skip
      return {
        value,
        done: false
      }
    } else {
      return {
        done: true
      }
    }
  }
}

let rang = new Range(0,5)