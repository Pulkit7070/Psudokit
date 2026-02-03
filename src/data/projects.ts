import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'haloai',
    title: "HaloAI",
    description: "An AI-powered desktop assistant with integrated Stellar blockchain wallet. Wake it with a hotkey, and it sees your screen, helps you debug, draft emails, send crypto, and more.",
    longDescription: "Instant wake with global hotkey — no clicks required, just tap and start chatting\n\nContext-aware vision captures your screen and analyzes it with Llama 3.2 Vision to understand what you're working on\n\nAuto-detects dev mode when you're in VS Code or other IDEs, extracts errors and suggests fixes\n\nBuilt-in non-custodial Stellar wallet for sending/receiving XLM, DEX swaps, and trustline management\n\nEscrow vault with Soroban smart contracts for time-locked deposits and strategy commitment proofs\n\nVoice input powered by Deepgram for hands-free interaction",
    githubLink: "https://github.com/Pulkit7070/HaloAI",
    image: '/images/HaloAI.png',
    tags: [
      "Electron",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Stellar SDK",
      "Soroban",
      "Express",
      "Supabase",
      "Cerebras AI",
      "Deepgram"
    ],
  },
  {
    id: 'zarfa',
    title: "Zarfa",
    description: "On-chain VAT Refund & Payroll Payment Infrastructure on Monad blockchain. Helping users claim VAT refunds anytime, anywhere without hassle.",
    longDescription: "Built to solve a real problem: $200B in VAT goes unclaimed annually due to long airport queues and missed flights\n\nInstant VAT refunds through MetaMask — scan QR, confirm transaction, receive MON tokens instantly\n\nBulk payroll processing with AI-powered compliance layer for jurisdiction-aware tax calculations\n\nGoogle Gemini AI integration for automated document validation and receipt processing\n\nNestJS microservices backend with PostgreSQL, Redis queues, and real-time Socket.IO updates\n\nMonad blockchain provides ~1s finality and low transaction costs for enterprise-scale payments",
    githubLink: "https://github.com/Pulkit7070/Zarfa-Main",
    image: '/images/zarfa.png',
    tags: [
      "React",
      "TypeScript",
      "Monad Blockchain",
      "MetaMask",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Google Gemini AI",
      "Supabase",
      "Vite"
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}
