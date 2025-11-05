import type { ThemeOption } from '@0x-jerry/vitepress-theme-blog'
import { defineConfigWithTheme } from 'vitepress'
import createBaseConfig from '../.theme/vitepress/config'

export default async () => {
  const conf = defineConfigWithTheme<ThemeOption>({
    extends: await createBaseConfig({
      rss: {
        copyright: '',
        title: "0x-Jerry's Blog",
        origin: 'https://blog.0x-jerry.icu',
      },
    }),
    title: '0x-Jerry',
    titleTemplate: ':title',
    cleanUrls: true,
    ignoreDeadLinks: true,
    themeConfig: {
      name: '0x-Jerry',
      avatar: 'https://avatars.githubusercontent.com/u/14226737?v=4',
      motto: `Life was like a box of chocolates. You never know what you're gonna get.`,
      email: 'x.jerry.wang@gmail.com',
      timezone: 'Asia/Chongqing',
      links: {
        github: 'https://github.com/0x-jerry',
      },
    },
  })

  return conf
}
