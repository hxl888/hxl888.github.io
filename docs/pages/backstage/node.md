#  nodejs笔记

```
const express = require('express');
const bodyParser = require('body-parser'); // 中间件（只能解析普通的post数据不能解析上传文件数据）
get - 无需中间件
req.query
post - 需要body-parser
server.use(bodyParser.urlencoded({
    extended: false, // 扩展模式
    limit: 2*1024 // 限制2M
}));
server.use(function(req, res){
    console.log(res.body);
});
```
### 链式操作

```
server.use('/', function(req,res,next){
    console.log(a);
    next();
})
server.use('/', function(req,res,next){
    console.log(b);
})
```

```
server.use(function(req, res, next){
    req.body = { };
 })
```
### cookie / cookie-session 

```
// cookie
const cookieParser = require('cookie-parser');
server.use(cookieParser('sfjlfjls3')); // 签名
server.uer('/', function(){
    req.secret='sfjlfjls3'; // 后台签名 cookieParser('sfjlfjls3')写完之后此处可以不写
    res.cookie('user', 'blue', {signed: true, path: '', maxAge: ''}); // 签名
    
    res.clearCookie('user'); // 删除cookie
    console.log('无签名cookie', req.cookies); 
    console.log('签名cookie', req.singnedCookies);
    res.send('ok');
});
server.listen(8080);

cookie加密 cookie-encrypter 

// cookie-session 存在于服务器 不能独立存在，基于cookie
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
server.use(cookieParser());
server.use(cookieSession({
    name: 'sess', // 名字随便定义
    keys: ['aa', 'bb', 'cc']，// 数组越长越安全
    maxAge: 2*3600*1000 // 例如两个小时
}));
server.uer('/', function(){
    if (req.sesion['count' == nll]) {
        req.session['count'] = 1;
    } else {
        req.session['count']++;
    }
    delete req.session['count']; // 删除session
    console.log(req.session['count']);
    console.log(req.session);
    res.send('ok'); 
});


```

### nodejs模板引擎

```
两个主流模板：
jade - 破坏式、侵入式、强依赖
ejs  - 温和非侵入式、若依赖


=============jade=================
可以识别单双标签！
1.根据缩进规定层级；
2.属性放在括号里逗号分隔: 
       例如:script(src='a.js') 
            link(href='a.css', ref='')
            input(type='text', id ='', value='')
            a(href='www.baidu.com') 链接名
            
3.内联样式: div(style='width:200px;height:100px') 或
            div(style={width: '200px', height: '100px'}) // json只试用style属性的才能用json
            
4.class名:  div(class='aa bb cc')或
            div(class=['aa', 'bb', 'cc'])
            div.class
            ***title不能用数组***
            
5.id名:     div#id
            div&attributes({title: '', id: ''}); // 加上'&
            '符号才可以用json写上title
             

const jade = require('jade');
 // var str = jade.render('html');
 var str = jade.renderFile('./view/1.jade', {pretty: true});
 // pretty 美化输入的html
console.log(str);

=============ejs=================
const ejs = require('ejs');
ejs.renderFile('./view/1.ejs', {}, function(err, data){
    if (err) {
        console.log('编译失败');
    } else {
        console.log(data);
    }
});
```


### ejs

```
const ejs = require('ejs');
ejs.renderFile('.view/1.ejs',{}, function(err, data){
    console.log(data);
})
ejs模板输入形式
<%= 变量名 吧%>
<%  var str = '<div></div>'; %>

<%- str %> // '-'号为不转义输入 ；'='为为转义输入；
<% include ./a.txt %> // 引入文件

=====include写法====

<% if(type == 'admin') {%>
<% include ../style/admin.css %>
<%} else {%>
<% include ../style/user.css %>
<% } %>

```

### 实践区

```
enctype='multipart/form-data' // 处理文件上传用的
<form enctype='multipart/form-data' methods='post'>
    <input type='file' />
</form>

需要用到npm模块 multer(处理multipart/form-data表单)!

const pathLib = require('path');
const bodyParser = require('body-parser');
cosnt fs = require('fs');
const multer = require('multer'); // 解析post文件


server.use(multer({dest: './www/unpload/'}).any());  
server.use(bodyParse.urlencode(({extended: false}));
******
body-parser 解析post数据 application/x-www-form-urlencoded
用法: 
multer       解析post文件 multipart/form-data

******

multer用法如下:
server.use(multer().any());         // 任何文件上传
server.use(multer().single('f1'));  // 指定文件上传

--------------------------------------
server.post('/', function(req, res){
    console.log(req.files); // 上传文件信息
});
server.use(function(req, res){
    req.files[0].originalname
    req.files[0].path
});
给文件加上扩展名==》
var newName = file.path + pathLib.parse(file.originalname).ext;
});
---------------------------------------

```


### consolidate-适配模板引擎(ejs、jade...)

```
const consolidate = require('consolidate');
1.用的哪种模板引擎 2.模板引擎放哪了 3.输入什么东西
全局配置
server.set('view engine', 'html');      // 输入什么东西
server.set('views', './views');         // 模板引擎放哪了
server.engine('html', consolodata.ejs); // 用的哪种模板引擎

server.get('/', function(){
    if (req.session.userid){            // 登录过
        res.render('1.ejs', {name: 'blue'));
        render()                        // 编译模板
        send()                          // 直接返回
    } else {                            // 没有登录
        res.render('login.ejs', {});
    }
});

```

### node路由

```
const express = require('express');
var server = express();
var routeUser = express.Router();
routeUser.get('/1.html', function(req, res){
    res.send('user1');
};
server.use('/user', routerUser);
server.listen(8000);
 
```

