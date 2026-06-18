"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface MediaFrameProps {
  videoSrc?: string;
  gifSrc?: string;
  poster?: string;
  overlay?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function MediaFrame({
  videoSrc,
  gifSrc,
  poster,
  overlay,
  className,
  children,
}: MediaFrameProps) {
  const [mediaError, setMediaError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "glass-panel relative aspect-[4/3] w-full overflow-hidden rounded-xl md:aspect-[16/10]",
        className,
      )}
    >
      {children ? (
        children
      ) : videoSrc && !mediaError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          onError={() => setMediaError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : gifSrc && !mediaError ? (
        <Image
          src={gifSrc}
          alt=""
          fill
          unoptimized
          onError={() => setMediaError(true)}
          className="object-cover"
        />
      ) : poster ? (
        <Image src={poster} alt="" fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
      {overlay && (
        <div className="absolute inset-0 z-10 flex items-end justify-center p-4">
          {overlay}
        </div>
      )}
    </motion.div>
  );
}
