# mac配置
### mac 下的 tree命令终端展示你的目录树结构

```
1. vi .zshrc
2. alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
3. source .zshrc
```

### npm常用命令行

```
npm outdated 查看需要更新的版本
npm info <模块名> 模块版本信息简介
npm list -g --depth 0   npm查看全局安装过的包
```
### nrm 镜像地址管理工具

```
npm install / brew install nrm
nrm li 展示出来所有的镜像地址
nrm test 测试本地所有镜像地址速度
nrm use taobao 用法
```
