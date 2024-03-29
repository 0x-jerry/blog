export interface ThemeOption {
  name: string
  avatar: string
  motto?: string
  email?: string
  timezone?: string
  links?: {
    github?: string
  }
}

export interface TocLink {
  id: string
  label: string
  level: number
}
