"use client";

import { useRef } from "react";
import { ScrollProgressDots } from "@/components/landing/ScrollProgressDots";

export function PresentationScroll({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        id="presentation-scroll"
        ref={scrollRef}
        className="presentation-scroll"
      >
        {children}
      </div>
      <ScrollProgressDots scrollRef={scrollRef} />
    </>
  );
}
