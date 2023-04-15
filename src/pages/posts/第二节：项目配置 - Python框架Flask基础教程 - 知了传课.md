---
layout: ../../layouts/MarkdownPostLayout.astro
title: "flask项目配置"
pubDate: 2022-01-02
# description: "This is the first post of my new Astro blog."
author: "xiaoman"
image:
    url: "https://images.unsplash.com/photo-1681165045474-d388d11ace96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
    alt: "The Astro logo with the word One."
tags: ["flask", "python", "数据分析"]
---

## 项目配置

## 一、设置为 DEBUG 模式：

默认情况下`flask`不会开启`DEBUG`模式，开启`DEBUG`模式后，flask 会在每次保存代码的时候自动的重新载入代码，并且如果代码有错误，会在终端进行提示。  
![image.png](https://www.zlkt.net/media/course/2UZz2JSDySff5o8CPeqPRN.png)  
如果一切正常，会在终端打印以下信息：

```python
* Restarting with stat
* Debugger is active!
* Debugger pin code: 294-745-044
* Running on http://0.0.0.0:9000/ (Press CTRL+C to quit)

```

需要注意的是，只能在开发环境下开启`DEBUG`模式，因为`DEBUG`模式会带来非常大的安全隐患。

## 二、配置文件：

`Flask`项目的配置，都是通过`app.config`对象来进行配置的。比如要配置一个项目的`SECRET_KEY`，那么可以使用`app.config['SECRET_KEY'] = "xxx"`来进行设置，在`Flask`项目中，有四种方式进行项目的配置：

1.  直接硬编码：

    ```python
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "xxx"

    ```

2.  因为`app.config`是`flask.config.Config`的实例，而`Config`类是继承自`dict`，因此可以通过`update`方法：

    ```python
    app.config.update(
       DEBUG=True,
       SECRET_KEY='...'
    )

    ```

3.  如果你的配置项特别多，你可以把所有的配置项都放在一个模块中，然后通过加载模块的方式进行配置，假设有一个`settings.py`模块，专门用来存储配置项的，此时你可以通过`app.config.from_object()`方法进行加载，并且该方法既可以接收模块的的字符串名称，也可以模块对象：

    ```python
    # 1. 通过模块字符串
    app.config.from_object('settings')
    # 2. 通过模块对象
    import settings
    app.config.from_object(settings)

    ```

4.  也可以通过另外一个方法加载，该方法就是`app.config.from_pyfile()`，该方法传入一个文件名，通常是以`.py`结尾的文件，但也不限于只使用`.py`后缀的文件：

    ```python
    app.config.from_pyfile('settings.py',silent=True)
    # silent=True表示如果配置文件不存在的时候不抛出异常，默认是为False，会抛出异常。
    ```

`Flask`项目内置了许多的配置项，所有的内置配置项，可以在[这里查看](https://flask.palletsprojects.com/en/2.0.x/config/)。
