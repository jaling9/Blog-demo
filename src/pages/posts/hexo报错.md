---
title: hexo d博客部署报错
date: 
updated:
tags:
- 原创
- hexo
categories:
- 博客
---

`hexo d` 博客部署的时候出现下面这各错误，是网络问题，换个代理节点就好了。
```
fatal: unable to access 'https://github.com/xx/xx.github.io/': OpenS
SL SSL_read: Connection was reset, errno 10054
FATAL {
  err: Error: Spawn failed
      at ChildProcess.<anonymous> (D:\Blog\hexo\node_modules\hexo-util\lib\spawn
.js:51:21)
      at ChildProcess.emit (events.js:315:20)
      at ChildProcess.cp.emit (D:\Blog\hexo\node_modules\cross-spawn\lib\enoent.
js:34:29)
      at Process.ChildProcess._handle.onexit (internal/child_process.js:277:12)
{
    code: 128
  }
} Something's wrong. Maybe you can find the solution here: %s https://hexo.io/do
cs/troubleshooting.html
```

