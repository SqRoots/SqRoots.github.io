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
      icon: 'mynaui:math-square-solid',
      prefix: 'math',
      collapsed: false,
      items: [
        { text: '公式-几何代数', link: 'f-geometry-algebra', icon: 'tabler:geometry'},
        { text: '公式-概率统计', link: 'f-probability-statistics', icon: 'famicons:dice-outline' },
        { text: 'LaTex', link: 'c-latex', icon: 'material-icon-theme:latexmk'},
      ],
    },
    {
      text: '计算机',
      icon: 'fa7-solid:computer',
      prefix: 'computer',
      collapsed: false,
      items: [
        { text: '颜色', link: 'color', icon: 'ic:outline-color-lens'},
      ],
    },
    {
      text: 'Python',
      icon: 'lineicons:python',
      prefix: 'python',
      collapsed: false,
      items: [
        { text: '日期时间', link: 'date-time', icon: 'lets-icons:date-range-light', items:[
          'date-time-1-格式化',
          'date-time-2-时区',
          'date-time-3-星期日历表示法',
          'date-time-4-遍历日期',
        ]},
      ],
    },
    {
      text: '无线电',
      icon: 'roentgen:telescope-radio',
      prefix: 'ham',
      collapsed: false,
      items: [
        { text: '电台-北京', link: 'radio-beijing', icon: 'heroicons:radio'},
      ],
    },
  ],
})