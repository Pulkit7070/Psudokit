'use client'

import Link from 'next/link'
import MinimalNavigation from '@/components/MinimalNavigation'
import OnekoCat from '@/components/OnekoCat'
import { FadeInUp } from '@/components/ui/PageTransitions'
import { OpenSourceItem } from '@/data/opensource'

interface OpenSourceListClientProps {
  items: OpenSourceItem[]
}

const statusLabel: Record<OpenSourceItem['status'], string> = {
  active: 'ACTIVE',
  merged: 'MERGED',
  open: 'OPEN PR',
  closed: 'CLOSED',
}

export default function OpenSourceListClient({ items }: OpenSourceListClientProps) {
  const own = items.filter(i => i.type === 'own')
  const contributions = items.filter(i => i.type === 'contribution')

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <MinimalNavigation />
      <OnekoCat />

      <div className="w-full relative pt-16 sm:pt-16">
        <div className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="mb-16 sm:mb-20">
              <FadeInUp delay={0.2}>
                <h1 className="text-2xl sm:text-3xl font-[family-name:var(--font-instrument-serif)] font-medium mb-4 text-black dark:text-white tracking-tight">
                  Open Source
                </h1>
              </FadeInUp>
              <FadeInUp delay={0.4}>
                <p className="text-lg text-neutral-800 dark:text-neutral-400 tracking-wide">
                  Projects I maintain and contributions to the broader ecosystem.
                </p>
              </FadeInUp>
            </div>

            {/* Own Projects */}
            <FadeInUp delay={0.3}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
                Own Projects
              </h2>
            </FadeInUp>
            <div className="space-y-0 mb-16">
              {own.map((item, index) => (
                <FadeInUp key={item.id} delay={0.1 * index} duration={0.6}>
                  <OpenSourceCard item={item} />
                </FadeInUp>
              ))}
            </div>

            {/* Contributions */}
            <FadeInUp delay={0.3}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
                Contributions
              </h2>
            </FadeInUp>
            <div className="space-y-0">
              {contributions.map((item, index) => (
                <FadeInUp key={item.id} delay={0.1 * index} duration={0.6}>
                  <OpenSourceCard item={item} />
                </FadeInUp>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function OpenSourceCard({ item }: { item: OpenSourceItem }) {
  return (
    <Link href={item.url} target="_blank" rel="noopener noreferrer" className="block w-full touch-manipulation active:opacity-75" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <article className="group cursor-pointer neo-card p-6 bg-white dark:bg-black mb-6">
        <div className="grid grid-cols-12 gap-4">

          {/* Title */}
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-xl font-black text-black dark:text-white leading-tight mb-2 uppercase tracking-tight group-hover:text-neutral-600 dark:group-hover:text-primary transition-colors">
              {item.title}
            </h2>
          </div>

          {/* Meta */}
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <div className="flex lg:justify-end gap-4 text-xs font-bold text-black dark:text-white uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 inline-block">
              <span>{item.date}</span>
              {item.stars !== undefined && (
                <>
                  <span>•</span>
                  <span>{item.stars} stars</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="col-span-12 mt-2 border-t-2 border-black dark:border-white pt-4">
            <p className="text-base text-neutral-800 dark:text-neutral-300 leading-relaxed font-medium">
              {item.description}
            </p>
          </div>

          {/* Tags */}
          <div className="col-span-12 mt-4">
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs font-bold text-black dark:text-white uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Status + Repo */}
          <div className="col-span-12 mt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-black dark:text-white uppercase tracking-widest">
              <span>{item.repo}</span>
              <span>•</span>
              <span>{statusLabel[item.status]}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>

        </div>
      </article>
    </Link>
  )
}
