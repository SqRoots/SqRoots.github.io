import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

export const tciCheatSheet: ThemeCollectionItem = defineCollection({
  type: 'doc',
  title: '小抄',
  dir: 'config',
  linkPrefix: '/cheat-sheet/',
  sidebar: [
    {
      text: '数学',
      collapsed: false,
      items: [
        'intro',
        'theme',
        'locales',
        'navbar',
        'sidebar',
        'collections',
        'markdown',
      ],
    },
    {
      text: '计算机',
      prefix: 'frontmatter',
      collapsed: false,
      items: [
        'basic',
        'home',
        'post',
        'friend',
      ],
    },
    {
      text: '无线电',
      prefix: 'plugins',
      collapsed: false,
      items: [
        '',
        'shiki',
        'search',
        'reading-time',
        'llms',
        'markdown-enhance',
        'markdown-power',
        'markdown-image',
        'markdown-math',
        'markdown-include',
        'watermark',
      ],
    },
    {
      text: 'Python',
      prefix: 'plugins',
      collapsed: false,
      items: [
        '',
        'shiki',
        'search',
        'reading-time',
        'llms',
        'markdown-enhance',
        'markdown-power',
        'markdown-image',
        'markdown-math',
        'markdown-include',
        'watermark',
      ],
    },
  ],
})