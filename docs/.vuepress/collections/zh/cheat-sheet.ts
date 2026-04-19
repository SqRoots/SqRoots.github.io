import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

export const tciCheatSheet: ThemeCollectionItem = defineCollection({
  type: 'doc',
  title: '小抄',
  dir: '02-小抄-cheat-sheet',
  linkPrefix: '/cheat-sheet/',
  sidebar: [
    {
      text: '数学',
      icon: 'mynaui:math-square-solid',
      prefix: 'math',
      collapsed: false,
      items: [
        { text: 'AB实验工具与公式', link: '2024-01-07_AB测试中的常用工具与数学公式/index.md', icon: 'fluent-emoji-high-contrast:ab-button-blood-type'},
        { text: 'LaTex数学公式', link: 'latex.md', icon: 'material-icon-theme:latexmk'},
        { text: '几何代数（草稿）', link: 'geometry-algebra.md', icon: 'tabler:geometry'},
        { text: '概率统计（草稿）', link: 'probability-statistics.md', icon: 'famicons:dice-outline' },
      ],
    },
    {
      text: '计算机',
      icon: 'fa7-solid:computer',
      prefix: 'computer',
      collapsed: false,
      items: [
        { text: '颜色', link: 'color.md', icon: 'ic:outline-color-lens'},
      ],
    },
    {
      text: '世界',
      icon: 'eos-icons:atom-electron',
      prefix: 'universe',
      collapsed: false,
      items: [
        { text: '时间', link: 'time-0-介绍.md', icon: 'eos-icons:hourglass', items:[
          'time-1-常用命令.md',
          'time-2-星期日历表示法.md',
          'time-3-时区.md',
          'time-4-农历.md',
        ]},
        { text: '空间', link: 'space-0-介绍.md', icon: 'icon-park-outline:earth', items:[
          'space-1-经纬度.md',
          'space-2-GeoHash.md',
        ]},
      ],
    },
    // {
    //   text: 'Python',
    //   icon: 'lineicons:python',
    //   prefix: 'python',
    //   collapsed: false,
    //   items: [
    //     { text: '日期时间', link: 'date-time.md', icon: 'lets-icons:date-range-light', items:[
    //       'date-time-1-常用命令.md',
    //       'date-time-2-时区.md',
    //       'date-time-3-星期日历表示法.md',
    //       'date-time-4-农历.md',
    //     ]},
    //   ],
    // },
    {
      text: '无线电',
      icon: 'roentgen:telescope-radio',
      prefix: 'ham',
      collapsed: false,
      items: [
        { text: '广播电台-北京', link: 'radio-beijing.md', icon: 'heroicons:radio'},
      ],
    },
  ],
})