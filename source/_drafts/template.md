---
title: 书写hexo时的一些模板
date: 2018-01-02 11:22
tag: template
description: 使用这些书写模板也许会让界面看起来更加好看
---

## 场景

> 在next主题下面使用

内容中使用 center html标签可以使得文字居中
使用

## 代码块可以增加名称和链接

```js goodidea http://leeeing.com leeblog
import 2017

from 2018 import courage

```

## 带样式的引用

<div class="note success"><p>default</p></div>

## label 标签

* {% label danger@danger %}
* {% label success@success %}

## 引用

{% cq %}
人生乃是一面镜子，
从镜子里认识自己，
我要称之为头等大事，
也只是我们追求的目的！
{% endcq %}

## tab 选项卡

{% tabs 选项卡, 2 %}
<!-- tab -->
**这是选项卡 1** 呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈呵呵哈哈哈哈哈哈哈哈……
<!-- endtab -->
<!-- tab -->
**这是选项卡 2**
<!-- endtab -->
<!-- tab -->
**这是选项卡 3** 哇，你找到我了！φ(≧ω≦*)♪～
<!-- endtab -->
{% endtabs %}

## 列表

**无序列表使用星号、加号或是减号作为列表标记：**

有序列表则使用数字接着一个英文句点：
1. Bird
2. McHale
3. Parish

## 强调
Markdown 使用星号（*）和底线（_）作为标记强调字词的符号，被 * 或 _ 包围的字词会被转成用 <em> 标签包围，用两个 * 或 _ 包起来的话，则会被转成 <strong>，例如：

```js
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
```

## 代码

如果要在代码区段内插入反引号，你可以用多个反引号来开启和结束代码区段

``There is a literal backtick (`) here.``
这段语法会产生：

<p><code>There is a literal backtick (`) here.</code></p>