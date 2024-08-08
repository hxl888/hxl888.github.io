# nginx
### nginx 的安装

```
下载地址: http://nginx.org/download/nginx-1.4.2.tar.gz
安装准备: nginx依赖于pcre库,要先安装pcre
yum install pcre pcre-devel
 cd /usr/local/src/
 wget http://nginx.org/download/nginx-1.4.2.tar.gz
tar zxvf nginx-1.4.2.tar.gz 
cd nginx-1.4.2
./configure --prefix=/usr/local/nginx
make && make install

```

### 启动:

```
cd /ulsr/local/nginx, 看到如下4个目录
./
 ....conf 配置文件  
 ... html 网页文件
 ...logs  日志文件 
 ...sbin  主要二进制程序

[root@localhost nginx]# ./sbin/nginx 
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
....
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] still could not bind()

```
不能绑定80端口,80端口已经被占用
(有时是自己装了apache,nginx等,还有更多情况是操作系统自带了apache并作为服务启动)
解决: 把占用80端口的软件或服务关闭即可.



### Nginx的信号控制

```
TERM, INT	Quick shutdown QUIT	Graceful shutdown  优雅的关闭进程,即等请求结束后再关闭；

HUP	Configuration reload ,Start the new worker processes with
 a new configuration Gracefully shutdown the old worker processes
 
改变配置文件,平滑的重读配置文件:

USR1	Reopen the log files 重读日志,在日志按月/日分割时有用

USR2	Upgrade Executable on the fly 平滑的升级

WINCH	Gracefully shutdown the worker processes 优雅关闭旧的进程(配合USR2来进行升级)


具体语法:
Kill -信号选项 nginx的主进程号
Kill -HUP 4873

Kill -信号控制 `cat /xxx/path/log/nginx.pid`

Kil; -USR1 `cat /xxx/path/log/nginx.pid`

```

### Nginx配置段

```
// 全局区
worker_processes 1; // 有1个工作的子进程,可以自行修改,但太大无益,因为要争夺CPU,一般设置为 CPU数*核数

Event {
// 一般是配置nginx连接的特性
// 如1个word能同时允许多少连接
 worker_connections  1024; // 这是指 一个子进程最大允许连1024个连接
}

http {  //这是配置http服务器的主要段
     Server1 { // 这是虚拟主机段
       
            Location {  //定位,把特殊的路径或文件再次定位 ,如image目录单独处理
            }             /// 如.php单独处理

     }

     Server2 {
     }
}


例子1: 基于域名的虚拟主机

    server {
        listen 80;  #监听端口
        server_name a.com; #监听域名

        location / {
                root /var/www/a.com;   #根目录定位
                index index.html;
        }
    }

例子2: 基于端口的虚拟主机配置

    server {
        listen 8080;
        server_name 192.168.1.204;

        location / {
                root /var/www/html8080;
                index index.html;
        }
    }
日志管理


我们观察nginx的server段,可以看到如下类似信息
 #access_log  logs/host.access.log  main;
这说明 该server, 它的访问日志的文件是  logs/host.access.log ,
使用的格式”main”格式.
除了main格式,你可以自定义其他格式.

main格式是什么?
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

main格式是我们定义好一种日志的格式,并起个名字,便于引用.
以上面的例子, main类型的日志,记录的 remote_addr.... http_x_forwarded_for等选项.


1: 日志格式 是指记录哪些选项
默认的日志格式: main
     log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                            '$status $body_bytes_sent "$http_referer" '
                            '"$http_user_agent" "$http_x_forwarded_for"';

如默认的main日志格式,记录这么几项
远程IP- 远程用户/用户时间 请求方法(如GET/POST) 请求体body长度 referer来源信息
http-user-agent用户代理/蜘蛛 ,被转发的请求的原始IP

http_x_forwarded_for:在经过代理时,代理把你的本来IP加在此头信息中,传输你的原始IP



2: 声明一个独特的log_format并命名

    log_format  mylog '$remote_addr- "$request" '
                     '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';
在下面的server/location,我们就可以引用 mylog

在server段中,这样来声明
Nginx允许针对不同的server做不同的Log ,(有的web服务器不支持,如lighttp)

access_log logs/access_8080.log mylog;   
声明log   log位置          log格式;

实际应用: shell+定时任务+nginx信号管理,完成日志按日期存储
分析思路: 
凌晨00:00:01,把昨天的日志重命名,放在相应的目录下
再USR1信息号控制nginx重新生成新的日志文件


```

### 具体脚本:

```
#!/bin/bash
base_path='/usr/local/nginx/logs'
log_path=$(date -d yesterday +"%Y%m")
day=$(date -d yesterday +"%d")
mkdir -p $base_path/$log_path
mv $base_path/access.log $base_path/$log_path/access_$day.log
#echo $base_path/$log_path/access_$day.log
kill -USR1 `cat /usr/local/nginx/logs/nginx.pid`


```
### 定时任务

