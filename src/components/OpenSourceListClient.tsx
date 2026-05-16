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

const statusDot: Record<OpenSourceItem['status'], string> = {
  active: 'bg-green-500',
  merged: 'bg-blue-500',
  open: 'bg-yellow-500',
  closed: 'bg-neutral-400',
}

interface RepoGroup {
  repo: string
  repoUrl: string
  items: OpenSourceItem[]
}

function groupByRepo(items: OpenSourceItem[]): RepoGroup[] {
  const map = new Map<string, RepoGroup>()
  for (const item of items) {
    if (!map.has(item.repo)) {
      map.set(item.repo, { repo: item.repo, repoUrl: item.repoUrl, items: [] })
    }
    map.get(item.repo)!.items.push(item)
  }
  return Array.from(map.values())
}

export default function OpenSourceListClient({ items }: OpenSourceListClientProps) {
  const own = items.filter(i => i.type === 'own')
  const contributions = items.filter(i => i.type === 'contribution')
  const repoGroups = groupByRepo(contributions)

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
            <div className="space-y-0 mb-20">
              {own.map((item, index) => (
                <FadeInUp key={item.id} delay={0.1 * index} duration={0.6}>
                  <OwnProjectCard item={item} />
                </FadeInUp>
              ))}
            </div>

            {/* Contributions - grouped by repo */}
            <FadeInUp delay={0.3}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
                Contributions
              </h2>
            </FadeInUp>
            <div className="space-y-6">
              {repoGroups.map((group, index) => (
                <FadeInUp key={group.repo} delay={0.1 * index} duration={0.6}>
                  <RepoCard group={group} />
                </FadeInUp>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function OwnProjectCard({ item }: { item: OpenSourceItem }) {
  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full touch-manipulation active:opacity-75"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <article className="group cursor-pointer neo-card p-6 bg-white dark:bg-black mb-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-xl font-black text-black dark:text-white leading-tight mb-2 uppercase tracking-tight group-hover:text-neutral-600 dark:group-hover:text-primary transition-colors">
              {item.title}
            </h2>
          </div>
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
          <div className="col-span-12 mt-2 border-t-2 border-black dark:border-white pt-4">
            <p className="text-base text-neutral-800 dark:text-neutral-300 leading-relaxed font-medium">
              {item.description}
            </p>
          </div>
          <div className="col-span-12 mt-4">
            <div className="flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="text-xs font-bold text-black dark:text-white uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
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

function RepoCard({ group }: { group: RepoGroup }) {
  const mergedCount = group.items.filter(i => i.status === 'merged').length
  const tags = Array.from(new Set(group.items.flatMap(i => i.tags))).slice(0, 4)

  return (
    <article className="neo-card bg-white dark:bg-black">
      {/* Repo header */}
      <div className="p-6 border-b-2 border-black dark:border-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link
              href={group.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2"
            >
              <h2 className="text-lg font-black text-black dark:text-white uppercase tracking-tight group-hover:text-neutral-600 dark:group-hover:text-primary transition-colors truncate">
                {group.repo}
              </h2>
              <svg className="w-3 h-3 shrink-0 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-xs font-bold text-black dark:text-white uppercase tracking-widest">
              {group.items.length} PR{group.items.length !== 1 ? 's' : ''}
              {mergedCount > 0 && (
                <span className="ml-2 text-blue-500">· {mergedCount} merged</span>
              )}
            </span>
          </div>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <span key={tag} className="text-xs font-bold text-black dark:text-white uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* PR list */}
      <ul>
        {group.items.map((item, index) => (
          <li
            key={item.id}
            className={index < group.items.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-900' : ''}
          >
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-950 transition-colors group"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Status dot */}
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${statusDot[item.status]}`} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black dark:text-white leading-snug group-hover:text-neutral-600 dark:group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-widest">
                  {statusLabel[item.status]} · {item.date}
                </p>
              </div>

              <svg className="w-3 h-3 shrink-0 mt-1 text-neutral-400 dark:text-neutral-600 group-hover:text-black dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
