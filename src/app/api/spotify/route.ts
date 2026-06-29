import { NextResponse } from 'next/server'

// Music changes often, so only cache briefly.
export const revalidate = 60

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const RECENT_URL =
  'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function getAccessToken(id: string, secret: string, refresh: string) {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh,
    }),
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`token ${res.status}`)
  const json = await res.json()
  return json.access_token as string
}

export async function GET() {
  const id = process.env.SPOTIFY_CLIENT_ID
  const secret = process.env.SPOTIFY_CLIENT_SECRET
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN
  if (!id || !secret || !refresh) {
    return NextResponse.json(
      { error: 'Spotify env vars not set' },
      { status: 500 },
    )
  }

  const token = await getAccessToken(id, secret, refresh)
  const res = await fetch(RECENT_URL, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    return NextResponse.json(
      { error: `Spotify API ${res.status}` },
      { status: 502 },
    )
  }

  const data = await res.json()
  const item = data.items?.[0]
  if (!item) return NextResponse.json({ track: null })

  const t = item.track
  return NextResponse.json({
    track: {
      title: t.name,
      artist: t.artists?.map((a: { name: string }) => a.name).join(', '),
      url: t.external_urls?.spotify,
      image: t.album?.images?.[t.album.images.length - 1]?.url,
      playedAt: item.played_at,
    },
  })
}
