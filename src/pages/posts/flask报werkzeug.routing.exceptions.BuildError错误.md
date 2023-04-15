---
title: flask 报错BuildError
date: 
updated:
tags:
- 原创
- flask
categories:
- 开发
---

flask返回模板文件时，抛出下列这个错误：

```
BuildError
werkzeug.routing.exceptions.BuildError: Could not build url for endpoint ' welcome '. Did you mean 'welcome' instead?
```
traceback显示：
```
return render_template('main.html',username=current_user.username)
```
网上搜了很多方法都不能解决，最后发现是main.html模板文件内的src写法有问题。`src='{{ url_for('welcome')}}' `如果是两层单引号，保存文件时，eslint插件会自动在welcome前后添加空格，导致错误。
```html
<iframe name="right" class="el-main" src='{{ url_for('welcome')}}' width="100%" height="100%" frameborder="0">
```
外面改成双引号`src="{{ url_for('welcome')}}" `即可解决。ESLINT插件就不会自动添加空格。
```html
<iframe name="right" class="el-main" src="{{ url_for('welcome')}}" width="100%" height="100%" frameborder="0">
```