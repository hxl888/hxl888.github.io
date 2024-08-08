# 坑中爬
### vue中app跳转碰到的问题：

1.在ios9以下的版本中浏览器中：
```
针对于http跳转到https域名的链接后面加参数的情况下，域名302重定向到https后会默认把http跳转之前url上拼接的参数给删除掉
```
2.vue中url跳转时：
```
例如this.$router.push({name:'list'， query: {type: 1}})；
list页面下去获取type时：
第一次跳转时候type是数字类型，再次刷新浏览器时type将变成String类型，要谨记！！！
```
3.ios中safari不兼容JavaScript中Date转化为时间戳的问题

```
低版本的Safari解释new Date('2013-10-21')这个对象不一样，在IOS5中的Safari不支持这种写法，而它支持的写法为newDate('2013','10','21'),这样写就能解决"Invalid Date"的问题，能返回一个Javascript Date回来了。
IOS5中的Safari能正确解析new Date()那么必须这么写new Date('2013/10/21');
```

4.ios低版本上css属性不兼容问题

```
此处为package.json尾部
"browserslist": [
    "> 1%",
    "last 2 versions",
    "iOS >= 7",
    "Android >= 4.1",
    "not ie <= 8"
  ]
 （ "iOS >= 7","Android >= 4.1"） 此处两句务必加上才起作用css才会兼容低版本浏览器！！！
```
