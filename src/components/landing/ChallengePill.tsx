"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const VELOCITY_LOGO = "/brand/velocity_logo.png";

export function ChallengePill() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="velocity-line-glow pointer-events-none fixed top-[4.65rem] left-1/2 z-50 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center justify-center gap-2 text-[clamp(0.6875rem,2.6vw,0.8125rem)] leading-tight font-semibold tracking-wide whitespace-nowrap text-muted md:top-[5rem] md:text-sm"
    >
      <span>Built for</span>
      <span className="relative inline-flex shrink-0 -translate-y-1 md:-translate-y-1.5">
        <Image
          src={VELOCITY_LOGO}
          alt="Velocity"
          width={96}
          height={22}
          className="h-4 w-auto object-contain object-top opacity-90 md:h-5"
        />
      </span>
      <span>Future Cities Innovation Challenge 2026</span>
    </motion.p>
  );
}
