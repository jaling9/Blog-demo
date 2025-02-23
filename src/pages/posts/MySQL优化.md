---
layout: ../../layouts/MarkdownPostLayout.astro
title: "MySQL优化"
pubDate: 2022-01-02
# description: "This is the first post of my new Astro blog."
author: "小满"
image:
    url: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
tags: ["SQL", "互联网协议", "计算机网络"]
---

> 有情怀，有干货，微信搜索【**三太子敖丙**】关注这个不一样的程序员。
> 
> 本文 **GitHub** [github.com/JavaFamily](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FAobingJava%2FJavaFamily "https://github.com/AobingJava/JavaFamily") 已收录，有一线大厂面试完整考点、资料以及我的系列文章。
> 原文链接:https://juejin.cn/post/6895507965899063310#heading-1

## 前言

这天我正在午休呢，公司DBA就把我喊醒了，说某库出现大量慢SQL，很快啊，很快，我还没反应过来，库就挂了，我心想现在的用户不讲武德啊，怎么在我睡觉的时候大量请求呢。

这是很常见的一个场景哈，因为很多业务开始数据量级不大，所以写sql的时候就没注意性能，等量级上去，很多业务就需要做调优了，在电商公司工作的这几年我也总结了不少，下面就分享给大家吧。

在代码开发过程中，我们都会遵循一些SQL开发规范去编写高质量SQL，来提高接口的Response Time(RT)，对一些核心接口要求RT在100ms以内甚至更低。

由于业务前期数据量比较小，基本都能满足这个要求，但随着业务量的增长，数据量也随之增加，对应接口的SQL耗时也在变长，直接影响了用户的体验，这时候就需要对SQL进行优化。

优化点主要包括SQL规范性检查，表结构索引检查，SQL优化案例分析，下面从这三方面结合实际案例聊聊如何优化SQL。

## SQL规范性检查

每个公司都有自己的MySQL开发规范，基本上大同小异，这里罗列一些比较重要的，我工作期间经常接触的给大家。

### select检查

**UDF用户自定义函数**

SQL语句的select后面使用了自定义函数UDF，SQL返回多少行，那么UDF函数就会被调用多少次，这是非常影响性能的。

```SQL
#getOrderNo是用户自定义一个函数用户来根据order_sn来获取订单编号
select id, payment_id, order_sn, getOrderNo(order_sn) 
from payment_transaction 
where status = 1 and create_time 
between '2020-10-01 10:00:00' and '2020-10-02 10:00:00';
```

**text类型检查**

如果select出现text类型的字段，就会消耗大量的网络和IO带宽，由于返回的内容过大超过max\_allowed\_packet设置会导致程序报错，需要评估谨慎使用。

```SQL
#表request_log的中content是text类型。
select user_id, content, status, url, type 
from request_log 
where user_id = 32121;
```

**group\_concat谨慎使用**

gorup\_concat是一个字符串聚合函数，会影响SQL的响应时间，如果返回的值过大超过了max\_allowed\_packet设置会导致程序报错。

```SQL
select batch_id, group_concat(name) from buffer_batch 
where status = 0 and create_time 
between '2020-10-01 10:00:00' and '2020-10-02 10:00:00';
```

**内联子查询**

在select后面有子查询的情况称为内联子查询，SQL返回多少行，子查询就需要执行过多少次，严重影响SQL性能。

```SQL
select id,(select rule_name from member_rule limit 1) as rule_name, member_id, member_type, member_name, status  
from member_info m 
where status = 1 and create_time 
between '2020-09-02 10:00:00' and '2020-10-01 10:00:00';
```

### from检查

**表的链接方式**

在MySQL中不建议使用Left Join，即使ON过滤条件列索引，一些情况也不会走索引，导致大量的数据行被扫描，SQL性能变得很差，同时要清楚ON和Where的区别。

```SQL
SELECT a.member_id,a.create_time,b.active_time 
FROM operation_log a 
LEFT JOIN member_info b ON a.member_id = b.member_id 
where  b.`status` = 1
and a.create_time 
between '2020-10-01 00:00:00' 
and '2020-10-30 00:00:00' 
limit 100, 0;
```

**子查询**

由于MySQL的基于成本的优化器CBO对子查询的处理能力比较弱，不建议使用子查询，可以改写成Inner Join。

