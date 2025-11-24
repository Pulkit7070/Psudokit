'use client';
import { FaLinkedin, FaXTwitter, FaGithub, FaPaperclip } from "react-icons/fa6";
import { Tooltip } from "./ui/tooltip-card";
import Image from "next/image";

interface ProfileHeaderProps {
  name?: string
  age?: string
  title?: string
  profileImage?: string
  socialLinks?: {
    twitter?: string
    resume?: string
    github?: string
    linkedin?: string
  }
}

export default function ProfileHeader({
  name = "Pulkit Saraf",
  age = "21",
  title = "engineer • developer • builder",
  profileImage = "/pfp.jpg",
  socialLinks = {
    twitter: "https://x.com/PsudoKit",
    github: "https://github.com/Pulkit7070",
    linkedin: "https://www.linkedin.com/in/pulkit-saraf-893213290/",
    resume: "https://drive.google.com/file/d/1XRT3BcHjIwqIASw2vdA2V2HgtGlhfuxP/view?usp=sharing",
  }
}: ProfileHeaderProps) {

  return (
    <div className="flex-col -mt-10">
      <div 
        className="w-28 h-28 mb-4 sm:ml-8 ml-4 relative z-10 rounded-full overflow-hidden bg-cover bg-center"
        role="img"
        aria-label={name}
        style={{ backgroundImage: `url("${profileImage}")` }}
      />
      <div className="text-left sm:flex sm:justify-between sm:items-center w-full sm:px-8 px-4 flex-col sm:flex-row">
        <div>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl tracking-[0.01em] font-medium mb-0">
            {name}
          </h1>
          <p className="opacity-40 text-[14px]">
            {age} • {title}
          </p>
        </div>
        <div className="flex justify-start space-x-4 mt-3 sm:mt-0 px-0">
        {socialLinks.github && (
            <Tooltip 
              preferredPosition="below"
              content={
              <Image
                width={3024}
                height={1720}
                src="https://placehold.co/600x400/png?text=GitHub"
                alt="GitHub"
                className="rounded-sm max-w-full h-auto"
                unoptimized
              />
            }>
              <a 
                className="hover:opacity-80 touch-manipulation active:opacity-75" 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
                }}
              >
                <FaGithub size={18} />
              </a>
            </Tooltip>
          )}
          {socialLinks.twitter && (
            <Tooltip 
              preferredPosition="below"
              content={
              <Image
                width={1206}
                height={1220}
                src="https://placehold.co/600x400/png?text=Twitter"
                alt="Twitter"
                className="rounded-sm max-w-full h-auto"
                unoptimized
              />
            }>
              <a 
                className="hover:opacity-80 touch-manipulation active:opacity-75" 
                href={socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
                }}
              >
                <FaXTwitter size={18} />
              </a>
            </Tooltip>
          )}
          {socialLinks.resume && (
            <Tooltip 
              preferredPosition="below"
              content={
              <Image
                width={1076}
                height={1394}
                src="https://placehold.co/600x800/png?text=Resume"
                alt="Resume"
                className="rounded-sm max-w-full h-auto"
                unoptimized
              />
            }>
              <a 
                className="hover:opacity-80 touch-manipulation active:opacity-75" 
                href={socialLinks.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
                }}
              >
                <FaPaperclip size={18} />
              </a>
            </Tooltip>
          )}
         
          {socialLinks.linkedin && (
            <Tooltip 
              preferredPosition="below"
              content={
              <Image
                width={1596}
                height={1108}
                src="https://placehold.co/600x400/png?text=LinkedIn"
                alt="LinkedIn"
                className="rounded-sm max-w-full h-auto"
                unoptimized
              />
            }>
              <a 
                className="hover:opacity-80 touch-manipulation active:opacity-75" 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none'
                }}
              >
                <FaLinkedin size={18} />
              </a>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}
