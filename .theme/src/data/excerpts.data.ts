import readingTime from 'reading-time'
import { createContentLoader } from 'vitepress'
import type { BlogExcerpt } from '../../types'

declare const data: BlogExcerpt[]
export { data }

const config = globalThis.BLOG_CONFIG

export default createContentLoader([config.prefixPath + '/**/*.md'], {
  includeSrc: true,
  transform(raw): BlogExcerpt[] {
    return raw
      .map((n) => {
        return {
          url: n.url,
          data: {
            ...n.frontmatter,
            title: n.frontmatter.title,
            date: n.frontmatter.date,
            read: readingTime(n.src || ''),
            publish: n.frontmatter.publish ?? true,
          },
        }
      })
      .sort((a, b) => b.data.date - a.data.date)
  },
})