### *********************数据-数据库*********************

```
关系型:
MYSQL、Oracle、SQLServer、Access、db2、fox、pro

MySQL:
免费、中小网站
优点: 性能非常不错
确定: 集群、容灾稍微弱一些

Oracle:
挺贵、大型应用、金融级
优点: 性能非常不错、集群、容灾非常强
确定: 挺贵


文件型:
sqlite、mongodb

空间型:

==================
server端:
数据存在

clinent端:
管理工具、Node
==================

数据基本概念:
两种单位: 
1.库: 文件夹-用来管理,本身没法存数据
2.表: 文件  -存数据的
主键：唯一、性能高、唯一标识符

```
### mysql数据库连接

```
const mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '数据库名字'
});
console.log(db);

2.查询
db.query('mysql查询语句',function(err, data){
    console.log(data);
});
3.SQL: 查询语句
1.关键字大写;
2.库、表、字段需要加上反单引号``;

增: INSERT INTO 表 (字段列表) VALUES(值列表)
    INSERT INTO user_table (ID, username, password) VALUES(0, 'blue', '123456');
删: DELETE FROM 表 WHERE 条件
改: UPDATE 表 SET 字段=值，字段，。。。 WHERE 条件
查: SELECT * FROM 表 WHERE 条件

=============================================
#### 字句!!!: 

1.WHERE: 条件
SHERE name='blue'
WHERE age>13
WHERE age<=18
WHERE age>=18 AND score<60 (例如:大于18岁小于60分的同学。。。)
WHERE cach>100 OR score>10000

**********

2.ORDER: 排序--多条件排序
ORDER BY age ASC/DESC  (ASC:升序，DESC:降序)
ORDER BY price EDSC (价格降序排列)
*价格（price）升序排序，如果价格相同，再按销量（sales）降序排序
ORDER BY price ASC, sales DESC   (中间加逗号，如果前一个没有排序成功就按着后面的条件进行排序)

**********

3.GROUP 聚类-合并相同的 COUNT 、MIN、MAX、AVG
*统计每个班人数
ID class  name  ---》表结构(student_table)
COUNT:计数
SELECT COUNT(*) FROM student_table; （总计人数）
SELECT * FROM student_table GROUP BY class;(以班级作为组划分人数 class为班级, 只会打印出来前排的去重班级之后的的几个人)
SELECT class FROM student_table GROUP BY class;(只会打印出来对应的班级去重重班级之后之后的对应班级号)
SELECT class,COUNT(class) FROM student_table GROUP BY class;(只会打印出来对应班级相同的次数 class：班级名，COUNT(class): 数字)；

**********

SELECT * FROM student_table;
SELECT * FROM stuednt_table BY class;
SELECT class,AVG(score) FROM student_table GROUP BY class;(统计每个班的平均分)
SELECT class,MAX(score),MIN(score) FROM student_table GROUP BY class;(每个班级的最高、最低分)
SELECT name,SUM(price) FROM sales_table GROUP BY name ORDER BY SUM(price) DESC;(每个人的消费总额)

4.LINIMT 分页（比如每页20条数据的话）
第一页: 0，20 
第二页: 20,20
第三页: 40,20
第四页: 60,20
第n页: (n-1)*20,20

**子句间是用顺序的*:***
WHERE GROUP ORDER LIMINT

SELECT class,COUNT(class) FROM student_table 
WHERE score>60 
GROUP BY class 
ORDER BY COUNT(class) DESC 
LIMIT 2;(按班级里分数大于60分并且合并班级里大于60的人数，所有班级大于60人数多少进行降序排序，只请求2条数据每页)

```




# nodejs微信开发=======

### ngrok 使外界能够访问本地的方法
```
1.ngrok
2.nodejs 的 localtunnel服务
npm install -g localt unnel
lt --port 8000

3.PageKite 花生壳
```
### 项目开始start

##### 微信订阅号、服务号、企业号的区别：
![微信测试号管理](https://note.youdao.com/yws/api/personal/file/WEB16c29c3c8deaca2f4c45d289ceb31581?method=download&shareKey=e30488846939d7e7765868fc606ccf8b)

![微信测试号管理](https://note.youdao.com/yws/api/personal/file/WEBc2f4c0e449a1889b0b5b07c03528b26a?method=download&shareKey=dd2d178d3076db2a80b107902b9cded5)

```
运用koa起服务:
执行koa时需要在 —-harmony 模式下运行
node --harmony app.js
var Koa = require('koa');
var sha1 = require('sha1');
var config = {
    wechat: {
        appId: 'wx8d708ba3274d56f4',
        appsecret: '611fb2aa0b9ace244c13582337fa75cb',
        token: 'asdfsdfsdfsdffsfgrgf'
    }
};
var app = new Koa();
app.use(function *(next) {
    console.log('--->', this.query);
    var token = config.wechat.token;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;
    
    var signature = this.query.signature;
    var echostr = this.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    if (sha === signature) {
        this.body = echostr + ''
    } else {
        this.body = 'wrong';
    }
});

app.listen(1234);
console.log('listening: 1234');

```


### localtunnel优缺点

```
localtunnel的缺点有:
1.不支持自定义域名映射
2.映射以后，一旦本机服务终止，再重启以后，会失去这个映射链接

解决办法:
    在一台vpn上搭建一个自己的映射代理通道，这个开发难度比较大
    
替代方案:
    1.utralhook的服务：http://www.ultrahook.com/
    2.下载qq浏览器，在qq浏览器中有配套的解决方案
```

