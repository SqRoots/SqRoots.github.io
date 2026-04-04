import { defineCollections, type ThemeCollections } from 'vuepress-theme-plume'
import { tciCheatSheet } from './cheat-sheet.js'
import { tciCollection } from './collection.js'


export const zhCollections: ThemeCollections = defineCollections([
  // 迷题
  { type: 'post', dir: '/puzzle/', link: '/puzzle/', title: '谜题' },
  // 时光
  { type: 'post', dir: '/moment/', link: '/moment/', title: '时光' },
  // 文档
  tciCollection,
  tciCheatSheet,
])