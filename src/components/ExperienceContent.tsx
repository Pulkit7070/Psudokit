'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ExperienceItem {
  company: string
  position: string
  duration: string
  description: string
  href?: string
  logoUrl?: string
}

const experiences: ExperienceItem[] = [
  {
    company: 'ArmorIQ',
    position: 'Full Stack Engineer',
    duration: 'February 2026 · Remote',
    description:
      'Working directly with the VP of Engineering to ship full-stack features on ArmorIQ\'s security platform. Own features end-to-end — API design, backend logic, and UI — in a high-trust, fast-paced environment. Operate autonomously with a distributed team while keeping a tight feedback loop with leadership.',
    href: 'https://armoriq.ai//',
    logoUrl: '/armoriq-icon.svg',
  },
  {
    company: 'PreciQube (IIT Madras Startup)',
    position: 'Full Stack Developer Intern',
    duration: 'November 2025 · December 2025',
    description:
      'Built a browser-based 2D optics simulation tool for an IIT Madras research team. Worked across a cross-functional group of 3 engineers and 5 physicists, translating complex domain requirements into interactive workflows. Shipped a physics-based ray-tracing module that improved simulation responsiveness by ~20% in internal testing.',
    href: 'https://www.preciqube.com/',
    logoUrl: '/preciqube.jpeg',
  },
  {
    company: 'Rabbitt Learning',
    position: 'Technical Project Manager Intern',
    duration: 'June 2025 – October 2025',
    description:
      'Wore two hats — building features and coordinating delivery. Shipped multi-select preferences, browser-based video recording, and WhatsApp/email notification integrations, increasing feature adoption by 25%. Improved platform performance by 20% through Next.js + Supabase optimizations and real-time Cloudflare Worker pipelines.',
    href: 'https://learning.rabbitt.ai/',
    logoUrl: '/tech-icons/rabbitt_learning.svg',
  },
  {
    company: 'AY-Labels',
    position: 'Web Developer · Freelance',
    duration: 'March 2025',
    description:
      'Sole developer on a production website for a manufacturing label company. Handled the full engagement independently — discovery, design direction, development, and deployment. Delivered a fast, responsive site that served as the company\'s primary digital storefront.',
    href: 'https://www.indiamart.com/a-y-labels/',
    logoUrl: '/ay-labels.webp',
  },
  {
    company: 'Encryptix',
    position: 'Front-End Intern',
    duration: 'October 2024 – November 2024',
    description:
      'Built responsive UI components with React, JavaScript, and CSS3 as part of an early internship. Identified workflow inefficiencies through codebase analysis and reduced build time by 15%. A formative experience that solidified strong fundamentals in component architecture and cross-browser compatibility.',
    href: 'https://encryptix.in/',
    logoUrl: '/encrytix.png',
  },
]

interface NoteState {
  exp: ExperienceItem
  x: number
  y: number
}

function StickyNote({ note, onClose }: { note: NoteState; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const noteW = 288
  const gap = 10
  const clampedX = Math.min(Math.max(note.x - noteW / 2, 12), (typeof window !== 'undefined' ? window.innerWidth : 800) - noteW - 12)
  const clampedY = note.y + gap

  return (
    <div
      ref={ref}
      style={{ left: clampedX, top: clampedY, width: noteW }}
      className="fixed z-50 rotate-[-0.4deg]"
    >
      {/* pin */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400/80 border border-red-300/60 shadow z-10" />

      <div className="bg-amber-50 dark:bg-neutral-900 border border-amber-200/80 dark:border-neutral-700 rounded-sm shadow-2xl overflow-hidden">
        {/* header strip */}
        <div className="bg-amber-100/80 dark:bg-neutral-800 px-4 pt-5 pb-2 border-b border-amber-200/60 dark:border-neutral-700 flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700/70 dark:text-neutral-400">
              {note.exp.position}
            </p>
            <p className="text-xs text-amber-600/60 dark:text-neutral-500 mt-0.5">{note.exp.duration}</p>
          </div>
          <button
            onClick={onClose}
            className="text-amber-500/60 dark:text-neutral-500 hover:text-amber-800 dark:hover:text-white transition-colors mt-0.5 shrink-0"
            aria-label="Close"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="px-4 py-3">
          <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300" style={{ fontFamily: 'inherit' }}>
            {note.exp.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ExperienceContent() {
  const [note, setNote] = useState<NoteState | null>(null)

  const openNote = useCallback((exp: ExperienceItem, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    if (note?.exp.company === exp.company) {
      setNote(null)
      return
    }
    setNote({ exp, x: rect.left + rect.width / 2, y: rect.bottom })
  }, [note])

  return (
    <>
      <div className="space-y-6 dark:text-white/70 text-black/70 pb-6">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
          >
            {/* Left side */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              {/* Logo */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                {exp.logoUrl ? (
                  <Image
                    src={exp.logoUrl}
                    alt={exp.company}
                    fill
                    sizes="(min-width: 640px) 64px, 56px"
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-sm sm:text-lg font-medium dark:text-white text-black">
                    {exp.company.charAt(0)}
                  </span>
                )}
              </div>

              {/* Company info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium dark:text-white text-black text-base sm:text-lg flex items-center gap-1.5">
                  {exp.href ? (
                    <Link
                      href={exp.href}
                      target="_blank"
                      className="hover:text-[#006FEE] transition-colors"
                    >
                      {exp.company}
                    </Link>
                  ) : (
                    exp.company
                  )}

                  {/* Info icon */}
                  <button
                    onClick={(e) => openNote(exp, e)}
                    aria-label={`Details for ${exp.company}`}
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-full border transition-all shrink-0
                      ${note?.exp.company === exp.company
                        ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                        : 'border-neutral-400/40 dark:border-neutral-600 text-neutral-400 dark:text-neutral-500 hover:border-amber-400/70 hover:text-amber-400 dark:hover:border-amber-400/50 dark:hover:text-amber-400'
                      }`}
                  >
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </h3>
                <p className="text-xs sm:text-sm opacity-70">{exp.position}</p>
              </div>
            </div>

            {/* Right side - Duration */}
            <div className="pl-13 sm:pl-0 sm:text-right flex-shrink-0">
              <p className="text-xs sm:text-sm opacity-50">{exp.duration}</p>
            </div>
          </div>
        ))}
      </div>

      {note && <StickyNote note={note} onClose={() => setNote(null)} />}
    </>
  )
}
