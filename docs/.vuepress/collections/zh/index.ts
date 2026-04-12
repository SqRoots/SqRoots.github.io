import { defineCollections, type ThemeCollections } from 'vuepress-theme-plume'
import { tciCheatSheet } from './cheat-sheet.js'
import { tciCollection } from './collection.js'


export const zhCollections: ThemeCollections = defineCollections([

  // 时光
  { type: 'post', dir: '/03-时光-moment/', link: '/moment/', title: '时光' },
  // 迷题
  { type: 'post', dir: '/04-趣题-puzzle/', link: '/puzzle/', title: '谜题' },
  // 文档
  tciCollection,
  tciCheatSheet,
])