---
title: 学习 React-router4 时踩的坑
date: 2018-01-16 10:39:44
tags: 
- 前端
- react
categories: 前端
image: http://cn.bing.com/az/hprichbg/rb/OrkneyIslands_ZH-CN7226700281_1920x1080.jpg
description: 遇到简单的坑，没有人及时给与一些指点，很难受
---
# React-router.V4

    路由规则位于布局和 UI 本身之间

## 前面 BB

不得不吐槽，用过 Vue-router，过来再使用这个，很不爽

<!-- more -->

## 理论学习

直接上手，到处是埋伏

### 思维模式的转变

> 概念上将，路由就是一个基本的单元，基本上是一个梅花的配置文件

```jsx
<Route path="/home" component={Home}>
```

### 关键字

> exact

```jsx
<Route path="/" exact component={HomePage} />
```

`exact` 的意思是，需要完全匹配。也有排他性的意思 -- 只有一条路由获胜

### 包容性路由

> 只要匹配上路由，就进行内渲染

```jsx
const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
      <Route path="/users" component={UsersMenu} />
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)
```

当我们访问 `/users` 时，两个组件都会渲染，相同或者不同都没有关系

### 排他性路由

> <Switch> 来匹配其中的一个路由

```jsx
const PrimaryLayout = () => (
  <div className="primary-layout">
    <PrimaryHeader />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users/add" component={UserAddPage} />
        <Route path="/users" component={UsersPage} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
)
```

在 /users 之前策略性地放置了 /users/add 的路由，以确保正确匹配。由于路径 /users/add 将匹配 /users 和 /users/add，所以最好先把 /users/add 放在前面。
如果遇到，`<Redirect>` 组件将会始终执行浏览器重定向，但是当它位于 <Switch> 语句中时，只有在其他路由不匹配的情况下，才会渲染重定向组件。

### 嵌套布局

> 这里挖坑挖得最深

表面上看，嵌套布局很简单，但根据你的选择，可能会因为你 `组织路由的方式` 而遇到阻碍。

```jsx 反面教材
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" exact component={BrowseUsersPage} />
          <Route path="/users/:userId" component={UserProfilePage} />
          <Route path="/products" exact component={BrowseProductsPage} />
          <Route path="/products/:productId" component={ProductProfilePage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}

const BrowseUsersPage = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <BrowseUserTable />
    </div>
  </div>
)

const UserProfilePage = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <UserProfile userId={props.match.params.userId} />
    </div>
  </div>
)
```

可以看到，下面的两个组件中存在相同的 `UserNav` 组件，这回产生一个重复渲染的问题，因为每次 `UserProfilePage` 或 `BrowseUsersPage` 被渲染的时候，一个`新的 UserNav` 实例被创建，

思路就应该是将相同的业务组件放在一起

```jsx 正面例子
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" component={UserSubLayout} />
          <Route path="/products" component={ProductSubLayout} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}

const UserSubLayout = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path="/users" exact component={BrowseUsersPage} />
        <Route path="/users/:userId" component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```

