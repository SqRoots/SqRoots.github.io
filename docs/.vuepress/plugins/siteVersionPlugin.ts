import { writeFile } from 'node:fs/promises'
import type { Plugin } from 'vuepress'

const getVersion = (): string =>
  process.env.CF_PAGES_COMMIT_SHA
  || process.env.GITHUB_SHA
  || process.env.COMMIT_SHA
  || new Date().toISOString()

export const siteVersionPlugin = (): Plugin => ({
  name: 'sq-site-version-plugin',

  onGenerated: async (app) => {
    const versionFile = app.dir.dest('site-version.json')
    const versionInfo = {
      version: getVersion(),
      builtAt: new Date().toISOString(),
    }

    await writeFile(`${versionFile}`, `${JSON.stringify(versionInfo)}\n`, 'utf8')
  },
})
