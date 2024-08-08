# git

拷贝ssh到服务器上
```powershell
ssh-copy-id root@188.131.134.233
```


# http://justcoding.iteye.com/blog/1830388 （转载网址，非本人原创）
git 命令行设置
```powershell
//配置使用git仓库的人员姓名.
git config --global user.name "Your Name Comes Here"  
  
//配置使用git仓库的人员email.
git config --global user.email you@yourdomain.example.com  
  
//配置到缓存 默认15分钟. 
git config --global credential.helper cache   
  
// 修改缓存时间.  
git config --global credential.helper 'cache --timeout=3600'    
  
git config --global color.ui true  
git config --global alias.co checkout  
git config --global alias.ci commit  
git config --global alias.st status  
git config --global alias.br branch  
git config --global core.editor "mate -w"
```

查看、添加、提交、删除、找回，重置修改文件

```powershell
git help <command>  // 显示command的help. 
git show            // 显示某次提交的内容.  
git show $id 
   
git co  -- <file>   // 抛弃工作区修改.  
git co  .           // 抛弃工作区修改.  
   
git add <file>      // 将工作文件修改提交到本地暂存区.  
git add .           // 将所有修改过的工作文件提交暂存区. 
   
git rm <file>       // 从版本库中删除文件.  
git rm <file> --cached  // 从版本库中删除文件，但不删除文件.  
   
git reset <file>    // 从暂存区恢复到工作文件.  
git reset -- .      // 从暂存区恢复到工作文件.  
git reset --hard    // 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改.  
   
git ci <file>  
git ci .  
git ci -a           // 将git add, git rm和git ci等操作都合并在一起做.  
git ci -am "some comments"  
git ci --amend      // 修改最后一次提交记录. 
   
git revert <$id>    // 恢复某次提交的状态，恢复动作本身也创建了一次提交对象.  
git revert HEAD     // 恢复最后一次提交的状态.  
```
查看文件diff

```powershell
git diff <file>     // 比较当前文件和暂存区文件差异.  
git diff  
git diff <$id1> <$id2>   // 比较两次提交之间的差异.  
git diff <branch1>..<branch2> // 在两个分支之间比较.  
git diff --staged   // 比较暂存区和版本库差异.  
git diff --cached   // 比较暂存区和版本库差异.  
git diff --stat     // 仅仅比较统计信息.  
```
查看提交记录

```powershell
git log  
git log <file>      // 查看该文件每次提交记录.  
git log -p <file>   // 查看每次详细修改内容的diff. 
git log -p -2       // 查看最近两次详细修改内容的diff.  
git log --stat      // 查看提交统计信息.
```

取得Git仓库

```powershell
// 初始化一个版本仓库.
git init  
  
// Clone远程版本库.  
git clone git@xbc.me:wordpress.git  
  
// 添加远程版本库origin，语法.
git remote add [shortname] [url]  
git remote add origin git@xbc.me:wordpress.git  
  
// 查看远程仓库.  
git remote -v  
```
提交你的修改

```powershell
// 添加当前修改的文件到暂存区.  
git add .  
  
// 如果你自动追踪文件，包括你已经手动删除的，状态为Deleted的文件.  
git add -u  
  
// 提交你的修改  
git commit –m "你的注释"  
  
// 推送你的更新到远程服务器,语法为 git push [远程名] [本地分支]:[远程分支].  
git push origin master  
  
// 查看文件状态.
git status  
  
// 跟踪新文件.  
git add readme.txt  
  
// 从当前跟踪列表移除文件，并完全删除.  
git rm readme.txt  
  
// 仅在暂存区删除，保留文件在当前目录，不再跟踪.  
git rm –cached readme.txt  
  
// 重命名文件.  
git mv reademe.txt readme  
  
// 查看提交的历史记录  
git log  
  
// 修改最后一次提交注释的，利用–amend参数. 
git commit --amend  
  
// 忘记提交某些修改，下面的三条命令只会得到一个提交.  
git commit –m &quot;add readme.txt&quot;  
git add readme_forgotten  
git commit –amend  
  
// 假设你已经使用git add .，将修改过的文件a、b加到暂存区.  
  
// 现在你只想提交a文件，不想提交b文件，应该这样.  
git reset HEAD b  
  
// 取消对文件的修改  
git checkout –- readme.txt  
```

查看、切换、创建和删除分支

```powershell
git br -r           // 查看远程分支.  
git br <new_branch> // 创建新的分支.  
git br -v           // 查看各个分支最后提交信息.  
git br --merged     // 查看已经被合并到当前分支的分支. 
git br --no-merged  // 查看尚未被合并到当前分支的分支. 
   
git co <branch>     // 切换到某个分支.  
git co -b <new_branch> // 创建新的分支，并且切换过去.  
git co -b <new_branch> <branch>  // 基于branch创建新的new_branch.  
   
git co $id          // 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除. 
git co $id -b <new_branch>  // 把某次历史提交记录checkout出来，创建成一个分支.  
   
git br -d <branch>  // 删除某个分支.  
git br -D <branch>  // 强制删除某个分支 (未被合并的分支被删除的时候需要强制).  
```
分支合并和rebase

