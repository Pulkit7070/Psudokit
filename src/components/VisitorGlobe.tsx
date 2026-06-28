'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

interface VisitorPoint {
  lat: number
  lng: number
  city: string
  country: string
  count: number
}

// GitHub contribution-graph green ramp: light green (sparse) to dark, rich
// green (dense). Markers stay small and flush so they read as filled-in map
// dots rather than chunky blobs sitting on top of the globe.
const GH_LIGHT: [number, number, number] = [0.61, 0.91, 0.66] // #9be9a8
const GH_DARK: [number, number, number] = [0.13, 0.43, 0.22] // #216e39

// Visit count at which a location reaches the darkest green. Absolute (not
// relative to the busiest city) so a single visit reads light, like GitHub.
const DENSITY_FULL = 40

function markerFor(point: VisitorPoint) {
  const intensity = Math.min(
    1,
    Math.log(point.count + 1) / Math.log(DENSITY_FULL + 1),
  ) // 0..1
  const color: [number, number, number] = [
    GH_LIGHT[0] + (GH_DARK[0] - GH_LIGHT[0]) * intensity,
    GH_LIGHT[1] + (GH_DARK[1] - GH_LIGHT[1]) * intensity,
    GH_LIGHT[2] + (GH_DARK[2] - GH_LIGHT[2]) * intensity,
  ]
  // Keep close to the map's own dot size so it looks embedded, not chunky.
  const size = 0.022 + intensity * 0.01
  return { location: [point.lat, point.lng] as [number, number], size, color }
}

export default function VisitorGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const recordedRef = useRef(false)
  const [total, setTotal] = useState<number | null>(null)
  const [points, setPoints] = useState<VisitorPoint[]>([])

  // Drag-to-rotate state.
  const pointerInteracting = useRef<number | null>(null)
  const pointerMovement = useRef(0)
  const rotation = useRef(0)

  // Record this visit once, then keep the returned data for the globe.
  useEffect(() => {
    if (recordedRef.current) return
    recordedRef.current = true

    fetch('/api/visitors', { method: 'POST' })
      .then(async (res) => {
        // When Upstash isn't configured the API returns a 500 with an empty
        // body. Surface that in the console but keep the counter at "—" rather
        // than crashing the component on res.json().
        if (!res.ok) {
          console.warn('[VisitorGlobe] /api/visitors not ready:', res.status)
          return
        }
        const data: { total: number; points: VisitorPoint[] } = await res.json()
        setTotal(data.total)
        setPoints(data.points ?? [])
      })
  }, [])

  // Draw the globe whenever the visitor points change.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = 0
    let raf = 0
    let width = canvas.offsetWidth
    const onResize = () => {
      width = canvas.offsetWidth
    }
    window.addEventListener('resize', onResize)

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.35],
      markerColor: GH_LIGHT,
      glowColor: [0.6, 0.6, 0.7],
      markerElevation: 0,
      markers: points.map((p) => markerFor(p)),
    })

    // cobe v2 has no internal loop: drive it ourselves so it keeps redrawing
    // (the world-map texture loads async) and spins.
    const render = () => {
      if (pointerInteracting.current === null) {
        phi += 0.004
      }
      globe.update({
        phi: phi + rotation.current,
        width: width * 2,
        height: width * 2,
      })
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [points])

  return (
    <div className="relative mt-4">
      {/* Globe stays centered; its position is independent of the counter. */}
      <div className="w-full max-w-[460px] aspect-square mx-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerMovement.current
            e.currentTarget.style.cursor = 'grabbing'
          }}
          onPointerUp={(e) => {
            pointerInteracting.current = null
            e.currentTarget.style.cursor = 'grab'
          }}
          onPointerOut={(e) => {
            pointerInteracting.current = null
            e.currentTarget.style.cursor = 'grab'
          }}
          onPointerMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current
              pointerMovement.current = delta
              rotation.current = delta / 200
            }
          }}
        />
      </div>

      {/* Small counter caption: bottom-right of the globe on desktop,
          centered below it on mobile. */}
      <div className="mt-3 sm:mt-0 flex flex-col items-center sm:items-end text-center sm:text-right sm:absolute sm:right-2 sm:bottom-6">
        <span className="font-[family-name:var(--font-instrument-serif)] text-2xl sm:text-3xl tabular-nums dark:text-white text-black leading-none">
          {total === null ? '—' : total.toLocaleString()}
        </span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wide dark:text-white/40 text-black/40 mt-1 max-w-[150px]">
          visitors from around the world
        </span>
      </div>
    </div>
  )
}
