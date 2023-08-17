import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Components from 'unplugin-vue-components/vite'
import Uno from 'unocss/vite'
import unoConfig from '../uno.config'
import { defineConfig } from 'vitepress'
import { createBlogPlugin } from './blog'
import { fileURLToPath } from 'url'
import { highlight } from './highlight'

const __dirname = fixCurrentDir()

export default async () => {
  return defineConfig({
    vite: {
      plugins: [
        // https://github.com/antfu/unplugin-icons
        Icons(),

        // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
        VueI18n({
          runtimeOnly: false,
          compositionOnly: true,
          include: [path.resolve(__dirname, 'locales/**')],
          strictMessage: false,
        }),

        // https://github.com/antfu/unplugin-vue-components
        Components({
          // dirs: [path.join(__dirname, 'src/components')],
          resolvers: [IconsResolver()],
        }),

        // https://github.com/unocss/unocss
        Uno(unoConfig),

        createBlogPlugin({ prefixPath: '/posts' }),
      ],
      resolve: {
        alias: {
          '@@/': __dirname + '/src/',
        },
      },
    },
    markdown: {
      highlight: await highlight(),
    },
  })
}

/**
 * when build, config.js will locate in dist folder, so import.meta.url
 * will be xxx/dist/config.js
 */
function fixCurrentDir() {
  const distDir = path.dirname(fileURLToPath(import.meta.url))

  return path.resolve(distDir, '..')
}
