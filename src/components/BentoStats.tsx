'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
        className={`${tile} col-span-2 row-span-2 group flex flex-col justify-between bg-[#0d1117]`}
      >
        <ImageBg src="/bento/project-exe.png" />
        <div className="relative z-10 flex items-center justify-between">
          <FaGithub className="w-7 h-7 text-white" />
          <FaArrowUpRightFromSquare className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
        </div>
        <div className="relative z-10">
          <div className="text-2xl sm:text-3xl font-semibold text-white">GitHub</div>
          <div className="text-sm text-white/60 mt-1">open source &amp; late-night side quests</div>
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
        <div className="grid grid-cols-4 gap-2 mt-3">
          <StatBlock value={n(gh?.stars)} label="stars" />
          <StatBlock value={n(gh?.followers)} label="followers" />
          <StatBlock value={n(gh?.prs)} label="PRs" />
          <StatBlock value={n(gh?.issues)} label="issues" />
        </div>
      </div>

      {/* WakaTime tile (take-care image background) */}
      <div className={`${tile} col-span-2 group flex flex-col justify-between`}>
        <ImageBg src="/bento/take-care.png" />
        <div className="relative z-10 flex items-center gap-2 text-white/70 text-xs font-mono">
          <span>{'</>'}</span>
          <span>wakatime</span>
        </div>
        <div className="relative z-10">
          <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            {waka === null ? '—' : waka.totalText}
          </div>
          <div className="text-xs text-white/60 mt-1">
            coding time · last 7 days
          </div>
        </div>
      </div>

      {/* X tile (cat image background) */}
      <a
        href={X_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${tile} col-span-1 group flex flex-col items-start justify-end gap-1`}
      >
        <ImageBg src="/bento/cat.png" />
        <FaXTwitter className="relative z-10 w-6 h-6 text-white group-hover:scale-110 transition-transform drop-shadow-lg" />
        <span className="relative z-10 text-xs text-white/80 drop-shadow">the unfiltered one</span>
      </a>

      {/* LinkedIn tile (sad-face image background) */}
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${tile} col-span-1 group flex flex-col items-start justify-end gap-1 bg-black`}
      >
        <ImageBg src="/bento/sad.png" />
        <FaLinkedin className="relative z-10 w-6 h-6 text-[#4aa3f0] group-hover:scale-110 transition-transform drop-shadow-lg" />
        <span className="relative z-10 text-xs text-white/80 drop-shadow">the formal one</span>
      </a>
    </div>
  )
}

function ImageBg({ src }: { src: string }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />
    </>
  )
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-lg sm:text-2xl font-semibold text-white tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-white/40 mt-1">
        {label}
      </span>
    </div>
  )
}
