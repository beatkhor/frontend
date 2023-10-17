export interface MetaTags {
  title: string
  description: string
  noIndex: boolean
  keywords: string
  image?: {
    type: string
    src: string
  }
  canonicalUrl?: string
  schema?: any
}
