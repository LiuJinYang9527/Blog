const langs = [
  { text: 'English', link: '/' },
  { text: '简体中文', link: '/zh/' },
]
module.exports = {
	title: 'Melon',
	description: 'Personal Blog',
	base: '/Blog/',
	//打包输出目录
	dest: 'dist',
	themeConfig: {
		// 为以下路由添加侧边栏	
		sidebar: {
			'/JsTricks/': [ '' ],
			'/VuePress/': [ '' ],
			'/TypeScript/': [ '' ],
			'/Koa2/': [ '' ],
			'/DVA/': [ '' ],
			'/ReactHooks/': [ '' ],
			'/ReactRedux/': [ '' ],
			'/UMI/': [ '' ],
			'/Flutter/': [ '' ],
		},
		//导航
		nav: [
			{
				text: 'Vue相关',
				items: [
					{
						text: 'VuePress',
						link: '/VuePress/'
					}
				]
			},
			{
				text: 'React相关',
				items: [
					{
						text: 'DVA',
						link: '/DVA/'
					},
					{
						text: 'ReactHooks',
						link: '/ReactHooks/'
					},
					{
						text: 'Redux',
						link: '/Redux/'
					},
					{
						text: 'UMI',
						link: '/UMI/'
					}
				]
			},
			{
				text: 'Node相关',
				items: [
					{
						text: 'Koa2',
						link: '/Koa2/'
					}
				]
			},
			{
				text: 'TypeScript',
				link: '/TypeScript/'
			},
			{
				text: 'Flutter',
				link: '/Flutter/'
			},
			{
        text: 'tricks',
				items: [
					{
						text: 'JsTricks',
            link: '/JsTricks/'
          },
          {
            text:'CssTricks',
            link:'/CssTricks/'
          }
				]
			}
		],
		// 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
		repo: 'https://github.com/LiuJinYang9527/Blog',
		// 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
		// "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
		repoLabel: '查看源码',
		// 以下为可选的编辑链接选项
		// 假如你的文档仓库和项目本身不在一个仓库：
		docsRepo: 'vuejs/vuepress',
		// 假如文档不是放在仓库的根目录下：
		docsDir: 'docs',
		// 假如文档放在一个特定的分支下：
		docsBranch: 'gh-pages',
		// 默认是 false, 设置为 true 来启用
		editLinks: true,
		// 默认为 "Edit this page"
		editLinkText: '帮助我们改善此页面！'
	},
	plugins:[
		"vuepress-plugin-cat",
		'@vuepress/active-header-links',
		'@vuepress/nprogress'
	]
};
