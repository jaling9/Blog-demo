---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Numpy API"
pubDate: 2022-01-02
# description: "This is the first post of my new Astro blog."
author: "xiaoman"
image:
    url: "./img/photo.avif"
tags: ["python", "numpy", "数据分析"]
---

## 特殊数组的创建方法
- numpy.arange 生成数值范围
```python
numpy.arange(start, stop, step, dtype)
```
- numpy.linspace 生成等差数列
```python
np.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None)
```

- numpy.logspace 生成等比数列

```python
np.logspace(start, stop, num=50, endpoint=True, base=10.0, dtype=None)
```
- np.zeros 全0数组
```python
np.zeros(6)                      # 默认是浮点型
```
- np.ones全1数组
```python
np.ones((3, 2))                  # 三行两列
```
- 随机数组：rand生成服从01分布的随机数
```python
np.random.rand(5)                # 返回服从01分布的5个数
```

- 随机数组：randn生成标准正态分布的随机数
```python
np.random.randn(5) 
```

- 随机数组：normal生成元素是指定随机分布的数组
```python
np.random.normal(4, 2, (3,3))   

array([[ 5.53705005,  1.95477989,  3.07768639],       
        [ 4.15457427,  3.69587242,  3.18715934],       
        [ 5.46093734,  6.60888084, -0.55980278]])
```

- 生成全数值相同的数组
```python
np.full((2, 2), 3)
```
- np.eye生成单位矩阵
```python
np.eye(5)

array([[1, 0, 0],
       [0, 2, 0],
       [0, 0, 3]])
```       
- np.diag生成对角矩阵
```python
np.diag([1, 2, 3])

array([[1, 0, 0],
       [0, 2, 0],
       [0, 0, 3]])
```       
- np.array按照某种形状生成ndarray
```python
e = [[2,1,3],[4,3,2]]
np.array(e)

array([[2, 1, 3],
       [4, 3, 2]])

np.ones_like(e)
np.zeros_like(e)
np.full_like(e,5)
```
## 数组常用变形方法
- reshape方法：调整数组行列结构
```python
a1 = np.random.rand(2, 3)
a1
array([[0.56262855, 0.73129141, 0.86289312],
       [0.93186546, 0.93884182, 0.22485166]])
```
- flatten方法：将数组降为一维数组
```python
a1.flatten().shape
(6,)
```
- .T方法：数组的转置
```python
a1
array([[0.56262855, 0.73129141, 0.86289312],
       [0.93186546, 0.93884182, 0.22485166]])

a1.T                    # 就类似于矩阵的转置
array([[0.56262855, 0.93186546],
       [0.73129141, 0.93884182],
       [0.86289312, 0.22485166]])
```
## 数组的拼接

```python
a1 = np.array([[1, 2], [3, 4]])
a2 = np.array([[5, 6], [7, 8]])

(array([[1, 2],
        [3, 4]]),
 array([[5, 6],
        [7, 8]]))
```        

- vstack：纵向拼接，按列拼接，新增行，上下拼接

```python
np.vstack([a1, a2])             # 需要输入一个序列
array([[1, 2],
       [3, 4],
       [5, 6],
       [7, 8]])
```

- hstack：横向拼接，按行拼接，新增列，左右拼接

```python
np.hstack([a1, a2]) 
array([[1, 2, 5, 6],
       [3, 4, 7, 8]])
```
## 数组的切分
当然，有拼接就有切分。接下来，简单看下数组的切分方法。拼接时关键字是`stack`，切分时关键字是`split`
```python
a = np.arange(24).reshape(3,8)          # 创建3行8列的二维数组
a
array([[ 0,  1,  2,  3,  4,  5,  6,  7],
       [ 8,  9, 10, 11, 12, 13, 14, 15],
       [16, 17, 18, 19, 20, 21, 22, 23]])
```
- hsplit：左右切分
```python
# 当第二个参数只输入一个数时，是进行等分
np.hsplit(a,2)

[array([[ 0,  1,  2,  3],
        [ 8,  9, 10, 11],
        [16, 17, 18, 19]]),
 array([[ 4,  5,  6,  7],
        [12, 13, 14, 15],
        [20, 21, 22, 23]])]
# 无法等分的情况会报错
np.hsplit(a,3)
````
```python
# 当第二个参数输入一个序列时，则是根据列标进行切分
np.hsplit(a,(1,2,3))          # 第一列、第二列、第三列后进行切分

[array([[ 0],
        [ 8],
        [16]]),
 array([[ 1],
        [ 9],
        [17]]),
 array([[ 2],
        [10],
        [18]]),
 array([[ 3,  4,  5,  6,  7],
        [11, 12, 13, 14, 15],
        [19, 20, 21, 22, 23]])]
