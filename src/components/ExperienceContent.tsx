'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  description: string;
  href?: string;
  logoUrl?: string;
}

export default function ExperienceContent() {
  const experiences: ExperienceItem[] = [
    {
      company: "ArmorIQ (Lumeneo)",
      position: "Full Stack Engineer",
      duration: "March 2026 · Remote",
      description: "Building full-stack features for ArmorIQ's core platform, working directly with the VP of Engineering. Focused on shipping production-ready code across the stack while collaborating with a distributed team.",
      href: "https://lumeneo.ai/",
      logoUrl: "/armoriq.svg",
    },
    {
      company: "PreciQube (IIT Madras Startup)",
      position: "Full Stack Developer Intern",
      duration: "November 2025 · Remote",
      description: "Built a web-based 2D optics simulation platform to trace and visualize light rays, supporting multiple optical scenarios for research testing. Worked with a team (3 devs + 5 physicists + 1 professor) through daily syncs to convert physics requirements into interactive workflows. Integrated a physics-based ray emission + tracing module into the UI, improving simulation responsiveness by ~20% in internal testing.",
      href: "https://www.preciqube.com/",
      logoUrl: "/preciqube.jpeg",
    },
    {
      company: "Rabbitt Learning",
      position: "Technical Project Manager Intern",
      duration: "June 2025 – October 2025",
      description: "Built full-stack features including multi-select preferences, browser-based video recording, and WhatsApp/email API integrations, increasing feature adoption by 25%. Implemented real-time scraping with Cloudflare Workers and optimized workflows using Next.js and Supabase, improving platform performance by 20%.",
      href: "https://learning.rabbitt.ai/",
      logoUrl: "/tech-icons/rabbitt_learning.svg",
    },
    
    {
      company: "AY-Labels  ",
      position: "Web Developer freelancer",
      duration: "March 2025",
      description: "Developed and deployed cutting-edge solutions, including multi-select preferences, browser-based video recording, and API integrations like WhatsApp/email reminders. Optimized workflows with autosave features and real-time scraping, leveraging Next.js, Supabase, and Cloudflare workers.",
      href: "https://www.indiamart.com/a-y-labels/",
      logoUrl: "/ay-labels.webp",
    },
    {
  company: "Encryptix",
  position: "Front-End Intern",
  duration: "October 2024 – November 2024",
  description: "Analyzed enterprise-level architectures to optimize development workflows, reducing build time by 15%. Built responsive UI components with React, JavaScript, and CSS3, improving user experience and accelerating feature delivery.",
  href: "https://encryptix.in/",
  logoUrl: "/encrytix.png",
},
  ];

  return (
    <div className="space-y-6 dark:text-white/70 text-black/70 pb-6">
      {experiences.map((exp) => (
        <div key={exp.company} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Left side - Logo, Company & Position */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Company Logo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              {exp.logoUrl ? (
                <>
                  {/* Use Image with fill and object-contain so logos scale and center inside the circle. Add small padding so edges aren't clipped. */}
                  <Image
                    src={exp.logoUrl}
                    alt={exp.company}
                    fill
                    sizes="(min-width: 640px) 48px, 40px"
                    className="object-contain p-1"
                  />
                </>
              ) : (
                <span className="text-sm sm:text-lg font-medium dark:text-white text-black">
                  {exp.company.charAt(0)}
                </span>
              )}
            </div>
            
            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium dark:text-white text-black text-base sm:text-lg">
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
              </h3>
              <p className="text-xs sm:text-sm opacity-70">
                {exp.position}
              </p>
            </div>
          </div>
          
          {/* Right side - Duration */}
          <div className="pl-13 sm:pl-0 sm:text-right flex-shrink-0">
            <p className="text-xs sm:text-sm opacity-50">
              {exp.duration}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
