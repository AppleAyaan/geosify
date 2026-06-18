"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

const suggestions = [
  "245 Columbia St W",
  "King St N corridor",
  "Vacant · C2 zoning",
];

export function AnimatedSearchDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-panel w-full max-w-xs rounded-xl p-3"
    >
      <div className="glass-inset mb-2 flex items-center gap-2 rounded-lg px-3 py-2">
        <Search className="h-3.5 w-3.5 text-accent" />
        <motion.span
          className="text-xs text-muted"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Search Waterloo parcels...
        </motion.span>
      </div>
      <div className="space-y-1">
        {suggestions.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="rounded-lg px-2 py-1.5 text-[11px] text-foreground/80 transition hover:bg-white/30"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
