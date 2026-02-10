import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'leadpilot',
    title: "LeadPilot",
    description: "Autonomous B2B Lead Generation Engine  multi-source prospecting via Google Maps and Instagram with AI-powered personalized outreach.",
    longDescription: "Multi-source prospecting via Google Maps and Instagram  find businesses by location, category, or hashtags\n\nIntelligent lead scoring that filters out established businesses and prioritizes 'Digital Misfits' with weak online presence but high revenue potential\n\nAI-powered outreach generates hyper-personalized DMs using real business data like ratings, reviews, and website status\n\nReal-time dashboard with live progress tracking for scraping jobs and batch processing queue\n\nBuilt-in Lead CRM with status pipeline management (New → Contacted → Closed)\n\nSecure API authentication with rate limiting and CORS protection for production deployment",
    image: '/images/Leadpilot.png',
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "FastAPI",
      "SQLAlchemy",
      "Google Gemini",
      "Apify"
    ],
  },
  {
    id: 'opsuna',
    title: "Opsuna Tambo",
    description: "Natural language to automated workflows  describe what you want, watch it happen. One-prompt orchestration with 100+ tool integrations.",
    longDescription: "One-prompt orchestration  type a request like 'analyze the codebase and send the diagram to Slack' and the AI breaks it into steps, picks the right tools, and executes everything automatically\n\n100+ tool integrations via Composio  connect Slack, Gmail, Jira, GitHub, Notion, and more with OAuth, then use them through natural language without switching apps\n\nPowered by Tambo AI agent framework for reliable multi-step task execution and seamless tool coordination\n\nSemantic memory layer powered by pgvector  the system remembers past interactions, learns your patterns, and builds context over time for smarter suggestions\n\nCustom AI agents with scoped capabilities  create specialized agents like 'Data Analyst' or 'DevOps Engineer' with restricted tool access and isolated memory\n\nLive execution replay shows each step as it runs via WebSocket, with detailed audit logs and shareable reports for team visibility\n\nVisual outputs including Mermaid architecture diagrams and Recharts data visualizations, exportable and shareable with one click",
    image: '/images/opsuna.png',
    tags: [
      "Next.js",
      "Express",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Prisma",
      "Gemini AI",
      "Composio",
      "WebSocket",
      "pgvector"
    ],
  },
  {
    id: 'haloai',
    title: "HaloAI",
    description: "An AI-powered desktop assistant with integrated Stellar blockchain wallet. Wake it with a hotkey, and it sees your screen, helps you debug, draft emails, send crypto, and more.",
    longDescription: "Instant wake with global hotkey  no clicks required, just tap and start chatting\n\nContext-aware vision captures your screen and analyzes it with Llama 3.2 Vision to understand what you're working on\n\nAuto-detects dev mode when you're in VS Code or other IDEs, extracts errors and suggests fixes\n\nBuilt-in non-custodial Stellar wallet for sending/receiving XLM, DEX swaps, and trustline management\n\nEscrow vault with Soroban smart contracts for time-locked deposits and strategy commitment proofs\n\nVoice input powered by Deepgram for hands-free interaction",
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
    longDescription: "Built to solve a real problem: $200B in VAT goes unclaimed annually due to long airport queues and missed flights\n\nInstant VAT refunds through MetaMask  scan QR, confirm transaction, receive MON tokens instantly\n\nBulk payroll processing with AI-powered compliance layer for jurisdiction-aware tax calculations\n\nGoogle Gemini AI integration for automated document validation and receipt processing\n\nNestJS microservices backend with PostgreSQL, Redis queues, and real-time Socket.IO updates\n\nMonad blockchain provides ~1s finality and low transaction costs for enterprise-scale payments",
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
