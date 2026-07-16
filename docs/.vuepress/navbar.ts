/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'tabler:home' },
  { text: '导航', link: '/collection/web/navigation/', icon: 'mingcute:star-line' },
  { text: '格言', link: '/motto/', icon: 'ri:quill-pen-line' },
  { text: '小抄', link: '/cheat-sheet/computer/color/', icon: 'hugeicons:note-01' },
  { text: '趣题', link: '/puzzle/', icon: 'tabler:puzzle' },
  // { text: '时光', link: '/moment/', icon: 'mingcute:moment-line' },
  { text: '博客', link: 'https://blog.lixuan.me/', icon: 'fa7-solid:blog' },
  { text: '摄影', link: 'https://photo.lixuan.me/', icon: 'material-symbols:add-a-photo-outline' },
  { text: '关于', link: '/about/', icon: 'mdi:id-card-outline' },
])
