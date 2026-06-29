'use client'

import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaXTwitter, FaArrowUpRightFromSquare } from 'react-icons/fa6'

interface GitHubStats {
  followers: number
  repos: number
  stars: number
  prs: number
  issues: number
}

interface WakaStats {
  totalText: string
  allTimeText: string
  totalSeconds: number
}

const GITHUB_URL = 'https://github.com/Pulkit7070'
const X_URL = 'https://x.com/PsudoKit'
const LINKEDIN_URL = 'https://www.linkedin.com/in/pulkit-saraf-893213290/'

// Deterministic green contribution-grid pattern (avoids SSR/client mismatch).
const GRID = Array.from({ length: 70 }, (_, i) => ((i * 7 + 3) % 11) / 11)

const tile =
  'relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/10 p-4 sm:p-5 transition-transform duration-300 hover:-translate-y-0.5'

export default function BentoStats() {
  const [gh, setGh] = useState<GitHubStats | null>(null)
  const [waka, setWaka] = useState<WakaStats | null>(null)

  useEffect(() => {
    fetch('/api/github-stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setGh(d))
      .catch(() => {})
    fetch('/api/wakatime')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setWaka(d))
      .catch(() => {})
  }, [])

  const n = (v: number | undefined) => (v === undefined ? '—' : v.toLocaleString())

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[150px]">
      {/* GitHub feature tile */}
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${tile} col-span-2 row-span-2 group bg-gradient-to-br from-[#0d1117] via-[#10231a] to-[#0d3320] flex flex-col justify-between`}
      >
        <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <FaGithub className="w-40 h-40 text-white" />
        </div>
        <div className="flex items-center justify-between">
          <FaGithub className="w-7 h-7 text-white" />
          <FaArrowUpRightFromSquare className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80 transition-colors" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-semibold text-white">GitHub</div>
          <div className="text-sm text-emerald-300/70 mt-1">my code playground, building in public</div>
        </div>
      </a>

      {/* Contribution + stats tile */}
      <div className={`${tile} col-span-2 row-span-2 bg-gradient-to-br from-[#0a0f0c] to-[#0f1a13] flex flex-col justify-between`}>
        <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1">
          {GRID.map((v, i) => (
            <span
              key={i}
              className="aspect-square rounded-[2px]"
              style={{ backgroundColor: `rgba(34,197,94,${0.12 + v * 0.85})` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
          <Stat color="#ef4444" label="Stars" value={n(gh?.stars)} />
          <Stat color="#a855f7" label="Followers" value={n(gh?.followers)} />
          <Stat color="#3b82f6" label="PRs" value={n(gh?.prs)} />
          <Stat color="#e5e7eb" label="Issues" value={n(gh?.issues)} />
        </div>
      </div>

      {/* WakaTime tile */}
      <div className={`${tile} col-span-2 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] flex flex-col justify-between`}>
        <div className="flex items-center gap-2 text-indigo-300/70 text-xs font-mono">
          <span>{'</>'}</span>
          <span>wakatime</span>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            {waka === null ? '—' : waka.allTimeText}
          </div>
          <div className="text-xs text-white/40 mt-1">
            total coded · {waka === null ? '—' : waka.totalText} last 7 days
          </div>
        </div>
      </div>

      {/* LinkedIn tile */}
      <Social
        href={LINKEDIN_URL}
        gradient="from-[#0a66c2]/40 to-[#0a1a2f]"
        icon={<FaLinkedin className="w-6 h-6 text-[#4aa3f0]" />}
        label="(sometimes ;)"
      />

      {/* X tile */}
      <Social
        href={X_URL}
        gradient="from-[#1a1a1a] to-[#000000]"
        icon={<FaXTwitter className="w-6 h-6 text-white" />}
        label="(serious stuff)"
      />

      {/* Identity tile */}
      <div className={`${tile} col-span-2 bg-gradient-to-br from-[#2a1a0f] via-[#1c1c1c] to-[#0f0f0f] flex flex-col justify-center`}>
        <div className="text-2xl sm:text-3xl font-semibold text-white">@psudokit</div>
        <div className="text-sm text-orange-300/60 mt-1">offchain, somewhere building the next thing</div>
      </div>

      {/* Accent / location tile */}
      <div className={`${tile} col-span-2 bg-gradient-to-br from-[#3b0764] via-[#1e1b4b] to-[#0f172a] flex flex-col justify-center`}>
        <div className="text-lg sm:text-xl font-medium text-white">Currently shipping</div>
        <div className="text-sm text-fuchsia-300/60 mt-1">open to collabs and cool problems</div>
      </div>
    </div>
  )
}

function Stat({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm text-white/50">{label}:</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  )
}

function Social({
  href,
  gradient,
  icon,
  label,
}: {
  href: string
  gradient: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${tile} col-span-1 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2 group`}
    >
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-xs text-white/50">{label}</span>
    </a>
  )
}
