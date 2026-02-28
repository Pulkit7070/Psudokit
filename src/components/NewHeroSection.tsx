'use client'

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
// import OpenSourceContributionsCard from './OpenSourceContributionsCard'
import TechStackMarquee from './TechStackMarquee'
import { Reveal } from './Reveal'

export default function NewHeroSection() {
  return (
    <div className="min-h-screen transition-colors duration-300 font-['Inter'] relative bg-white dark:bg-black">
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
                resume: "https://drive.google.com/file/d/1KM3CnPPFAskLDkIwLhzmAByP17jZkhSL/view?usp=sharing",
              }}
            />
          </Reveal>

          {/* Content Prose */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="text-base">
              {/* Current Role Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.4}>
                <ContentSection
                  subtitle="Full Stack Engineer @ ArmorIQ | AI & Web3 Builder"
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
                    I&apos;m probably not the developer you&apos;re expecting. I&apos;d much rather be shipping something meaningful on chain, sipping coffee, than losing sleep debugging someone else&apos;s code at 3 AM. My focus these days is deep in Web3 and AI. I&apos;m all about building smarter, faster systems that actually get the job done, not just sound impressive. I love building tech that feels effortless, even if it&apos;s powered by complex logic behind the scenes.
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
                  <h2 className="text-lg sm:text-xl mb-4 text-neutral-500 dark:text-neutral-400 mt-8">Professional Experience</h2>
                  <ExperienceContent />
                </div>
              </Reveal>

              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-6" />
              </Reveal>

              {/* Technical Contributions */}
              <Reveal delay={0.1} duration={0.6} amount={0.2}>
                <div className="sm:px-12 px-6 py-4">
                  <h2 className="text-lg sm:text-xl mb-4 text-neutral-500 dark:text-neutral-400 mt-8">Technical Contributions</h2>
                  <div className="space-y-6 dark:text-white/70 text-black/70 pb-8">
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">At Rabbit AI,</span> I worked as the lead engineer architecting <span className="font-medium dark:text-white text-black">agent-based inference systems</span>. Built end-to-end GenAI pipelines with multi-step reasoning, RAG (Retrieval-Augmented Generation) for context-aware responses, and agentic workflows that decompose complex tasks into sequential execution chains.
                    </ContentParagraph>
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">Offline P2P protocol.</span> Designed and implemented a <span className="font-medium dark:text-white text-black">peer-to-peer data transfer protocol</span> using QR-based packet streaming with <span className="font-medium dark:text-white text-black">Reed-Solomon error correction</span> and collision detection. Built custom packetization layer that fragments data into chunks, serializes with error-checking headers, transmits via sequential QR frames at 60fps, and reconstructs on the receiving end with <span className="font-medium dark:text-white text-black">CRC32 validation</span>. Zero network dependency. Pure offline communication.
                    </ContentParagraph>
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">Automated trading engine.</span> Developed a fully autonomous <span className="font-medium dark:text-white text-black">crypto trading bot</span> with real-time WebSocket connections to exchange APIs, , position sizing algorithms, and <span className="font-medium dark:text-white text-black">risk management protocols</span>. System handles order execution, portfolio rebalancing, and PnL tracking with <span className="font-medium dark:text-white text-black">millisecond-level latency</span>. All logic runs autonomously based on predefined strategies.
                    </ContentParagraph>
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">Cross-chain development.</span> I&apos;ve shipped production smart contracts and dApps across <span className="font-medium dark:text-white text-black">Monad, Ethereum, Solana, and BNB Chain</span>. Currently building on <span className="font-medium dark:text-white text-black">Somnia and Avalanche</span> in the pipeline. Each chain has its own quirks: EVM-compatible chains with Solidity, Solana with Rust and the Anchor framework, different consensus mechanisms, gas optimization strategies, and cross-chain bridge integrations.
                    </ContentParagraph>
                    <ContentParagraph>
                      <span className="font-medium dark:text-white text-black">Orbix and client projects.</span> Built Orbix, an internal ops platform with <span className="font-medium dark:text-white text-black">workflow automation, task queuing, and team collaboration features</span>. Backend runs on Node.js with PostgreSQL for relational data, Redis for caching, and real-time updates via WebSockets. Also delivered 5+ production websites as a freelancer, optimizing for <span className="font-medium dark:text-white text-black">Core Web Vitals, SEO performance, and sub-second load times</span>.
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
                  <h2 className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                    GitHub Contributions <span className="opacity-40">●</span> @Pulkit Saraf
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
              {/* <Reveal delay={0.1} duration={0.6} amount={0.2}>
                <div className="sm:px-12 px-6 mt-4">
                  <h2 className="text-lg sm:text-xl opacity-20 mt-8 ml-5 leading-relaxed -tracking-[0.01em] mb-4">
                    Open Source Contributions <span className="opacity-20">●</span> {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </h2>
                  <OpenSourceContributionsCard />
                </div>
              </Reveal>
              
              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-4 pt-0" />
              </Reveal> */}

              {/* Reachout Section */}
              <Reveal delay={0.1} duration={0.6} amount={0.3}>
                <div className="mt-6">
                  <Reachout
                    title="Let's connect"
                    subtitle="Find me on these platforms"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.05} duration={0.4} y={15} amount={0.8}>
                <SectionBorder className="mt-0 pt-0" />
              </Reveal>

              {/* call to action*/}
              <Reveal delay={0.1} duration={0.6} amount={0.4}>
                <CallToAction />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
