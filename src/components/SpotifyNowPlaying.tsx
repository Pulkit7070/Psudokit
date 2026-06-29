'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaSpotify } from 'react-icons/fa6'

interface Track {
  title: string
  artist: string
  url: string
  image: string
  playedAt: string
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<Track | null>(null)

  useEffect(() => {
    fetch('/api/spotify')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.track && setTrack(d.track))
      .catch(() => {})
  }, [])

  // Render nothing until there's a real track (no placeholder noise).
  if (!track) return null

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-2 group max-w-full"
      title={`${track.title} - ${track.artist}`}
    >
      {track.image && (
        <Image
          src={track.image}
          alt=""
          width={28}
          height={28}
          className="rounded-sm flex-shrink-0"
          unoptimized
        />
      )}
      <FaSpotify className="w-3.5 h-3.5 text-[#1DB954] flex-shrink-0" />
      <span className="text-xs opacity-50 truncate">
        last played{' '}
        <span className="opacity-90 group-hover:underline">{track.title}</span>
        {' · '}
        {track.artist}
      </span>
    </a>
  )
}
