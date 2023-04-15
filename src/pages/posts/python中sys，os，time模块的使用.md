---
layout: ../../layouts/MarkdownPostLayout.astro
title: "python中的sys os time模块"
pubDate: 2022-01-02
# description: "This is the first post of my new Astro blog."
author: "小满"
image:
     url: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
tags: ["python"]
---

## sys 模块

### sys.argv: 实现从程序外部向程序传递参数。

位置参数 argv\[0\]代表 py 文件本身，运行方法 python xx.py 参数 1，参数 2 。。

```python
self = sys.argv[0]
name = sys.argv[1]
age = sys.argv[2]
print self, name, age
```

### sys.getdefaultencoding(): 获取系统当前编码，一般默认为 ascii。

```python
print sys.getdefaultencoding()
```

### sys.setdefaultencoding(): 设置系统默认编码，

执行 dir（sys）时不会看到这个方法，在解释器中执行不通过，  
可以先执行 reload(sys)，在执行 setdefaultencoding('utf8')，  
此时将系统默认编码设置为 utf8。（python2.7 中可能需要这么做）

```python
reload(sys)
sys.setdefaultencoding('utf8')
```

### sys.path: 获取指定模块搜索路径的字符串集合

```python
sys.path
```

### sys.platform: 获取当前系统平台。

```python
print sys.platform
```

### sys.exit()

功能：执行到主程序末尾，解释器自动退出，但是如果需要中途退出程序，  
可以调用 sys.exit 函数，带有一个可选的整数参数返回给调用它的程序，  
表示你可以在主程序中捕获对 sys.exit 的调用。（0 是正常退出，其他为异常）'''

```python
for i in range(1, 10):
    print '第%s次:' % i, i
    if i == 5:
        print '第五次退出'
        sys.exit(0)
```

## os 模块

### 1\. os.name()——判断现在正在实用的平台，Windows 返回 ‘nt'; Linux 返回’posix'

```python
print os.name()
```

### 2\. os.getcwd()——得到当前工作的目录。

```
print os.getcwd()
```

### 3\. os.listdir()——指定所有目录下所有的文件和目录名。

```
print os.listdir('.')
```

### 4\. os.remove()——删除指定文件

```
os.remove('aaa.txt')
```

### 5\. os.rmdir()——删除指定目录

```
os.rmdir('C://Users/xiaoxinsoso/Desktop/aaa')
```

### 6\. os.mkdir()——创建目录,注意：这样只能建立一层，要想递归建立可用：os.makedirs()

```
os.makedirs('aaa/aaa')
```

### 7\. os.path.isfile()——判断指定对象是否为文件。是返回 True, 否则 False

```
print os.path.isfile('ccc.txt')
print os.path.isfile('aaa')
```

### 8\. os.path.isdir()——判断指定对象是否为目录。是 True, 否则 False。例：

```
print os.path.isdir('aaa')
print os.path.isdir('ccc.txt')
```

### 9\. os.path.exists()——检验指定的对象是否存在。是 True, 否则 False.例：

```
print os.path.exists('bbb')
print os.path.exists('aaa')
print os.path.exists('ccc.txt')
```

### 10\. os.path.split()——返回路径的目录和文件名。例：

```
print os.path.split('C://Users/xiaoxinsoso/Desktop/aaa/ccc.txt')
```

### 11\. os.getcwd()——获得当前工作的目录

```
print os.getcwd()
```

### 12\. os.system()——执行 shell 命令。

注意：此处运行 shell 命令时，如果要调用 python 之前的变量，可以用如下方式：

```
var = 123
os.environ['var'] = str(var)
os.system('echo $var')

os.system('dir')
```

### 13\. os.chdir()——改变目录到指定目录

### 14\. os.path.getsize()——获得文件的大小，如果为目录，返回 0

```
print os.path.getsize('ccc.txt')
```

### 15\. os.path.abspath()——获得绝对路径。例：

```
print os.path.abspath('.')
```

### 16\. os.path.join(path, name)——连接目录和文件名。例：

```
print os.path.join('c://user/xiaoxinsoso/', 'wenjian.txt')
```

### 17\. os.path.basename(path)——返回文件名

```
print os.path.basename('ccc.txt')
```

### 18\. os.path.dirname(path)——返回文件路径

```
print os.path.dirname('C://Users/xiaoxinsoso/Desktop/aaa/ccc.txt')
```

### 19\. 获得程序所在的实际目录

```
if __name__ == "__main__":
    print os.path.realpath(sys.argv[0])
    print os.path.split(os.path.realpath(sys.argv[0]))
    print os.path.split(os.path.realpath(sys.argv[0]))[0]
```

## time 模块

```
ticks = time.time()
print "当前时间戳为:", ticks
```

### 获取当前时间

```
localtime = time.localtime(time.time())
print "本地时间为 :", localtime
```

### 获取格式化的时间

```
localtime = time.asctime(time.localtime(time.time()))
print "本地时间为 :", localtime
```

### 格式化日期

### 格式化成 2017-01-22 16:36:27 形式

```
print time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
```

### 格式化成 Sun Jan 22 16:36:27 2017 形式

```
print time.strftime("%a %b %d %H:%M:%S %Y", time.localtime())
```

### 将格式字符串转换为时间戳

```
a = "Sat Mar 28 22:24:24 2016"
print time.mktime(time.strptime(a, "%a %b %d %H:%M:%S %Y"))
```

### 获取某月日历

```
cal = calendar.month(2017, 1)
print "以下输出2016年1月份的日历:"
print cal

```

## datetime 模块

### datetime 类型时间

```
now = datetime.datetime.now()
print now
now = date time.datetime.now()
yes_time = now + date time.timedelta(days=-1)    # 前一天的时间

```

### datetime 转 string

```
strdatetime = now.strftime("%Y-%m-%d %H:%M:%S")
strdatetime1= now.strftime("%Y-%m-%d")
print strdatetime
print strdatetime1

```

### string 转 datetime

```
datetime1 = datetime.datetime.strptime(strdatetime1, "%Y-%m-%d")
print datetime1

```

### datetime 转时间戳

```
time_time = time.mktime(datetime1.timetuple())
print time_time

```

### 时间戳转 string

```
time1 = time.strftime('%Y-%m-%d',time.localtime(time_time))
print time1

```

### date 转 datetime

```
date1 = datetime.date(2012, 11, 19)
date = datetime.date.today()
print date
print datetime.datetime.strptime(str(date),'%Y-%m-%d') #将date转换为str，在由str转换为datetime
print datetime.datetime.strptime(str(date1),'%Y-%m-%d') #将date转换为str，在由str转换为datetime
```
