---
layout: ../../layouts/MarkdownPostLayout.astro
title: "HTTPS升级指南"
pubDate: 2022-01-02
# description: "This is the first post of my new Astro blog."
author: "阮一峰"
image:
    url: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
tags: ["CS", "互联网协议", "计算机网络"]
---

> 原文链接：https://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html

上一篇文章我介绍了 [HTTP/2 协议](https://www.ruanyifeng.com/blog/2016/08/http.html) ，它只有在 HTTPS 环境才会生效。

为了升级到 HTTP/2 协议，必须先启用 HTTPS。如果你不了解 HTTPS 协议（学名 TLS 协议），可以参考我以前的文章。

> -   [《HTTPS 协议概述》](https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
> -   [《图解 HTTPS 协议》](https://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)
> -   [《HTTPS 协议的七个误解》](https://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html)
> -   [《HTTPS 协议的延迟有多大？》](https://www.ruanyifeng.com/blog/2014/09/ssl-latency.html)

本文介绍如何将一个 HTTP 网站升级到 HTTPS 。

![](https://www.ruanyifeng.com/blogimg/asset/2016/bg2016082601.png)

## 一、获取证书

升级到 HTTPS 协议的第一步，就是要获得一张证书。

证书是一个二进制文件，里面包含经过认证的网站公钥和一些元数据，要从经销商购买。

> -   [GoGetSSL](https://www.gogetssl.com/)
> -   [SSLs.com](https://www.ssls.com/)
> -   [SSLmate.com](https://sslmate.com/)

证书有很多类型，首先分为三种认证级别。

![](https://www.ruanyifeng.com/blogimg/asset/2016/bg2016082602.png)

> -   **域名认证**（Domain Validation）：最低级别认证，可以确认申请人拥有这个域名。对于这种证书，浏览器会在地址栏显示一把锁。
> -   **公司认证**（Company Validation）：确认域名所有人是哪一家公司，证书里面会包含公司信息。
> -   **扩展认证**（Extended Validation）：最高级别的认证，浏览器地址栏会显示公司名。

还分为三种覆盖范围。

> -   **单域名证书**：只能用于单一域名，`foo.com`的证书不能用于`www.foo.com`
> -   **通配符证书**：可以用于某个域名及其所有一级子域名，比如`*.foo.com`的证书可以用于`foo.com`，也可以用于`www.foo.com`
> -   **多域名证书**：可以用于多个域名，比如`foo.com`和`bar.com`

认证级别越高、覆盖范围越广的证书，价格越贵。

还有一个免费证书的选择。为了推广 HTTPS 协议，电子前哨基金会 EFF 成立了 [Let's Encrypt](https://letsencrypt.org/)，提供免费证书（[教程](https://www.digitalocean.com/community/tags/let-s-encrypt?type=tutorials)和[工具](https://certbot.eff.org/)）。

拿到证书以后，可以用 [SSL Certificate Check](https://tools.keycdn.com/ssl) 检查一下，信息是否正确。

## 二、安装证书

证书可以放在`/etc/ssl`目录（Linux 系统），然后根据你使用的 Web 服务器进行配置。

> -   [证书配置文件生成器](https://mozilla.github.io/server-side-tls/ssl-config-generator/)，by Mozilla
> -   [配置文件模板](https://github.com/SSLMate/tlsconfigguide/tree/master/templates)，by SSLMate

如果使用 Let's Encrypt 证书，请使用自动安装工具 [Certbot](https://certbot.eff.org/)。

安装成功后，使用 [SSL Labs Server Test](https://www.ssllabs.com/ssltest/analyze.html) 检查一下证书是否生效。

## 三、修改链接

下一步，网页加载的 HTTP 资源，要全部改成 HTTPS 链接。因为加密网页内如果有非加密的资源，浏览器是不会加载那些资源的。

> ```
>
> <script src="http://foo.com/jquery.js"></script>
> ```

上面这行加载命令，有两种改法。

> ```
>
> <!-- 改法一 -->
> <script src="https://foo.com/jquery.js"></script>
>
> <!-- 改法二 -->
> <script src="//foo.com/jquery.js"></script>
> ```

其中，改法二会根据当前网页的协议，加载相同协议的外部资源，更灵活一些。

另外，如果页面头部用到了`rel="canonical"`，也要改成 HTTPS 网址。

> ```
>
> <link rel="canonical" href="https://foo.com/bar.html" />
> ```

## 四、301 重定向

下一步，修改 Web 服务器的配置文件，使用 301 重定向，将 HTTP 协议的访问导向 HTTPS 协议。

[Nginx 的写法](https://serverfault.com/questions/67316/in-nginx-how-can-i-rewrite-all-http-requests-to-https-while-maintaining-sub-dom)。

> ```
>
> server {
>   listen 80;
>   server_name domain.com www.domain.com;
>   return 301 https://domain.com$request_uri;
> }
> ```

[Apache 的写法](https://httpd.apache.org/docs/2.4/rewrite/remapping.html#canonicalhost)（`.htaccess`文件）。

> ```
>
> RewriteEngine On
> RewriteCond %{HTTPS} off
> RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
> ```

## 五、安全措施

以下措施可以进一步保证通信安全。

### 5.1 HTTP Strict Transport Security (HSTS)

访问网站时，用户很少直接在地址栏输入`https://`，总是通过点击链接，或者 3xx 重定向，从`HTTP`页面进入`HTTPS`页面。攻击者完全可以在用户发出`HTTP`请求时，劫持并篡改该请求。

另一种情况是恶意网站使用自签名证书，冒充另一个网站，这时浏览器会给出警告，但是许多用户会忽略警告继续访问。

"HTTP 严格传输安全"（简称 HSTS）的作用，就是强制浏览器只能发出`HTTPS`请求，并阻止用户接受不安全的证书。

它在网站的响应头里面，加入一个强制性声明。以下例子摘自[维基百科](https://zh.wikipedia.org/wiki/HTTP%E4%B8%A5%E6%A0%BC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8)。

> ```
>
> Strict-Transport-Security: max-age=31536000; includeSubDomains
> ```

上面这段头信息有两个作用。

> （1）在接下来的一年（即 31536000 秒）中，浏览器只要向`example.com`或其子域名发送 HTTP 请求时，必须采用 HTTPS 来发起连接。用户点击超链接或在地址栏输入`http://www.example.com/`，浏览器应当自动将`http`转写成`https`，然后直接向`https://www.example.com/`发送请求。
>
> （2）在接下来的一年中，如果`example.com`服务器发送的证书无效，用户不能忽略浏览器警告，将无法继续访问该网站。

HSTS 很大程度上解决了 SSL 剥离攻击。只要浏览器曾经与服务器建立过一次安全连接，之后浏览器会强制使用`HTTPS`，即使链接被换成了`HTTP`。

该方法的主要不足是，用户首次访问网站发出 HTTP 请求时，是不受 HSTS 保护的。

如果想要全面分析网站的安全程度，可以使用 Mozilla 的 [Observatory](https://observatory.mozilla.org/)。

### 5.2 Cookie

另一个需要注意的地方是，确保浏览器只在使用 HTTPS 时，才发送 Cookie。

网站响应头里面，`Set-Cookie`字段加上`Secure`标志即可。

> ```
>
> Set-Cookie: LSID=DQAAAK...Eaem_vYg; Secure
> ```

## 六、参考链接

-   [How To Migrate To HTTPS](https://docs.google.com/document/d/1oRXJUIttqQxuxmjj2tgYjj096IKw4Zcw6eAoIKWZ2oQ/edit#), by Chris Palmer
-   [Complete Guide - How to Migrate from HTTP to HTTPS](https://www.keycdn.com/blog/http-to-https/), by KeyCDN
-   [What You Need to Know About Changing From Http to Https](http://smallbiztrends.com/2015/04/changing-from-http-to-https.html), by Matt Mansfield

（完）
