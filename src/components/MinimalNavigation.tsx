'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/theme-toggle'
import MusicToggle from '@/components/MusicToggle'
import { motion } from 'framer-motion'

export default function MinimalNavigation() {
  const pathname = usePathname()
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-700/50">
      <div className="px-4 sm:px-8 py-3 sm:py-2.5">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Link 
              href="/"
              className="text-xl sm:text-xl font-[family-name:var(--font-instrument-serif)] font-medium hover:opacity-80 hover:underline transition-opacity duration-200 ml-2"
            >
              Pulkit
            </Link>
          </motion.div>
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <Link 
                href="/projects" 
                className={`text-md sm:text-lg font-[family-name:var(--font-instrument-serif)] hover:opacity-80 hover:underline transition-opacity duration-200 ${
                  isActive('/projects') ? 'opacity-100' : 'opacity-60'
                }`}
              >
                proof-of-work
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <Link 
                href="/blogs" 
                className={`text-md sm:text-lg hover:opacity-80 hover:underline transition-opacity duration-200 ${
                  isActive('/blogs') ? 'opacity-100' : 'opacity-60'
                }`}
              >
                blogs
              </Link>
            </motion.div>
            <div className="flex items-center gap-2">
              <MusicToggle />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
