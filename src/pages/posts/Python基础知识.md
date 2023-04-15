---
layout: ../../layouts/MarkdownPostLayout.astro
title: "python基础"
pubDate: 2022-01-02
# description: "This is the first post of my new Astro blog."
author: "小满"
image:
    url: "./img/photo.avif"
tags: ["python", "计算机"]
---

-   列表是有序的可变容器
-   元组是有序的不可变容器
-   字典是无序的可变容器-->字典也被称作关联数组或者哈希表
-   集合是无序且不可变类型容器

| 元字符 | 说明                 |
| ------ | -------------------- |
| [\b]   | 回退（删除）一个字符 |
| \f     | 换页符               |
| \n     | 换行符               |
| \r     | 回车符               |
| \t     | 制表符               |
| \v     | 垂直制表符           |

## 字符串方法

-   find-->返回某个字符串位置
-   replace-->替换某个字符串
-   strip-->去除某个字符串
-   split-->以某个字符串前后拆分，不保留分隔符号，返回列表
-   partition -->以某个字符串前后拆分，保留分隔符号，返回元组
-   index-->返回某个字符串的索引
-   upper&lower-->转换大小写
-   join -->用于在指定字符串中间穿插其他字符串
-   format-->格式化输出

##

-   append-->一次加一个
-   extend-->一次加多个
-   insert-->指定索引位置插入
-   pop -->指定索引位置删除
-   remove-->移除指定元素
-   del-->删除整个对象
-   clear-->清空整个列表
-   index-->返回列表元素的索引
-   count-->统计列表元素出现次数
-   in-->
-   sort-->排序，可选 reverse=True 反转
-   reverse-->反转列表

## 元组方法

-   count
-   index
-   in

## 字典方法

-   keys()/Values()-->返回键/值对象，需要使用 list 和 tuple 转换
-   items-->返回键值元组
-   update-->有顺序更新，有方向更新，替换重复值
-   setdefault-->选择性更新，原位置已有值返回原值，无值返回新值 d.setdefault('A', 5)

## 集合方法

-   add -->添加一个元素
-   remove-->移除一个元素
-   pop-->随机删除一个元素
-   交集运算符-->& intersectionintersection_update
-   并集运算符-->| union update
-   差集运算符-->- differencedifference_update
-   补集运算符-->^ symmetric_differencesymmetric_difference_update
-   集合关系判断 --> issubset issupersetisdisjoint
-   冻集合——不可变集合类型

## 函数

定义函数

```python
def sum_1(a, b):
    """让输入的两个对象利用加号运算符进行相加
    参数：\n
    a：函数输入的第一个对象\n
    b：函数输入的第二个对象\n
    return，返回a+b的结果
    """
    c = a + b
    return(c)
```

## 形参和全局变量

```python
 # 定义时小括号中的参数，用来接收参数用的，称为 “形参”（形式参数），
    # 而调用时小括号中的参数，用来传递给函数用的，称为 “实参”（实际参数）
def sum_1(a, b):
    c = a + b
    return(c)

def sum_2(b):
    global a # 声明全局变量
    a += b
    return(a)
```

## 可变长参数

```python
def sum_2(*num):               # 此时*num就是一个可变长参数
    r = 0
    for i in num:              # 但可变长参数名仍然是num而非*num
        r += i
    return(r)
```

## 类 Class

### 定义静态属性

```python
class Human:
    '''人类'''
    mam = True
定义动态属性
"""
__init__函数解释：
是一种特殊函数，也称为是构造函数，多用于带参数属性的类的创建过程；
self是一个特殊的参数，相当于类本身的一种表示，相当于是C中的指针“this”，
是init函数必须设置的第一个参数；

类中定义的函数也需要传入self参数；
这些函数可以通过外部调用方法的方式进行调用。
"""

class Human:
    '''人类'''
    mam = True
    def __init__(self, age = 0, gender = 'Unknow'):
        self.age = age
        self.gender = gender

zs = Human(10, 'M')       # 重新设置属性

class Human1:
    '''人类'''
    mam = True
    @property             #属性私有化，防止被修改
    def mam(self):
        return True
"""
property，则可将方法转化为属性。
因此，上述类的创建，相当于创建了一个属性mam和一个同名方法mam，并且将同名方法转化为了属性
"""
```

## 类的继承

```python
class Point:
    def __init__(self, x = 0, y = 0):
        self.x = x
        self.y = y
    def dis(self, p):
        return ((self.x - p.x) ** 2 + (self.y - p.y) ** 2) ** 0.5

class Point1(Point):     # 继承自Point类
    def dis(self, p):
        return (abs(self.x - p.x) + abs(self.y - p.y))
```

## 二维到多维

```python
class Point2:
    def __init__(self, *args):  # 定义一个可变长数组，并将其转化为列表对象
        self.l = list(args)

class Point2:
    def __init__(self, *args):
        self.l = list(args)
    def dis(self, p):
        t = []
        for i in range(len(self.l)):
            t.append((self.l[i] - p.l[i]) ** 2)
        return sum(t) ** 0.5
```

## 函数和方法的区别

> 函数和方法的区别：方法是定义在类里面的函数！