- vsplit：上下切分
```python
np.vsplit(a,3)                # 三等分

[array([[0, 1, 2, 3, 4, 5, 6, 7]]),
 array([[ 8,  9, 10, 11, 12, 13, 14, 15]]),
 array([[16, 17, 18, 19, 20, 21, 22, 23]])]
```
- array_split：通用切分方法
```python
# 均分
np.array_split(a, 2, axis=1)        # axis = 1，左右切分

[array([[ 0,  1,  2,  3],
        [ 8,  9, 10, 11],
        [16, 17, 18, 19]]),
 array([[ 4,  5,  6,  7],
        [12, 13, 14, 15],
        [20, 21, 22, 23]])]
# 根据列标进行切分
np.array_split(a, (1, ), axis=1)

[array([[ 0],
        [ 8],
        [16]]),
 array([[ 1,  2,  3,  4,  5,  6,  7],
        [ 9, 10, 11, 12, 13, 14, 15],
        [17, 18, 19, 20, 21, 22, 23]])]
# 均分
np.array_split(a, 3, axis=0)         # axis = 0，上下切分

[array([[0, 1, 2, 3, 4, 5, 6, 7]]),
 array([[ 8,  9, 10, 11, 12, 13, 14, 15]]),
 array([[16, 17, 18, 19, 20, 21, 22, 23]])]
# 根据行标进行切分
np.array_split(a, (1, ), axis=0)

[array([[0, 1, 2, 3, 4, 5, 6, 7]]),
 array([[ 8,  9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22, 23]])]
```
## 数组的算数运算
|**数学运算函数**|**描述**|
| -------------------------- | ---------------------------------------- |
| np.add(x1，x2 )      | 按元素添加参数，等效于 x1 + x2           |
| np.subtract(x1，x2) | 按元素方式减去参数，等效于x1 - x2        |
| np.multiply(x1，x2) | 逐元素乘法参数，等效于x1 * x2            |
| np.divide(x1，x2)   | 逐元素除以参数，等效于x1 / x2            |
| np.exp(x)           | 计算e的x次方。     |
| np.exp2(x)          | 计算2的x次方。 |
| np.power(x1,x2)     | 计算x1的x2次幂。                      |
| np.mod(x)             | 返回输入数组中相应元素的除法余数.       |
| np.log(x)           | 自然对数，逐元素。                       |
| np.log2(x)          | *x*的基础2对数。                         |
| np.log10(x)         | 以元素为单位返回输入数组的基数10的对数。 |
| np.expm1(x)         | 对数组中的所有元素计算`exp（x） - 1`     |
| np.log1p(x)         | 返回一个加自然对数的输入数组。     |
| np.sqrt(x)          | 按元素方式返回数组的正平方根。           |
| np.square(x)        | 返回输入的元素平方。                     |
| np.sin(x)           | 三角正弦。                               |
| np.cos(x)           | 元素余弦。                               |
| np.tan(x)           | 逐元素计算切线。                         |
| np.round(x)           | 四舍五入                               |
| np.floor(x)           | 向下取整                               |
| np.ceil(x)           | 向上取整                                 |
数组的统计运算
NumPy有很多有用的统计函数，用于从数组中给定的元素中查找最小，最大，百分标准差和方差等。    
**常用统计函数：**
     
| **函数名称** |**NaN安全版本**|**描述**|   
| ---------|----|------------------ |   
|np.sum()       |np.nansum()|计算元素的和|   
|np.min()       |np.nanmin() |找出最小值|   
|np.max()       |np.nanmax()|找出最大值|   
|np.prod()      |np.nanprod()|计算元素的积|   
|np.ptp()       |N/A|计算元素的极差（最大值 - 最小值）|   
|np.mean()      |np.nanmean()|计算元素的算术平均值|   
|np.std()       |np.nanstd()|计算标准差|   
|np.var()       |np.nanvar()|计算方差|   
|np.percentile()|np.nanpercentile()|计算百分位数|   
|np.median()    |np.nanmedian()|计算中位数|   
|np.average()   |N/A|返回数组的加权平均值|  
|np.any()|N/A   |验证任何一个元素是否为真|   
|np.all()|N/A   |验证所有元素是否为真|  
## 数组的线性代数函数
NumPy拥有numpy.linalg 模块，提供线性代数所需的所有功能。
- np.dot() 返回两个数组的点积
- np.vdot() 返回两个向量的点积
- np.inner() 返回一维数组的向量内积
- np.matmul() 返回两个数组的矩阵乘积
- np.linalg.det() 计算输入矩阵的行列式
- np.linalg.solve() 求解矩阵形式的线性方程的解
- np.linalg.inv() 计算矩阵的逆
## Pandas-DataFrame的创建
```python
df = pd.DataFrame(data=None, 
                  index=None, 
                  columns=None,
                  dtype=None, 
                  copy=False
                  )
```
## 由Series创建DataFrame
```python
s1 = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
s2 = pd.Series([2, 3, 4], index=['b', 'c', 'd'])
df = pd.DataFrame([s1, s2])
```
## 二维array创建DataFrame
```python
l = [[1, 2, 3], [2, 3, 4]]
pd.DataFrame(a)
```
## 利用字典创建DataFrame
```python
d1 = {'a':range(3),'b':range(3),'c':range(3)}
pd.DataFrame(d1)
```
在创建过程中，字典的Key会编程column名称，并且系统会自动生成index.
