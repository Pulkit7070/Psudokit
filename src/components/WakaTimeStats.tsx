'use client'

import { useEffect, useState } from 'react'

interface WakaLanguage {
  name: string
  percent: number
  text: string
}

interface WakaStats {
  range: string
  totalText: string
  totalSeconds: number
  dailyAverageText: string
  languages: WakaLanguage[]
}

// Distinct colors for the language bar segments.
const LANG_COLORS = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#a855f7']

export default function WakaTimeStats() {
  const [stats, setStats] = useState<WakaStats | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch('/api/wakatime')
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`)
        return res.json()
      })
      .then((data: WakaStats) => setStats(data))
      .catch((err) => {
        console.warn('[WakaTimeStats] failed:', err)
        setFailed(true)
      })
  }, [])

  if (failed) return null

  const hasData = stats !== null && stats.totalSeconds > 0

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <span className="font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl dark:text-white text-black">
            {stats === null ? '—' : stats.totalText}
          </span>
          <span className="text-sm dark:text-white/40 text-black/40 ml-2">
            coding time
          </span>
        </div>
        <span className="text-xs dark:text-white/30 text-black/30">
          {stats?.range ?? 'Last 7 Days'} · via WakaTime
        </span>
      </div>

      {hasData ? (
        <>
          {/* Stacked language bar */}
          <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            {stats!.languages.map((lang, i) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percent}%`,
                  backgroundColor: LANG_COLORS[i % LANG_COLORS.length],
                }}
                title={`${lang.name} · ${lang.text}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {stats!.languages.map((lang, i) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: LANG_COLORS[i % LANG_COLORS.length] }}
                />
                <span className="text-xs dark:text-white/60 text-black/60">
                  {lang.name}
                </span>
                <span className="text-xs dark:text-white/30 text-black/30">
                  {lang.percent.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm dark:text-white/30 text-black/30">
          No coding activity tracked yet, this fills in as I code with WakaTime
          running.
        </p>
      )}
    </div>
  )
}
