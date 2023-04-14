---
layout: ../../layouts/MarkdownPostLayout.astro
title: "HTML笔记"
pubDate: 2023-07-01
description: "This is the first post of my new Astro blog."
author: "xiaoman"
image:
    url: "https://images.unsplash.com/photo-1681165045474-d388d11ace96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
    alt: "The Astro logo with the word One."
tags: ["CSS3", "笔记", "前端"]
---

[[HTML5]]

HTML5 中的一些有趣的新特性：
用于绘画的 `canvas` 元素
用于媒介回放的 video 和 `audio` 元素
对本地离线存储的更好的支持
新的特殊内容元素，比如 `article`、`footer`、`header`、`nav`、`section`
新的表单控件，比如 `calendar`、`date`、`time`、`email`、`url`、`search`

# HTML5 Canvas

## 创建一个画布（Canvas）

```html
<canvas
    id="myCanvas"
    width="200"
    height="100"
></canvas>
```

> `canvas` 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成

## JavaScript 来绘制图像

```js
<script>
// 首先，找到 <canvas> 元素
var c=document.getElementById("myCanvas");
// 然后，创建 context 对象
var ctx=c.getContext("2d");
// getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法 下面的两行代码绘制一个红色的矩形
ctx.fillStyle="#FF0000";
ctx.fillRect(0,0,150,75);
// 设置[fillStyle属性]
//可以是CSS颜色，渐变，或图案。fillStyle默认设置是#000000（黑色）。fillRect(_x,y,width,height_) 方法定义了矩形当前的填充方式
</script>
```

## Canvas 坐标

`canvas` 是一个二维网格。
`canvas` 的左上角坐标为 (0,0)
上面的 `fillRect` 方法拥有参数 (0,0,150,75)。
意思是：在画布上绘制 150x75 的矩形，从左上角开始 (0,0)。
如下图所示，画布的 X 和 Y 坐标用于在画布上对绘画进行定位。
![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAACJCAIAAABy2EnyAAACJklEQVR4nO3Zy42dQBRAwcmp0yKUjoYUnAFpEIS9sPU8I0sWT8NHOqpaAQuaxRG6NB8/oeXj6QeAk2maGk1To2lqNE2NpqnR9OX2dRljbq/zbY6xrPuDTxSn6Tts81X1p0Ouoel7/ElZ0TfQ9F22OcZQ9A00fZttSvoWmr7JNseY0+hxA03f4jVHG6ivp+nrfd3MU/XVNH21f8doG9TX0jQ1mqZG09RomhpNU6NpajRNjaap0TQ15zf9A67xZNOn3xM0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWq+2fQ2x1jW/b9XTlgbjvv2e3pfl08Nb3OMuZ2+Nhx3wuzxt+p9XY4XrWmucco8/bvlN4vWNNc46RtxX5fxxtTx7tpw3Fn7Hm+/pN9aG47TNDWapkbT1PiPSI2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0TY2mqdE0NZqmRtPUaJoaTVOjaWo0Tc3DTcMVHmsanqVpajRNjaap0TQ1mqZG09RomhpNU6NpajRNzS+BFYKSoTg6vwAAAABJRU5ErkJgggA=)

---

## Canvas - 路径

`在Canvas上画线`，我们将使用以下两种方法：

-   `moveTo(_x,y_)` 定义线条开始坐标
-   `lineTo(_x,y_)` 定义线条结束坐标
    绘制线条我们必须使用到 "`ink`" 的方法，就像`stroke()`
