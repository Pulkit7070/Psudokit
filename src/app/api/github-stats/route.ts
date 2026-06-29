import { NextResponse } from 'next/server'

// Cache for an hour; these numbers barely move and the GitHub API is rate
// limited (especially unauthenticated).
export const revalidate = 3600

const USER = 'Pulkit7070'

function ghHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

async function totalStars(): Promise<number> {
  let stars = 0
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?per_page=100&page=${page}&type=owner`,
      { headers: ghHeaders(), next: { revalidate: 3600 } },
    )
    if (!res.ok) break
    const repos: { stargazers_count: number }[] = await res.json()
    stars += repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
    if (repos.length < 100) break
  }
  return stars
}

async function searchCount(q: string): Promise<number> {
  const res = await fetch(
    `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&per_page=1`,
    { headers: ghHeaders(), next: { revalidate: 3600 } },
  )
  if (!res.ok) return 0
  const data: { total_count: number } = await res.json()
  return data.total_count ?? 0
}

export async function GET() {
  const userRes = await fetch(`https://api.github.com/users/${USER}`, {
    headers: ghHeaders(),
    next: { revalidate: 3600 },
  })
  if (!userRes.ok) {
    return NextResponse.json(
      { error: `GitHub API returned ${userRes.status}` },
      { status: 502 },
    )
  }
  const user: { followers: number; public_repos: number } = await userRes.json()

  const [stars, prs, issues] = await Promise.all([
    totalStars(),
    searchCount(`author:${USER} type:pr`),
    searchCount(`author:${USER} type:issue`),
  ])

  return NextResponse.json({
    followers: user.followers,
    repos: user.public_repos,
    stars,
    prs,
    issues,
  })
}
