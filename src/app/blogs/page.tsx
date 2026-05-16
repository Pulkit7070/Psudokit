import { blogs as staticBlogs } from '@/data/blogs'
import BlogsListClient from '@/components/BlogsListClient'
import { getAllBlogs } from '@/sanity/queries'
import type { BlogPost } from '@/types/blog'
import type { SanityBlog } from '@/sanity/types'

export const revalidate = 60

function sanityToBlogPost(post: SanityBlog): BlogPost {
  return {
    id: post.slug.current,
    title: post.title,
    description: post.excerpt,
    content: post.excerpt,
    date: post.publishedAt.split('T')[0],
    author: 'Pulkit Saraf',
    tags: post.tags ?? [],
    readTime: post.readingTime ? `${post.readingTime} min read` : undefined,
  }
}

export default async function BlogsPage() {
  const sanityBlogs = await getAllBlogs()

  const sanityConverted = sanityBlogs.map(sanityToBlogPost)

  // Sanity posts first (newest), then static posts below
  const allBlogs: BlogPost[] = [...sanityConverted, ...staticBlogs]

  return <BlogsListClient blogs={allBlogs} />
}
