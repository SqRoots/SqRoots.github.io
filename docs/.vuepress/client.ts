import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'
import JSXGraph from './theme/components/JSXGraph.vue'
import AIModels from './theme/components/AIModels.vue'
import FriendLinks from './theme/components/FriendLinks.vue'

// import './theme/styles/custom.css'
import './theme/styles/my-custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
    app.component('JSXGraph', JSXGraph)
    app.component('AIModels', AIModels)
    app.component('FriendLinks', FriendLinks)
  },
})
