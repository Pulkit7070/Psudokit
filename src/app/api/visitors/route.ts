import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const TOTAL_KEY = 'visitors:total'
const GEO_KEY = 'visitors:geo' // hash: bucket -> visit count
const META_KEY = 'visitors:meta' // hash: bucket -> { lat, lng, city, country }

interface VisitorMeta {
  lat: number
  lng: number
  city: string
  country: string
}

interface VisitorPoint extends VisitorMeta {
  count: number
}

// Group nearby coordinates so repeat visits from the same area accumulate
// into one marker instead of stacking invisibly.
function bucketKey(lat: number, lng: number): string {
  return `${lat.toFixed(1)},${lng.toFixed(1)}`
}

async function readPoints(): Promise<VisitorPoint[]> {
  const [counts, metas] = await Promise.all([
    redis.hgetall<Record<string, number>>(GEO_KEY),
    redis.hgetall<Record<string, VisitorMeta>>(META_KEY),
  ])
  if (!counts || !metas) return []
  return Object.entries(counts)
    .map(([bucket, count]) => {
      const meta = metas[bucket]
      if (!meta) return null
      return { ...meta, count: Number(count) }
    })
    .filter((p): p is VisitorPoint => p !== null)
}

export async function POST(req: Request) {
  const total = await redis.incr(TOTAL_KEY)

  const latRaw = req.headers.get('x-vercel-ip-latitude')
  const lngRaw = req.headers.get('x-vercel-ip-longitude')

  // Geo headers only exist on Vercel. Accumulate a per-location count when we
  // have coordinates so denser regions render as stronger markers.
  if (latRaw && lngRaw) {
    const lat = parseFloat(latRaw)
    const lng = parseFloat(lngRaw)
    const bucket = bucketKey(lat, lng)
    const meta: VisitorMeta = {
      lat,
      lng,
      city: decodeURIComponent(req.headers.get('x-vercel-ip-city') ?? ''),
      country: req.headers.get('x-vercel-ip-country') ?? '',
    }
    await Promise.all([
      redis.hincrby(GEO_KEY, bucket, 1),
      redis.hset(META_KEY, { [bucket]: meta }),
    ])
  }

  const points = await readPoints()
  return NextResponse.json({ total, points })
}

export async function GET() {
  const [total, points] = await Promise.all([
    redis.get<number>(TOTAL_KEY),
    readPoints(),
  ])
  return NextResponse.json({ total: total ?? 0, points })
}
