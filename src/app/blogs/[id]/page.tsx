import { getBlogById } from '@/data/blogs'
import { getBlogBySlug, getAllBlogs } from '@/sanity/queries'
import { blogs as staticBlogs } from '@/data/blogs'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostClient from '@/components/BlogPostClient'
import SanityBlogPostClient from '@/components/SanityBlogPostClient'

export const revalidate = 60

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const staticParams = staticBlogs
    .filter((b) => !b.externalUrl)
    .map((b) => ({ id: b.id }))

  const sanityBlogs = await getAllBlogs()
  const sanityParams = sanityBlogs.map((b) => ({ id: b.slug.current }))

  return [...staticParams, ...sanityParams]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const sanityPost = await getBlogBySlug(id)
  if (sanityPost) {
    const metaTitle = sanityPost.seo?.metaTitle ?? sanityPost.title
    const metaDescription = sanityPost.seo?.metaDescription ?? sanityPost.excerpt
    return {
      title: `${metaTitle} | Pulkit Saraf`,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'article',
        publishedTime: sanityPost.publishedAt,
        authors: ['Pulkit Saraf'],
        tags: sanityPost.tags ?? [],
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
      },
    }
  }

  const blog = getBlogById(id)
  if (!blog) return { title: 'Blog Post Not Found' }

  return {
    title: `${blog.title} | Pulkit Saraf`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      tags: blog.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params

  // Sanity takes priority - check by slug first
  const sanityPost = await getBlogBySlug(id)
  if (sanityPost) {
    return <SanityBlogPostClient post={sanityPost} />
  }

  // Fall back to static data
  const blog = getBlogById(id)
  if (!blog) notFound()

  return <BlogPostClient blog={blog} />
}
