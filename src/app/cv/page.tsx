'use client'

import Link from 'next/link'
import MinimalNavigation from '@/components/MinimalNavigation'
import OnekoCat from '@/components/OnekoCat'
import { FaArrowLeft, FaDownload } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const RESUME_DRIVE_LINK = 'https://drive.google.com/file/d/19x66j0eWd0GG4N6gOARUaU-V2nq_MbjH/view?usp=sharing'
const RESUME_EMBED_LINK = 'https://drive.google.com/file/d/19x66j0eWd0GG4N6gOARUaU-V2nq_MbjH/preview'

export default function CVPage() {
  return (
    <div>
      <MinimalNavigation />
      <OnekoCat />
      <div className="pt-16 sm:pt-16">
        <div className="min-h-screen transition-colors duration-300 font-['Inter'] relative bg-white dark:bg-black">
          <div className="relative mx-auto max-w-4xl px-4 sm:px-8 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <Link
                href="/"
                className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <FaArrowLeft size={12} />
                back
              </Link>
              <a
                href={RESUME_DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-button flex items-center gap-2 px-4 py-2 bg-white dark:bg-black text-black dark:text-primary text-sm hover:bg-neutral-200 dark:hover:bg-neutral-900 transition-colors duration-200"
              >
                <FaDownload size={12} />
                Download
              </a>
            </motion.div>

            {/* Resume PDF Embed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full"
            >
              <div className="neo-button overflow-hidden w-full" style={{ aspectRatio: '8.5/11' }}>
                <iframe
                  src={RESUME_EMBED_LINK}
                  className="w-full h-full border-0"
                  allow="autoplay"
                  title="Pulkit Saraf - Resume"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
