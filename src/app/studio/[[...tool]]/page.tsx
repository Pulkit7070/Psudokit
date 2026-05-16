'use client'

import dynamicImport from 'next/dynamic'

// Studio uses React.createContext at module load — must be client-only (ssr: false)
const Studio = dynamicImport(() => import('./Studio'), { ssr: false })

export default function StudioPage() {
  return <Studio />
}
