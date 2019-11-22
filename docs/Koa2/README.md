# mysql环境搭建
>主要记录mysql本地环境搭建以及中途遇到的一些问题以及解决办法

### 去官网下载mysql压缩包
[下载地址](https://dev.mysql.com/downloads/mysql/)

下载完毕后，解压到任意文件夹下如:F:\mysql\mysql-8.0.17-winx64


### 初始化mysql
 + 配置my.ini
 >进入解压的主目录,新建my.ini文件 如下:
```
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=F:\\mysql\\mysql-8.0.17-winx64
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
# datadir=F:\\mysql\\mysql\\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎  
default-storage-engine=INNODB
```
+ 初始化mysql
> 管理员模式打开CMD命令行,进入mysql解压所在的bin目录,执行
+ 安装mysqld
```shell
mysqld install
```
>稍等会出现successfully字样,即安装成功,在执行初始化命令
```
mysqld --initialize --console
```
> 稍等执行完毕会有初始密码，记得保存后边要用到,如果没有记住，可以删掉主目录下data文件，重新执行即可，如下:
```
2019-07-29T02:31:38.997142Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: bt>=lj_hH8-D
```
+ 启动mysql服务
```
net start mysql
```
>等待出现启动成功提示信息即mysql初始化已成功

### 登录以及修改密码
+ 登录
```
mysql -u root -p
```
+ 修改密码
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的密码';
```

### 一些常用指令(待补充)
+ 显示数据库
```
show databases
```
+ 切换数据库
```
cd 数据库名
```

+ 显示表结构
```
show 表名
```
+ 增
```
insert into `user` (id, name, psw) values (null, 'name', 'psw');
```
+ 删
```
DELETE FROM `user` WHERE id = 2
```

+ 改
```
update `user` SET psw = '52she' WHERE id = 1
```

+ 查
```
select * from user(表);
```

### node中使用mysql
+ 引入mysql模块
```
 npm install mysql
cnpm install mysql
```


### 配置环境变量
> 在系统环境面板中 系统变量PATH中新增mysql所在的bin目录




# koa2