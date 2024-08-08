module.exports = {
    base: '/',
    title: '蜗蜗🐇',
    description: '从零开始一步一步飙起来',
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
                text: '个人简历',
                link: '/pages/resume/'
            },
            {
                text: 'git',
                link: '/pages/gits/'
            },
            {
                text: 'js集',
                link: '/pages/javascript/'
            },
            {
                text: 'mac配置小絮',
                link: '/pages/macConfig/'
            },
            {
                text: '小结',
                link: '/pages/toSumUp/'
            },
            {
                text: '后端',
                link: '/pages/backstage/'
            }
        ],
        sidebar: {
            '/pages/resume/': [
                '',
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