"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { landingContent } from "@/lib/data/landing-content";

const ease = [0.22, 1, 0.36, 1] as const;

export function NavExploreCta() {
  return (
    <Link href="/explore" className="shrink-0">
      <motion.span
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.45, ease }}
        whileHover="hover"
        whileTap={{ scale: 0.96 }}
        className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-foreground/10 bg-foreground py-1.5 pl-3.5 pr-3 text-[11px] font-medium tracking-wide text-background md:py-2 md:pl-4 md:pr-3.5 md:text-xs"
      >
        <motion.span
          className="pointer-events-none absolute inset-0 bg-accent"
          variants={{
            hover: { scaleX: 1 },
          }}
          initial={{ scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.3, ease }}
        />
        <span className="relative z-10 hidden sm:inline">
          {landingContent.hero.primaryCta}
        </span>
        <span className="relative z-10 sm:hidden">Explore</span>
        <motion.span
          className="relative z-10"
          variants={{
            hover: { x: 4 },
          }}
          transition={{ type: "spring", stiffness: 520, damping: 24 }}
        >
          <ArrowRight className="h-3 w-3" strokeWidth={2.25} />
        </motion.span>
      </motion.span>
    </Link>
  );
}
