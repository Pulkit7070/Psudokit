import { openSourceItems } from '@/data/opensource'
import OpenSourceListClient from '@/components/OpenSourceListClient'
import { getAllOssRepos } from '@/sanity/queries'
import type { OpenSourceItem } from '@/data/opensource'
import type { SanityOssRepo, SanityPr } from '@/sanity/types'

export const revalidate = 60

export const metadata = {
  title: 'Open Source | Pulkit Saraf',
  description: 'Open source projects and contributions by Pulkit Saraf',
}

function sanityRepoToItems(repo: SanityOssRepo): OpenSourceItem[] {
  return repo.prs.map((pr: SanityPr) => {
    const year = pr.mergedAt
      ? new Date(pr.mergedAt).getFullYear().toString()
      : new Date().getFullYear().toString()

    return {
      id: pr._key,
      title: pr.title,
      description: pr.description ?? '',
      repo: repo.repo,
      repoUrl: repo.repoUrl,
      type: 'contribution' as const,
      status: pr.status,
      stars: repo.repoStars,
      tags: repo.tags ?? [],
      url: pr.prUrl,
      date: year,
    }
  })
}

export default async function OpenSourcePage() {
  const sanityRepos = await getAllOssRepos()
  const sanityItems = sanityRepos.flatMap(sanityRepoToItems)

  const allItems: OpenSourceItem[] = [...openSourceItems, ...sanityItems]

  return <OpenSourceListClient items={allItems} />
}
