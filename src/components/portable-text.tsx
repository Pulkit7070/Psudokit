'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextReactComponents } from '@portabletext/react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { CodeBlock } from './CodeBlock'
import type { SanityBodyBlock, SanityCallout, SanityCodeBlock, SanityImageAsset } from '@/sanity/types'

// Image builder using only NEXT_PUBLIC vars — safe for client bundle, no read token needed
const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
  return builder.image(source)
}

const CALLOUT_STYLES: Record<SanityCallout['variant'], { wrapper: string; label: string }> = {
  info: {
    wrapper:
      'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200',
    label: 'INFO',
  },
  warning: {
    wrapper:
      'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-200',
    label: 'WARNING',
  },
  success: {
    wrapper:
      'border-l-4 border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-200',
    label: 'SUCCESS',
  },
}

const components: Partial<PortableTextReactComponents> = {
  types: {
    code: ({ value }: { value: SanityCodeBlock }) => (
      <CodeBlock code={value.code} language={value.language} filename={value.filename} />
    ),
    image: ({ value }: { value: SanityImageAsset & { caption?: string } }) => {
      const imageUrl = urlFor(value).width(800).auto('format').url()
      return (
        <figure className="my-8">
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={imageUrl}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }: { value: SanityCallout }) => {
      const style = CALLOUT_STYLES[value.variant] ?? CALLOUT_STYLES.info
      return (
        <div className={`my-6 rounded-r-lg px-5 py-4 ${style.wrapper}`}>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest opacity-70">
            {style.label}
          </p>
          <p className="text-sm leading-relaxed">{value.text}</p>
        </div>
      )
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode
      value?: { href?: string; blank?: boolean }
    }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="underline underline-offset-2 decoration-neutral-400 hover:decoration-current transition-colors"
      >
        {children}
      </a>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-black dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-black dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold text-black dark:text-white">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-4 mb-2 text-lg font-medium text-black dark:text-white">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-7 text-neutral-800 dark:text-neutral-300">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 italic text-neutral-600 dark:text-neutral-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-800 dark:text-neutral-300">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-neutral-800 dark:text-neutral-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-7">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-7">{children}</li>
    ),
  },
}

interface PortableTextRendererProps {
  body: SanityBodyBlock[]
}

export function PortableTextRenderer({ body }: PortableTextRendererProps) {
  return (
    <div>
      <PortableText value={body} components={components} />
    </div>
  )
}
