"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tooltip = ({
  content,
  children,
  containerClassName,
  preferredPosition = "auto",
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
  preferredPosition?: "above" | "below" | "auto";
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number; placement: "above" | "below" }>({
    x: 0,
    y: 0,
    placement: "below",
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const bgColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--tooltip-bg') || 
      (document.documentElement.classList.contains('dark') ? '#171717' : '#ffffff')
    : '#ffffff';

  const calculatePosition = (containerRect: DOMRect) => {
    if (!tooltipRef.current) return { x: 0, y: 0, placement: "below" as const };

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 320;
    const tooltipHeight = 240;
    const offset = 12;
    const edgePadding = 20; // Extra padding from viewport edges

    // Calculate center of the trigger element
    const centerX = containerRect.left + containerRect.width / 2;

    // Calculate horizontal position (centered on element)
    let x = centerX - tooltipWidth / 2;

    // Adjust horizontal position if goes beyond edges
    if (x + tooltipWidth > viewportWidth - edgePadding) {
      x = viewportWidth - tooltipWidth - edgePadding;
    }
    if (x < edgePadding) {
      x = edgePadding;
    }

    // Calculate vertical position based on preferred position and available space
    const spaceAbove = containerRect.top;
    const spaceBelow = viewportHeight - containerRect.bottom;
    
    let y: number;
    let placement: "above" | "below";

    if (preferredPosition === "above") {
      // Always position above
      y = containerRect.top - tooltipHeight - offset;
      placement = "above";
      
      // Only adjust if it goes off the top
      if (y < edgePadding) {
        y = edgePadding;
      }
    } else if (preferredPosition === "below") {
      // Prefer below, only go above if not enough space
      if (spaceBelow >= tooltipHeight + offset + edgePadding) {
        y = containerRect.bottom + offset;
        placement = "below";
      } else if (spaceAbove >= tooltipHeight + offset + edgePadding) {
        y = containerRect.top - tooltipHeight - offset;
        placement = "above";
      } else {
        // Not enough space either way, position below with padding
        y = containerRect.bottom + offset;
        placement = "below";
      }
    } else {
      // Auto: choose based on available space
      if (spaceBelow >= spaceAbove && spaceBelow >= tooltipHeight + offset + edgePadding) {
        y = containerRect.bottom + offset;
        placement = "below";
      } else if (spaceAbove >= tooltipHeight + offset + edgePadding) {
        y = containerRect.top - tooltipHeight - offset;
        placement = "above";
      } else if (spaceBelow >= spaceAbove) {
        y = containerRect.bottom + offset;
        placement = "below";
      } else {
        y = edgePadding;
        placement = "above";
      }
    }

    // Final bounds check to prevent overflow
    if (y < edgePadding) {
      y = edgePadding;
    }
    if (y + tooltipHeight > viewportHeight - edgePadding) {
      y = viewportHeight - tooltipHeight - edgePadding;
    }

    // Convert to relative position within container
    return {
      x: x - containerRect.left,
      y: y - containerRect.top,
      placement,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = calculatePosition(rect);
    setPosition(pos);
    setIsVisible(true);
  };

  const handleMouseMove = () => {
    // Don't recalculate position on mouse move to keep tooltip stable
    return;
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
            initial={{ opacity: 0, scale: 0.95, y: position.placement === "above" ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position.placement === "above" ? 10 : -10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="pointer-events-none absolute z-[9999] w-[320px] rounded-lg shadow-lg shadow-black/10 dark:shadow-white/20 border border-neutral-200 dark:border-neutral-700"
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
              className="text-sm text-neutral-600 p-3 dark:text-neutral-400 leading-relaxed [&_img]:max-w-full [&_img]:w-full [&_img]:h-auto [&_img]:bg-transparent [&_img]:block [&_img]:relative [&_img]:z-10 [&_img]:mb-0 [&_img]:object-contain [&_span]:!opacity-100 [&_span>img]:!opacity-100 [&>p]:mb-2 [&>p]:last:mb-0 [&>p]:leading-relaxed [&>*+*]:mt-2"
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