```powershell
git merge <branch>               // 将branch分支合并到当前分支.  
git merge origin/master --no-ff  // 不要Fast-Foward合并，这样可以生成merge提交.  
   
git rebase master <branch>       // 将master rebase到branch，相当于：.  
git co <branch> && git rebase master && git co master && git merge <branch>  
```
Git补丁管理(方便在多台机器上开发同步时用)

```powershell
git diff > ../sync.patch         // 生成补丁.  
git apply ../sync.patch          // 打补丁. 
git apply --check ../sync.patch   // 测试补丁能否成功. 
```
Git暂存管理

```powershell
git stash                        // 暂存. 
git stash list                   // 列所有stash. 
git stash apply                  // 恢复暂存的内容. 
git stash drop                   // 删除暂存区.  
```
Git远程分支管理

```powershell
git pull                         // 抓取远程仓库所有分支更新并合并到本地. 
git pull --no-ff                 // 抓取远程仓库所有分支更新并合并到本地，不要快进合并. 
git fetch origin                 // 抓取远程仓库更新.
git merge origin/master          // 将远程主分支合并到本地当前分支. 
git co --track origin/branch     // 跟踪某个远程分支创建相应的本地分支.  
git co -b <local_branch> origin/<remote_branch>  // 基于远程分支创建本地分支，功能同上.  
   
git push                         // push所有分支. 
git push origin master           // 将本地主分支推到远程主分支.  
git push -u origin master        // 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库).  
git push origin <local_branch>   // 创建远程分支， origin是远程仓库名.
git push origin <local_branch>:<remote_branch>  // 创建远程分支.
git push origin :<remote_branch>  // 先删除本地分支(git br -d <branch>)，然后再push删除远程分支.  
```

基本的分支管理

```powershell
#创建一个分支  
git branch iss53  
  
#切换工作目录到iss53  
git chekcout iss53  
  
#将上面的命令合在一起，创建iss53分支并切换到iss53  
git chekcout –b iss53  
  
#合并iss53分支，当前工作目录为master  
git merge iss53  
  
#合并完成后，没有出现冲突，删除iss53分支  
git branch –d iss53  
  
#拉去远程仓库的数据，语法为 git fetch [remote-name]  
git fetch  
  
#fetch 会拉去最新的远程仓库数据，但不会自动到当前目录下，要自动合并  
git pull  
  
#查看远程仓库的信息  
git remote show origin  
  
#建立本地的dev分支追踪远程仓库的develop分支  
git checkout –b dev origin/develop  
```

Git远程仓库管理

```powershell
git remote -v                    // 查看远程服务器地址和仓库名称  
git remote show origin           // 查看远程服务器仓库状态  
git remote add origin git@ github:robbin/robbin_site.git         // 添加远程仓库地址  
git remote set-url origin git@ github.com:robbin/robbin_site.git // 设置远程仓库地址(用于修改远程仓库地址)  
git remote rm <repository>       // 删除远程仓库  
```
创建远程仓库

```powershell
git clone --bare robbin_site robbin_site.git  // 用带版本的项目创建纯版本仓库  
scp -r my_project.git git@ git.csdn.net:~      // 将纯仓库上传到服务器上  
   
mkdir robbin_site.git && cd robbin_site.git && git --bare init // 在服务器创建纯仓库  
git remote add origin git@ github.com:robbin/robbin_site.git    // 设置远程仓库地址  
git push -u origin master                                      // 客户端首次提交  
git push -u origin develop  // 首次将本地develop分支提交到远程develop分支，并且track  
   
git remote set-head origin master   // 设置远程仓库的HEAD指向master分支  
```

```powershell
git branch --set-upstream master origin/master  
git branch --set-upstream develop origin/develop  
```















# 以下为经常用到的====================


# 项目git应用

### 流程：
1. 在develop分支做开发；
2. develop要merge到主分支上，保持master为最新分支；
3. 每次发版确定，根据需求打版开分支；
4. 在上线没问题的情况下，对项目打tag版本标签，要保证与最新分支相同；
5. 上线失败，回滚以版本稳定进行回滚

#### master      相当于develop，每次开发同步于此分支，就是最新的
#### develop     在此分支开发
#### pc-v3.0.*   确定上线分支打版  规范：[项目简称]-v[大版本号].[大模块添加].[小的模块变动]

### 减少回滚：
1. 协商沟通好怎么分配；
2. 每个人负责的项目不同；
3. 模块化开发；

# git 用法

## 克隆

```powershell
git clone giturl链接
```

## 分支
1. **查看分支**

```powershell
git branch      // 查看本地分支.
git branch -r   // 查看远程分支.
git branch -a   // 查看所有分支.
git branch -v   // 查看各个分支最后一个提交对象的信息.
```

2. **新建/切换分支**

