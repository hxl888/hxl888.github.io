---
home: false
# actionText: 嗨大家好我叫真好 →go
features:
  - title: 个人简历
#   details: ONE
# - title: 瞧好你
#😁
#  details: TWO
---
<style>
    .main-box {
        padding: 10px 14px;
        background-color: #f4f4f9;
        color: #333;
    }
    .nav-box {
        display: flex;
        justify-content: center;
        background-color: #444;
        padding: 10px;
    }
    .nav-box a {
        color: #fff;
        margin: 0 15px;
        text-decoration: none;
    }
    h1, h2 {
        color: #282c36;
    }
    .skills {
        display: flex;
        flex-wrap: wrap;
    }
    .skills div {
        background-color: #ddd;
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
    }
    .center {
     text-align: center;
    }
</style>
<body class="main-box">
    <section>
        <h2 class="center">关于我</h2>
        <ul>
            <li>姓名: 胡新磊</li>
            <li>年龄: 92年</li>
            <li>籍贯: 河北保定</li>
            <li>学历: 本科</li>
            <li>工作年限: 8年</li>
            <li>tel: 13261559984</li>
            <li>email: 2653586693@qq.com</li>
        </ul>
    </section>
    <section>
        <h3>技能列表</h3>
        <div class="skills">
            <div>Css3/Html5</div>
            <div>Es6</div>
            <div>vue/react</div>
            <div>vite/webpack</div>
        </div>
    </section>
    <section>
        <h3>工作经历</h3>
        <ul>
            <li>
                <strong>公司名称:北京医百科技有限公司 </strong><br>职位: web前端 - 时间:2021.11-2024.10<br>
                职责描述:负责公司的前台界面、后台管理系统的开发维护以及中台组件的开发
            </li>
            <li>
                <strong>公司名称:腾讯音乐娱乐集团</strong><br>职位: web前端 - 时间:2019.11-2021.10<br>
                职责描述:负责酷我音乐app端内嵌的h5相关挂件活动 包括与app交互
            </li>
            <li>
                <strong>公司名称:北京鲜易网络科技</strong><br>职位: web前端 - 时间:2016.04-2019.10<br>
                职责描述:负责公司h5、web端的开发、后台管理系统的开发维护
            </li>
        </ul>
    </section>
    <h3>项目展示</h3>
    <section>
        <h4>北京医百科技有限公司</h4>
        <ul>
            <li>
                <strong>后台管理系统、前台官网、公司内部通用组件</strong><br>
                公司描述：主营医疗技术的研发和应用,提供解决方案以支持医生和医疗机构的日常运营。<br>
                项目内容：后台管理系统、前台官网、公司内部通用组件<br>
                在线地址：https://www.100doc.com.cn  https://www.100mix.cn<br>
                工作内容:<br>
                负责医百相关Saas管理后台、以及官网展示界面的迭代更新<br>
                项目技术点:Vite、Vue、Ant Design Vue、Vuex、Nuxt、Element Plus、jekins自动化部署<br>
                项目难点:<br>
                1.租户前台项目打包体积大设计页面多但是还不停往进增加活动以及新需求已经不堪重负<br>
                2.租户前台、后台设计到运用相似的组件需要重复编写比较繁琐<br>
                3.多个组协作要在同一项目进行开发 部署项目到开发、测试环境导致测试比较麻烦<br>
                4.多个部门需要走同一个登录网关 各做各的需求导致工作量倍增问题<br>
                5.业务中上传的图片、文件、视频太多导致服务器压力大、以及项目并行请求静态资源导致网络堵塞问题<br>
                6.项目seo优化问题<br>
                项目成果:<br>
                1.微前端架构：使用iframe、micro解决了老项目打包越来越大以及新项目技术升级壁垒的问题<br>
                2.增加私服 单独开发不同组件发包到私服 各个部门npm引用(cos上传组件封装)<br>
                3.增加多套开发、测试环境本地host代理不同服务<br>
                4.抽离公共模块(登录组件、IM功能块)引入,各个部门只负责处理自己业务逻辑<br>
                5.CDN托管：利用腾讯云实现图片、文件、视频的CDN托管减轻了服务器压力以及项目的加载速度<br>
                6.使用nuxt服务端渲染、站点地图提升了seo优化问题<br>
            </li>
        </ul>
    </section>
    <section>
        <h4>腾讯音乐娱乐集团</h4>
        <ul>
            <li>
              公司描述:拥有中国广受喜爱和独具匠心的音乐平台QQ音乐、酷狗音乐、酷我音乐和全民K歌<br>
                在线地址：https://jx.kuwo.cn<br>
                工作内容:<br>
                1负责主播直播间挂件相关活动的开发迭代<br>
                2.根据UI设计及需求文档，完成PC和移动端页面的搭建<br>
                3.配合后台人员确认接口和数据格式，完成联调工作<br>
                4.负责h5页面和IOS、安卓端实现交互已经协议的制定<br>
                项目技术点:Vue、Vuex, Axios, Element-UI、Redux, React Hook, Axios、AMD模式、doT模板<br>
                项目难点:<br>
                1.项目比较陈旧jsp文件导致技术不能升级<br>
                2.项目滚雪球越容越大<br>
                3.静态文件(图片)引的很多导致项目打包体积变大<br>
                4.针对项目嵌套在app中debugger难 报错问题不容跟进的问题<br>
                项目成果:<br>
                1.h5新活动单独创建了一个Vue MPA项目<br>
                2. 每次针对个别页面单独打包处理 脱离了之前的旧项目，打包体积相对减少80% 同时开发效率增加60%<br>
                3.使用cdn静态文件托管 实现图片的高效访问、缓存<br>
                4.使用Whistle抓包解决报错问题提高了排查问题的效率<br>
            </li>
        </ul>
    </section>
    <section>
        <h4>北京鲜易网络科技</h4>
        <ul>
            <li>
                <strong>项目名称: 鲜易网微信商城</strong><br>
                对外的关于购物流程的webapp页面，属于b2b商城；
                技术点:vue、iconfont、fastclick、mint-ui、swiper、flexible
            </li>
            <li>
                <strong>项目名称: 商城sdk支付功能</strong><br>
                 针对于微信商城、鲜易商城app处理订单支付及支付结果页面的展示
                 技术点:图片懒加载、微信支付流程、react-native嵌套h5页面
            </li>
            <li>
                <strong>项目名称: pc官网首页</strong><br>
                  业务数据、行业资讯、合作商家的展示及后台登陆系统的引导页；
                技术点:artTemplate模板实首页数据的展示渲染
            </li>
        </ul>
    </section>
    <section>
        <h3>项目总结</h3>
        <p>
        项目是一个团队工作，团队最重要的就是合作和沟通能力，在体现和提高个人能力的同时，更重要的是，要融入团队，有效沟通，相互帮助，在团队工作中得到进步、共享团队工作成果带来的喜悦，一个人的力量是有限的，而一个团队的力量却是无限的。一个人的想法有时候也是有局限的，需要倾听大家的意见，及时改善自己。但是同时自己也需要有自己的逻辑思维和思想，独特的见解和看法，自己一个人时也能够有独立解决问题的能力。
        </p>
    </section>
    <section>
        <h3>教育背景</h3>
        <ul>
            <li><strong>本科(自考本):</strong> 河北大学</li>
        </ul>
    </section>
    <section>
        <h3>自我评价</h3>
        <p>
            积极向上：阳光开朗，做事认真负责。<br>
            优秀能力：具备良好的学习能力、沟通能力和组织能力。<br>
            丰富兴趣：热爱生活，拥有广泛的兴趣爱好。<br>
            工作态度：以谨慎的工作作风和积极的态度，细心完成本职工作，踏实肯干，勤奋努力。<br>
            如果有幸被录用，我将全力以赴为贵公司创造效益，充分发挥自身能力和价值。<br>
        </p>
    </section>
</body>



            
           
