---
title: 基于 Hexo 从零开始搭建个人博客
date:
updated:
tags:
  - 转载
  - hexo
categories:
  - 博客

index_img: https://images.unsplash.com/photo-1507511262981-cda53220c19e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2373&q=80
banner_img: https://images.unsplash.com/photo-1507511262981-cda53220c19e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2373&q=80
---

---

> 阅读本篇前，请先阅读前几篇文章：  
> [基于 Hexo 从零开始搭建个人博客（一）](https://tzy1997.com/articles/hexo1601/)  
> [基于 Hexo 从零开始搭建个人博客（二）](https://tzy1997.com/articles/hexo1602/)  
> [基于 Hexo 从零开始搭建个人博客（三）](https://tzy1997.com/articles/hexo1603/)

## [](https://tzy1997.com/articles/hexo1604/#%E5%89%8D%E8%A8%80 "前言")前言

1.  博客搭建过程遇到任何问题，优先在本页面搜索，检查是否已经有该配置教程。
2.  遇到问题可以优先在文章评论区留言，注意留言时请填写正确的邮箱以确保能收到站长的回复。
3.  实在解决不了的问题可添加博主 Wechat ，添加好友时请备注自己的姓名+专业，如 张三 计算机科学与技术。

## [](https://tzy1997.com/articles/hexo1604/#Front-matter "Front-matter")Front-matter

**Front-matter** 是 **markdown** 文件最上方以`---`分隔的区域，用于指定个别档案的变数。

- Page Front-matter 用于页面配置
- Post Front-matter 用于文章页配置

如果标注可选的参数，可根据自己需要添加，不用全部都写在 markdown 里

### [](https://tzy1997.com/articles/hexo1604/#Page-Front-matter "Page Front-matter")Page Front-matter

```
---title:date:updated:type:comments:description:keywords:top_img:mathjax:katex:aside:aplayer:highlight_shrink:---
```

| 写法             | 解释                                                                               |
| ---------------- | ---------------------------------------------------------------------------------- |
| title            | 【必需】页面标题                                                                   |
| date             | 【必需】页面创建日期                                                               |
| type             | 【必需】标籤、分类和友情链接三个页面需要配置                                       |
| updated          | 【可选】页面更新日期                                                               |
| description      | 【可选】页面描述                                                                   |
| keywords         | 【可选】页面关键字                                                                 |
| comments         | 【可选】显示页面评论模块(默认 true)                                                |
| top_img          | 【可选】页面顶部图片                                                               |
| mathjax          | 【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false) |
| katex            | 【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)     |
| aside            | 【可选】显示侧边栏 (默认 true)                                                     |
| aplayer          | 【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐 配置            |
| highlight_shrink | 【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)       |

### [](https://tzy1997.com/articles/hexo1604/#Post-Front-matter "Post Front-matter")Post Front-matter

```
---title:date:updated:tags:categories:keywords:description:top_img:comments:cover:toc:toc_number:toc_style_simple:copyright:copyright_author:copyright_author_href:copyright_url:copyright_info:mathjax:katex:aplayer:highlight_shrink:aside:---
```

| 写法                  | 解释                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------- |
| title                 | 【必需】文章标题                                                                            |
| date                  | 【必需】文章创建日期                                                                        |
| updated               | 【可选】文章更新日期                                                                        |
| tags                  | 【可选】文章标籤                                                                            |
| categories            | 【可选】文章分类                                                                            |
| keywords              | 【可选】文章关键字                                                                          |
| description           | 【可选】文章描述                                                                            |
| top_img               | 【可选】文章顶部图片                                                                        |
| cover                 | 【可选】文章缩略图(如果没有设置 top_img,文章页顶部将显示缩略图，可设为 false/图片地址/留空) |
| comments              | 【可选】显示文章评论模块(默认 true)                                                         |
| toc                   | 【可选】显示文章 TOC(默认为设置中 toc 的 enable 配置)                                       |
| toc_number            | 【可选】显示 toc_number(默认为设置中 toc 的 number 配置)                                    |
| toc_style_simple      | 【可选】显示 toc 简洁模式                                                                   |
| copyright             | 【可选】显示文章版权模块(默认为设置中 post_copyright 的 enable 配置)                        |
| copyright_author      | 【可选】文章版权模块的文章作者                                                              |
| copyright_author_href | 【可选】文章版权模块的文章作者链接                                                          |
| copyright_url         | 【可选】文章版权模块的文章连结链接                                                          |
| copyright_info        | 【可选】文章版权模块的版权声明文字                                                          |
| mathjax               | 【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false)          |
| katex                 | 【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)              |
| aplayer               | 【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐 配置                     |
| highlight_shrink      | 【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)                |
| aside                 | 【可选】显示侧边栏 (默认 true)                                                              |