```powershell
git branch branch_name                      // 本地新建分支.
git checkout branch_name                    // 切换分支.
git checkout -b branch_name                 // 新建分支并切换到branch_name分支.
git push origin branch_name:branch_name     // 把本地分支提交远程   git push origin dev:master 把本地分支dev提交到远程master分支.
git checkout -b branch_name origin/branch_name // 切换本地分支，与远程同步.
```

3. **关联/跟踪分支**

```powershell
// 跟踪dev.
git branch --set-upstream-to=origin/dev
git branch --set-upstream-to=dev
git push -u origin dev  // 设置origin为默认主机，将本地的dev分支推送到origin主机.
// 取消对master的跟踪.
git branch --unset-upstream master
```
4. **提交分支**

```powershell
git add index.html                  // 添加指定文件.
git add .                           // 添加所有文件.
git commit -m '提交备注'            // 提交备注.
git commit -a -m '提交备注'         // 添加并提交.
git push [orgin master]             // 推送.
```

5. **合并分支**

```powershell
git checkout master                 // 切换主分支master.
git merge dev                       // 把dev分支合并到matser分支.
git push origin master              // 推到远程.
||
git push origin dev:master          // 把本地分支dev提交到远程master分支.
git checkout master                 // 切换到主分支master.
git pull origin master              // 把远程主分支master拉到本地.
```

6. **删除远程分支**（分两步）

```powershell
git branch -r -d orgin/分支名
        // -r 查看远程分支.
        // -d 删除.
        // -D 强制删除.
git push origin :branch_name // 或则 git push origin --delete branch_name
```
7. **关于回滚**
本地

```powershell
// 撤销修改.
git checkout fileName
git checkout .

// 取消缓存
git add .
git status
git reset HEAD fileName

// 取消缓存，撤销修改.
git reset HEAD fileName
git checkout fileName

// 修改commit，不产生新的commit
git add demo.txt
git commit --amend -m '提交内容'

// 提交多个commit，想删除某个commit.
git reset [--hard|soft|mixed|merge|keep] [commit|HEAD]

```
远程

```powershell
// 撤销到指定commit.
git log fileName
git checkout commitid fileName

// 删除最后一次远程提交.
git revert HEAD
git push origin master
||
git reset --hard HEAD^
git push origin master
* revert是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在；
* reset是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录。

// 回滚到某次提交
git log
git revert commitid
```
删除某次提交

```powershell
git log --oneline -n5       // 查看远程近5条.
git rebase -i "commitid"^   // 查看第几条到head.
进入编辑状态，删除要删除的行就可以
git push origin master -f   // 提交.
```
重命名分支

```powershell
git branch -av
git push --delete origin 分支名
git branch -m 分支名 远程分支
git push origin 远程分支
git fetch -p origin  修剪远程分支的本地“缓存”

```
修剪远程分支的本地“缓存”
```powershell
git fetch -p origin  

```

8. **其他**

```powershell
git remote -v       // 查看远程url.
git fetch           // 同步远程服务器上的数据到本地.
git log --oneline -n5 // 查看远程提交的近5条.
```


## 生成tag
1. 查看tag

```powershell
git tag
git tag -n              // 查看tag详情.
git tag -l v1.0.*       // 展现v1.0.*下的所有版本，如v1.0.1、v1.0.2、v1.0.3等.
```


2. 创建tag

```powershell
git tag v1.0.1	 				// 直接版本，轻量级版本.
git tag -a v1.0.1 -m '备注内容'	// 带详细信息的.
git tag -s v1.0.1 -m '备注内容'	// 带签名的tag（需要有GPG私钥）.
git tag -a v1.0.1_patch 5ac6794	// 带commit的一次提交，也是打补丁，不要和上个版本名重复.
```


3. 删除tag

```powershell
git tag -d  v1.0.1
git push origin :refs/tags/标签名
```


4. 验证tag

```powershell
git tag -v v1.0.1				// 如果有GPG私钥可以验证.
```


5. 上传tag

```powershell
git push origin v1.0.1			// 提交指定版本到远程.
git push origin --tags			// 提交所有的本地tag到远程.
```
### 关于git stash的应用总结

```powershell
Step1

　　新增 git stash save -a "message" // 对于在项目里加入了代码新文件的开发来说，-a选项才会将新加入的代码文件同时放入暂存区 类似于 git commit -a -m ""
Step2

　　查看列表 git stash list
Step3

　　应用的话是 git stash apply stash@{id} 
Step4

　　关于 git stash pop 也可以将list中最新的提取出来，但是不同于apply, pop 会把list 中删除，后期不易恢复
Step5

　　如果真的git stash pop 了，也是可以恢复的。// git log --graph --oneline $(git fsck | awk '/dangling commit/ {print $3}') 找到对应的commitId.

　　具体参考 http://www.jianshu.com/p/9a316b546808
Step6

　　删除某个stash的话 git stash drop stash@{id} 
Step7

　　删除全部的stash list 直接通过 git stash clear


```
