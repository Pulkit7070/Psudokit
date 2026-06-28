'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

interface VisitorPoint {
  lat: number
  lng: number
  city: string
  country: string
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
      markerColor: [1, 0.55, 0.1],
      glowColor: [0.6, 0.6, 0.7],
      markers: points.map((p) => ({ location: [p.lat, p.lng], size: 0.06 })),
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
    <div className="mt-10 sm:mt-14 flex flex-col items-center gap-4">
      <div className="text-center">
        <div className="font-[family-name:var(--font-instrument-serif)] text-5xl sm:text-7xl tabular-nums dark:text-white text-black">
          {total === null ? '—' : total.toLocaleString()}
        </div>
        <div className="text-sm sm:text-base dark:text-white/40 text-black/40 mt-1">
          visitors from around the world
        </div>
      </div>
      <div className="w-full max-w-[520px] aspect-square">
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
    </div>
  )
}
