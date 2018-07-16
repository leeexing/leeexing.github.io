/**
 * ES6 生成器在学习
 */
function *gen() {
  let a = yield 1
  console.log(a)
  let b = yield 2
  console.log(b)
  let c = yield 3
  console.log(c + (yield))
  return 4
}
const g = gen()
g.next(5)
// {value: 1, done: false}
g.next(6)
// 6
// {value: 2, done: false}
g.next(7)

// 一、yield表达式
// 1、可看成，刚开始调用 gen（） 只是生成了一个 迭代器，第一个 g.next() 只是执行到 yiled 语句处。并将相应的值返回回来，再次调用 g.next() 会将 next里面的参数回传给 yiled 的表达式
// 2、每调用一次next方法都会返回一个包含value和done属性的对象，此时会停留在某个yield表达式结尾处。value属性值即是yield表达式的值；done属性是布尔值，表示是否遍历完毕。
// 3、另外呢，yield表达式没有返回值，或者说返回值是undefined。

// 二、next方法
// 1、每一次调用next方法，就会从函数头部或者上一次停下来的地方开始执行，直到遇到下一个yield表达式(return 语句)为止。
// 2、遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield表达式后面的那个表达式的值，作为返回的对象的value属性值。
// 3、下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
// 4、如果没有再遇到新的yield表达式，就一直运行到函数结束，直到遇到return语句为止，并将return语句后面表达式的值，作为返回的对象的value属性值。
// 5、如果该函数没有return语句，则返回的对象的value属性值为undefined。
// 6、返回的对象的value属性值有三种结果：yield表达式后面的值、return语句后面的值、undefined

// 三、实际上，**yield表达式和next方法构成了双向信息传递。**yield表达式可以向外传递value值，而next方法参数可以向内传递值。

// 四、如果想要第一次调用next方法时就可以传递参数，可以使用闭包的方式。
// 实际上就是在闭包内部执行了一次next方法
function wrapper(gen) {
  return function (...args) {
    const genObj = gen(...args)
    genObj.next()
    return genObj
  }
}

// 五、yield*表达式
function *foo() {
  yield 1
}
function *bar(){
  yield *foo()
  //相当于
  for (const item of foo) {
    yield item
  }
  yield 2
}

// 任何数据类型(Array, String)只要有Iterator接口，就能够被yield*遍历
let arr = ['a', 'b']
let str = 'leeing'
function *caa(){
  yield arr
  yield *arr
  yield str
  yield *str
}

//如果在Generator函数中存在return语句，则需要使用let value = yield* iterator方式获取返回值。
function *foo() {
  yield 1
  return 2
}
function *gen() {
  let value = yield *foo()
  return value
}
const g = gen()
g.next()  // {value: 1, done: false}
g.next()  // {value: 2, done: true}


