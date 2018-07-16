---
title: 当你开始考虑前端规范的时候
date: 2018-01-10 18:39:44
tags: 
- 前端
- 规范
categories: 前端
image: http://cn.bing.com/az/hprichbg/rb/SamburuNests_ZH-CN11974788746_1920x1080.jpg
description: 最初的不规范，必定要在后面狠狠踢你一脚
---

> 我只是前端深井的挑水夫

<!-- more -->

## js

> 不造轮子，直接使用[Airbnb前端规范](https://github.com/yuche/javascript)

## html

> 尽量语义化

### 保持良好的简洁结构

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Title很重要，不要缺少</title>
        <meta name="keywords" content=""/>
        <meta name="description" content=""/>
        <meta name="viewport" content="width=device-width"/>
        <link rel="stylesheet" href="css/style.css"/>
        <link rel="shortcut icon" href="img/favicon.ico"/>
        <link rel="apple-touch-icon" href="img/touchicon.png"/>
    </head>
    <body>
    </body>
</html>
```

**注意**:

```html
1、 结构上如果可以并列书写，就不要嵌套。
如果可以写成<div></div><div></div>那么就不要写成<div><div></div></div>

2、如果结构已经可以满足视觉和语义的要求，那么就不要有额外的冗余的结构。
比如<div><h2></h2></div>已经能满足要求，那么就不要再写成<div><div><h2></h2></div></div>

3、一个标签上引用的className不要过多，越少越好。
比如不要出现这种情况：<div class="class1 class2 class3 class4"></div>

4、对于一个语义化的内部标签，应尽量避免使用className。
比如在这样一个列表中，li标签中的itm应去除：<ul class="m-help"><li class="itm"></li><li class="itm"></li></ul>

```

在body 中，不同的业务模块之间，或者不同的逻辑大区块之间，可以备注简单的模块内容，一座提示只用

### 常用语义化标签

1.、头部——header和nav标签

```html
<header>
    <h1>html5语义化标签</h1>
    <nav>
        <h1>导航</h1>
        <ul>
            <li>章节标签</li>
            <li>标题标签</li>
        </ul>
    </nav>
</header>
```

2、 主体部分——main和section

```html
<main>
    <section>
        <hgroup>
            <h2>章节标签</h2>
            <p>为页面区分不同的章节</p>
        </hgroup>
        <div>包括section article nav aside </div>
    </section>
    <section>
        <hgroup>
            <h2>标题标签</h2>
            <p>为不同的章节定义标题</p>
        </hgroup> 
        <div>h1 h2 h3 h4 h5 h6六个标题标签</div>
    </section>
</main>
```

3、尾部——footer

```html
<footer>
    <p>copyright &copy hello, world</p>
</footer>
```

4、页面的轮廓

    section、article、aside、nav

```html

aside
 <aside></aside>：指定附注栏，包括引述、侧栏、指向文章的一组链接、广告、友情链接、相关产品列表等。
如果放在main内，应该与所在内容密切相关。

article
适用于独立性强的内容，如本身就是一篇文章、博客，或者用户的评论等，article比section更加强调需要包含一个标题标签h1~h6
具体到项目中，适合于评论区部分，课件介绍
```

5、其它一些常用标签

```html
<figure></figure>：创建图（默认有40px左右margin）。

<small></small>：指定细则，输入免责声明、注解、署名、版权。
     只适用于短语，不要用来标记“使用条款”、“隐私政策”等长的法律声明。

<strong></strong>：表示内容重要性。

<em></em>：标记内容着重点（大量用于提升段落文本语义）。

<mark></mark>：突出显示文本（yellow），提醒读者。

<cite></cite>：指明引用或者参考，如图书的标题，歌曲、电影、等的名称，演唱会、音乐会、规范、报纸、或法律文件等。
        只用于参考源本身，而不是从中引述。

<blockquoto></blockquoto>：引述文本，默认新的一行显示。

<time></time>：标记时间。datetime属性遵循特定格式，如果忽略此属性，文本内容必须是合法的日期或者时间格式。     
        不再相关的时间用s标签。

<address></address>：作者、相关人士或组织的联系信息（电子邮件地址、指向联系信息页的链接）。
        如果提供整个页面的作者联系信息，一般放在页面级footer里。不能包含文档或者文档等其他内容。

<del></del>：移除的内容。
<ins></ins>：添加的内容。

<code></code>：标记代码。包含示例代码或者文件名 （< &lt;  > &gt;）

<pre></pre>：预格式化文本。保留文本固有的换行和空格。

<progress></progress>：完成进度。可通过js动态更新value。

```

**注意**:

```css
<center>，<font> 不建议使用
```

## Image

> 图片规范

### 命名顺序

图片业务（可选） +（mod_）图片功能类别（必选）+ 图片模块名称（可选） + 图片精度（可选）

* 图片业务
  * px: 培训
  * yd: 云端
  * yw: 运维
  * ...

* 图片功能
  * mon_: 是否公共
  * icon: 图标
  * logo: LOGO类
  * btn: 按钮
  * bg: 大背景或者可平铺
  * ...

* 图片模块
  * useravatar: 用户头像
  * stdlist: 学员列表
  * picmap: 图像库
  * ...

* 图片精度|描述
  * 普通: @1x
  * Retina: @2x | @3x
  * 有颜色：@c、同类型有多中颜色用颜色区分
  * 有背景：@bg
  * 有边框：@bd
  * ...

### 示例

1、使用比较多的icon图标
痛点：造成好几个图标很类似，想换想统一，但是设计师就是在这个页面、这个模块里面这么设计，使用这个图标；怎么办？
使用图片的功能或者模块进行划分

```img
1、图片库和试图学习都是使用相同的图标
现状：tupianku、shituxuexi | 培训任务和培训管理的menu图标一样 | menu理论练习、记录
方式：功能 + 模块
优化：icon_mod_imgmap | icon_mod_book | icon_mod_record

2、左右箭头，使用场景很多，只是大小的区分，切都是做按钮使用.
现状：arrow-left, angle-left
方式：功能 +
优化：btn_arrow-left@1x、btn_arrow-left@2x

3、添加按钮 +
现状：有简单一个`+`号，有带背景圆圈的`+`号
优化：btn_add、btn_add@bg

```

如果项目中期发现了之前的图标可以共用，不要怕麻烦，将图标名称改为 mod_ 共用的。然后在页面中找到对应的图标修改过来

### 图片格式

    GIF、PNG8、PNG24、JPEG、WEBP
约定：

* 内容图
  * 优先考虑 JPEG 格式，条件允许的话优先考虑 WebP 格式
  * 尽量不使用PNG格式，PNG8 色位太低，PNG24 压缩率低，文件体积大
* 背景图 【背景图多为图标等颜色比较简单、文件体积不大、起修饰作用的图片】
  * PNG 与 GIF 格式，优先考虑使用 PNG 格式,PNG格式允许更多的颜色并提供更好的压缩率
  * 图像颜色比较简单的，如纯色块线条图标，优先考虑使用 PNG8 格式，避免不使用 JPEG 格式
  * 图像颜色丰富而且图片文件不太大的（40KB 以下）或有半透明效果的优先考虑 PNG24 格式
  * 图像颜色丰富而且文件比较大的（40KB - 200KB）优先考虑 JPEG 格式
  * 条件允许的，优先考虑 WebP 代替 PNG 和 JPEG 格式

**补充**
WebP，是一种同时提供了有损压缩与无损压缩的图片文件格式，派生自视频编码格式 VP8
特点：文件体积小，无损压缩后，比 PNG 文件少了 45％ 的文件大小；有损压缩后，比 JPEG 文件少了 25% - 34% 文件大小；浏览器兼容差

### 图片使用

    图标优先考虑icotfont, 再考虑图片精灵

```css
<img src="" alt="" >

CSS 中图片引入不需要引号
.nuc {
    background-image: url(icon.png);
}
```

## css

> 使用sass或者less，前期确定后统一使用一种编译语法

### 分类方法

> css相关的文件夹 | 优先级比较高

* css
  * reset
  * Mixin
  * mod
    * mod1
    * mod2
  * unit
    * btn
    * list
    * input

### 代码风格

1、代码风格：

* 展开
* 花括号前空一个
* 内容`缩进四格`
* 末尾`添加分号`
* 左括号与类名之间一个空格
* 冒号与属性值之间`空一格`
* 单个css选择器或新申明开启新行
* 不要为 `0` 指明单位
* rgb() rgba() hsl() hsla() rect() 中不需有空格，且取值不要带有不必要的 0
* CSS3 浏览器私有前缀在前，标准前缀在后
* 除非你需要透明度而使用rgba，否则都使用#f0f0f0这样的表示方法，并尽量缩写。

2、选择器：

* 不使用ID选择器
* 层级关系最多不要超过4级

3、书写顺序

* 布局定位属性：display / position / float / clear / visibility / overflow
* 自身属性：width / height / margin / padding / border / background
* 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
* 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

```css
.nuc {
    display: block;
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0,0,0,.5);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

4、注释格式

* 对选择器的注释统一写在被注释对象的上一行，对属性及值的注释写于分号后
* 注释内容两端需空格，已确保即使在编码错误的情况下也可以正确解析样式。
* 在必要的情况下，可以使用块状注释，块状注释保持统一的缩进对齐。
* 原则上每个系列的样式都需要有一个注释，言简意赅的表明名称、用途、注意事项等。

```css
/* 块状注释文字
 * 块状注释文字
 * 块状注释文字
 */
.m-list{width:500px;}
.m-list li{height:20px;line-height:20px;/* 这里是对line-height的一个注释 */overflow:hidden;}
.m-list li a{color:#333;}
/* 单行注释文字 */
.m-list li em{color:#666;}
```

### 使用 scss

> 文件夹加以区分

|-- styles
|------base
        -- _base.scss       // 定义基本的 class 类的样式。例如：body、footer、.wrapper、.page
        -- _reset.scss      // 充值基本的样式
        -- _variables.scss  // 定义一些共用变量.例如：$prirmary: #F6E27F
|------components   // 公用组件样式
        -- _topbar.scss
        -- _topnav.scss
        -- _page.scss
|------pages    // 具体业务类组件样式。每个业务类顶层都用各自的业务类名称`命名一个class类`进行变量类名包裹
        -- _home.scss   // 主页
        -- _post.scss   // 提交
        -- _topic.scss  // 课件
        -- _study.scss  // 学习
        -- _image.dr/ct.scss  // 图像
|------mixin    // 共用的mixin方法
        -- _btn.scss
        -- _input.scss
|------main.scss    // 主文件，将上面的几个文件夹里面的.scss文件统一引入进来

分离出去的sass文件在命名的时候前面加下划线 `_` ，这是告诉 sass不要编译这些文件，但是在 main.scss 导入的时候不需要添加下划线
**注意**：不可以同时存在添加下划线与未添加下划线的同名文件，添加下划线的文件将会被忽略。

### 命名规范

> 使用 `-` 连接符，不使用驼峰命名、全部小写

| 类别  |   名称    |
| :----  | -----  |
|布局（grid）|  .g-
|模块（module）|    .m-
|元件（unit）|  .u-
|功能（function）|  .f-

统一语义理解和命名

布局

|语义	|命名	|简写
|  ----     |  ----     |   ----    |
|文档	|doc	|doc
|头部	|head	|hd
|主体	|body	|bd
|尾部	|foot	|ft
|主栏	|main	|mn
|主栏子容器	| mainc	| mnc
|侧栏	| side	| sd
|侧栏子容器	| sidec	| sdc
|盒容器	| wrap/box	| wrap/box


模块、元件

|语义	| 命名	| 简写
|  ----     |  ----     |   ----    |
|导航	| nav	| nav
|子导航	| subnav	| snav
|面包屑	| crumb	| crm
|菜单	| menu	| menu
|选项卡	| tab	| tab
|标题区	| head/title	| hd/tt
|内容区	| body/content	| bd/ct
|列表	| list	| lst
|表格	| table	| tb
|表单	| form	| fm
|热点	| hot	| hot
|排行	| top	| top
|登录	| login	| log
|标志	| logo	| logo
|广告	| advertise	| ad
|搜索	| search	| sch
|幻灯	| slide	| sld
|提示	| tips	| tips
|帮助	| help	| help
|新闻	| news	| news
|下载	| download	| dld
|注册	| regist	| reg
|投票	| vote	| vote
|版权	| copyright	| cprt
|结果	| result	| rst
|标题	| title	| tt
|按钮	| button	| btn
|输入	| input	| ipt

## 最后

> 执行才能出效果