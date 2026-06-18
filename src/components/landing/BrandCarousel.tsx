"use client";

import { motion } from "framer-motion";
import {
  carouselBrandIds,
  getBrandsByIds,
} from "@/lib/data/brands";
import { BrandLogo } from "@/components/landing/BrandLogo";
import { cn } from "@/lib/utils/cn";

interface BrandCarouselProps {
  brandIds?: readonly string[];
  variant?: "pill" | "logo";
  className?: string;
  duration?: number;
  logoHeight?: number;
}

export function BrandCarousel({
  brandIds = carouselBrandIds,
  variant = "pill",
  className,
  duration = 28,
  logoHeight,
}: BrandCarouselProps) {
  const brands = getBrandsByIds(brandIds);
  const track = [...brands, ...brands];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f7f5f1] to-transparent md:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f7f5f1] to-transparent md:w-16" />
      <motion.div
        className={cn(
          "flex w-max items-center",
          variant === "pill" ? "gap-8" : "gap-10 md:gap-12",
        )}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {track.map((brand, i) => (
          <div
            key={`${brand.id}-${i}`}
            className={cn(
              "shrink-0",
              variant === "pill" &&
                "glass-card flex items-center rounded-full px-4 py-2.5",
            )}
          >
            <BrandLogo
              brand={brand}
              height={logoHeight ?? (variant === "pill" ? 20 : 24)}
              showName={variant === "pill"}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
