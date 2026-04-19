import { createHash } from 'node:crypto'
import { copyFile, mkdir, readdir, rm, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import type { Page, Plugin } from 'vuepress'

const GENERATED_COVER_DIR = '__generated__/covers'

const isExternalUrl = (value: string): boolean =>
  /^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('data:')

const toPosixPath = (value: string): string => value.split(path.sep).join('/')

const pathExists = async (value: string): Promise<boolean> => {
  try {
    await stat(value)
    return true
  } catch {
    return false
  }
}

const getFileStat = async (value: string) => {
  try {
    return await stat(value)
  } catch {
    return null
  }
}

const isInsideDir = (targetPath: string, baseDir: string): boolean => {
  const relativePath = path.relative(baseDir, targetPath)
  return relativePath !== '' && !relativePath.startsWith('..') && !path.isAbsolute(relativePath)
}

const isGeneratedCover = (cover: string): boolean =>
  cover.startsWith(`/${GENERATED_COVER_DIR}/`)

const shouldResolveLocally = (cover: string): boolean =>
  cover.length > 0 && !cover.startsWith('/') && !isExternalUrl(cover)

const resolveCoverSource = (page: Page, cover: string): string | null => {
  if (!page.filePath || !page.filePathRelative) return null
  if (!shouldResolveLocally(cover)) return null

  return path.resolve(path.dirname(page.filePath), cover)
}

const getPageSlug = (page: Page): string => {
  const pageFileRelative = page.filePathRelative ?? 'page.md'
  const parsedPath = path.parse(pageFileRelative)
  return parsedPath.name === 'index'
    ? path.basename(parsedPath.dir)
    : parsedPath.name
}

const getPageCoverDir = (page: Page): string => {
  const pageFileRelative = page.filePathRelative ?? 'page.md'
  const pageDir = path.dirname(pageFileRelative)
  return path.join(GENERATED_COVER_DIR, pageDir, `__cover__${getPageSlug(page)}`)
}

const getCoverFingerprint = (page: Page, cover: string, absoluteCoverPath: string): string => {
  const input = `${page.filePathRelative ?? page.path}:${cover}:${absoluteCoverPath}`
  return createHash('sha1').update(input).digest('hex').slice(0, 10)
}

const toGeneratedCoverPath = (page: Page, cover: string, absoluteCoverPath: string): string => {
  const pageSlug = getPageSlug(page)
  const extension = path.extname(absoluteCoverPath)
  const fingerprint = getCoverFingerprint(page, cover, absoluteCoverPath)
  const filename = `${pageSlug}-${fingerprint}${extension}`
  return toPosixPath(path.join(getPageCoverDir(page), filename))
}

const rewritePageCover = (page: Page, nextCover: string): void => {
  page.frontmatter.cover = nextCover
  page.data.frontmatter.cover = nextCover
}

const syncGeneratedFile = async (sourcePath: string, outputPath: string): Promise<void> => {
  const [sourceStat, outputStat] = await Promise.all([
    getFileStat(sourcePath),
    getFileStat(outputPath),
  ])

  if (!sourceStat) return

  const isFresh = outputStat
    && outputStat.size === sourceStat.size
    && outputStat.mtimeMs >= sourceStat.mtimeMs

  if (isFresh) return

  await mkdir(path.dirname(outputPath), { recursive: true })
  await copyFile(sourcePath, outputPath)
}

const removeStalePageCovers = async (
  page: Page,
  publicDir: string,
  keepRelativePath: string,
): Promise<void> => {
  const pageCoverDir = path.join(publicDir, getPageCoverDir(page))
  if (!(await pathExists(pageCoverDir))) return

  const keepFilename = path.basename(keepRelativePath)
  const entries = await readdir(pageCoverDir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (entry.name === keepFilename) continue
    await rm(path.join(pageCoverDir, entry.name), { force: true })
  }
}

const removeGeneratedCover = async (cover: unknown, publicDir: string): Promise<void> => {
  if (typeof cover !== 'string' || !isGeneratedCover(cover)) return

  const generatedFile = path.join(publicDir, cover.slice(1))
  if (!(await pathExists(generatedFile))) return

  await unlink(generatedFile)
}

const syncPageCover = async (page: Page, publicDir: string, sourceDir: string): Promise<void> => {
  const currentCover = page.frontmatter.cover
  if (typeof currentCover !== 'string' || currentCover.length === 0) return
  if (isGeneratedCover(currentCover)) return

  const resolvedCover = resolveCoverSource(page, currentCover)
  if (!resolvedCover) return
  if (!isInsideDir(resolvedCover, sourceDir)) return
  if (!(await pathExists(resolvedCover))) return

  const generatedRelativePath = toGeneratedCoverPath(page, currentCover, resolvedCover)
  const generatedAbsolutePath = path.join(publicDir, generatedRelativePath)

  await syncGeneratedFile(resolvedCover, generatedAbsolutePath)
  await removeStalePageCovers(page, publicDir, generatedRelativePath)
  rewritePageCover(page, `/${generatedRelativePath}`)
}

export const relativeCoverPlugin = (): Plugin => ({
  name: 'sq-relative-cover-plugin',

  extendsPage: async (page, app) => {
    await syncPageCover(page, app.dir.public(), app.dir.source())
  },

  onPageUpdated: async (app, type, newPage, oldPage) => {
    if (type === 'delete' && oldPage) {
      await removeGeneratedCover(oldPage.frontmatter.cover, app.dir.public())
      return
    }

    if (type === 'update' && oldPage) {
      await removeGeneratedCover(oldPage.frontmatter.cover, app.dir.public())
    }

    if (newPage) {
      await syncPageCover(newPage, app.dir.public(), app.dir.source())
    }
  },
})
