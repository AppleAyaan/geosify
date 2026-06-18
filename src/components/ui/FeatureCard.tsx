import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

export function FeatureCard({
  className,
  icon,
  title,
  description,
}: HTMLAttributes<HTMLDivElement> & {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 transition hover:bg-white/50",
        className,
      )}
    >
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg glass-pill text-accent">
        {icon}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-xs leading-relaxed text-muted">{description}</p>
    </div>
  );
}