```
Crontab 编辑定时任务
01 00 * * * /xxx/path/b.sh  每天0时1分(建议在02-04点之间,系统负载小)

```

### location 语法

```
location 有”定位”的意思, 根据Uri来进行不同的定位.
在虚拟主机的配置中,是必不可少的,location可以把网站的不同部分,定位到不同的处理方式上.
比如, 碰到.php, 如何调用PHP解释器?  --这时就需要location
location 的语法
location [=|~|~*|^~] patt {
}
中括号可以不写任何参数,此时称为一般匹配
也可以写参数
因此,大类型可以分为3种
location = patt {} [精准匹配]
location patt{}  [一般匹配]
location ~ patt{} [正则匹配]

```
### 如何发挥作用?:
首先看有没有精准匹配,如果有,则停止匹配过程.

```
location = patt {
    config A
}
如果 $uri == patt,匹配成功，使用configA
   location = / {
              root   /var/www/html/;
             index  index.htm index.html;
        }
         
  location / {
             root   /usr/local/nginx/html;
            index  index.html index.htm;
  }

如果访问　　http://xxx.com/
定位流程是　
1: 精准匹配中　”/”   ,得到index页为　　index.htm
2: 再次访问 /index.htm , 此次内部转跳uri已经是”/index.htm” , 
根目录为/usr/local/nginx/html
3: 最终结果,访问了 /usr/local/nginx/html/index.htm

再来看,正则也来参与.
location / {
            root   /usr/local/nginx/html;
            index  index.html index.htm;
        }

location ~ image {
           root /var/www/image;
           index index.html;
}

如果我们访问  http://xx.com/image/logo.png
此时, “/” 与”/image/logo.png” 匹配
同时,”image”正则 与”image/logo.png”也能匹配,谁发挥作用?
正则表达式的成果将会使用.

图片真正会访问 /var/www/image/logo.png 

location / {
             root   /usr/local/nginx/html;
             index  index.html index.htm;
         }
 
location /foo {
            root /var/www/html;
             index index.html;
}
我们访问 http://xxx.com/foo
 对于uri “/foo”,   两个location的patt,都能匹配他们
即 ‘/’能从左前缀匹配 ‘/foo’, ‘/foo’也能左前缀匹配’/foo’,
此时, 真正访问 /var/www/html/index.html 
原因:’/foo’匹配的更长,因此使用之.;

```


### rewrite 重写


```
重写中用到的指令
if  (条件) {}  设定条件,再进行重写 
set #设置变量
return #返回状态码 
break #跳出rewrite
rewrite #重写


If  语法格式
If 空格 (条件) {
    重写模式
}

条件又怎么写?
答:3种写法
1: “=”来判断相等, 用于字符串比较
2: “~” 用正则来匹配(此处的正则区分大小写)
   ~* 不区分大小写的正则
3: -f -d -e来判断是否为文件,为目录,是否存在.

例子:

            if  ($remote_addr = 192.168.1.100) {
                return 403;
            }


 if ($http_user_agent ~ MSIE) {
                rewrite ^.*$ /ie.htm;
                break; #(不break会循环重定向)
 }

             if (!-e $document_root$fastcgi_script_name) {
                rewrite ^.*$ /404.html break;
            } 
            注, 此处还要加break,
以 xx.com/dsafsd.html这个不存在页面为例,
我们观察访问日志, 日志中显示的访问路径,依然是GET /dsafsd.html HTTP/1.1
提示: 服务器内部的rewrite和302跳转不一样. 
跳转的话URL都变了,变成重新http请求404.html, 而内部rewrite, 上下文没变,
就是说 fastcgi_script_name 仍然是 dsafsd.html,因此 会循环重定向.
set 是设置变量用的, 可以用来达到多条件判断时作标志用.
达到apache下的 rewrite_condition的效果

如下: 判断IE并重写,且不用break; 我们用set变量来达到目的
if ($http_user_agent ~* msie) {
                set $isie 1;
            }

            if ($fastcgi_script_name = ie.html) {
                set $isie 0;
            }

            if ($isie 1) {
                rewrite ^.*$ ie.html;
            }


```


### Rewrite语法


```
Rewrite 正则表达式  定向后的位置 模式

Goods-3.html ---->Goods.php?goods_id=3
goods-([\d]+)\.html ---> goods.php?goods_id =$1  

location /ecshop {
index index.php;
rewrite goods-([\d]+)\.html$ /ecshop/goods.php?id=$1;
rewrite article-([\d]+)\.html$ /ecshop/article.php?id=$1;
rewrite category-(\d+)-b(\d+)\.html /ecshop/category.php?id=$1&brand=$2;

rewrite category-(\d+)-b(\d+)-min(\d+)-max(\d+)-attr([\d\.]+)\.html /ecshop/category.php?id=$1&brand=$2&price_min=$3&price_max=$4&filter_attr=$5;

rewrite category-(\d+)-b(\d+)-min(\d+)-max(\d+)-attr([\d+\.])-(\d+)-([^-]+)-([^-]+)\.html /ecshop/category.php?id=$1&brand=$2&price_min=$3&price_max=$4&filter_attr=$5&page=$6&sort=$7&order=$8;
}

注意:用url重写时, 正则里如果有”{}”,正则要用双引号包起来

```

