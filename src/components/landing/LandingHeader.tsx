"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { NavExploreCta } from "@/components/landing/NavExploreCta";
import {
  presentationSections,
  type PresentationSectionId,
} from "@/lib/data/presentation-sections";
import { cn } from "@/lib/utils/cn";

const MotionLink = motion.create(Link);

const sectionLinks = presentationSections.map((section) => ({
  label: section.label,
  sectionId: section.id,
  href: `/#${section.id}`,
}));

interface LandingHeaderProps {
  currentPage?: "landing" | "demo";
}

export function LandingHeader({ currentPage = "landing" }: LandingHeaderProps) {
  const pathname = usePathname();
  const isLanding = currentPage === "landing" && pathname === "/";
  const [activeId, setActiveId] = useState<PresentationSectionId>("hero");

  useEffect(() => {
    if (!isLanding) return;

    const scrollEl = document.getElementById("presentation-scroll");
    if (!scrollEl) return;

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
      { root: scrollEl, threshold: [0.35, 0.55, 0.75] },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLanding]);

  const scrollToSection = (sectionId: string) => {
    const scrollEl = document.getElementById("presentation-scroll");
    const target = document.getElementById(sectionId);
    if (!scrollEl || !target) return;
    scrollEl.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-nav-floating fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
    >
      <div className="flex h-11 items-center justify-between gap-2 px-2 pl-3 md:h-12 md:pl-4">
        <Logo size={30} />

        <nav className="hidden items-center gap-0.5 md:flex">
          {sectionLinks.map((link, i) => {
            const isActive = isLanding && activeId === link.sectionId;
            const itemClass = cn(
              "nav-btn inline-flex items-center px-3 py-1.5 text-xs",
              isActive ? "nav-btn-active" : "text-muted",
            );

            return isLanding ? (
              <motion.button
                key={link.label}
                type="button"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                onClick={() => scrollToSection(link.sectionId)}
                className={itemClass}
              >
                {link.label}
              </motion.button>
            ) : (
              <MotionLink
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.35 }}
                className={itemClass}
              >
                {link.label}
              </MotionLink>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <MotionLink
            href="/demo"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.35 }}
            className={cn(
              "nav-btn inline-flex items-center rounded-full border border-foreground/10 px-3 py-1.5 text-[11px] font-medium md:py-2 md:text-xs",
              currentPage === "demo"
                ? "nav-btn-active"
                : "text-muted",
            )}
          >
            Demo
          </MotionLink>
          <NavExploreCta />
        </div>
      </div>
    </motion.header>
  );
}
