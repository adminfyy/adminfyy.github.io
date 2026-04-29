import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'adminfyy Blog',
  description: 'JavaScript design patterns, notes, and demos',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  theme: defaultTheme({
    logo: '/favicon.png',
    repo: 'adminfyy/adminfyy.github.io',
    docsDir: 'vdocs',
    navbar: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: 'Pattern 源码', link: '/blog/code-lab.html' },
    ],
    sidebar: {
      '/blog/': [
        {
          text: '博客目录',
          children: [
            '/blog/README.md',
            '/blog/publish-subscribe.md',
            '/blog/mediator-pattern.md',
            '/blog/code-lab.md',
            '/blog/wechat-open-tag-launch-app.md',
            '/blog/codex-prompt-debugging.md',
            '/blog/codex-agent-workflow.md',
            '/blog/codex-cli-to-pr.md',
            '/blog/frontend-trends-2026-practice-map.md',
            '/blog/frontend-architecture-decision-playbook.md',
            '/blog/frontend-engineering-philosophy.md',
            '/blog/ai-native-frontend-workflow.md',
            '/blog/legacy-notes.md',
          ],
        },
      ],
    },
    editLink: false,
    contributors: false,
    lastUpdated: true,
  }),
  bundler: viteBundler(),
})
