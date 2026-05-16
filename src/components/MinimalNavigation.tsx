'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/theme-toggle'
import MusicToggle from '@/components/MusicToggle'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/projects', label: 'proof-of-work' },
  { href: '/blogs', label: 'blogs' },
  { href: '/opensource', label: 'open source' },
]

export default function MinimalNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-700/50">
        <div className="px-4 sm:px-8 py-3 sm:py-2.5">
          <div className="max-w-4xl mx-auto flex justify-between items-center">

            {/* Logo */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.15 }}>
              <Link
                href="/"
                className="text-xl font-[family-name:var(--font-instrument-serif)] font-medium hover:opacity-80 hover:underline transition-opacity duration-200 ml-2"
              >
                Pulkit
              </Link>
            </motion.div>

            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-6">
              {links.map(({ href, label }) => (
                <motion.div key={href} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={{ duration: 0.15 }}>
                  <Link
                    href={href}
                    className={`text-lg font-[family-name:var(--font-instrument-serif)] hover:opacity-80 hover:underline transition-opacity duration-200 ${
                      isActive(href) ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-2">
                <MusicToggle />
                <ModeToggle />
              </div>
            </div>

            {/* Mobile right side */}
            <div className="flex sm:hidden items-center gap-2">
              <MusicToggle />
              <ModeToggle />
              <button
                onClick={() => setOpen(o => !o)}
                aria-label="Toggle menu"
                className="cursor-pointer p-1.5 rounded-md text-black dark:text-white opacity-70 hover:opacity-100 transition-opacity"
              >
                {open ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden sm:hidden border-t border-neutral-200/50 dark:border-neutral-700/50"
            >
              <div className="px-6 py-4 flex flex-col gap-4 bg-white/95 dark:bg-black/95">
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-[family-name:var(--font-instrument-serif)] hover:opacity-80 transition-opacity duration-200 ${
                      isActive(href) ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop to close menu on outside tap */}
      {open && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
