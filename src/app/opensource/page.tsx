import { openSourceItems } from '@/data/opensource'
import OpenSourceListClient from '@/components/OpenSourceListClient'
import { getAllOssContributions } from '@/sanity/queries'
import type { OpenSourceItem } from '@/data/opensource'
import type { SanityOssContribution } from '@/sanity/types'

export const revalidate = 60

export const metadata = {
  title: 'Open Source | Pulkit Saraf',
  description: 'Open source projects and contributions by Pulkit Saraf',
}

function sanityToOpenSourceItem(c: SanityOssContribution): OpenSourceItem {
  const year = c.mergedAt
    ? new Date(c.mergedAt).getFullYear().toString()
    : new Date().getFullYear().toString()

  return {
    id: c._id,
    title: c.title,
    description: [c.description, c.impact].filter(Boolean).join(' — '),
    repo: c.repo,
    repoUrl: c.repoUrl,
    type: 'contribution',
    status: c.status === 'closed' ? 'closed' : c.status,
    stars: c.repoStars,
    tags: c.tags ?? [],
    url: c.prUrl,
    date: year,
  }
}

export default async function OpenSourcePage() {
  const sanityContributions = await getAllOssContributions()
  const sanityItems = sanityContributions.map(sanityToOpenSourceItem)

  // Static items first (own projects + existing contributions), then Sanity contributions
  const allItems: OpenSourceItem[] = [...openSourceItems, ...sanityItems]

  return <OpenSourceListClient items={allItems} />
}
