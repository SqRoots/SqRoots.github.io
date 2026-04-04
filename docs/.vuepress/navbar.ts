/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '典藏', link: '/collection/' },
  { text: '小抄', link: '/cheat-sheet/' },
  { text: '谜题', link: '/puzzle/' },
  { text: '格言', link: '/motto/'},
  // {
  //   text: '笔记',
  //   items: [{ text: '示例', link: '/demo/README.md' }]
  // },
  { text: '关于', link: '/about/README.md'}
])
