---
layout: ../../layouts/MarkdownPostLayout.astro
title: "SSH教程"
pubDate: 2023-07-01
description: "This is the first post of my new Astro blog."
author: "xiaoman"
image:
    url: "https://images.unsplash.com/photo-1681165045474-d388d11ace96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
    alt: "The Astro logo with the word One."
tags: ["CSS3", "笔记", "前端"]
---

> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [www.ruanyifeng.com](https://www.ruanyifeng.com/blog/2020/12/ssh-tutorial.html)

> SSH 是登录 Linux 服务器的必备工具，只要你在做互联网开发，多多少少都会用到它。

SSH 是登录 Linux 服务器的必备工具，只要你在做互联网开发，多多少少都会用到它。

![](https://www.wangbase.com/blogimg/asset/202012/bg2020121306.jpg)

我第一次接触 SSH，距离现在超过 10 年了。2011 年时，我就写过博客文章《SSH 原理与运用》（[上篇](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)，[下篇](https://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html)）。

但是说来惭愧，很多地方直到现在还是不怎么懂，很多用法还是需要找资料、查手册，尤其是修改配置文件的时候。

我一直想把自己的 SSH 学习笔记整理成系统性的教程，让各种零碎的知识集中在一起，方便查找，也有助于加深理解，对自己和其他人产生更大的价值。

上半年写完了[《Bash 入门教程》](https://www.ruanyifeng.com/blog/2020/04/bash-tutorial.html)以后，我就开始写 SSH 了。没想到一点点篇幅，竟然半年多才搞完，主要原因是中间断掉了三个月，平时每周的[周刊](https://www.ruanyifeng.com/blog/weekly/)也占掉了不少时间。

现在总算搞完发布了，大家可以去 [wangdoc.com/ssh](http://wangdoc.com/ssh) 阅读在线版。

[![](https://www.wangbase.com/blogimg/asset/202012/bg2020121305.jpg)](http://wangdoc.com/ssh)

整个教程采用知识共享许可证，源码公开在 [GitHub](https://github.com/wangdoc/ssh-tutorial) 上面。任何问题都欢迎到代码仓库发 [Issue](https://github.com/wangdoc/ssh-tutorial/issues)。

我没打算停下来，后面想把工作量更大的 《Linux 入门教程》搞出来。我接触 Linux 最早是看[鸟哥的教程](http://cn.linux.vbird.org/)，但一直觉得有不满意的地方，可以做得更好。

（完）
