'use client'

import Link from 'next/link'
import MinimalNavigation from '@/components/MinimalNavigation'
import OnekoCat from '@/components/OnekoCat'
import { FadeInUp, SlideInFromLeft } from '@/components/ui/PageTransitions'
import { PortableTextRenderer } from '@/components/portable-text'
import type { SanityBlog, SanityBodyBlock } from '@/sanity/types'

interface SanityBlogPostClientProps {
  post: Omit<SanityBlog, 'body'> & { body?: SanityBodyBlock[] }
}

export default function SanityBlogPostClient({ post }: SanityBlogPostClientProps) {
  const displayDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <MinimalNavigation />
      <OnekoCat />

      <div className="w-full relative pt-16 sm:pt-16">
        <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-10 md:py-12">
          <div className="max-w-3xl mx-auto">
            <SlideInFromLeft delay={0.2}>
              <Link
                href="/blogs"
                className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 inline-flex items-center hover:underline transition-colors"
              >
                <span className="mr-2">←</span>
                <span>Back to blogs</span>
              </Link>
            </SlideInFromLeft>

            <FadeInUp delay={0.4}>
              <article className="prose prose-neutral dark:prose-invert max-w-none">
                <header className="mb-6 sm:mb-8 md:mb-12 not-prose">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4 md:mb-6 break-words text-black dark:text-white">
                    {post.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-neutral-500 dark:text-neutral-400 gap-2 sm:gap-3 md:gap-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                      <span className="text-xs sm:text-sm md:text-base">{displayDate}</span>
                      {post.readingTime && (
                        <span className="text-xs sm:text-sm md:text-base">
                          {post.readingTime} min read
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm md:text-base">Pulkit Saraf</span>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 md:mt-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-xs whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                {post.body && post.body.length > 0 ? (
                  <PortableTextRenderer body={post.body} />
                ) : (
                  <p className="text-neutral-500 dark:text-neutral-400 italic">{post.excerpt}</p>
                )}
              </article>
            </FadeInUp>
          </div>
        </div>
      </div>
    </div>
  )
}
