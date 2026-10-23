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
        repo: 'https://github.com/hxl888',
        search: true,
        searchMaxSuggestions: 10,
        nav: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: '笔记',
                items: [
                    { text: 'Git', link: '/pages/gits/' },
                    { text: 'JS 集', link: '/pages/javascript/' },
                    { text: 'Mac 配置', link: '/pages/macConfig/' },
                    { text: '小结', link: '/pages/toSumUp/' },
                    { text: '后端', link: '/pages/backstage/' }
                ]
            }
        ],
        sidebar: {
            '/pages/resume/': [
                '',
                'myself'
            ],
            '/pages/gits/': [
                '',
                'gitDetails',
                'gitCommit'
            ],
            '/pages/javascript/': [
                '',
                'es6',
                'numSort',
                'algorithm',
            ],
            '/pages/macConfig/': [
                '',
                'macConfig'
            ],
            '/pages/toSumUp/': [
                '',
                'climbonPit'
            ],
            '/pages/backstage/': [
                '',
                'nginx',
                'node'
            ]
        }
    }
}