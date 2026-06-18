"use client";

import { motion } from "framer-motion";

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-24 top-[12%] h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-5%] top-[35%] h-96 w-96 rounded-full bg-white/50 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[30%] h-64 w-64 rounded-full bg-accent/15 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
