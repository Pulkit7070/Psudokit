import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const TOTAL_KEY = 'visitors:total'
const POINTS_KEY = 'visitors:points'
const MAX_POINTS = 300

interface VisitorPoint {
  lat: number
  lng: number
  city: string
  country: string
}

export async function POST(req: Request) {
  const total = await redis.incr(TOTAL_KEY)

  const latRaw = req.headers.get('x-vercel-ip-latitude')
  const lngRaw = req.headers.get('x-vercel-ip-longitude')

  // Geo headers only exist on Vercel. Record a point when we have coordinates.
  if (latRaw && lngRaw) {
    const point: VisitorPoint = {
      lat: parseFloat(latRaw),
      lng: parseFloat(lngRaw),
      city: decodeURIComponent(req.headers.get('x-vercel-ip-city') ?? ''),
      country: req.headers.get('x-vercel-ip-country') ?? '',
    }
    await redis.lpush(POINTS_KEY, point)
    await redis.ltrim(POINTS_KEY, 0, MAX_POINTS - 1)
  }

  const points = await redis.lrange<VisitorPoint>(POINTS_KEY, 0, MAX_POINTS - 1)
  return NextResponse.json({ total, points })
}

export async function GET() {
  const [total, points] = await Promise.all([
    redis.get<number>(TOTAL_KEY),
    redis.lrange<VisitorPoint>(POINTS_KEY, 0, MAX_POINTS - 1),
  ])
  return NextResponse.json({ total: total ?? 0, points })
}
