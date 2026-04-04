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
      ],
    },
    {
      text: '计算机',
      prefix: 'computer',
      collapsed: false,
      items: [
        'basic',
      ],
    },
    {
      text: '无线电',
      prefix: 'ham',
      collapsed: false,
      items: [
        '',
        'shiki',
      ],
    },
    {
      text: 'Python',
      prefix: 'python',
      collapsed: false,
      items: [
        '',
        'shiki',
      ],
    },
  ],
})