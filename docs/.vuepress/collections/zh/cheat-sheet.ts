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
      icon: 'mynaui:math-square',
      prefix: 'math',
      collapsed: false,
      items: [
        { text: '公式-几何代数', link: 'f-geometry-algebra', icon: 'glyphs:ruler-trinangle-duo'},
        { text: '公式-概率统计', link: 'f-probability-statistics', icon: 'fa6-solid:dice' },
        { text: 'LaTex', link: 'c-latex', icon: 'simple-icons:latex'},
      ],
    },
    {
      text: '计算机',
      icon: 'boxicons:computer',
      prefix: 'computer',
      collapsed: false,
      items: [
        { text: '颜色', link: 'color', icon: 'mdi:color'},
      ],
    },
    {
      text: 'Python',
      icon: 'lineicons:python',
      prefix: 'python',
      collapsed: false,
      items: [
        { text: '日期时间', link: 'date-time', icon: 'lets-icons:date-range-light'},
      ],
    },
    {
      text: '无线电',
      icon: 'lucide:radio-tower',
      prefix: 'ham',
      collapsed: false,
      items: [
        { text: '电台-北京', link: 'radio-beijing', icon: 'heroicons:radio'},
      ],
    },
  ],
})