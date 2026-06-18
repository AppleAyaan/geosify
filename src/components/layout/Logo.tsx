"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const LOGO_SRC = "/brand/geosify_logo.png";

interface LogoProps {
  className?: string;
  href?: string;
  showWordmark?: boolean;
  size?: number;
}

export function Logo({
  className,
  href = "/",
  showWordmark = true,
  size = 40,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "nav-btn relative z-10 -mx-1 flex items-center gap-2.5 rounded-full px-1.5 py-1",
        className,
      )}
    >
      <motion.div
        whileHover={{ scale: 1.06, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="relative shrink-0 overflow-hidden rounded-[22%] bg-gradient-to-br from-white to-emerald-50 shadow-[0_2px_10px_rgba(22,163,74,0.18)] ring-1 ring-emerald-900/10"
        style={{ width: size, height: size }}
      >
        <Image
          src={LOGO_SRC}
          alt="Geosify"
          fill
          sizes={`${size}px`}
          className="object-cover scale-[1.12]"
          priority
        />
      </motion.div>
      {showWordmark && (
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Geosify
        </span>
      )}
    </Link>
  );
}