```SQL
select b.member_id,b.member_type, a.create_time,a.device_model 
from member_operation_log a 
inner join (select member_id,member_type from member_base_info where `status` = 1
and create_time between '2020-10-01 00:00:00' and '2020-10-30 00:00:00') 
as b on a.member_id = b.member_id;
```

### where检查

**索引列被运算**

当一个字段被索引，同时出现where条件后面，是不能进行任何运算，会导致索引失效。

```SQL
#device_no列上有索引，由于使用了ltrim函数导致索引失效
select id, name , phone, address, device_no 
from users where ltrim(device_no) = 'Hfs1212121';
#balance列有索引,由于做了运算导致索引失效
select account_no, balance from accounts 
where balance + 100 = 10000 
and status = 1;
```

**类型转换**

对于Int类型的字段，传varchar类型的值是可以走索引，MySQL内部自动做了隐式类型转换；相反对于varchar类型字段传入Int值是无法走索引的，应该做到对应的字段类型传对应的值总是对的。

```SQL
#user_id是bigint类型，传入varchar值发生了隐式类型转换，可以走索引。
select id, name , phone, address, device_no 
from users where user_id = '23126';
#card_no是varchar(20)，传入int值是无法走索引
select id, name , phone, address, device_no 
from users 
where card_no = 2312612121;
```

**列字符集**

从MySQL 5.6开始建议所有对象字符集应该使用用utf8mb4，包括MySQL实例字符集，数据库字符集，表字符集，列字符集。避免在关联查询Join时字段字符集不匹配导致索引失效，同时目前只有utf8mb4支持emoji表情存储。

```SQL
character_set_server  =  utf8mb4    #数据库实例字符集
character_set_connection = utf8mb4  #连接字符集
character_set_database = utf8mb4    #数据库字符集
character_set_results = utf8mb4     #结果集字符集
```

### group by检查

**前缀索引**

group by后面的列有索引，索引可以消除排序带来的CPU开销，如果是前缀索引，是不能消除排序的。

```SQL
#device_no字段类型varchar(200)，创建了前缀索引。
mysql> alter table users add index idx_device_no(device_no(64));

mysql> select device_no, count(*) from users where create_time between '2020-10-01 00:00:00' and '2020-10-30 00:00:00' group by device_no;
```

**函数运算**

假设需要统计某月每天的新增用户量，参考如下SQL语句，虽然可以走create\_time的索引，但是不能消除排序，可以考虑冗余一个字段stats\_date date类型来解决这种问题。

```SQL
select DATE_FORMAT(create_time, '%Y-%m-%d'), count(*) 
from users where create_time 
between '2020-09-01 00:00:00' and '2020-09-30 23:59:59' 
group by DATE_FORMAT(create_time, '%Y-%m-%d');
```

### order by检查

**前缀索引**

order by后面的列有索引，索引可以消除排序带来的CPU开销，如果是前缀索引，是不能消除排序的。

**字段顺序**

排序字段顺序，asc/desc升降要跟索引保持一致，充分利用索引的有序性来消除排序带来的CPU开销。

### limit检查

**limit m,n要慎重**

对于limit m, n分页查询，越往后面翻页即m越大的情况下SQL的耗时会越来越长，对于这种应该先取出主键id，然后通过主键id跟原表进行Join关联查询。

## 表结构检查

### 表&列名关键字

在数据库设计建模阶段，对表名及字段名设置要合理，不能使用MySQL的关键字，如desc, order, status, group等。同时建议设置lower\_case\_table\_names = 1表名不区分大小写。

### 表存储引擎

对于OLTP业务系统，建议使用InnoDB引擎获取更好的性能，可以通过参数default\_storage\_engine控制。

### AUTO\_INCREMENT属性

建表的时候主键id带有AUTO\_INCREMENT属性，而且AUTO\_INCREMENT=1，在InnoDB内部是通过一个系统全局变量dict\_sys.row\_id来计数，row\_id是一个8字节的bigint unsigned，InnoDB在设计时只给row\_id保留了6个字节的长度，这样row\_id取值范围就是0到2^48 - 1，如果id的值达到了最大值，下一个值就从0开始继续循环递增，在代码中禁止指定主键id值插入。

