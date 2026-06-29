import { NextResponse } from 'next/server'

// Cache the WakaTime response for 30 minutes so we don't hit their API on
// every page load.
export const revalidate = 1800

interface WakaLanguage {
  name: string
  percent: number
  text: string
}

export async function GET() {
  const key = process.env.WAKATIME_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'WAKATIME_API_KEY is not set' },
      { status: 500 },
    )
  }

  const auth = Buffer.from(key).toString('base64')
  const headers = { Authorization: `Basic ${auth}` }

  const [statsRes, todayRes] = await Promise.all([
    fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers,
      next: { revalidate: 1800 },
    }),
    fetch(
      'https://wakatime.com/api/v1/users/current/all_time_since_today',
      { headers, next: { revalidate: 1800 } },
    ),
  ])

  if (!statsRes.ok) {
    return NextResponse.json(
      { error: `WakaTime API returned ${statsRes.status}` },
      { status: 502 },
    )
  }

  const { data } = await statsRes.json()
  let allTimeText = '0 secs'
  if (todayRes.ok) {
    const todayJson = await todayRes.json()
    allTimeText = todayJson.data?.text ?? '0 secs'
  }

  const languages: WakaLanguage[] = (data.languages ?? [])
    .slice(0, 5)
    .map((l: { name: string; percent: number; text: string }) => ({
      name: l.name,
      percent: l.percent,
      text: l.text,
    }))

  return NextResponse.json({
    range: data.human_readable_range ?? 'Last 7 Days',
    totalText: data.human_readable_total ?? '0 secs',
    totalSeconds: data.total_seconds ?? 0,
    dailyAverageText: data.human_readable_daily_average ?? '0 secs',
    allTimeText,
    languages,
  })
}
