import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "gray";
}

export function Badge({
  className,
  variant = "green",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        variant === "green" && "glass-pill text-accent",
        variant === "gray" && "glass-inset text-muted",
        className,
      )}
      {...props}
    />
  );
}
