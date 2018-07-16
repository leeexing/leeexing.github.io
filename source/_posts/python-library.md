---
title: python common use modules
date: 2018-01-24 10:51:13
tags:
- 后端
- python
description: 记录自己在学习python的时候常用到模块或者包
image: http://cn.bing.com/az/hprichbg/rb/Fontainhas_ZH-CN10506085919_1920x1080.jpg
---
# python

  常用 & 备忘

## enumerate

enumerate()是python的内置函数
enumerate在字典上是枚举、列举的意思
对于一个可迭代的（iterable）/可遍历的对象（如列表、字符串），enumerate将其组成一个索引序列，利用它可以同时获得索引和值
enumerate多用于在for循环中得到计数

```js
list1 = ["这", "是", "一个", "测试"]
for i in range (len(list1)):
    print i ,list1[i]

list1 = ["这", "是", "一个", "测试"]
for index, item in enumerate(list1):
    print index, item
```

enumerate还可以接收第二个参数，用于指定索引起始值

```js
list1 = ["这", "是", "一个", "测试"]
for index, item in enumerate(list1, 1):
    print index, item

如果要统计文件的行数，可以这样写
count = len(open(filepath, 'r').readlines())  -- 这种方法简单，但是可能比较慢，当文件比较大时甚至不能工作。

count = 0
for index, line in enumerate(open(filepath,'r'))：
    count += 1
```
