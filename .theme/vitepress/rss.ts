import { load as cheerioLoad } from 'cheerio'
import dayjs from 'dayjs'
import { Feed, type FeedOptions } from 'feed'
import fs from 'fs/promises'
import path from 'path'

const vitepressDir = path.join(process.cwd(), '.vitepress')

export interface RSSGenerateOption extends Omit<FeedOptions, 'id'> {
  origin: string
  articlesPathPrefix: string
  filename: string
}

export async function generateFeed(conf: RSSGenerateOption) {
  const feed = new Feed({
    id: conf.origin,
    link: conf.origin,
    favicon: `${conf.origin}/favicon.ico`,
    feedLinks: {
      rss2: `${conf.origin}/${conf.filename}`,
    },
    ...conf,
  })

  const joinPath = (...segments: string[]) =>
    path.join(vitepressDir, ...segments)

  const postDir = joinPath('dist', conf.articlesPathPrefix)
  const files = await fs.readdir(postDir)

  const posts: FeedItemData[] = []

  for (const file of files) {
    const postSlug = file.replace(/\.html$/, '')

    const link = `${conf.origin}/${conf.articlesPathPrefix}/${postSlug}`

    const html = await fs.readFile(path.join(postDir, file), 'utf-8')

    const $ = cheerioLoad(html)

    const date = $('meta[name=date]').attr('content')

    const title = $('title').text()
    // remove sidebar
    $('#layout-content-left').remove()
    $('#layout-content-right').remove()

    posts.push({
      date: dayjs.tz(date).toDate(),
      link,
      content: $.html(),
      title,
    })
  }

  const generatedPosts = posts.sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  )

  for (const post of generatedPosts.slice(0, 40)) {
    feed.addItem(post)
  }

  const rss2 = feed.rss2()

  await fs.writeFile(joinPath('dist', conf.filename), rss2)
}

interface FeedItemData {
  link: string
  content: string
  title: string
  date: Date
}
