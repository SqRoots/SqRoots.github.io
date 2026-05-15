import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'
import JSXGraph from './theme/components/JSXGraph.vue'
import AIModels from './theme/components/AIModels.vue'
import FriendLinks from './theme/components/FriendLinks.vue'
import ActionButton from './theme/components/ActionButton.vue'

// import './theme/styles/custom.css'
import './theme/styles/my-custom.css'

const VERSION_URL = '/site-version.json'
const IDLE_CHECK_INTERVAL = 15 * 60 * 1000
const VISIBILITY_CHECK_INTERVAL = 5 * 60 * 1000
const SLOW_NAVIGATION_DELAY = 2500
const VERSION_CHECK_NAVIGATION_TIMEOUT = 800

type VersionInfo = {
  version?: string
}

let currentVersion: string | null = null
let hasNewVersion = false
let lastActivityAt = Date.now()
let activityBeforePointerAt = lastActivityAt
let hiddenAt = 0
let lastVersionCheckAt = 0
let versionCheckPromise: Promise<boolean> | null = null

const isClient = typeof window !== 'undefined'

const getVersion = async (): Promise<string | null> => {
  try {
    const response = await fetch(VERSION_URL, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) return null

    const data = await response.json() as VersionInfo
    return typeof data.version === 'string' && data.version.length > 0
      ? data.version
      : null
  } catch {
    return null
  }
}

const checkSiteVersion = async (): Promise<boolean> => {
  if (versionCheckPromise) return versionCheckPromise

  versionCheckPromise = (async () => {
    lastVersionCheckAt = Date.now()

    const latestVersion = await getVersion()
    if (!latestVersion) return false

    if (!currentVersion) {
      currentVersion = latestVersion
      return false
    }

    hasNewVersion = latestVersion !== currentVersion
    return hasNewVersion
  })()

  try {
    return await versionCheckPromise
  } finally {
    versionCheckPromise = null
  }
}

const waitForVersionCheckBeforeNavigation = async (): Promise<boolean> => {
  const timeout = new Promise<false>((resolve) => {
    window.setTimeout(() => resolve(false), VERSION_CHECK_NAVIGATION_TIMEOUT)
  })

  return Promise.race([checkSiteVersion(), timeout])
}

const isInternalNavigationLink = (target: EventTarget | null): HTMLAnchorElement | null => {
  if (!(target instanceof Element)) return null

  const link = target.closest('a[href]')
  if (!(link instanceof HTMLAnchorElement)) return null

  if (link.target && link.target !== '_self') return null
  if (link.download) return null

  const url = new URL(link.href, window.location.href)
  if (url.origin !== window.location.origin) return null
  if (url.pathname === window.location.pathname && url.hash) return null

  return link
}

const setupSiteVersionCheck = (): void => {
  if (!isClient) return

  void checkSiteVersion()

  const updateActivity = (): void => {
    lastActivityAt = Date.now()
  }

  const updatePointerActivity = (): void => {
    activityBeforePointerAt = lastActivityAt
    lastActivityAt = Date.now()
  }

  window.addEventListener('pointerdown', updatePointerActivity, { passive: true })
  window.addEventListener('keydown', updateActivity, { passive: true })
  window.addEventListener('scroll', updateActivity, { passive: true })

  document.addEventListener('visibilitychange', () => {
    const now = Date.now()

    if (document.visibilityState === 'hidden') {
      hiddenAt = now
      return
    }

    const hiddenFor = hiddenAt > 0 ? now - hiddenAt : 0
    const checkIsFresh = now - lastVersionCheckAt < VISIBILITY_CHECK_INTERVAL

    if (hiddenFor >= VISIBILITY_CHECK_INTERVAL && !checkIsFresh) {
      void checkSiteVersion()
    }
  })

  document.addEventListener('click', (event) => {
    const link = isInternalNavigationLink(event.target)
    if (!link) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const now = Date.now()
    const wasIdle = now - activityBeforePointerAt >= IDLE_CHECK_INTERVAL
    const checkIsFresh = now - lastVersionCheckAt < VISIBILITY_CHECK_INTERVAL
    const targetHref = link.href
    const startPath = `${window.location.pathname}${window.location.search}${window.location.hash}`

    if (hasNewVersion) {
      updateActivity()
      event.preventDefault()
      window.location.assign(targetHref)
      return
    }

    if (wasIdle && !checkIsFresh) {
      updateActivity()
      event.preventDefault()
      void waitForVersionCheckBeforeNavigation().then((versionChanged) => {
        if (versionChanged) {
          window.location.assign(targetHref)
          return
        }

        window.location.assign(targetHref)
      })
      return
    }

    updateActivity()

    window.setTimeout(() => {
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
      if (currentPath !== startPath) return

      void checkSiteVersion().then((versionChanged) => {
        if (versionChanged) {
          window.location.assign(targetHref)
        }
      })
    }, SLOW_NAVIGATION_DELAY)
  }, true)
}

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
    app.component('ActionButton', ActionButton)
  },
  setup() {
    setupSiteVersionCheck()
  },
})
