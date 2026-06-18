import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "glass-inset w-full rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted/60 outline-none transition focus:border-accent/30 focus:ring-1 focus:ring-accent/20",
        className,
      )}
      {...props}
    />
  );
}
