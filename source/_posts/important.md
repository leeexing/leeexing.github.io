---
title: Hello World
date: 2017-12-27 19:38:35
description: 我也算是踩坑出来的了
image: http://cn.bing.com/az/hprichbg/rb/StormySeas_ZH-CN9261044607_1920x1080.jpg
---

{% cq %}
路本来是平的
走的人多了
慢慢的
坑，也被踩出来了
{% endcq %}

<!-- more -->

> "What I cannot create, I do not understand."
> -- -- Richard Feynman

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` js
$ hexo new "My New Post"
and
hexo new page "your new page name. eg: About"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

> 预览 & 在线调试

``` bash
$ hexo server
or
hexo s
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

> 上传 & 发布

``` bash
$ hexo generate
or
hexo g
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

    这里有坑啊

``` js 踩了一天的坑
$ hexo deploy
```

这个方法我第一次使用的时候死没有错的，可是等我第二次部署的时候就出问题了
原因在，我文件的 next 主题配置的 deploy 是有问题的（可能是我看某个教程里面键名是这样书写的 | 老版？）
虽然，hexo d -g 之后也提示 `INFO  Deploy done: git`
但是，github上面却一直没有给我更新，一直提交，一直刷新，始终提示： there is nothing changes
郁闷了一天之后，好好反思，发现，人家还是有提示的：

``` css
You have to configure the deployment settings in _config.yml first!

Example:
  deploy:
    type: git
    repo: <repository url>
    branch: [branch]
    message: [message]

    extend_dirs: [extend directory]

For more help, you can check the docs: http://hexo.io/docs/deployment.html
```

{% codeblock js %}
code snippet
{% endcodeblock %}

然后更改键名设置

```js
deploy:
  type: git
  respository: git@github.com:leeexing/leeexing.github.io
  branch: master

`修改之后`

deploy:
  type: git
  repo: git@github.com:leeexing/leeexing.github.io
  branch: master

```

### hexo d -g 失败

```js
Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
Error: Host key verification failed.
fatal: Could not read from remote repository.

```

【解决方案】

1、使用https
2、要不不要在 `CMD`里面使用 git 提交
首先检测 本地电脑的密钥和github上面的密钥是否相同
不同就设置
git config --global user.name ""
git config --global user.email ""
在 git bash 里面提交。
可能会让确认是否执行相应的操作

Bingo
所以，还是自己没有切实理解人家给出的提示，并做出快速准确的修改
这个锅，得自己背

More info: [Deployment](https://hexo.io/docs/deployment.html)

## 如何管理

    如何第一次部署以及如何平时使用

{% tabs 选项卡, 1 %}
<!-- tab -->
**第一步：建仓**
1、在本地建立一个仓库，链接远程仓库 XXX.github.io
2、本地仓库建立一个分支，例如：hexo。但是主分支还是 master
<!-- endtab -->
<!-- tab -->
**第二步 建分支**
1、将HEAD指针指到 hexo。全部的编辑都在这个各分支里面。记住是全部
2、第一次 git push origin hexo. 就是在远程仓库建立一个和本地仓库同样的分支hexo，并能建立其联系
<!-- endtab -->
<!-- tab -->
**第三步 部署**
1、安装 hexo-deployer-git
2、一键部署。hexo clean -- hexo d -g. 记住这时根据上面的配置，会将hexo g 生产的 public 文件夹里面的文件提交到远程仓库的 master 分支
<!-- endtab -->
<!-- tab -->
**第四步 之后**
1、以后，每次更改了 next 主题设置或者新增了一些文章，第一步，先提交到 远程的hexo分支上面
2、然后，部署到对应的 git 远程仓库。实现：1、hexo 可以`clone`的文件；2、master 里面就是博客展现的内容
<!-- endtab -->
<!-- tab -->
**第四步 提醒**
1、有关主题的配置文件，最好在hexo路径下的`source`里面建立一个 `_data` 文件夹
2、将next 的 config.yml 文件放入其中
3、将主题有些模板的文件改动之类的备注好。例如 layout.swig、post.swig
and
4、在 `source` 文件夹下面增加一个 CNAME 文件。同时 hexo 里面配置 skip_render: CNAME
<!-- endtab -->
{% endtabs %}

## 有待解决

1、next 主题中的代码高亮似乎不能实现，都是同一个样式，网上查了资料，没有一个完美的解决方案。留着

## 感谢

    感谢这些前辈给的优秀建议

[正确使用hexo的姿势](https://www.zhihu.com/question/21193762)
