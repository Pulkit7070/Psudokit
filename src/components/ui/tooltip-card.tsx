"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const bgColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--tooltip-bg') || 
      (document.documentElement.classList.contains('dark') ? '#171717' : '#ffffff')
    : '#ffffff';

  const calculatePosition = (clientX: number, clientY: number, containerRect: DOMRect) => {
    if (!tooltipRef.current) return { x: 0, y: 0 };

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 480; // Reduced by 20%: 600 * 0.8
    const tooltipHeight = 400; // Approximate height

    // Calculate position relative to viewport
    let x = clientX + 10;
    let y = clientY + 10;

    // Check if tooltip goes beyond right edge
    if (x + tooltipWidth > viewportWidth) {
      x = clientX - tooltipWidth - 10;
    }

    // Check if tooltip goes beyond bottom edge
    if (y + tooltipHeight > viewportHeight) {
      y = clientY - tooltipHeight - 10;
    }

    // Check if tooltip goes beyond left edge
    if (x < 0) {
      x = 10;
    }

    // Check if tooltip goes beyond top edge
    if (y < 0) {
      y = 10;
    }

    // Convert to relative position within container
    return {
      x: x - containerRect.left,
      y: y - containerRect.top,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = calculatePosition(e.clientX, e.clientY, rect);
    setPosition(pos);
    setIsVisible(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = calculatePosition(e.clientX, e.clientY, rect);
    setPosition(pos);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            key="tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="pointer-events-none absolute z-[9999] min-w-[15rem] max-w-[90vw] rounded-md shadow-sm shadow-black/5 dark:shadow-white/10"
            style={{
              top: position.y,
              left: position.x,
              opacity: 1,
              backgroundColor: bgColor,
              mixBlendMode: 'normal',
              isolation: 'isolate',
            }}
          >
            <div
              ref={contentRef}
              className="text-sm text-neutral-600 p-4 dark:text-neutral-400 leading-relaxed [&_img]:max-w-[480px] [&_img]:w-full [&_img]:h-auto [&_img]:bg-transparent [&_img]:block [&_img]:relative [&_img]:z-10 [&_img]:mb-0 [&_img]:object-contain [&_span]:!opacity-100 [&_span>img]:!opacity-100 [&>p]:mb-2 [&>p]:last:mb-0 [&>p]:leading-relaxed [&>*+*]:mt-2"
              style={{ opacity: 1 }}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
