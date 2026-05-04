/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'tabler:home' },
  { text: '精选', link: '/collection/web/navigation/', icon: 'mingcute:star-line' },
  { text: '小抄', link: '/cheat-sheet/computer/color/', icon: 'hugeicons:note-01' },
  //{ text: '时光', link: '/moment/', icon: 'mingcute:moment-line' },
  { text: '博客', link: 'https://blog.lixuan.xyz/', icon: 'fa7-solid:blog' },
  { text: '趣题', link: '/puzzle/', icon: 'tabler:puzzle' },
  { text: '格言', link: '/motto/', icon: 'ri:quill-pen-line' },
  { text: '关于', icon: 'ix:about', items:[
    { text: '关于我', link: '/about/index.md', icon: 'mdi:id-card-outline'},
    { text: '旧博客', link: 'https://blog.lixuan.xyz/', icon: 'fa7-solid:blog'},
    { text: '旧笔记', link: 'https://note.lixuan.xyz/', icon: 'clarity:note-line'},
    { text: '旧摄影', link: 'https://photo.lixuan.xyz/', icon: 'material-symbols:add-a-photo-outline'},
  ]}
])
