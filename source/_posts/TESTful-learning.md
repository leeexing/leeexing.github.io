---
title: TESTful learning
date: 2018-01-19 09:58:12
tags:
- 后端
- restful
categories: 后端
image: http://cn.bing.com/az/hprichbg/rb/SamiLavvu_ZH-CN10571430992_1920x1080.jpg
---
# RESTful

正好周末开始为 react-blog 写后台。先充电学习一些如何设计 api

几乎都是参考 阮一峰老师的教程。有空了，再在自己实践的基础上，加上自己的一点理解和感悟。

## 一、理解

> 理论

REST，即Representational State Transfer的缩写 -- **表现层状态转化**

如果一个架构符合REST原则，就称它为RESTful架构。

要理解RESTful架构，最好的方法就是去理解Representational State Transfer这个词组到底是什么意思，它的每一个词代表了什么涵义

<!-- more -->

### 资源

REST的名称"表现层状态转化"中，省略了主语。"表现层"其实指的是"资源"（Resources）的"表现层"。

**所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。**它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。你可以用一个URI（统一资源定位符）指向它，每种资源对应一个特定的URI。要获取这个资源，访问它的URI就可以，因此URI就成了每一个资源的地址或独一无二的识别符。

### 表现层（Representation）

"资源"是一种信息实体，它可以有多种外在表现形式。**我们把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。**

比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。

URI只代表资源的实体，不代表它的形式。严格地说，有些网址最后的".html"后缀名是不必要的，因为这个后缀名表示格式，属于"表现层"范畴，而URI应该只代表"资源"的位置。它的具体表现形式，应该在HTTP请求的头信息中用Accept和Content-Type字段指定，这两个字段才是对"表现层"的描述。

### 状态转化（State Transfer）

互联网通信协议HTTP协议，是一个无状态协议。这意味着，所有的状态都保存在服务器端。因此，***如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。**

客户端用到的手段，只能是HTTP协议。具体来说，就是HTTP协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。它们分别对应四种基本操作：**GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。**

## 二、使用

> 实战

### 路径（Endpoint）

路径又称"终点"（endpoint），表示API的具体网址

在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数

举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。

* https://api.example.com/v1/zoos
* https://api.example.com/v1/animals
* https://api.example.com/v1/employees

### HTTP动词

对于资源的具体操作类型，由HTTP动词表示。

1. GET（SELECT）：从服务器取出资源（一项或多项）。
1. POST（CREATE）：在服务器新建一个资源。
1. PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
1. PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
1. DELETE（DELETE）：从服务器删除资源。

下面是一些例子。

```js example
GET /zoos：列出所有动物园
POST /zoos：新建一个动物园
GET /zoos/ID：获取某个指定动物园的信息
PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
DELETE /zoos/ID：删除某个动物园
GET /zoos/ID/animals：列出某个指定动物园的所有动物
DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物
```

### 过滤信息

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

1. ?limit=10：指定返回记录的数量
2. ?offset=10：指定返回记录的开始位置。
3. ?page=2&per_page=100：指定第几页，以及每页的记录数。
4. ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
5. ?animal_type_id=1：指定筛选条件

参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如，GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

### 状态码（Status Codes）

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

1. 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
2. 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
3. 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
4. 204 NO CONTENT - [DELETE]：用户删除数据成功。
5. 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
6. 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
7. 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
8. 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
9. 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
10. 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
11. 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
12. 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

### 错误处理（Error handling）

如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

```js error
{
    error: "Invalid API key"
}
```

### 返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范。

1. GET /collection：返回资源对象的列表（数组）
1. GET /collection/resource：返回单个资源对象
1. POST /collection：返回新生成的资源对象
1. PUT /collection/resource：返回完整的资源对象
1. PATCH /collection/resource：返回完整的资源对象
1. DELETE /collection/resource：返回一个空文档

### Hypermedia API

RESTful API最好做到Hypermedia，即返回结果中提供链接，连向其他API方法，使得用户不查文档，也知道下一步应该做什么。

比如，当用户向api.example.com的根目录发出请求，会得到这样一个文档。

```js response
{"link": {
  "rel":   "collection https://www.example.com/zoos",
  "href":  "https://api.example.com/zoos",
  "title": "List of zoos",
  "type":  "application/vnd.yourformat+json"
}}
```

上面代码表示，文档中有一个link属性，用户读取这个属性就知道下一步该调用什么API了。rel表示这个API与当前网址的关系（collection关系，并给出该collection的网址），href表示API的路径，title表示API的标题，type表示返回类型。

Hypermedia API的设计被称为HATEOAS。Github的API就是这种设计，访问api.github.com会得到一个所有可用API的网址列表

```js
{
  "current_user_url": "https://api.github.com/user",
  "authorizations_url": "https://api.github.com/authorizations",
  // ...
}

从上面可以看到，如果想获取当前用户的信息，应该去访问api.github.com/user，然后就得到了下面结果。

{
  "message": "Requires authentication",
  "documentation_url": "https://developer.github.com/v3"
}
```