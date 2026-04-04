import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

export const tciCheatSheet: ThemeCollectionItem = defineCollection({
  type: 'doc',
  title: '小抄',
  dir: 'cheat-sheet',
  linkPrefix: '/cheat-sheet/',
  sidebar: [
    {
      text: '数学',
      prefix: 'math',
      collapsed: false,
      items: [
        'intro',
        'theme',
        'locales',
      ],
    },
    {
      text: '计算机',
      prefix: 'computer',
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
      prefix: 'ham',
      collapsed: false,
      items: [
        '',
        'shiki',
        'search',
        'reading-time',
        'llms',
      ],
    },
    {
      text: 'Python',
      prefix: 'python',
      collapsed: false,
      items: [
        '',
        'shiki',
        'search',
        'reading-time',
        'llms',
      ],
    },
  ],
})