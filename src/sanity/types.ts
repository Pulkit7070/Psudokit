import type { PortableTextBlock } from '@portabletext/types'

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityImageCrop {
  top: number
  bottom: number
  left: number
  right: number
}

export interface SanityImageHotspot {
  x: number
  y: number
  height: number
  width: number
}

export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  alt?: string
  caption?: string
}

export interface SanityImageWithUrl extends SanityImageAsset {
  imageUrl?: string
}

export interface SanityCallout {
  _type: 'callout'
  _key: string
  variant: 'info' | 'warning' | 'success'
  text: string
}

export interface SanityCodeBlock {
  _type: 'code'
  _key: string
  code: string
  language: string
  filename?: string
}

export type SanityBodyBlock =
  | PortableTextBlock
  | SanityImageAsset
  | SanityCallout
  | SanityCodeBlock

export interface SanityBlog {
  _id: string
  _type: 'blog'
  title: string
  slug: SanitySlug
  publishedAt: string
  excerpt: string
  coverImage?: SanityImageWithUrl
  tags?: string[]
  readingTime?: number
  body?: SanityBodyBlock[]
  featured?: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImageAsset
  }
}

export interface SanityPr {
  _key: string
  title: string
  prUrl: string
  prNumber?: number
  status: 'merged' | 'open' | 'closed'
  category?: 'feature' | 'bugfix' | 'security' | 'docs' | 'refactor' | 'performance'
  description?: string
  mergedAt?: string
}

export interface SanityOssRepo {
  _id: string
  _type: 'ossRepo'
  repo: string
  repoUrl: string
  language?: string
  repoStars?: number
  tags?: string[]
  featured?: boolean
  prs: SanityPr[]
}
