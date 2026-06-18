"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface PresentationSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center";
  fillHeight?: boolean;
}

export function PresentationSection({
  id,
  children,
  className,
  align = "start",
  fillHeight = false,
}: PresentationSectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn("presentation-section relative w-full", className)}
    >
      <div
        className={cn(
          "flex h-full w-full pt-16 md:pt-[4.5rem]",
          fillHeight ? "items-stretch" : "items-center",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: align === "center" ? 24 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mx-auto w-full px-4",
            fillHeight && "flex h-full flex-col",
            align === "center" ? "max-w-5xl" : "max-w-6xl",
          )}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