```SQL
#新插入的id值会从10001开始，这是不对的，应该从1开始。
create table booking( `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',......) engine = InnoDB auto_increment = 10000;

#指定了id值插入，后续自增就会从该值开始+1，索引禁止指定id值插入。
insert into booking(id, book_sn) values(1234551121, 'N12121');
```

### NOT NULL属性

根据业务含义，尽量将字段都添加上NOT NULL DEFAULT VALUE属性，如果列值存储了大量的NULL，会影响索引的稳定性。

### DEFAULT属性

在创建表的时候，建议每个字段尽量都有默认值，禁止DEFAULT NULL，而是对字段类型填充响应的默认值。

### COMMENT属性

字段的备注要能明确该字段的作用，尤其是某些表示状态的字段，要显式的写出该字段所有可能的状态数值以及该数值的含义。

### TEXT类型

不建议使用Text数据类型，一方面由于传输大量的数据包可能会超过max\_allowed\_packet设置导致程序报错，另一方面表上的DML操作都会变的很慢，建议采用es或者对象存储OSS来存储和检索。

## 索引检查

### 索引属性

索引基数指的是被索引的列唯一值的个数，唯一值越多接近表的count(\*)说明索引的选择率越高，通过索引扫描的行数就越少，性能就越高，例如主键id的选择率是100%，在MySQL中尽量所有的update都使用主键id去更新，因为id是聚集索引存储着整行数据，不需要回表，性能是最高的。

```SQL
mysql> select count(*) from member_info;
+----------+
| count(*) |
+----------+
|   148416 |
+----------+
1 row in set (0.35 sec)

mysql> show index from member_base_info;
+------------------+------------+----------------------------+--------------+-------------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table            | Non_unique | Key_name                   | Seq_in_index | Column_name       | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+------------------+------------+----------------------------+--------------+-------------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| member_info |          0 | PRIMARY                    |            1 | id                | A         |      131088 | NULL     | NULL   |      | BTREE      |         |               |
| member_info |          0 | uk_member_id               |            1 | member_id         | A         |      131824 | NULL     | NULL   |      | BTREE      |         |               |
| member_info |          1 | idx_create_time            |            1 | create_time       | A         |        6770 | NULL     | NULL   |      | BTREE      |         |               |
+------------------+------------+----------------------------+--------------+-------------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
#Table： 表名
#Non_unique ：是否为unique index，0-是，1-否。
#Key_name：索引名称
#Seq_in_index：索引中的顺序号，单列索引-都是1；复合索引-根据索引列的顺序从1开始递增。
#Column_name：索引的列名
#Collation：排序顺序，如果没有指定asc/desc，默认都是升序ASC。
#Cardinality：索引基数-索引列唯一值的个数。
#sub_part：前缀索引的长度；例如index (member_name(10)，长度就是10。
#Packed：索引的组织方式，默认是NULL。
#Null：YES:索引列包含Null值；'':索引不包含Null值。
#Index_type：默认是BTREE，其他的值FULLTEXT，HASH，RTREE。
#Comment：在索引列中没有被描述的信息，例如索引被禁用。
#Index_comment：创建索引时的备注。
```

### 前缀索引

对于变长字符串类型varchar(m)，为了减少key\_len，可以考虑创建前缀索引，但是前缀索引不能消除group by， order by带来排序开销。如果字段的实际最大值比m小很多，建议缩小字段长度。

```SQL
alter table member_info add index idx_member_name_part(member_name(10));
```

### 复合索引顺序

有很多人喜欢在创建复合索引的时候，总以为前导列一定是唯一值多的列，例如索引index idx\_create\_time\_status(create\_time, status)，这个索引往往是无法命中，因为扫描的IO次数太多，总体的cost的比全表扫描还大，CBO最终的选择是走full table scan。

MySQL遵循的是索引最左匹配原则，对于复合索引，从左到右依次扫描索引列，到遇到第一个范围查询（>=, >,<, <=, between ….. and ….）就停止扫描，索引正确的索引顺序应该是index idx\_status\_create\_time(status, create\_time)。

```SQL
select account_no, balance from accounts where status = 1 and create_time between '2020-09-01 00:00:00' and '2020-09-30 23:59:59';
```

### 时间列索引

对于默认字段created\_at(create\_time)、updated\_at(update\_time)这种默认就应该创建索引，这一般来说是默认的规则。

## SQL优化案例

通过对慢查询的监控告警，经常发现一些SQL语句where过滤字段都有索引，但是由于SQL写法的问题导致索引失效，下面二个案例告诉大家如何通过SQL改写来查询。可以通过以下SQL来捞取最近5分钟的慢查询进行告警。

```SQL
select CONCAT( '# Time: ', DATE_FORMAT(start_time, '%y%m%d %H%i%s'), '\n', '# User@Host: ', user_host, '\n', '# Query_time: ', TIME_TO_SEC(query_time),  '  Lock_time: ', TIME_TO_SEC(lock_time), '  Rows_sent: ', rows_sent, '  Rows_examined: ', rows_examined, '\n', sql_text, ';' ) FROM mysql.slow_log where start_time between current_timestamp and date_add(CURRENT_TIMESTAMP,INTERVAL -5 MINUTE);
```

### 慢查询SQL

```SQL
| 2020-10-02 19:17:23 | w_mini_user[w_mini_user] @  [10.200.20.11] | 00:00:02   | 00:00:00  |         9 |        443117 | mini_user |              0 |         0 | 168387936 | select id,club_id,reason,status,type,created_time,invite_id,falg_admin,file_id from t_user_msg where 1 and (team_id in (3212) and app_id is not null) or (invite_id=12395 or applicant_id=12395) order by created_time desc limit 0,10; | 1219921665 |
```

从慢查询slow\_log可以看到，执行时间2s，扫描了443117行，只返回了9行，这是不合理的。

### SQL分析

```SQL
#原始SQL，频繁访问的接口，目前执行时间2s。
select id,team_id,reason,status,type,created_time,invite_id,falg_admin,file_id from t_user_msg where 1 and (team_id in (3212) and app_id is not null) or (invite_id=12395 or app_id=12395) order by created_time desc limit 0,10;

