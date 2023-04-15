---
title: Markdown语法
date: 
updated:
tags:
- 原创
- markdown
categories:
- 其他
---

## 表格

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |

## 任务列表

- [x] Write the press release
- [x] Update the website
- [ ] Contact the media

## 表情符号

sfs :unamused:

## 行内标签

```
{% label primary @text %}
<span class="label label-primary">Label</span>
可选类别：primary default info success warning danger
```

<span class="label label-primary">Label</span>

## 参考脚注

这是一句话[^1]
[^1]: 这是对应的脚注

[^1]: 参考资料1
[^2]: 参考资料2

## 便签

> 可选类别
  primary
  secondary
  success
  danger
  warning
  info
  light

```
{% note success %}
文字 或者 `markdown` 均可
{% endnote %}
```

{% note success %}
两种方式：上面是第一种方式，下面是html方法
{% endnote %}

```html
<p class="note note-danger">便签</p>
```

<p class="note note-danger">便签</p>


## 按钮
```
{% btn url, text, title %}或者
<a class="btn" href="https://hexo.fluid-dev.com/docs/guide/#tag-%E6%8F%92%E4%BB%B6" title="title">tag</a>
```
{% btn (https://hexo.fluid-dev.com/docs/guide/#tag-%E6%8F%92%E4%BB%B6), text, title %}
<a class="btn" href="https://hexo.fluid-dev.com/docs/guide/#tag-%E6%8F%92%E4%BB%B6" title="title">tag</a>