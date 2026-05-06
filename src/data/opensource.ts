export interface OpenSourceItem {
  id: string
  title: string
  description: string
  repo: string
  repoUrl: string
  type: 'own' | 'contribution'
  status: 'merged' | 'open' | 'active'
  stars?: number
  tags: string[]
  url: string
  date: string
}

export const openSourceItems: OpenSourceItem[] = [
  {
    id: 'multigravity-pro',
    title: 'multigravity-pro',
    description: 'Run multiple Antigravity IDE profiles at the same time — each with its own accounts, settings, and extensions. Supports Windows, macOS, and Linux.',
    repo: 'Pulkit7070/multigravity-pro',
    repoUrl: 'https://github.com/Pulkit7070/multigravity-pro',
    type: 'own',
    status: 'active',
    stars: 27,
    tags: ['CLI', 'Developer Tools', 'IDE', 'Productivity'],
    url: 'https://github.com/Pulkit7070/multigravity-pro',
    date: '2025',
  },
  {
    id: 'ferrokey',
    title: 'ferrokey',
    description: 'Embedded key-value store in Rust. B-tree index, write-ahead log with CRC32 checksums and fsync guarantees, crash recovery, fixed 4096-byte page format. Zero runtime dependencies.',
    repo: 'Pulkit7070/ferrokey',
    repoUrl: 'https://github.com/Pulkit7070/ferrokey',
    type: 'own',
    status: 'active',
    tags: ['Rust', 'Systems', 'Database', 'Storage Engine'],
    url: 'https://github.com/Pulkit7070/ferrokey',
    date: '2026',
  },
  {
    id: 'codelabz-errorboundary',
    title: 'feat: add ErrorBoundary to prevent full-app crashes from component errors',
    description: 'Contributed to Codelabz — a Google Summer of Code organization under c2siorg. Wrapped the app in an ErrorBoundary so isolated component failures no longer take down the entire UI.',
    repo: 'c2siorg/Codelabz',
    repoUrl: 'https://github.com/c2siorg/Codelabz',
    type: 'contribution',
    status: 'open',
    tags: ['GSoC', 'React', 'Error Handling'],
    url: 'https://github.com/c2siorg/Codelabz/pull/356',
    date: '2026',
  },
  {
    id: 'codelabz-security',
    title: 'fix: restrict Firestore and Storage security rules to require authentication',
    description: 'Patched open read/write access in Codelabz (GSoC org) — Firestore and Storage security rules now enforce authenticated access only, closing an unauthenticated data exposure vector.',
    repo: 'c2siorg/Codelabz',
    repoUrl: 'https://github.com/c2siorg/Codelabz',
    type: 'contribution',
    status: 'open',
    tags: ['GSoC', 'Security', 'Firebase'],
    url: 'https://github.com/c2siorg/Codelabz/pull/353',
    date: '2026',
  },
  {
    id: 'zulip-docs',
    title: 'docs: clarify docker group activation and daemon requirement',
    description: 'Documentation fix for Zulip — a major open source messaging platform and Google Summer of Code organization. Clarified setup steps that were causing confusion for new contributors.',
    repo: 'zulip/zulip',
    repoUrl: 'https://github.com/zulip/zulip',
    type: 'contribution',
    status: 'merged',
    tags: ['GSoC', 'Docs', 'Docker'],
    url: 'https://github.com/zulip/zulip/pull/37344',
    date: '2026',
  },
]
