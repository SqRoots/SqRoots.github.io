/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'solar:home-bold' },
  { text: '典藏', link: '/collection/web/navigation', icon: 'mingcute:star-line' },
  { text: '小抄', link: '/cheat-sheet/math/f-geometry-algebra', icon: 'hugeicons:note-add' },
  { text: '时光', link: '/moment/', icon: 'mingcute:moment-line' },
  { text: '趣题', link: '/puzzle/', icon: 'mdi:puzzle' },
  { text: '格言', link: '/motto/', icon: 'streamline-freehand:notes-quill' },
  { text: '关于', link: '/about/README.md', icon: 'ix:about'}
])