### 网页内容的压缩编码与传输速度优化


```
我们观察news.163.com的头信息
请求:
Accept-Encoding:gzip,deflate,sdch
响应:
Content-Encoding:gzip
Content-Length:36093
再把页面另存下来,观察,约10W字节,实际传输的36093字节
原因-------就在于gzip压缩上.

原理: 
浏览器---请求----> 声明可以接受 gzip压缩 或 deflate压缩 或compress 或 sdch压缩
从http协议的角度看--请求头 声明 acceopt-encoding: gzip deflate sdch  (是指压缩算法,其中sdch是google倡导的一种压缩方式,目前支持的服务器尚不多)
服务器-->回应---把内容用gzip方式压缩---->发给浏览器
浏览<-----解码gzip-----接收gzip压缩内容----

推算一下节省的带宽:
假设 news.163.com  PV  2亿
2*10^8  *  9*10^4 字节 == 
2*10^8 * 9 * 10^4  * 10^-9 = 12*K*G = 18T
节省的带宽是非常惊人的

gzip配置的常用参数
gzip on|off;  #是否开启gzip
gzip_buffers 32 4K| 16 8K #缓冲(压缩在内存中缓冲几块? 每块多大?)
gzip_comp_level [1-9] #推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)
gzip_disable #正则匹配UA 什么样的Uri不进行gzip
gzip_min_length 200 # 开始压缩的最小长度(再小就不要压缩了,意义不在)
gzip_http_version 1.0|1.1 # 开始压缩的http协议版本(可以不设置,目前几乎全是1.1协议)
gzip_proxied          # 设置请求者代理服务器,该如何缓存内容
gzip_types text/plain  application/xml # 对哪些类型的文件用压缩 如txt,xml,html ,css
gzip_vary on|off  # 是否传输gzip压缩标志


注意: 
图片/mp3这样的二进制文件,不必压缩
因为压缩率比较小, 比如100->80字节,而且压缩也是耗费CPU资源的.
比较小的文件不必压缩,
```

### nginx的缓存设置  提高网站性能


