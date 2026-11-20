module.exports = {
    base: '/',
    title: '蜗蜗',
    description: '胡新磊的前端笔记与简历 · 从零开始，一步一步飙起来',
    dest: 'dist',
    head: [
        ['link', { rel: 'icon', href: '/myIcon.ico' }]
    ],
    themeConfig: {
        activeHeaderLinks: true,
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: '简历',
                link: '/pages/resume/myself'
            },
            {
                text: '紫微斗数',
                link: 'https://hxl888.github.io/jingpan/'
            }
        ],
        sidebar: false
    }
}