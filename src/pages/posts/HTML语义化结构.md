---
layout: ../../layouts/MarkdownPostLayout.astro
title: "HTML笔记2"
pubDate: 2023-07-01
description: "This is the first post of my new Astro blog."
author: "xiaoman"
image:
    url: "https://images.unsplash.com/photo-1681165045474-d388d11ace96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
    alt: "The Astro logo with the word One."
tags: ["CSS3", "笔记", "前端"]
---

### 整体结构示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <meta
            name="description"
            content="HTML 语言入门"
        />
        <meta
            name="keywords"
            content="HTML,教程"
        />
        <meta
            name="author"
            content="张三"
        />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
        <meta
            name="application-name"
            content="Application Name"
        />
        <meta
            name="generator"
            content="program"
        />
        <meta
            name="subject"
            content="your document's subject"
        />
        <meta
            name="referrer"
            content="no-referrer"
        />

        <meta
            http-equiv="Content-Security-Policy"
            content="default-src 'self'"
        />
        <meta
            http-equiv="Content-Type"
            content="Type=text/html; charset=utf-8"
        />
        <meta
            http-equiv="refresh"
            content="30"
        />
        <meta
            http-equiv="refresh"
            content="30;URL='http://website.com'"
        />

        <link
            href="default.css"
            rel="stylesheet"
            title="Default Style"
        />
        <link
            href="fancy.css"
            rel="alternate stylesheet"
            title="Fancy"
        />
        <link
            href="basic.css"
            rel="alternate stylesheet"
            title="Basic"
        />

        <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="favicon114.png"
        />
        <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="favicon72.png"
        />
        <link
            rel="alternate"
            type="application/atom+xml"
            href="/blog/news/atom"
        />
        <!-- 
	rel属性表示外部资源与当前文档之间的关系，是<link>标签的必需属性。它可以但不限于取以下值。
	
	alternate：文档的另一种表现形式的链接，比如打印版。
	author：文档作者的链接。
	dns-prefetch：要求浏览器提前执行指定网址的 DNS 查询。
	help：帮助文档的链接。
	icon：加载文档的图标文件。
	license：许可证链接。
	next：系列文档下一篇的链接。
	pingback：接收当前文档 pingback 请求的网址。
	preconnect：要求浏览器提前与给定服务器，建立 HTTP 连接。
	prefetch：要求浏览器提前下载并缓存指定资源，供下一个页面使用。它的优先级较低，浏览器可以不下载。
	preload：要求浏览器提前下载并缓存指定资源，当前页面稍后就会用到。它的优先级较高，浏览器必须立即下载。
	prerender：要求浏览器提前渲染指定链接。这样的话，用户稍后打开该链接，就会立刻显示，感觉非常快。
	prev：表示当前文档是系列文档的一篇，这里给出上一篇文档的链接。
	search：提供当前网页的搜索链接。
	stylesheet：加载一张样式表。
	-->
        <!-- 作者信息 -->
        <link
            rel="author"
            href="humans.txt"
        />
        <!-- 版权信息 -->
        <link
            rel="license"
            href="copyright.html"
        />
        <!-- 另一个语言的版本 -->
        <link
            rel="alternate"
            href="https://es.example.com/"
            hreflang="es"
        />
        <!-- 联系方式 -->
        <link
            rel="me"
            href="https://google.com/profiles/someone"
            type="text/html"
        />
        <link
            rel="me"
            href="mailto:name@example.com"
        />
        <link
            rel="me"
            href="sms:+15035550125"
        />
        <!-- 历史资料 -->
        <link
            rel="archives"
            href="http://example.com/archives/"
        />
        <!-- 目录 -->
        <link
            rel="index"
            href="http://example.com/article/"
        />
        <!-- 导航 -->
        <link
            rel="first"
            href="http://example.com/article/"
        />
        <link
            rel="last"
            href="http://example.com/article/?page=42"
        />
        <link
            rel="prev"
            href="http://example.com/article/?page=1"
        />
        <link
            rel="next"
            href="http://example.com/article/?page=3"
        />
        <!-- 资源预加载 -->
        <link
            rel="preload"
            href="image.png"
            as="image"
        />

        <script
            type="text/javascript"
            src="javascript.js"
        ></script>
        <script
            type="module"
            src="main.js"
        ></script>
        <script
            async
            defer
            nomodule
            src="fallback.js"
        ></script>

        <noscript>
            您的浏览器不能执行 JavaScript 语言，页面无法正常显示。
        </noscript>
        <!--
    <head>的子元素一般有下面七个，后文会一一介绍。
        <meta>：设置网页的元数据。
        <link>：连接外部样式表。
        <title>：设置网页标题。
        <style>：放置内嵌的样式表。
        <script>：引入脚本。
        <noscript>：浏览器不支持脚本时，所要显示的内容。
        <base>：设置网页内部相对 URL 的计算基准。
    -->

        <title>这是网页标题</title>

        <nav>
            <ul>
                <li><a href="/home">首页</a></li>
                <li><a href="/about">关于</a></li>
                <li><a href="/contact">联系</a></li>
            </ul>
            <form target="/search">
                <input
                    name="q"
                    type="search"
                />
                <input type="submit" />
            </form>
        </nav>
    </head>
    <body>
        <header>页眉</header>
        <aside>
            <!-- 侧边栏 -->
            <ul>
                <li><a href="/home">首页</a></li>
                <li><a href="/about">关于</a></li>
                <li><a href="/contact">联系</a></li>
            </ul>
        </aside>

        <nav>
            <!-- 导航栏 -->
            <ol>
                <li><a href="item-a">商品 A</a></li>
                <li><a href="item-b">商品 B</a></li>
                <li>商品 C</li>
            </ol>
        </nav>

        <main>
            <!-- 主内容 -->
            <article>
                <article>
                    <h1>文章标题</h1>
                    <section>
                        <h2>第一章</h2>
                        <p>...</p>
                    </section>
                    <section>
                        <h2>第二章</h2>
                        <p>...</p>
                    </section>
                </article>
            </article>
        </main>
        <footer>页尾</footer>
    </body>
</html>
```

### 表格示例

```HTML
<table>
  <colgroup>
    <col class="c1">
    <col class="c2">
    <col class="c3">
  </colgroup>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  </tr>
</table>
```

```html
<table>
    <thead>
        表头
        <tr>
            第一行
            <th scope="col">海报名称</th>
            列标题
            <th scope="col">颜色</th>
            <th
                colspan="3"
                scope="colgroup"
            >
                尺寸
            </th>
        </tr>
    </thead>
    <tbody>
        表身体
        <tr>
            第二行
            <th
                rowspan="3"
                scope="rowgroup"
            >
                Zodiac
            </th>
            <th scope="row">Full color</th>
            行标题
            <td>A2</td>
            数据的单元格
            <td>A3</td>
            <td>A4</td>
        </tr>
        <tr>
            第三行
            <th scope="row">Black and white</th>
            行标题
            <td>A1</td>
            <td>A2</td>
            <td>A3</td>
        </tr>
        <tr>
            第四行
            <th scope="row">Sepia</th>
            行标题
            <td>A3</td>
            <td>A4</td>
            <td>A5</td>
        </tr>
    </tbody>
</table>
```

### 表单示例

```HTML
<form action="https://example.com/api" method="post">
  <label for="POST-name">用户名：</label>
  <input id="POST-name" type="text" name="user">
  <input type="submit" value="提交">
</form>
```