```
对于网站的图片,尤其是新闻站, 图片一旦发布, 改动的可能是非常小的.我们希望 能否在用户访问一次后, 图片缓存在用户的浏览器端,且时间比较长的缓存.
可以, 用到 nginx的expires设置 .
nginx中设置过期时间,非常简单,
在location或if段里,来写.
格式  expires 30s;
      expires 30m;
      expires 2h;
      expires 30d;
(注意:服务器的日期要准确,如果服务器的日期落后于实际日期,可能导致缓存失效)
另: 304 也是一种很好的缓存手段
原理是: 服务器响应文件内容是,同时响应etag标签(内容的签名,内容一变,他也变), 和 last_modified_since 2个标签值
浏览器下次去请求时,头信息发送这两个标签, 服务器检测文件有没有发生变化,如无,直接头信息返回 etag,last_modified_since
浏览器知道内容无改变,于是直接调用本地缓存.
这个过程,也请求了服务器,但是传着的内容极少.
对于变化周期较短的,如静态html,js,css,比较适于用这个方式
 
nginx反向代理服务器+负载均衡
用nginx做反向代理和负载均衡非常简单,
支持两个用法 1个proxy, 1个upstream,分别用来做反向代理,和负载均衡
以反向代理为例, nginx不自己处理php的相关请求,而是把php的相关请求转发给apache来处理.

```
![nginx-描述1](https://note.youdao.com/yws/api/personal/file/WEBa4c028483506641fd14ceae318bd5f30?method=download&shareKey=7e9bf161fc9724eff11c62276755db49)


```
---这不就是传说的”动静分离”,动静分离不是一个严谨的说法,叫反向代理比较规范.

反向代理后端如果有多台服务器,自然可形成负载均衡,
但proxy_pass如何指向多台服务器?
把多台服务器用 upstream指定绑定在一起并起个组名,
然后proxy_pass指向该组

默认的均衡的算法很简单,就是针对后端服务器的顺序,逐个请求.
也有其他负载均衡算法,如一致性哈希,需要安装第3方模块.

```

### Nginx具体的压缩配置

```
常用以下配置
gzip on|off
gzip_buffers 4K|8K 缓冲(和硬盘块相当)
gzip_comp_level [1-9] 推荐6
gzip_disable 正则匹配如User-Agent,针对古老浏览器不压缩
gzip_min_length 200
gzip_http_version 1.0|1.1
gzip_types text/plain , application/xml (各mime之间,一定要加空格,不是逗号)
gzip_vary on|off

```
### Vary的作用:
![Vary的作用](https://note.youdao.com/yws/api/personal/file/WEB8744484d9ae930366d52001737b6c3ad?method=download&shareKey=81b2490f082f0a38b670ad8a8977bcb9)


### Nginx对于图片,js等静态文件的缓存设置


```
注:这个缓存是指针对浏览器所做的缓存,不是指服务器端的数据缓存.

主要知识点: location expires指令

        location ~ \.(jpg|jpeg|png|gif)$ {
            expires 1d;
        }
        location ~ \.js$ {
           expires 1h;
        }

设置并载入新配置文件,用firebug观察,
会发现 图片内容,没有再次产生新的请求,原因--利用了本地缓存的效果.


注: 在大型的新闻站,或文章站中,图片变动的可能性很小,建议做1周左右的缓存
Js,css等小时级的缓存.


如果信息流动比较快,也可以不用expires指令,
用last_modified, etag功能(主流的web服务器都支持这2个头信息)
原理是:
响应: 计算响应内容的签名, etag 和 上次修改时间
请求: 发送 etatg, If-Modified-Since 头信息.
服务器收到后,判断etag是否一致, 最后修改时间是否大于if-Modifiled-Since 
如果监测到服务器的内容有变化,则返回304,
浏览器就知道,内容没变,直接用缓存.


304 比起上面的expires 指令
多了1次请求,
但是比200状态,少了传输内容.

```


### Nginx反向代理与负载均衡
正向代理

![Nginx反向代理与负载均衡
正向代理](https://note.youdao.com/yws/api/personal/file/WEBf56a924e638a710b9bd3a4a15623a47e?method=download&shareKey=91ca14d1c16ef6577f58e00fadc49b5d)

```
具体的负载均衡的方式
注意:负载均衡是一种方案,实现办法有DNS轮询,
如下图,DNS服务器允许一个域名有多个A记录,
那么在用户访问时,一般按地域返回一个较近的解析记录.
这样,全国不同的地区的用户,看到的163的主页,来自不同的服务器.


第二步: 当 解析出结果,比如浏览器连接60.217时,
这台主机后面还有N台,也要做负载均衡.

1: 硬件上做负载均衡, F5 BIG-IP ,硬件负载均衡(很贵).
直接从TCP/IP的底层协议上,直接做数据包的中转.
2: 软件负载均衡, LVS 
3: 反向代理+负载均衡


```

### Nginx反向代理设置


```
例: 把图片重写到 8080端口(既然能写到8080端口,就意味着可以写到其他独立服务器上)
        location ~ \.(jpg|jpeg|png|gif)$ {
                proxy_pass http://192.168.1.204:8080;
                expires 1d;
        }

集群与均衡-----如果后端的服务器非常多,该如何写? 又如何均匀的分发任务

```

### nginx 与memcached的组合

```
用法: nginx响应请求时,直接请求memcached,
如果没有相应的内容,再回调PHP页面,去查询database,并写入memcached.

分析: memcached是k/v存储, key-->value,
nginx请求memecached时,用什么做key?
一般用 uri arg 做key,  如 /abc.php?id=3

```
### Nginx 第三方模块的安装

```
以ngx_http_php_memcache_standard_balancer-master为例
1:解压 到 path/ngx_module

配置:
./configure --prefix=/xxx/xxx --add_module=/path/ngx_module
编译 安装
Make && make instal

配置memcache集群

    upstream memserver {  把用到的memcached节点,声明在一个组里
        hash_key $request_uri;  // hash计算时的依据,以uri做依据来hash
        server localhost:11211;
        server localhost:11212;
    }
Location里

        location / {
           # root   html;
           set $memcached_key $uri;
           memcached_pass memserver;  // memserver为上面的memcache节点的名称
           error_page 404 /writemem.php;
           index  index.php index.html index.htm;
        }

在nginx中做集群与负载均衡,步骤都是一样的
Upstream {}模块 把多台服务器加入到一个组
然后 memcached_pass, fastcgi_pass, proxy_pass ==> upstream组

默认的负载均衡的算法:
是设置计数器,轮流请求N台服务器.
可以安装第3方模式,来利用uri做hash等等.

如http://wiki.nginx.org/NginxHttpUpstreamConsistentHash 
这个模块就是用一致性hash来请求后端结节,并且其算法,与PHP中的memcache模块的一致性hash算法,兼容.

```

### 安装该模块后:

```
Nginx.conf中

    upstream memserver {
        consistent_hash $request_uri;
        server localhost:11211;
        server localhost:11212;
    }

```