#执行计划
+----+-------------+--------------+-------+---------------------------------+------------+---------+------+------+-------------+
| id | select_type | table        | type  | possible_keys                   | key        | key_len | ref  | rows | Extra       |
+----+-------------+--------------+-------+---------------------------------+------------+---------+------+------+-------------+
|  1 | SIMPLE      | t_user_msg | index | invite_id,app_id,team_id | created_time | 5       | NULL |   10 | Using where |
+----+-------------+--------------+-------+---------------------------------+------------+---------+------+------+-------------+
1 row in set (0.00 sec)
```

从执行计划可以看到，表上有单列索引invite\_id,app\_id,team\_id,created\_time，走的是create\_time的索引，而且type=index索引全扫描，因为create\_time没有出现在where条件后，只出现在order by后面，只能是type=index，这也预示着表数据量越大该SQL越慢，我们期望是走三个单列索引invite\_id，app\_id，team\_id，然后type=index\_merge操作。

按照常规思路，对于OR条件拆分两部分，分别进行分析。

```SQL
select id, ……. 
from t_user_msg 
where 1 and  **(team_id in (3212) and app_id is not null)** 
order by created_time desc limit 0,10;
```

从执行计划看走的是team\_id的索引，没有问题。

```SQL
| id | select_type | table        | type | possible_keys        | key     | key_len | ref   | rows | Extra                       |
+----+-------------+--------------+------+----------------------+---------+---------+-------+------+-----------------------------+
|  1 | SIMPLE      | t_user_msg | ref  | app_id,team_id | team_id | 8       | const |   30 | Using where; Using filesort |
```

再看另外一个sql语句：

```SQL
select id, ……. from t_user_msg where 1 and  **(invite_id=12395 or app_id=12395)** order by created_time desc limit 0,10;
```

从执行计划上看，分别走的是invite\_id,app\_id的单列索引，同时做了index\_merge合并操作，也没有问题。

```SQL
| id | select_type | table        | type        | possible_keys           | key                     | key_len | ref  | rows | Extra                                                             |
+----+-------------+--------------+-------------+-------------------------+-------------------------+---------+------+------+-------------------------------------------------------------------+
|  1 | SIMPLE      | t_user_msg | index_merge | invite_id,app_id | invite_id,app_id | 9,9     | NULL |    2 | Using union(invite_id,app_id); Using where; Using filesort |
```

**通过上面的分析，第一部分SQL走的执行计划走team\_id索引没问题，第二部分SQL分别走invite\_id,app\_id索引并且index\_merge也没问题，为什么两部分SQL进行OR关联之后走create\_time的单列索引呢，不应该是三个单列索引的index\_merge吗？**

**index\_merge默认是在优化器选项是开启的，主要是将多个范围扫描的结果集合并成一个，可以通过变量查看。**

```SQL
mysql >select @@optimizer_switch;
| index_merge=on,index_merge_union=on,index_merge_sort_union=on,index_merge_intersection=on,
```

其他三个字段都传入的是具体的值，而且都走了相应的索引，只能怀疑app\_id is not null这个条件影响了CBO对最终执行计划的选择，去掉这个条件来看执行计划，竟然走了三个单列索引且type=index\_merge，那下面只要搞定**app\_id is not null**这个条件就OK了吧。

```SQL
| id | select_type | table        | type        | possible_keys                   | key                             | key_len | ref  | rows | Extra                                                                     |
+----+-------------+--------------+-------------+---------------------------------+---------------------------------+---------+------+------+---------------------------------------------------------------------------+
|  1 | SIMPLE      | t_user_msg | index_merge | invite_id,app_id,teadm_id | team_id,invite_id,app_id | 8,9,9   | NULL |   32 | Using union(team_id,invite_id,app_id); Using where; Using filesort |
```

### SQL改写

通过上面分析得知，条件app\_id is not null影响了CBO的选择，下面进行改造。

**改写优化1**

根据SQL开发规范改写，将OR改写成Union All方式即可，最终的SQL如下：

```SQL
select id, ……. from (
select id, ……. from t_user_msg where **1 and (club_id in (5821) and applicant_id is not null)**
        **union all** select id, ……. from t_user_msg where **1 and invitee_id='146737'**
        **union all** select id, ……. from  t_user_msg where **1 and app_id='146737'**
       ) as a order by created_time desc limit 0,10;
