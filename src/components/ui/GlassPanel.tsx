import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "panel" | "card" | "nav" | "solid";
}

export function GlassPanel({
  className,
  variant = "panel",
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        variant === "panel" && "glass-panel",
        variant === "solid" && "glass-panel-solid",
        variant === "card" && "glass-card",
        variant === "nav" && "glass-nav",
        className,
      )}
      {...props}
    />
  );
}