区别在于，将 `user` 的子路由和基本路由放在同一个组建里面。如此，共同的组件 ``UserNav` 组件就不会被重复渲染了
**注意**：我们在布局结构中深入嵌套，路由仍然需要识别它们的完整路径才能匹配。为了节省重复输入（以防你决定将“用户”改为其他内容），请改用 props.match.path

```jsx 优化
const UserSubLayout = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path={props.match.path} exact component={BrowseUsersPage} />
        <Route path={`${props.match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```

### 匹配

> Props.match

对于知道详情页面渲染的 `UserId` 以及如何编写沃恩的路由是很有用的。`match` 对象给我嗯提供了几个属性呢

* match.params
* match.path  // 路由编写的路径：/users/:userId  |  优先选择一个
* match.url   // 浏览器 URL 中的实际路径：/users/12

### 避免匹配冲突

> 一个场景：我们希望能够通过访问 /users/add 和 /users/5/edit 来新增和编辑用户

```jsx 多重匹配
const UserSubLayout = ({ match }) => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route exact path={props.match.path} component={BrowseUsersPage} />
        <Route path={`${match.path}/add`} component={AddUserPage} />
        <Route path={`${match.path}/:userId/edit`} component={EditUserPage} />
        <Route path={`${match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```

**Attention**：

1. 为了确保进行适当的匹配，新增和编辑路由需要战略性地放在详情路由之前。如果详情路径在前面，那么访问 /users/add 时将匹配详情（因为 "add" 将匹配 :userId）。
2. 如果我们这样创建路径 ${match.path}/:userId(\\d+)，来确保 :userId 必须是一个数字，那么我们可以先放置详情路由

### 授权路由

> 根据用户的登陆状态来限制用户访问某些路由

对于未经授权的页面（如“登录”和“忘记密码”）与已授权的页面（应用程序的主要部分）看起来不一样也是常见的。

解决这个问题，需要考虑一个应用程序的主要入口点

```jsx 这不就是我一开始遇到的问题吗？
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={UnauthorizedLayout} />
            <AuthorizedRoute path="/app" component={PrimaryLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

// 我遇到的问题是这样的

class AppRoute extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <Router>
        <div className="app">
          // 第三版：直到使用了 Switch 这个路由控制器。包裹在里面的路由只会匹配到一个 路由。
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" component={Home} />
          </Switch>

          // 第二版：我想增加一个login页面，但是他的基本布局适合home（‘/’）页面是不一样的 -- 没有 菜单栏，侧边栏之类的，只有空白的登陆表单
          // 这样写的问题是，我访问 login 路由的时候，还是会将 index 页面的一些布局渲染出来，这可不是我想要的结果
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login}/>

          // 第一版：最初还没有增加 login页面，没有什么大问题，路由放在一起就好了
          {/* <Router>
            <main className="content">
              <Header />
              <Route exact path="/" component={Home}/>
              <Route path="/article" component={Article}/>
              <Route path="/todolist" component={Todo}/>
              <Route path="/about" component={About}/>
              </main>
            </Router> */}
        </div>
      </Router>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <Route path="/todolist" component={Todo} />
        <Route path="/about" component={About} />
        <Route path="/article" component={Article} />
        <Route path="*" render={() => (
          <h3>沉舟侧畔千帆过</h3>
        )}/>
      </div>
    )
  }
}
```

使用 react-redux 与 React Router v4 非常类似，就像之前一样，只需将 BrowserRouter包在 <Provider> 中即可。

但是 AuthorizedRoute 不是 React-routerV4 的一部分，不能通过 `react-router-dom` 导出。需要自己根据相关 [V4文档][2] 辅助编写完成

```jsx 授权
class AuthorizedRoute extends React.Component {
  componentWillMount() {
    getLoggedUser()
  }

  render() {
    const { component: Component, pending, logged, ...rest } = this.props
    return (
      <Route {...rest} render={props => {
        if (pending) return <div>Loading...</div>
        return logged
          ? <Component {...this.props} />
          : <Redirect to="/auth/login" />
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged
})

export default connect(stateToProps)(AuthorizedRoute)
```

首先，使用网络请求来 getLoggedUser()，并将 pending 和 logged 插入 Redux 的状态中。pending 仅表示在路由中请求仍在继续。

### 其他提示

> Link NavLink

NavLink 匹配浏览器的 URL。它可以让我们给任何一个激活的链接设置一个 `active` 样式。
如果没有 exact，由于 v4 的包容性匹配策略，那么在访问 /app/users 时，主页的链接将处于激活中
所以参看文章的作者建议：NavLink 带 exact属性等价于 v3 的 <link>，而且更稳定

### 动态路由

> 最好的部分之一

React-router4 中，几乎所有的东西（包括 `<Route>` ）都是 React 的一个组件，都是要拿来进行渲染的。

## 总结

    路由不再是那么难以理解了

我们可以在我们的组件中随时随地的渲染 `<Route>`。
当满足某些条件（path匹配）时，应用程序的整个内容都可以路由到 相干组件，进行渲染，当某些条件不满足的时候，我们可以一处路由，隐藏某些组件，或者渲染其他的一些组件
什么？还有 `递归路由`。
好吧，我还需要继续学习

看来，默写组件只需要向上面那样，只写一个简单的 函数就可以了，不必要写一个 class 类。
而且，写函数的话，传参更加方便

从一个简单的 todolist 开始学 react，到开始尝试使用 react-router，满满都是坑啊。
但是，看完了一些前人的总结之后，猛地还是有很多**豁然开朗**的感觉
继续学习

## 感谢

> 填坑的道路上，你们的分享就是指路明灯

[关于 React Router 4 的一切][1]

[1]: http://blog.csdn.net/sinat_17775997/article/details/77411324
[2]: https://reacttraining.com/react-router/web/example/auth-workflow