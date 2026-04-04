import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

export const tciCollection: ThemeCollectionItem = defineCollection({
  type: 'doc',
  title: '典藏',
  dir: 'config',
  linkPrefix: '/collection/',
  sidebar: [
    {
      text: '网站',
      prefix: 'web',
      collapsed: false,
      items: [
        'intro',
      ],
    },
    {
      text: '博客',
      prefix: 'blog',
      collapsed: false,
      items: [
        'basic',
      ],
    },
    {
      text: '工具',
      prefix: 'tool',
      collapsed: false,
      items: [
        '',
        'shiki',
      ],
    },
  ],
})