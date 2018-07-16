---
title: React Learn
date: 2018-01-19 11:11:33
tags:
- 前端
- react
categories: 前端
image: http://cn.bing.com/az/hprichbg/rb/TadamiTrain_ZH-CN13495442975_1920x1080.jpg
---
# react

    一些基本概念

<!-- more -->

## 生命周期

1. constructor(props, context)：构造函数，在创建组件的时候调用一次。

1. componentWillMount()：在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次。

1. componentDidMount()：在组件挂载之后调用一次。这个时候，子主键也都挂载好了，可以在这里使用refs。

1. componentWillReceiveProps(nextProps)：props是父组件传递给子组件的。父组件发生render的时候子组件就会调用componentWillReceiveProps（不管props有没有更新，也不管父子组件之间有没有数据交换）。

1. shouldComponentUpdate(nextProps, nextState)：组件挂载之后，每次调用setState后都会调用shouldComponentUpdate判断是否需要重新渲染组件。默认返回true，需要重新render。在比较复杂的应用里，有一些数据的改变并不影响界面展示，可以在这里做判断，优化渲染效率。

1. componentWillUpdate(nextProps, nextState)：shouldComponentUpdate返回true或者调用forceUpdate之后，componentWillUpdate会被调用。

1. componentDidUpdate()：除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate。

componentWillMount、componentDidMount和componentWillUpdate、componentDidUpdate可以对应起来。区别在于，前者只有在挂载的时候会被调用；而后者在以后的每次更新渲染之后都会被调用。

### 更新方式

* 首次渲染Initial Render
* 调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）
* 父组件发生更新（一般就是props发生改变，但是就算props没有改变或者父子组件之间没有数据交换也会触发render）
* 调用this.forceUpdate

## 组件在初始化时会触发5个钩子函数：

1. getDefaultProps()
> 设置默认的props，也可以用dufaultProps设置组件的默认属性。
2. getInitialState()
> 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。
3. componentWillMount()
> 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
4. render()
> react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
5. componentDidMount()
> 组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次。

## react-python

> react负责前端，python负责后端

### 解决跨域

1、在 package.json 中配置 proxy
配合python的 `flask` 框架

```js package.json
{
  "name": "blog",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "antd": "^3.1.3",
    "axios": "^0.17.1",
    "node-sass": "^4.7.2",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-router-dom": "^4.2.2",
    "react-scripts": "1.1.0",
    "sass": "^1.0.0-beta.4",
    "sass-loader": "^6.0.6"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5000/" // python flask  默认的端口（可配置）
}
```

2、项目中安装 axios 。如上的 `dependencies`

3、app.py

```js python-server
from flask import Flask, jsonify, make_response
import pymongo

app = Flask(__name__)

client = pymongo.MongoClient('localhost', 27017)
user_db = client['myblog']['users']

@app.route('/api/users', methods=['GET'])
def users():
    data = {
        'success': True,
        'msg': 'leeing'
    }
    return jsonify(data)

if __name__ == "__main__":
    # app.run(host='192.168.191.1')
    app.run(debug=True)

```

3、使用

```js react-demo
class Music extends React.Component {
  componentWillMount() {
    axios.get('/api/users').then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div className="m-music">
        <h1>我的音乐，我的电台</h1>
        <Button>检查一些字段</Button>
      </div>
    )
  }
}

// 控制台就可以获取到了
{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
  config:{adapter: ƒ, transformRequest: {…}, transformResponse: {…}, timeout: 0, xsrfCookieName: "XSRF-TOKEN", …}
  data:
    msg:"leeing"
    success:true
  __proto__:Object
  headers:{date: "Sun, 21 Jan 2018 02:25:17 GMT", server: "Werkzeug/0.14.1 Python/3.6.4", connection: "keep-alive", x-powered-by: "Express", content-length: "42", …}
  request:XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
  status:200
  statusText:"OK"
```

**但是我就是想要使用 fetch 不想使用 axios 怎么办？**

1、后端配置可跨域

```python app.py
from flask import Flask, jsonify, make_response
import pymongo

app = Flask(__name__)

client = pymongo.MongoClient('localhost', 27017)
user_db = client['myblog']['users']

@app.route('/api/users', methods=['GET'])
def users():
    data = {
        'success': True,
        'msg': 'leeing'
    }
    rst = make_response(jsonify(data))
    rst.headers['Access-Control-Allow-Origin'] = '*'
    rst.headers['Access-Control-Allow-Methods'] = 'GET'
    rst.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type' 
    return rst, 200

if __name__ == "__main__":
    # app.run(host='192.168.191.1')
    app.run(debug=True)
```

主要是配置 返回信息的 headers 头部信息

2、fetch 使用

```js music.jsx
class Music extends React.Component {
  componentWillMount() {
    // 第一版比较复杂，还以为这里还需要将后台的端口配置上，同时 fetch 的时候还继续将 headers 配置好。其实没有这个必要了
    // 只要后端配置好了额就可以了

    // fetch('http://localhost:5000/api/users', {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //     console.log(res.headers.get("content-type"))
    //     return res.json() // 这里就可以使用 res.json（） 了
    //   })
    //   .then(data => {
    //     console.log(data)
    //   })

    fetch('/api/users')
      .then(res => {
        console.log(res)
        console.log(res.headers.get("content-type"))
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
  }
  render() {
    return (
      <div className="m-music">
        <h1>我的音乐，我的电台</h1>
        <Button>检查一些字段</Button>
      </div>
    )
  }
}

// 控制台返回的信息

Response {type: "basic", url: "http://localhost:3000/api/users", redirected: false, status: 200, ok: true, …}
music.jsx:13 application/json
music.jsx:17 {msg: "leeing", success: true}
```

**总结**：
暂时还不知道为什么使用 `axios` ，后端就可以不用再配置 返回信息的头部了
而且如果是使用 `fetch` 这样的方式，每一个请求都需要这是一个响应的头部，那不就复杂了。应该是有一个统一的设置
到底使用 axios 还是 fetch。可以自己衡量

### 403

> 一堆的 403 下载图片报错

```js 403-image
5fd296f2f4cb16e.jpg:1 GET https://img3.doubanio.com/view/site/median/public/5fd296f2f4cb16e.jpg 403 ()
Image (async)
```