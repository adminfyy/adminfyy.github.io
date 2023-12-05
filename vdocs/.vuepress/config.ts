import { defineConfig } from 'vuepress/config'
export default defineConfig({
  title: '两亿',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/guide/' },
      { text: '外部链接', link: 'https://google.com' },
    ]
  }
})
