"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  presentationSections,
  type PresentationSectionId,
} from "@/lib/data/presentation-sections";
import { cn } from "@/lib/utils/cn";

interface ScrollProgressDotsProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function ScrollProgressDots({ scrollRef }: ScrollProgressDotsProps) {
  const [activeId, setActiveId] = useState<PresentationSectionId>(
    presentationSections[0].id,
  );

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const sectionEls = presentationSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id as PresentationSectionId);
        }
      },
      { root, threshold: [0.35, 0.55, 0.75] },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scrollRef]);

  const scrollTo = (id: string) => {
    const root = scrollRef.current;
    const target = document.getElementById(id);
    if (!root || !target) return;
    root.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  const activeIndex = presentationSections.findIndex((s) => s.id === activeId);

  return (
    <>
      <nav
        aria-label="Page sections"
        className="fixed left-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex"
      >
        {presentationSections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "step" : undefined}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.92 }}
              className="group flex cursor-pointer items-center justify-start gap-2 rounded-full py-1 pr-2 transition-colors hover:bg-black/[0.04]"
            >
              <motion.span
                layout
                className={cn(
                  "rounded-full",
                  isActive
                    ? "h-2.5 w-2.5 bg-accent shadow-[0_0_14px_rgba(22,163,74,0.55)]"
                    : "h-2 w-2 bg-foreground/15 group-hover:bg-foreground/30",
                )}
              />
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="glass-pill rounded-md px-2 py-0.5 text-[10px] font-medium text-accent"
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
        <motion.span
          key={activeIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-center text-[9px] font-medium text-muted/60"
        >
          {activeIndex + 1}/{presentationSections.length}
        </motion.span>
      </nav>

      <nav
        aria-label="Page sections"
        className="glass-nav-floating fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-2 md:hidden"
      >
        {presentationSections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <motion.button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              aria-label={`Go to ${section.label}`}
              aria-current={isActive ? "step" : undefined}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "nav-btn group cursor-pointer rounded-full p-2",
                isActive ? "nav-btn-active" : "",
              )}
            >
              <span
                className={cn(
                  "block rounded-full transition-colors",
                  isActive
                    ? "h-2 w-5 bg-accent"
                    : "h-2 w-2 bg-foreground/20 group-hover:bg-foreground/40",
                )}
              />
            </motion.button>
          );
        })}
      </nav>
    </>
  );
}
