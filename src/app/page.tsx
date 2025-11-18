'use client'

import OnekoCat from "@/components/OnekoCat"
import MinimalNavigation from "@/components/MinimalNavigation"
import NewHeroSection from "@/components/NewHeroSection"

export default function Home() {
  return (
      <div>
        <MinimalNavigation />
        <OnekoCat />
        <div className="pt-16 sm:pt-16">
          <NewHeroSection />
        </div>
      </div>
  );
}