```

一般情况下，Java代码和SQL是分开的，SQL是配置在xml文件中，根据业务需求，除了team\_id是必填，其他两个都是可选的，所以这种改写虽然能提高SQL执行效率，但不适合这种业务场景。

**改写优化2**

app\_id is not null 改写为**IFNULL(app\_id, 0) >0)**，最终的SQL为：

```SQL
select id,team_id,reason,status,type,created_time,invite_id,falg_admin,file_id from t_user_msg where 1 and (team_id in (3212) and **IFNULL(app_id, 0) >0)**) or (invite_id=12395 or app_id=12395) order by created_time desc limit 0,10;
```

**改写优化3**

将字段app\_id bigint(20) DEFAULT NULL，变更为app\_id bigint(20) **NOT NULL DEFAULT 0**，同时更新将app\_id is null的时候全部更新成0，就可以将条件app\_id is not null 转换为app\_id > 0，最终的SQL为：

```SQL
select id,team_id,reason,status,type,created_at,invite_id,falg_admin,file_id 
from t_user_msg 
where 1 and (team_id in (3212) and **app_id > 0)**) or (invite_id=12395 or app_id=12395) 
order by created_time desc limit 0,10;
```

从执行计划看，两种改写优化方式都走三个单列索引，执行时间从2s降低至10ms，线上采用的是**优化1**的方式，如果一开始能遵循MySQL开发规范就就会避免问题的发生。

## 总结

上面介绍了SQL规范性检查，表结构检查，索引检查以及通过SQL改写来优化查询，在编写代码的过程，如果能提前做这些规范性检查，评估出自己认为理想的执行计划，然后通过explain解析出MySQL CBO的执行计划，两者做对比分析差异，弄清楚自己的选择和CBO的不同，不但能够编写高质量的SQL，同时也能清楚CBO的工作原理。

> 文章持续更新，可以微信搜一搜「 **三太子敖丙** 」第一时间阅读，回复【**资料**】有我准备的一线大厂面试资料和简历模板，本文 **GitHub** [github.com/JavaFamily](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FAobingJava%2FJavaFamily "https://github.com/AobingJava/JavaFamily") 已经收录，有大厂面试完整考点，欢迎Star。
