'use client'

import Link from 'next/link'
import DiagonalPattern from './DiagonalPattern'
import BannerSection from './BannerSection'
import ProfileHeader from './ProfileHeader'
import ContentSection from './ContentSection'
import ContentParagraph from './ContentParagraph'
import SectionBorder from './SectionBorder'
import ExperienceContent from './ExperienceContent'
import Reachout from './Reachout'
import CallToAction from './CallToAction'
import ContributionsDisplay from './ContributionsDisplay'
import OpenSourceContributionsCard from './OpenSourceContributionsCard'
import TechStackMarquee from './TechStackMarquee'
import { Reveal } from './Reveal'

export default function NewHeroSection() {
  return (
    <div className="min-h-screen transition-colors duration-300 font-['Inter'] relative">
      <div className="relative mx-auto max-w-4xl">
        {/* Diagonal Patterns */}
        <DiagonalPattern side="left" />
        <DiagonalPattern side="right" />
        
        {/* Main Content */}
        <div className="mx-auto sm:w-[calc(100%-120px)] w-full max-w-4xl">
          {/* Banner Section */}
          <Reveal delay={0.1} duration={0.8} amount={0.2}>
            <BannerSection 
              bannerImage="/psudokit_banner.jpg"
              quote="Build • Ship • Learn • Repeat"
            />
          </Reveal>
          
          {/* Profile Header */}
          <Reveal delay={0.2} duration={0.7} amount={0.3}>
            <ProfileHeader 
              name="Pulkit Saraf"
              age="20"
              title="engineer • developer • builder"
              profileImage="/pfp.jpg"
              socialLinks={{
                twitter: "https://x.com/PsudoKit",
                github: "https://github.com/Pulkit7070",
                linkedin: "https://www.linkedin.com/in/pulkit-saraf-893213290/",
                resume: "https://drive.google.com/file/d/1XRT3BcHjIwqIASw2vdA2V2HgtGlhfuxP/view?usp=sharing",
              }}
            />
          </Reveal>
          
          {/* Content Prose */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="text-base">
              {/* Current Role Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.4}>
                <ContentSection
                  subtitle="AI Engineer | Full-stack Developer"
                  title=''
                  className="mt-6"
                >
                  <div></div>
                </ContentSection>
              </Reveal>
              
              <Reveal delay={0.05} duration={0.4} y={20} amount={0.8}>
                <SectionBorder className="mt-6" />
              </Reveal>
              
              {/* About Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.3}>
                <ContentSection className="pb-8 pt-6">
                  <ContentParagraph className="mt-6 mb-6">
                    I&apos;m probably not the developer you&apos;re expecting. I&apos;d much rather be shipping something meaningful on chain, coffee in hand, than losing sleep debugging someone else&apos;s code at 3 AM. My focus these days is deep in Web3 and AI. I&apos;m all about building smarter, faster systems that actually get the job done, not just sound impressive. I love building tech that feels effortless, even if it&apos;s powered by complex logic behind the scenes.
                  </ContentParagraph>

                  <ContentParagraph className="mb-4">
                    I thrive on building from scratch. Whether that&apos;s on Ethereum, Aptos, or Monad, I&apos;m all in on creating clean, scalable builds. I don&apos;t like cutting corners, but I&apos;ve definitely got that jugaad spirit  the resourcefulness to find a way and just get it done, no matter what. I really enjoy handling the full lifecycle myself, from writing smart contracts and backend APIs to polishing the frontend. My goal is to make each build feel cohesive, like every piece just clicks.
                  </ContentParagraph>

                  <ContentParagraph className="mb-2">
                    For me, this isn&apos;t just about chasing buzzwords. It&apos;s about turning a great idea into something people actually want to use, and honestly, it&apos;s also about the people. I love making connections, so you&apos;ll find me at a lot of events and hacks not really to win, but to meet fellow folks. Every project is a chance to learn something new, and I&apos;m still learning, still experimenting, and still coding every day. And yeah, I&apos;m probably still holding a cup of coffee.
                  </ContentParagraph>
                </ContentSection>
              </Reveal>

              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-6" />
              </Reveal>

               {/* Experience Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.3}>
                <div className="sm:px-12 px-6 py-4">
                  <h2 className="text-lg sm:text-xl mb-4 opacity-20 mt-8">Professional Experience</h2>
                  <ExperienceContent />
                </div>
              </Reveal>

                <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                  <SectionBorder className="mt-6" />
                </Reveal>
              
                 {/* Technical Contributions */}
              <Reveal delay={0.1} duration={0.6} amount={0.2}>
                <div className="sm:px-12 px-6 py-4">
                  <h2 className="text-lg sm:text-xl mb-4 opacity-20 mt-8">Technical Contributions</h2>
                  <div className="space-y-6 dark:text-white/70 text-black/70 pb-8">
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">At Turbo ML,</span> I spent 3 months building some pretty cool stuff. Think Redis Sorted Sets handling time-based tasks under 24-hour constraints, WhatsApp Business API integrations with custom commands, and secure MCP protocols using hash-based user identification. The kind of work that keeps you up at night because it&apos;s actually interesting.
                    </ContentParagraph>
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">Here&apos;s where it gets interesting </span> I reverse engineered Blinkit and Swiggy APIs to understand their data structures and endpoints, then created an AI agent that could intelligently route food delivery and grocery orders. Not your typical API integration tutorial this was about understanding how these platforms really work under the hood and building something smarter on top of it.
                    </ContentParagraph>
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">At Lamarr —</span> Resolved 10+ critical issues in a month maintaining 99.9% uptime. Built Greenhouse integrations, browser video recording, and WhatsApp/email API connections. When systems break at 3 AM, you learn optimization fast.
                    </ContentParagraph>
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">
                        <Link href="https://github.com/KartikLabhshetwar" target='_blank' className="text-[#006FEE] hover:underline">0→1</Link> product development
                      </span>
                      <span> specialist for startups and personal projects. Faster iterations, clearer outcomes.</span>
                    </ContentParagraph>
                  </div>
                </div>
              </Reveal>


              
              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>
              
              {/* GitHub Contributions */}
              <Reveal delay={0.1} duration={0.6} amount={0.2}>
                <div className="sm:px-12 px-6 mt-4">
                  <h2 className="text-lg sm:text-xl opacity-20 leading-relaxed -tracking-[0.01em] mb-4">
                    GitHub Contributions <span className="opacity-20">●</span> @Pulkit Saraf
                  </h2>
                  <div className="mb-6">
                    <ContributionsDisplay
                      username="Pulkit7070"
                      variant="compact"
                      className="w-full"
                    />
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>
              
              {/* Tech Stack Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.3}>
                <div className="sm:px-12 px-6 mt-6 mb-6">
                  <TechStackMarquee className="w-full" />
                </div>
              </Reveal>
              
              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>
              
              {/* Open Source Contributions Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.2}>
                <div className="sm:px-12 px-6 mt-4">
                  <h2 className="text-lg sm:text-xl opacity-20 mt-8 ml-5 leading-relaxed -tracking-[0.01em] mb-4">
                    Open Source Contributions <span className="opacity-20">●</span> {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </h2>
                  <OpenSourceContributionsCard />
                </div>
              </Reveal>
              
              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-4 pt-0" />
              </Reveal>

              {/* call to action*/}
              <Reveal delay={0.1} duration={0.6} amount={0.4}>
                <CallToAction/>
              </Reveal>
              
              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>
              
              {/* Reachout Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.3}>
                <div className="mt-6">
                  <Reachout 
                    title="Let's connect"
                    subtitle="Find me on these platforms"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
