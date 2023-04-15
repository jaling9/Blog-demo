---
title: Hexo 自定义字体方法
date: 
updated:
tags:
- 原创
- Hexo
categories:
- 博客

index_img: https://images.unsplash.com/photo-1625765393447-2cf18c8e364f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80
banner_img: https://images.unsplash.com/photo-1625765393447-2cf18c8e364f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80
---

{% note success %}
可使用在线字体和本地字体。
{% endnote %}

### 本地使用系统字体

- 找到fluid文件夹下的source/css目录,新建一个custom_css.css文件，里面配置字体风格，类似：

```css
html,
body,
header,
.markdown-body {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 16px;
}
```

- 找到_config.fluid.yml配置文件，引入custom.css目录即可。

### 本地使用自定义字体

如果不满足系统自带字体，可以去[google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts/pt-sans?subsets=latin)这个网站下载。

找到想要的字体后，将字体解压出来，*置于根目录下的fonts文件夹（如果没有就新建一个）*。然后复制google-webfonts-helper字体的CSS代码到上述custom.css文件内，接着找到themes/fluid/source/_variables/base.styl文件，在

```
// font
$font-size = theme-config("font.font_size", "16px")
$letter-spacing = theme-config("font.letter_spacing", "0.02em")
$font-family = theme-config("font.font_family", "PT Sans","var(--font-family-sans-serif)")
$code-font-size = theme-config("font.code_font_size", "85%")
```
中的```$font-family = theme-config("font.font_family",```后面添加字体名。然后保存，`hexo clean` ==> `hexo g` ==> `hexo d` 就OK。

> 备用链接 ：
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face
> https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family