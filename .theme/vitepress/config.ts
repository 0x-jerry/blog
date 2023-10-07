import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Components from 'unplugin-vue-components/vite'
import Uno from 'unocss/vite'
import unoConfig from '../uno.config'
import { defineConfig, type UserConfig } from 'vitepress'
import { postBlogGenerate, type BlogPluginConfig } from './blog'
import { fileURLToPath } from 'url'
import readingTime from 'reading-time'
import { readFileSync } from 'fs'
// import { createHighlight } from './highlight'

const themeDir = fixCurrentDir()

interface ThemePluginOption extends BlogPluginConfig {}

export default async (opt: Partial<ThemePluginOption> = {}) => {
  const option: ThemePluginOption = Object.assign(
    {
      prefixPath: 'posts',
      search: true
    },
    opt
  )

  globalThis.BLOG_CONFIG = option

  return defineConfig({
    vite: {
      plugins: [
        // https://github.com/antfu/unplugin-icons
        Icons(),

        // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
        VueI18n({
          include: [path.resolve(themeDir, 'locales/**')],
          strictMessage: false
        }),

        // todo, expose components config
        // https://github.com/antfu/unplugin-vue-components
        Components({
          include: ['**/*.md', '**/*.vue'],
          dirs: ['components', 'posts'],
          resolvers: [IconsResolver()],
          dts: false
        }),

        // https://github.com/unocss/unocss
        Uno(unoConfig)
      ],
      resolve: {
        alias: {
          '@@/': themeDir + '/src/'
        }
      }
    },
    head: [
      // todo: add an option to enable generate rss
      // ['meta', { name: 'rss', content: '/rss.xml' }],
      // ['link', { href: '/rss.xml', rel: 'alternate', title: 'RSS', type: 'application/rss+xml' }],
      [
        'link',
        {
          rel: 'stylesheet',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/lxgw-wenkai-webfont/1.7.0/style.css'
        }
      ]
    ],
    markdown: {
      // highlight: await createHighlight(),
    },
    cleanUrls: true,
    transformPageData(pageData, ctx) {
      const content = readFileSync(pageData.filePath, { encoding: 'utf-8' })
      pageData.frontmatter.read = readingTime(content || '')
    },
    async buildEnd(siteConfig) {
      await postBlogGenerate(option, siteConfig)
    }
  }) as UserConfig
}

/**
 * when build, config.js will locate in dist folder, so import.meta.url
 * will be xxx/dist/config.js
 */
function fixCurrentDir() {
  const distDir = path.dirname(fileURLToPath(import.meta.url))

  return path.resolve(distDir, '..')
}