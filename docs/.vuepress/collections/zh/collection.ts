import type { ThemeCollectionItem } from 'vuepress-theme-plume'
import { defineCollection } from 'vuepress-theme-plume'

// 侧边栏配制 https://theme-plume.vuejs.press/guide/sidebar/

export const tciCollection: ThemeCollectionItem = defineCollection({
  type: 'doc',
  title: '典藏',
  dir: 'collection',
  linkPrefix: '/collection/',
  sidebar: [
    {
      text: '利器', icon: 'ri:sword-fill', link: 'tool/'
    },
    {
      text: '数据', icon: 'tdesign:data-base-filled', link: 'data/'
    },
    {
      text: '博客', icon: 'fa6-solid:blog', link: 'blog/'
    },
    {
      text: '网站', prefix: 'web', icon: 'streamline-plump:web-solid', items: [
        {text: '综合网站', link: 'navigation', icon: 'mingcute:navigation-line'},
        {text: 'AI网站', link: 'ai', icon: 'arcticons:openai-chatgpt'},
        {text: '数理网站', link: 'science', icon: 'mynaui:math-square'},
        {text: '技术网站', link: 'computer', icon: 'boxicons:computer'},
        {text: '其他网站', link: 'other', icon: 'fluent:chess-16-regular'},
        {text: '我的网站', link: 'my-web', icon: 'stash:person-duotone'},
      ]
    },

    // {
    //   text: '利器', prefix: 'tool', icon: 'ri:sword-fill', items: [
    //     {text: '办公', link: 'office', icon: 'streamline-ultimate:work-from-home-user-pet-cat-bold'},
    //   ]
    // },
    // {
    //   text: '博客', prefix: 'blog', icon: 'fa6-solid:blog', items: [
    //     {text: '数理博客', link: 'science', icon: 'boxicons:science'},
    //     {text: '技术博客', link: 'technology', icon: 'ant-design:code-outlined'},
    //     {text: '文字博客', link: 'writing', icon: 'fe:file-word'},
    //   ]
    // }
  ]
})