> 注意：我的博客根目录路径为 【G:/hexo-blog/blog-demo】，下文所说的根目录都是此路径，将用`[BlogRoot]`代替。如果不清楚根目录路径，请回到教程 [基于 Hexo 从零开始搭建个人博客（二）](https://tzy1997.com/articles/hexo1602/)，查看你执行`hexo init xxx`这条命令时所选择的路径，例如我选择的路径是【G:/hexo-blog】，我的博客根目录即为【G:/hexo-blog/xxx】。

## [](https://tzy1997.com/articles/hexo1604/#%E6%A0%87%E7%AD%BE%E9%A1%B5 "标签页")标签页

1.  前往你的 Hexo 博客根目录，打开 cmd 命令窗口执行`hexo new page tags`。
2.  在【BlogRoot/source/】会生成一个含有`index.md`文件的`tags`文件夹。

    [![](https://bu.dusays.com/2022/01/14/1ff50a00bd75c.gif)](https://bu.dusays.com/2022/05/29/62937c8344bbb.jpg)

3.  修改【BlogRoot/source/tags/index.md】，添加`type: "tags"`。

    ```
    ---title: tagsdate: 2022-05-29 21:42:56type: "tags"---
    ```

## [](https://tzy1997.com/articles/hexo1604/#%E5%88%86%E7%B1%BB%E9%A1%B5 "分类页")分类页

1.  前往你的 Hexo 博客根目录，打开 cmd 命令窗口执行`hexo new page categories`。
2.  在【BlogRoot/source/】会生成一个含有`index.md`文件的`categories`文件夹。

    [![](https://bu.dusays.com/2022/01/14/1ff50a00bd75c.gif)](https://bu.dusays.com/2022/05/29/62937c8627deb.jpg)

3.  修改【BlogRoot/source/categories/index.md】，添加`type: "categories"`。

    ```
    ---title: categoriesdate: 2022-05-29 21:57:07type: "categories"---
    ```

## [](https://tzy1997.com/articles/hexo1604/#%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5 "友情链接")友情链接

### [](https://tzy1997.com/articles/hexo1604/#%E5%88%9B%E5%BB%BA%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5%E9%A1%B5%E9%9D%A2 "创建友情链接页面")创建友情链接页面

1.  前往你的 Hexo 博客根目录，打开 cmd 命令窗口执行`hexo new page link`。
2.  在【BlogRoot/source/】会生成一个含有`index.md`文件的`link`文件夹。

    [![](https://bu.dusays.com/2022/01/14/1ff50a00bd75c.gif)](https://bu.dusays.com/2022/05/29/629385dc3918c.jpg)

3.  修改【BlogRoot/source/link/index.md】，添加`type: "link"`。

    ```
    ---title: linkdate: 2022-05-29 22:03:35type: "link"---
    ```

### [](https://tzy1997.com/articles/hexo1604/#%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5%E9%A1%B5%E9%9D%A2%E6%B7%BB%E5%8A%A0%E5%8F%8B%E9%93%BE%E4%BF%A1%E6%81%AF "友情链接页面添加友链信息")友情链接页面添加友链信息

前往 Hexo 博客目录（【BlogRoot/source/\_data】）创建一个文件`link.yml`（如果沒有 \_data 文件夹，请自行创建）。

[![](https://bu.dusays.com/2022/01/14/1ff50a00bd75c.gif)](https://bu.dusays.com/2022/05/29/629385e182b48.jpg)

```
- class_name: 友情链接  class_desc: 那些人，那些事  link_list:    - name: 唐志远の博客      link: https://tzy1997.com/      avatar: https://bu.dusays.com/2022/01/14/cd5ffd485f867.jpg      descr: 古今之成大事者，不惟有超世之才，亦必有坚忍不拔之志。- class_name: 网站  class_desc: 值得推荐的网站  link_list:    - name: Twitter      link: https://twitter.com/      avatar: https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png      descr: 社交分享平台
```

`class_name`和`class_desc`支持 html 格式，如不需要，也可以留空。

如果你想设置成本站友链页的效果，请参考教程：[基于 Butterfly 的外挂标签引入](https://tzy1997.com/articles/0xiipgum/) 。

## [](https://tzy1997.com/articles/hexo1604/#%E5%9B%BE%E5%BA%93 "图库")图库

图库页面只是普通的页面，你只需要`hexo new page xxxxx`创建你的页面就行。

然后使用标签外挂 [galleryGroup](https://butterfly.js.org/posts/4aa8abbe/#Gallery%E7%9B%B8%E5%86%8A%E5%9C%96%E5%BA%AB)，具体用法请查看对应的内容。

```
<div class="gallery-group-main">{% galleryGroup '壁纸' '收藏的一些壁纸' '/Gallery/wallpaper' https://bu.dusays.com/2021/03/06/38a2c5cd8b44e.jpg %}{% galleryGroup '漫威' '关于漫威的图片' '/Gallery/marvel' https://i.loli.net/2019/12/25/8t97aVlp4hgyBGu.jpg %}{% galleryGroup 'OH MY GIRL' '关于OH MY GIRL的图片' '/Gallery/ohmygirl' https://i.loli.net/2019/12/25/hOqbQ3BIwa6KWpo.jpg %}</div>
```

![Group Image Gallery](https://bu.dusays.com/2022/01/14/1ff50a00bd75c.gif)

壁纸

收藏的一些壁纸

[](https://tzy1997.com/Gallery/wallpaper)

![Group Image Gallery](https://bu.dusays.com/2022/01/14/1ff50a00bd75c.gif)

漫威

关于漫威的图片

[](https://tzy1997.com/Gallery/marvel)

![Group Image Gallery](https://bu.dusays.com/2022/01/14/1ff50a00bd75c.gif)

OH MY GIRL

关于 OH MY GIRL 的图片

[](https://tzy1997.com/Gallery/ohmygirl)

### [](https://tzy1997.com/articles/hexo1604/#%E5%AD%90%E9%A1%B5%E9%9D%A2 "子页面")子页面

子页面也是普通的页面，你只需要`hexo new page xxxxx`创建你的页面就行。

然后使用标签外挂 [gallery](https://butterfly.js.org/posts/4aa8abbe/#Gallery%E7%9B%B8%E5%86%8A)，具体用法请查看对应的内容。

```
{% gallery %}![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg){% endgallery %}
```

如果你想要使用 `/photo/ohmygirl` 这样的链接显示你的图片内容

你可以把创建好的 `ohmygirl`整个文件夹移到 `photo`文件夹里去

## [](https://tzy1997.com/articles/hexo1604/#404%E9%A1%B5%E9%9D%A2 "404页面")404 页面

主題內置了一个简单的 404 页面，可在设置中开放。

> 如需本地预览，请访问 [http://localhost:4000/404.html](http://localhost:4000/404.html)

```
error_404:  enable: true  subtitle: "页面沒有找到"  background:
```

版权声明: 本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议。转载请注明来自 [唐志远の博客](https://tzy1997.com/)！

打赏

- [![wechat](https://bu.dusays.com/2022/05/17/6283c3f127558.jpg)](https://bu.dusays.com/2022/05/17/6283c3f127558.jpg)

  wechat

- [![alipay](https://bu.dusays.com/2022/05/17/6283c3ee6d872.jpg)](https://bu.dusays.com/2022/05/17/6283c3ee6d872.jpg)

  alipay

---
