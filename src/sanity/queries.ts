import { groq } from 'next-sanity'
import { getSanityClient, isSanityConfigured } from './client'
import type { SanityBlog, SanityOssRepo } from './types'

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

export const allOssReposQuery = groq`
  *[_type == "ossRepo"] | order(featured desc, repo asc) {
    _id,
    repo,
    repoUrl,
    language,
    repoStars,
    tags,
    featured,
    prs[] {
      _key,
      title,
      prUrl,
      prNumber,
      status,
      category,
      description,
      mergedAt
    }
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

export async function getAllOssRepos(): Promise<SanityOssRepo[]> {
  return safeFetchMany<SanityOssRepo>(allOssReposQuery)
}
