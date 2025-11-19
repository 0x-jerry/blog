import type { ReadTimeResults } from 'reading-time'

export interface ExcerptData {
  date: string
  title: string
  tags?: string[]
  license?: string
  read: ReadTimeResults
  publish?: boolean
}

export interface BlogExcerpt {
  data: ExcerptData
  // html: string
  url: string
}
