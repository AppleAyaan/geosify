"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface AnimatedStatProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.55 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplay(0);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });

    return () => controls.stop();
  }, [isInView, value]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
