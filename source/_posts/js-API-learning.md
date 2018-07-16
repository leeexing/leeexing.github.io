---
title: js API learning
date: 2018-02-06 17:14:51
tags:
- js
- api
image: http://cn.bing.com/az/hprichbg/rb/UrbinoRooftops_ZH-CN9076169426_1920x1080.jpg
---
# JS API

工作中是不是遇到一些新的问题，哎呦，这个API使用得很顺手

## FileReader

这个 api 之前几乎是不会用到的。最近项目中做图像显示相关的时候发现需要将之前的base64读取出来，之前是先获取图片的的路径存放地址，再通过 sqllite 获取到图片的详细的 base64 图像数据。而 fileReader 这个api恰好能够将一个图片的读取成 baseUrl的格式，用于具体业务的图像显示恰到好处
不多说，直接上代码吧

<!-- more -->

```js FileReader
// 基本使用

let reader = new FileReader()
let xhr = new XMLHttpRequest()

xhr.open('get', url, true)
xhr.responseType = 'blob'
xhr.onload = function() {
  if (this.status === 200) {
    // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
    reader.readAsDataURL(this.response)
    // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
    reader.readerAsText()
    // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含所读取文件的原始二进制数据。
    reader.readAsBinaryString()
  }
}
xhr.send()

reader.onabort = function(evnet) {
  // 该事件在读取操作被中断时触发。
  console.log('阻止触发')
}
reader.onerror = e => {
  console.log('哎呦，文件读取发生错误')
}
reader.onload = e => {
  console.log('文件下载完成')
}
reader.onloadend = e => {
  console.log('最后的最后一定执行')
}
reader.onloadstart = e => {
  console.log('文件读取开始')
}
reader.onprogress = e => {
  // 该事件在读取Blob时触发。
  console.log('可以实时控制显示进度')
}
```

```js 具体使用
getImgDataUrl(url) {
  return new Promise((resolve, reject) => {
      let reader = new FileReader()
      let xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'blob'
      xhr.onload = function() {
        if (this.status === 200) {
          reader.readAsDataURL(this.response)
        }
      }
      xhr.send()

      reader.onerror = e => {
          reject(e)
      }
      reader.onload = e => {
          resolve(e.target.result)
      }
  })
}

getImgDataTxt(url) {
  return new Promise((resolve, reject) => {
      let reader = new FileReader()
      let xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'blob'
      xhr.onload = function() {
        if (this.status === 200) {
          reader.readAsText(this.response)
        }
      }
      xhr.send()

      reader.onerror = e => {
        reject(e)
      }
      reader.onload = e => {
        resolve(e.target.result)
      }
  })
}

init_show_img(baseUrl) {
  this.base_url = baseUrl
  Promise.all([this.getImgDataUrl(`images/ct_img/${baseUrl}/${baseUrl}_1.0_CT.png`), 
                  this.getImgDataTxt(`images/ct_img/${baseUrl}/${baseUrl}_1.0_CT.png.txt`),
                  this.getImgDataTxt(`images/ct_img/${baseUrl}/suspect_cubes_information_${baseUrl}_1.0_CT.png.txt`)])
      .then(data => {
          this.show_raw_img(data)
          // console.log(data)
      })
}

这里才发现 Promise.all 真的很好用
```

## FormData

具体代码在 github 里面的 js/formData 中

重点要说明的是：

其实后端是这么处理的
1、首先将文件上传到后端
2、后端处理后直接保存在 对应的文件件中，文件名可以保持不变
3、将上传的图像或者文件数据转成一个 md5 字段保存在数据库中，然后每次上传的时候首先访问数据库中是否上传过这个数据（md5是唯一的）。没有的话就进行上传并保存，上传过的就直接返回
4、下次某个 api 需要请求数据的时候，只需要将对应资源的物理路径冲数据库中取出来并返回即可
5、返回的数据资源（例如图像），需要给资源添加 协议 + 域名 + 端口 （eg: http://localhost:8001/images/123.png）

## indexedDB

w3c不再维护web sql 所以很有必要了解一下 indexedDB 这个符合前端逻辑思维的 web 存储 api

文章的链接放在 github  js/indexedDB