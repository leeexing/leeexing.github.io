/**
 * ES 基础知识
 */
// 一、语法

// 1.1、toString

var arr = [1, [[2, 3], 4]]
arr.toString() // '1,2,3,4'
// arrayObject 的字符串表示。返回值与没有参数的 join() 方法返回的字符串相同。
arr.join(',')

//toString() 方法返回一个表示该对象的字符串。
// 每个对象都有一个toString()方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。
// 默认情况下，toString()方法被每个Object对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中type是对象的类型。
var obj = {a: 12, b: 'elm'}
obj.toString() // "[object Object]"

Object.prototype.toString.call(arr) // "[object Array]"

// 1.2、Accessor 存取器
class Dragon {
  get age() {
    // ..
  }
  set age(value) {
    // ..
  }
}

// 1.3 sessionStorage
// 只要掌握以下几个方法即可
sessionStorage.getItem('key')
sessionStorage.setItem('key', 'value')
sessionStorage.removeItem('key')
sessionStorage.clear()

// 二、元算符

// 2.1 右移运算符
// value >> num
// 16 8 4 2 1
8 >> 1 // 4 | 1000 -> 0100
7 >> 1 // 3 | 0111 -> 0011