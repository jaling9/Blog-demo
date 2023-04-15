---
title: 如何让SQL提高一个台阶？
date:
updated:
tags:
  - 转载
  - SQL
categories:
  - 数据分析
index_img: https://images.unsplash.com/photo-1497864979123-ef3595423b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80
banner_img: https://images.unsplash.com/photo-1497864979123-ef3595423b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80
---

> MySQl 专栏持续更新 不说晦涩难懂的东西 尽量输出容易理解 和 使用的 SQL 技巧 和 初中级开发不是很常用的但很有用的知识
>
> 欢迎查看 👉🏻👉🏻👉🏻[SQL 专栏](https://juejin.cn/column/7157955810826387470 "https://juejin.cn/column/7157955810826387470") 查漏补缺 指教一二
>
> ![src=http __img2.biaoqingjia.com_biaoqing_201810_2c3993f64eec252da6d674f9d80fc4e9.gif&refer=http __img2.biaoqingjia.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9572ab2e6c3545dbaa4b2b75f4a3b6c1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
>
> 每一次写博客对技术都会有更深入的理解 积少成多 百天计划我也想看看自己有多少成长 祝君好运 工作顺利

## 前言

SQL 写不好 加班少不了 日常工作中 SQL 是必不可少的一项技术 但是很多人不会过多的去关注 SQL 问题 一是数据量小 二是没有意识到索引的重要性 本文主要是整理 SQL 失效场景 如果里面的细节你都知道 那你一定是学习能力比较好的人 膜拜 写完这篇文章 我感觉自己之前知道的真的是 “目录” 没有明白其中的内容 如果你能跟着节奏看完文章 一定会有收获 至少我写完感觉思维通透很多 以后百分之九十的 SQl 索引问题 和 面试这方面问题都能拿捏两

`文章 字数 四千余字 观看时长十分钟 练习时长两个半小时`

## 基础数据准备

准备一个数据表作为 数据演示 这里面一共 创建了三个索引

- 联合索引 `sname`, `s_code`, `address`
- 主键索引 `id`
- 普通索引 `height`

```
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `s_code` int(100) NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `height` double NULL DEFAULT NULL,
  `classid` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `普通索引`(`height`) USING BTREE,
  INDEX `联合索引`(`sname`, `s_code`, `address`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '学生1', 1, '上海', 170, 1, '2022-11-02 20:44:14');
INSERT INTO `student` VALUES (2, '学生2', 2, '北京', 180, 2, '2022-11-02 20:44:16');
INSERT INTO `student` VALUES (3, '变成派大星', 3, '京东', 185, 3, '2022-11-02 20:44:19');
INSERT INTO `student` VALUES (4, '学生4', 4, '联通', 190, 4, '2022-11-02 20:44:25');
```

## 正文

上面的 SQL 我们已经创建好基本的数据 在验证之前 先带着几个问题

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a517883c2f734ed9aad32fe69341e5b2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

我们先从上往下进行验证

## 最左匹配原则

写在前面：我很早之前就听说过数据库的最左匹配原则，当时是通过各大博客论坛了解的，但是这些博客的局限性在于它们对最左匹配原则的描述就像一些数学定义一样，往往都是列出 123 点，满足这 123 点就能匹配上索引，否则就不能。 最左匹配原则就是指在联合索引中，如果你的 SQL 语句中用到了联合索引中的最左边的索引，那么这条 SQL 语句就可以利用这个联合索引去进行匹配，我们上面建立了联合索引 可以用来测试最左匹配原则 `sname`, `s_code`, `address`

请看下面 SQL 语句 进行思考 是否会走索引

```
-- 联合索引 sname,s_code,address

1、select create_time from student where sname = "变成派大星"  -- 会走索引吗？

2、select create_time from student where s_code = 1   -- 会走索引吗？

3、select create_time from student where address = "上海"  -- 会走索引吗？

4、select create_time from student where address = "上海" and s_code = 1 -- 会走索引吗？

5、select create_time from student where address = "上海" and sname = "变成派大星"  -- 会走索引吗？

6、select create_time from student where sname = "变成派大星" and address = "上海"  -- 会走索引吗？

7、select create_time from student where sname = "变成派大星" and s_code = 1 and address = "上海"  -- 会走索引吗？
```

凭你的经验 哪些会使用到索引呢 ？ 可以先思考一下 在心中记下数字

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/783520d8f38b4e259e8f6d7b65a05103~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

**走索引例子**

```
EXPLAIN  select create_time from student where sname = "变成派大星"  -- 会走索引吗？
```

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d253165cfba04252aa4c4a219b697a81~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

**未走索引例子**

```
EXPLAIN select create_time from student where address = "上海" and s_code = 1 -- 会走索引吗？
```

走的全表扫描 rows = 4 ![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9395730bd49645f1848278ff1d7d2467~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 如果不知道`EXPLAIN` 是什么的 或者看不懂分析出来的数据的话 建议去看看另一篇文章[分析命令 EXPLAIN 超详解](https://juejin.cn/post/7161254854571065375 "https://juejin.cn/post/7161254854571065375")

如果你内心的答案没有全部说对就接着往下看

最左匹配原则顾名思义：最左优先，以最左边的为起点任何连续的索引都能匹配上。**同时遇到范围查询(>、<、between、like)就会停止匹配**。  
例如：s_code = 2 如果建立(`sname`, `s_code`)顺序的索引，是匹配不到(`sname`, `s_code`)索引的;

但是如果查询条件是 sname = "变成派大星" and s_code = 2 或者 a=1(又或者是 s_code = 2 and sname = "变成派大星" )就可以，**因为优化器会自动调整`sname`, `s_code`的顺序**。再比如 sname = "变成派大星" and s_code > 1 and address = "上海" `address是用不到索引的`，因为 s_code 字段是一个范围查询，它之后的字段会停止匹配。

不带范围查询 索引使用类型 ![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62cf1fbb4d694a32b1374a7621259924~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

带范围使用类型

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8bf03bef225405b83de31f9ffcdd1af~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

根据上一篇文章的讲解 可以明白 ref 和 range 的含义 级别还是相差很多的

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd7c90f9067344fdaa91724d0f6882f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 思考

为什么左链接一定要遵循最左缀原则呢？

### 验证

看过一个比较好玩的回答

> 你可以认为联合索引是闯关游戏的设计  
> 例如你这个联合索引是 state/city/zipCode  
> 那么 state 就是第一关 city 是第二关， zipCode 就是第三关  
> 你必须匹配了第一关，才能匹配第二关，匹配了第一关和第二关，才能匹配第三关

这样描述不算完全准确 但是确实是这种思想

要想理解联合索引的最左匹配原则，先来理解下索引的底层原理。索引的底层是一颗 B+树，那么联合索引的底层也就是一颗 B+树，只不过联合索引的 B+树节点中存储的是键值。由于构建一棵 B+树只能根据一个值来确定索引关系，所以数据库依赖联合索引最左的字段来构建 文字比较抽象 我们看一下

加入我们建立 A,B 联合索引 他们在底层储存是什么样子呢？

- 橙色代表字段 A
- 浅绿色 代表字段 B

图解： ![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a35b2ec784eb48109fe2916eade3c248~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

我们可以看出几个特点

- A 是有顺序的 1，1，2，2，3，4
- B 是没有顺序的 1，2，1，4，1，2 这个是散列的
- 如果 A 是等值的时候 B 是有序的 例如 （1，1），（1，2） 这里的 B 有序的 （2，1）,(2,4) B 也是有序的

这里应该就能看出 如果没有 A 的支持 B 的索引是散列的 不是连续的

再细致一点 我们重新创建一个表

```
DROP TABLE IF EXISTS `leftaffix`;

CREATE TABLE `leftaffix`  (

  `a` int(11) NOT NULL AUTO_INCREMENT,

  `b` int(11) NULL DEFAULT NULL,

  `c` int(11) NULL DEFAULT NULL,

  `d` int(11) NULL DEFAULT NULL,

  `e` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,

  PRIMARY KEY (`a`) USING BTREE,

  INDEX `联合索引`(`b`, `c`, `d`) USING BTREE

) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leftaffix
-- ----------------------------
INSERT INTO `leftaffix` VALUES (1, 1, 1, 1, '1');

INSERT INTO `leftaffix` VALUES (2, 2, 2, 2, '2');

INSERT INTO `leftaffix` VALUES (3, 3, 2, 2, '3');

INSERT INTO `leftaffix` VALUES (4, 3, 1, 1, '4');

INSERT INTO `leftaffix` VALUES (5, 2, 3, 5, '5');

INSERT INTO `leftaffix` VALUES (6, 6, 4, 4, '6');

INSERT INTO `leftaffix` VALUES (7, 8, 8, 8, '7');
SET FOREIGN_KEY_CHECKS = 1;
```

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39277837f4fb4f8d8f4707ae5a597880~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

> 在创建索引树的时候会对数据进行排序 根据最左缀原则 会先通过 B 进行排序 也就是 如果出现值相同就 根据 C 排序 如果 C 相同就根据 D 排序 排好顺序之后就是如下图：

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/311f0f59b47141a185b466f26df0d2e0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

> 索引的生成就会根据图二的顺序进行生成 我们看一下 生成后的树状数据是什么样子

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb22bb31c6f14d3683164388042bc0f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

> 解释一些这个树状图 首先根据图二的排序 我们知道顺序 是 1111a 2222b 所以 在第三层 我们可以看到 1111a 在第一层 2222b 在第二层 因为 111 < 222 所以 111 进入第二层 然后得出第一层

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5393546a6d59417388538798c34ca04f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

简化一下就是这个样子

但是这种顺序是相对的。这是因为 MySQL 创建联合索引的规则是首先会对联合索引的最左边`第一个字段排序`，在第一个字段的排序基础上，然后在对第二个字段进行排序。所以 B=2 这种查询条件没有办法利用索引。

看到这里还可以明白一个道理 为什么我们建立索引的时候不推荐建立在经常改变的字段 因为这样的话我们的索引结构就要跟着你的改变而改动 所以很消耗性能

### 小总结

前提 如果创建 b,c,d 联合索引面

- 如果 我 where 后面的条件是`c = 1 and d = 1`为什么不能走索引呢 如果没有 b 的话 你查询的值相当于 `*11` 我们都知道`*`是所有的意思也就是我能匹配到所有的数据
- 如果 我 where 后面是 `b = 1 and d =1` 为什么会走索引呢？ 你等于查询的数据是 `1*1` 我可以通过前面 1 进行索引匹配 所以就可以走索引
- 最左缀匹配原则的最重要的就是 第一个字段

我们接着看下一个失效场景

## select \*

### 思考

首先提出问题 `select *` 一定会索引失效吗？

### 解释

如果你的心里答案是 会失效那就接着往下看

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f81456c6434c4beda1388db375956a17~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

细心的同学能够发现 即便我使用了 select \* 依然会走索引 这是为什么呢？

首先我们在上一个验证中创建了联合索引 我们使用 B=1 会走索引

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c32c8aa321f3458b95a00ae04ec8c37b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d5e676c05644c1aaaf62a5f214354b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

也就是 Select \* 在一些情况下是会走索引的 那么什么时候不会走索引呢

> 经过测试 在查询返回结果集大约总数据的 25%就不会走索引了 进而全表扫描 这里也有一个知识点 也就是为什么范围查找会索引失效的原因

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/641cc7d7b0ad4d04aa9417f721ca7be1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

上图就是索引失效的情况

范围查找也不是一定会索引失效 下面情况就会索引生效就是 级别低 生效的原因是因为缩小了范围

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05fab88741414b70896dedc185d6a3ff~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 小总结

- select \* 只有在返回结果集数量大于总结果集的 25% 就会造成索引失效 如果小于 不会造成索引失效但是会降低索引的效率
- 范围查找有概率索引失效但是 但是在特定的情况下会生效 范围小就会使用 也可以理解为 返回结果集小就会使用索引

## 使用函数

使用在 Select 后面使用函数可以使用索引 但是下面这种做法就不能

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48f8fee5fda042b4a21ba190a68dbca2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b22c7170e6bd4c9084e6f0dc01521412~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

因为索引保存的是索引字段的原始值，而不是经过函数计算后的值，自然就没办法走索引了。

不过，从 MySQL 8.0 开始，索引特性增加了函数索引，即可以针对函数计算后的值建立一个索引，也就是说该索引的值是函数计算后的值，所以就可以通过扫描索引来查询数据。

这种写法我没使用过 感觉情况比较少 也比较容易注意到这种写法

## 计算操作

这个情况和上面一样 之所以会导致索引失效是因为改变了索引原来的值 在树中找不到对应的数据只能全表扫描

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c4ce2c6583a4107aab778669bf1b775~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 因为索引保存的是索引字段的原始值，而不是 b - 1 表达式计算后的值，所以无法走索引，只能通过把索引字段的取值都取出来，然后依次进行表达式的计算来进行条件判断，因此采用的就是全表扫描的方式。

下面这种计算方式就会使用索引

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab31b17d52f44d4297c1a10248c97f33~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

Java 比较熟悉的可能会有点疑问，这种对索引进行简单的表达式计算，在代码特殊处理下，应该是可以做到索引扫描的，比方将 b - 1 = 6 变成 b = 6 - 1。 是的，是能够实现，但是 MySQL 还是偷了这个懒，没有实现。

### 小总结

总而言之 言而总之 只要是影响到索引列的值 索引就是失效

## Like %

这个真的是难受哦 因为经常使用这个 所以还是要小心点 在看为什么失效之前 我们先看一下 Like % 的解释

1.  **%百分号通配符:** 表示任何字符出现任意次数(可以是 0 次).
2.  **\_下划线通配符:** 表示只能匹配单个字符,不能多也不能少,就是一个字符.
3.  **like 操作符:** LIKE 作用是指示 mysql 后面的搜索模式是利用通配符而不是直接相等匹配进行比较.

**注意:** 如果在使用 like 操作符时,后面的没有使用通用匹配符效果是和=一致的,

```
SELECT * FROM products WHERE products.prod_name like '1000';
```

2.匹配包含"Li"的记录(包括记录"Li") :

```
SELECT* FROM products WHERE products.prod_name like '%Li%';
```

3.匹配以"Li"结尾的记录(包括记录"Li",不包括记录"Li ",也就是 Li 后面有空格的记录,这里需要注意)

```
SELECT * FROM products WHERE products.prod_name like '%Li';
```

在左不走 在右走

`右：` 虽然走 但是索引级别比较低主要是模糊查询 范围比较大 所以索引级别就比较低 ![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0fd95c00a9f44ffbed872907e23bd76~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

`左：` 这个范围非常大 所以没有使用索引的必要了 这个可能不是很好优化 还好不是一直拼接上面的

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/183762e539b04420b6db1acc4a7cabbb~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 小总结

索引的时候和查询范围关系也很大 范围过大造成索引没有意义从而失效的情况也不少

## 使用 Or 导致索引失效

这个原因就更简单了

在 WHERE 子句中，如果在 OR 前的条件列是索引列，而在 OR 后的条件列不是索引列，那么索引会失效 举个例子，比如下面的查询语句，b 是主键，e 是普通列，从执行计划的结果看，是走了全表扫描。

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fe15263f1414f058690cb11a02fdbbe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 优化

这个的优化方式就是 在 Or 的时候两边都加上索引

就会使用索引 避免全表扫描 ![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2924e8c883046a793416a7e9f9307e4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

## in 使用不当

首先使用 In 不是一定会造成全表扫描的 **IN 肯定会走索引，但是当 IN 的取值范围较大时会导致索引失效，走全表扫描**

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c6239288d63424f97463355bd4c459c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a515623c61a403b86af444c7db46fa9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

in 在结果集 大于 30%的时候索引失效

## not in 和 In 的失效场景相同

## order By

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/664a7329241840e888d5569d4b0e3475~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 这一个主要是 Mysql 自身优化的问题 我们都知道 OrderBy 是排序 那就代表我需要对数据进行排序 如果我走索引 索引是排好序的 但是我需要回表 消耗时间 另一种 我直接全表扫描排序 不用回表 也就是

- 走索引 + 回表
- 不走索引 直接全表扫描

Mysql 认为直接全表扫面的速度比 回表的速度快所以就直接走索引了 在 Order By 的情况下 走全表扫描反而是更好的选择

## 子查询会走索引吗

答案是会 但是使用不好就不会

## 大总结

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f7104ac9d684ce3b4fe43e97b6afaf2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

- 如果你是直接跳到这里 看看文章有多长 `建议收藏`
- 如果你一步步看到这里 感觉有点帮助 `赞赞来一个`
- 如果感觉文章有问题 建议评论区指出 `会修正`

周五愉快 文章完结 🥰

持续更新 SQL 相关系列 可追更 不可催更

![0bd2663ecc3e21c3a51f382cec4bb8b6.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bed95998e47144b4a49e8a42246ece50~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

_**本文正在参加[「技术专题 19 期 漫谈数据库技术」](https://juejin.cn/post/7160601544600567845 "https://juejin.cn/post/7160601544600567845")活动**_
