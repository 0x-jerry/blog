import * as pagefind from 'pagefind'
import path from 'path'
import type { SiteConfig } from 'vitepress'
import { generateFeed, type RSSGenerateOption } from './rss'

export interface BlogPluginConfig {
  /**
   * @default posts
   */
  prefixPath: string

  /**
   * rss config
   */
  rss?: Omit<RSSGenerateOption, 'articlesPathPrefix' | 'filename'>

  /**
   * default is true
   */
  search?: boolean
}

export async function postBlogGenerate(
  config: BlogPluginConfig,
  vitepress: SiteConfig,
) {
  if (config.search) {
    const outDir = path.join(vitepress.root, '.vitepress', 'dist')
    await buildSearchIndex(outDir)
    console.log('Build search index successful!')
  }

  if (config.rss) {
    await generateFeed({
      ...config.rss,
      articlesPathPrefix: config.prefixPath,
      filename: 'rss.xml',
    })
    console.log('Build rss.xml successful!')
  }
}

async function buildSearchIndex(publicPath: string) {
  // Create a Pagefind search index to work with
  const { index } = await pagefind.createIndex({
    forceLanguage: 'zh',
    excludeSelectors: ['.sidebar'],
    logfile: path.join(publicPath, 'seaerch-debug.log'),
  })

  // Index all HTML files in a directory
  await index!.addDirectory({
    path: publicPath,
  })

  // write the index to disk
  await index!.writeFiles({
    outputPath: path.join(publicPath, 'pagefind'),
  })
}
