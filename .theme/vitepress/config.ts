import path from 'path'
import Components from 'unplugin-vue-components/vite'
import Uno from 'unocss/vite'
import unoConfig from '../uno.config'
import { defineConfig, type HeadConfig, type UserConfig } from 'vitepress'
import { postBlogGenerate, type BlogPluginConfig } from './blog'
import { fileURLToPath } from 'url'
import readingTime from 'reading-time'
import { readFileSync } from 'fs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import yaml from '@rollup/plugin-yaml'
import { figure } from '@mdit/plugin-figure'

dayjs.extend(utc)
dayjs.extend(timezone)

const themeDir = fixCurrentDir()

interface ThemePluginOption extends BlogPluginConfig {}

export default async (opt: Partial<ThemePluginOption> = {}) => {
  const option: ThemePluginOption = Object.assign(
    {
      prefixPath: 'posts',
      search: true,
    },
    opt,
  )

  globalThis.BLOG_CONFIG = option

  const extraHeads: HeadConfig[] = []

  if (option.rss) {
    extraHeads.push(
      ['meta', { name: 'rss', content: '/rss.xml' }],
      [
        'link',
        {
          href: '/rss.xml',
          rel: 'alternate',
          title: 'RSS',
          type: 'application/rss+xml',
        },
      ],
    )
  }

  const conf = defineConfig({
    vite: {
      plugins: [
        // todo, expose components config
        // https://github.com/antfu/unplugin-vue-components
        Components({
          include: ['**/*.md', '**/*.vue'],
          dirs: ['components', 'posts'],
          dts: false,
        }),

        // https://github.com/unocss/unocss
        Uno(unoConfig),

        yaml() as any,
      ],
      resolve: {
        alias: {
          '@@/': themeDir + '/src/',
        },
      },
    },
    head: [
      ...extraHeads,
    ],
    cleanUrls: true,
    transformPageData(pageData, _ctx) {
      const content = readFileSync(pageData.filePath, { encoding: 'utf-8' })
      pageData.frontmatter.read = readingTime(content || '')
    },
    transformHead(context) {
      const headers: HeadConfig[] = []

      const frontmatter = context.pageData.frontmatter

      if (frontmatter.date) {
        headers.push([
          'meta',
          {
            name: 'date',
            content: frontmatter.date,
          },
        ])
      }

      return headers
    },
    async buildEnd(siteConfig) {
      const tz = siteConfig.site.themeConfig.timezone
      if (tz) {
        dayjs.tz.setDefault(tz)
      }

      await postBlogGenerate(option, siteConfig)
    },
    markdown: {
      headers: {},
      image: {
        lazyLoading: true,
      },
      theme: {
        dark: 'vitesse-dark',
        light: 'vitesse-light',
      },
      config(md) {
        // @ts-ignore
        md.use(figure)
      },
    },
  })

  return conf as UserConfig
}

/**
 * when build, config.js will locate in dist folder, so import.meta.url
 * will be xxx/dist/config.js
 */
function fixCurrentDir() {
  const distDir = path.dirname(fileURLToPath(import.meta.url))

  return path.resolve(distDir, '..')
}
