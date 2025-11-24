'use client'

import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";


// Tech Stack Data
const techStack = [
  // Languages
  { name: "JavaScript", category: "language", icon: "/tech-icons/javascript.svg", color: "bg-yellow-400" },
  { name: "TypeScript", category: "language", icon: "/tech-icons/typescript.svg", color: "bg-blue-600" },
  { name: "Python", category: "language", icon: "/tech-icons/python.svg", color: "bg-blue-500" },
  { name: "Java", category: "language", icon: "/tech-icons/java.svg", color: "bg-red-500" },
  { name: "SQL", category: "language", icon: "/tech-icons/sql.svg", color: "bg-orange-500" },
  { name: "Rust", category: "language", icon: "/tech-icons/rust.svg", color: "bg-orange-700" },

  // Frameworks & Libraries
  { name: "React.js", category: "framework", icon: "/tech-icons/react.svg", color: "bg-cyan-400" },
  { name: "Next.js", category: "framework", icon: "/tech-icons/nextjs,svg", color: "bg-black" },
  { name: "Node.js", category: "framework", icon: "/tech-icons/nodejs.svg", color: "bg-green-600" },
  { name: "Express.js", category: "framework", icon: "/tech-icons/express.svg", color: "bg-gray-500" },
  { name: "FastAPI", category: "framework", icon: "/tech-icons/fastapi.svg", color: "bg-teal-500" },
  { name: "Tailwind CSS", category: "framework", icon: "/tech-icons/tailwind.svg", color: "bg-cyan-500" },

  // AI & ML
  { name: "PyTorch", category: "ai", icon: "/tech-icons/pytorch.svg", color: "bg-orange-600" },
  { name: "TensorFlow", category: "ai", icon: "/tech-icons/tensorflow.svg", color: "bg-orange-500" },
  { name: "Hugging Face", category: "ai", icon: "/tech-icons/huggingface.svg", color: "bg-yellow-500" },
  { name: "LangChain", category: "ai", icon: "/tech-icons/langchain.svg", color: "bg-green-500" },
  // Web3
  { name: "Solidity", category: "web3", icon: "/tech-icons/solidity.svg", color: "bg-gray-800" },
  { name: "Ethers.js", category: "web3", icon: "/tech-icons/ethers.svg", color: "bg-blue-800" },
  { name: "IPFS", category: "web3", icon: "/tech-icons/ipfs.svg", color: "bg-teal-400" },
  
  // Databases
  { name: "PostgreSQL", category: "database", icon: "/tech-icons/postgresql.svg", color: "bg-blue-400" },
  { name: "MongoDB", category: "database", icon: "/tech-icons/mongodb.svg", color: "bg-green-500" },

  // Tools
  { name: "Docker", category: "tool", icon: "/tech-icons/docker.svg", color: "bg-blue-500" },
  { name: "Git", category: "tool", icon: "/tech-icons/git.svg", color: "bg-orange-600" },
  { name: "Jira", category: "tool", icon: "/tech-icons/jira.svg", color: "bg-blue-600" },
];

interface TechIconProps {
  tech: typeof techStack[0];
  className?: string;
}

function TechIcon({ tech, className = "" }: TechIconProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-3 transition-all duration-300 hover:scale-105 min-w-[90px] group ${className}`}>
      {/* Icon Container */}
      <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
        {/* Try to load actual SVG, fallback to grey placeholder */}
        <div className="w-full h-full relative">
          <Image
            src={tech.icon}
            alt={tech.name}
            width={40}
            height={40}
            className="w-full h-full object-contain grayscale opacity-70 hover:opacity-90 transition-opacity"
            onError={(e) => {
              // If image fails to load, replace with grey placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full ${tech.color} rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    ${tech.name.charAt(0)}
                  </div>
                `;
              }
            }}
          />
        </div>
      </div>

      {/* Tech Name */}
      <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300 leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {tech.name}
      </span>
    </div>
  );
}

interface TechStackMarqueeProps {
  className?: string;
}

export default function TechStackMarquee({ className = "" }: TechStackMarqueeProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Title - matching other component styles */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-lg opacity-20 leading-relaxed -tracking-[0.01em] mb-2">
          Stack I use
        </h2>
        <p className="text-md dark:text-white/70 text-black/70 leading-relaxed">
          Technologies I work with to build products that solve real problems
        </p>
      </div>

      {/* Single Marquee Container */}
      <div className="relative">
        <Marquee pauseOnHover className="[--duration:80s] [--gap:1rem]">
          {techStack.map((tech, index) => (
            <TechIcon key={`${tech.name}-${index}`} tech={tech} />
          ))}
        </Marquee>

        {/* Fade edges for better visual effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-[hsl(0,3%,6.5%)] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-[hsl(0,3%,6.5%)] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
