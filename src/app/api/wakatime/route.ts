import { NextResponse } from 'next/server'

// Cache for 15 minutes so we don't hit WakaTime on every page load.
export const revalidate = 900

interface WakaLanguage {
  name: string
  percent: number
  text: string
}

// Use the live `summaries` endpoint instead of `stats/last_7_days`: the stats
// endpoint is pre-aggregated and lags (often 0 for a while), while summaries
// returns real-time data.
export async function GET() {
  const key = process.env.WAKATIME_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'WAKATIME_API_KEY is not set' },
      { status: 500 },
    )
  }

  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 6)
  const fmt = (d: Date) => d.toISOString().slice(0, 10)

  const auth = Buffer.from(key).toString('base64')
  const res = await fetch(
    `https://wakatime.com/api/v1/users/current/summaries?start=${fmt(start)}&end=${fmt(end)}`,
    { headers: { Authorization: `Basic ${auth}` }, next: { revalidate: 900 } },
  )

  if (!res.ok) {
    return NextResponse.json(
      { error: `WakaTime API returned ${res.status}` },
      { status: 502 },
    )
  }

  const json = await res.json()
  const totalText: string = json.cumulative_total?.text ?? '0 secs'
  const totalSeconds: number = json.cumulative_total?.seconds ?? 0

  // Aggregate language seconds across the 7 days.
  const langSeconds: Record<string, number> = {}
  for (const day of json.data ?? []) {
    for (const l of day.languages ?? []) {
      langSeconds[l.name] = (langSeconds[l.name] ?? 0) + l.total_seconds
    }
  }
  const langTotal = Object.values(langSeconds).reduce((a, b) => a + b, 0) || 1
  const languages: WakaLanguage[] = Object.entries(langSeconds)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, sec]) => ({ name, percent: (sec / langTotal) * 100, text: '' }))

  return NextResponse.json({
    range: 'Last 7 Days',
    totalText,
    totalSeconds,
    languages,
  })
}
