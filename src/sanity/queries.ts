import { groq } from 'next-sanity'
import { getSanityClient, isSanityConfigured } from './client'
import type { SanityBlog, SanityOssContribution } from './types'

// ─── Field fragments ──────────────────────────────────────────────────────────

const blogListFields = groq`
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  "coverImage": coverImage {
    ...,
    "imageUrl": asset->url
  },
  tags,
  readingTime,
  featured
`

const blogDetailFields = groq`
  ${blogListFields},
  body,
  seo
`

const ossFields = groq`
  _id,
  title,
  repo,
  repoUrl,
  prUrl,
  prNumber,
  description,
  impact,
  mergedAt,
  status,
  language,
  repoStars,
  category,
  tags,
  featured
`

// ─── Exported GROQ queries (for Vision / typegen) ─────────────────────────────

export const allBlogsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    ${blogListFields}
  }
`

export const featuredBlogsQuery = groq`
  *[_type == "blog" && featured == true] | order(publishedAt desc)[0...3] {
    ${blogListFields}
  }
`

export const blogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    ${blogDetailFields}
  }
`

export const allOssContributionsQuery = groq`
  *[_type == "ossContribution"] | order(mergedAt desc) {
    ${ossFields}
  }
`

export const featuredOssQuery = groq`
  *[_type == "ossContribution" && featured == true] | order(mergedAt desc)[0...6] {
    ${ossFields}
  }
`

// Groups by repo — useful for a repo-grouped portfolio display
export const ossByRepoQuery = groq`
  *[_type == "ossContribution"] | order(repo asc, mergedAt desc) {
    ${ossFields}
  }
`

// ─── Safe fetch helpers ───────────────────────────────────────────────────────

async function safeFetchMany<T>(query: string, params?: Record<string, string>): Promise<T[]> {
  if (!isSanityConfigured) return []
  const client = getSanityClient()
  if (!client) return []
  try {
    return await client.fetch<T[]>(query, params ?? {})
  } catch {
    return []
  }
}

async function safeFetchOne<T>(query: string, params: Record<string, string>): Promise<T | null> {
  if (!isSanityConfigured) return null
  const client = getSanityClient()
  if (!client) return null
  try {
    const result = await client.fetch<T | null>(query, params)
    return result ?? null
  } catch {
    return null
  }
}

// ─── Typed fetch functions ────────────────────────────────────────────────────

export async function getAllBlogs(): Promise<SanityBlog[]> {
  return safeFetchMany<SanityBlog>(allBlogsQuery)
}

export async function getFeaturedBlogs(): Promise<SanityBlog[]> {
  return safeFetchMany<SanityBlog>(featuredBlogsQuery)
}

export async function getBlogBySlug(slug: string): Promise<SanityBlog | null> {
  return safeFetchOne<SanityBlog>(blogBySlugQuery, { slug })
}

export async function getAllOssContributions(): Promise<SanityOssContribution[]> {
  return safeFetchMany<SanityOssContribution>(allOssContributionsQuery)
}

export async function getFeaturedOss(): Promise<SanityOssContribution[]> {
  return safeFetchMany<SanityOssContribution>(featuredOssQuery)
}
