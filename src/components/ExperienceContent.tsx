'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface ExperienceItem {
  company: string
  position: string
  duration: string
  points: string[]
  href?: string
  logoUrl?: string
}

const experiences: ExperienceItem[] = [
  {
    company: 'ArmorIQ',
    position: 'Full Stack Engineer',
    duration: 'February 2026 · Remote',
    points: [
      'Building ArmorIQ\'s AI agent security platform: intent enforcement, prompt injection protection, and cryptographic token verification across AI agents (Claude, Codex, OpenClaw)',
      'Contributing to the TypeScript customer SDK (@armoriq/sdk): capturePlan, getIntentToken, invoke, and token delegation flows used by external developers',
      'Working on ArmorClaude and ArmorCodex, security enforcement layers that wrap Claude Code and OpenAI Codex agents with fail-closed access control',
      'Contributing to Conmap, an MCP endpoint discovery and vulnerability scanner with SAFE-MCP risk scoring and GPT-4o semantic analysis of tool descriptions',
      'Ships across the full stack: SDK internals, backend APIs, and the platform dashboard at platform.armoriq.ai',
    ],
    href: 'https://armoriq.ai//',
    logoUrl: '/armoriq-icon.svg',
  },
  {
    company: 'PreciQube (IIT Madras Startup)',
    position: 'Full Stack Developer Intern',
    duration: 'November 2025 · December 2025',
    points: [
      'Built a browser-based 2D optics simulation platform for light ray tracing and visualization',
      'Collaborated across a team of 3 engineers, 5 physicists, and a professor through daily syncs',
      'Shipped a physics-based ray emission and tracing module integrated directly into the UI',
      'Improved simulation responsiveness by ~20% in internal testing through frontend optimizations',
    ],
    href: 'https://www.preciqube.com/',
    logoUrl: '/preciqube.jpeg',
  },
  {
    company: 'Rabbitt Learning',
    position: 'Technical Project Manager Intern',
    duration: 'June 2025 – October 2025',
    points: [
      'Shipped multi-select preferences, browser-based video recording, and WhatsApp/email API integrations',
      'Improved platform performance by 20% via Next.js and Supabase workflow optimizations',
      'Built real-time scraping pipelines with Cloudflare Workers deployed to the edge',
      'Increased feature adoption by 25% and coordinated delivery across frontend and backend',
    ],
    href: 'https://learning.rabbitt.ai/',
    logoUrl: '/tech-icons/rabbitt_learning.svg',
  },
  {
    company: 'AY-Labels',
    position: 'Web Developer · Freelance',
    duration: 'March 2025',
    points: [
      'Sole developer on a production website for a manufacturing label company',
      'Handled the full engagement: discovery, design direction, development, and deployment',
      'Delivered a fast, responsive site that became the company\'s primary digital storefront',
    ],
    href: 'https://www.indiamart.com/a-y-labels/',
    logoUrl: '/ay-labels.webp',
  },
  {
    company: 'Encryptix',
    position: 'Front-End Intern',
    duration: 'October 2024 – November 2024',
    points: [
      'Built responsive UI components with React, JavaScript, and CSS3',
      'Reduced build time by 15% by identifying and fixing workflow inefficiencies in the codebase',
      'Established strong fundamentals in component architecture and cross-browser compatibility',
    ],
    href: 'https://encryptix.in/',
    logoUrl: '/encrytix.png',
  },
]

interface NoteState {
  exp: ExperienceItem
  x: number
  y: number
}

function NoteContent({ exp, onClose }: { exp: ExperienceItem; onClose: () => void }) {
  return (
    <div className="bg-amber-50 dark:bg-neutral-900 border border-amber-200/80 dark:border-neutral-700 overflow-hidden rounded-sm sm:rounded-sm rounded-t-2xl sm:rounded-t-sm">
      {/* header */}
      <div className="bg-amber-100/80 dark:bg-neutral-800 px-5 pt-6 pb-3 border-b border-amber-200/60 dark:border-neutral-700 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700/80 dark:text-neutral-400 mb-0.5">
            {exp.company}
          </p>
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {exp.position}
          </p>
          <p className="text-xs text-amber-600/70 dark:text-neutral-500 mt-0.5">{exp.duration}</p>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer text-amber-500/60 dark:text-neutral-500 hover:text-amber-900 dark:hover:text-white transition-colors mt-1 shrink-0"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* body */}
      <div className="px-5 py-4">
        <ul className="space-y-2.5">
          {exp.points.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500 shrink-0" />
              <p className="text-[13.5px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StickyNote({ note, onClose }: { note: NoteState; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

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

  // Mobile: bottom sheet
  if (isMobile) {
    return (
      <>
        {/* backdrop */}
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
        <div ref={ref} className="fixed bottom-0 left-0 right-0 z-50 drop-shadow-2xl">
          {/* drag handle */}
          <div className="flex justify-center pt-3 pb-1 bg-amber-50 dark:bg-neutral-900 rounded-t-2xl border-t border-x border-amber-200/80 dark:border-neutral-700">
            <div className="w-10 h-1 rounded-full bg-amber-300/60 dark:bg-neutral-600" />
          </div>
          <NoteContent exp={note.exp} onClose={onClose} />
        </div>
      </>
    )
  }

  // Desktop: popover near icon
  const noteW = Math.min(480, window.innerWidth - 32)
  const clampedX = Math.min(Math.max(note.x - noteW / 2, 16), window.innerWidth - noteW - 16)
  const clampedY = note.y + 10

  return (
    <div
      ref={ref}
      style={{ left: clampedX, top: clampedY, width: noteW }}
      className="fixed z-50 rotate-[-0.4deg] drop-shadow-2xl"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-red-400 border-2 border-red-200/60 shadow-lg z-10" />
      <NoteContent exp={note.exp} onClose={onClose} />
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
                <h3 className="font-medium dark:text-white text-black text-base sm:text-lg flex items-center gap-2">
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

                  <button
                    onClick={(e) => openNote(exp, e)}
                    aria-label={`Details for ${exp.company}`}
                    className={`cursor-pointer inline-flex items-center justify-center w-[18px] h-[18px] rounded-full border transition-all shrink-0
                      ${note?.exp.company === exp.company
                        ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                        : 'border-neutral-400/40 dark:border-neutral-600 text-neutral-400 dark:text-neutral-500 hover:border-amber-400/70 hover:text-amber-400 dark:hover:border-amber-400/50 dark:hover:text-amber-400'
                      }`}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </h3>
                <p className="text-xs sm:text-sm opacity-70">{exp.position}</p>
              </div>
            </div>

            {/* Duration */}
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
