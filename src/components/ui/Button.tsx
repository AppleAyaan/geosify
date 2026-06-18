import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-accent text-white hover:bg-accent-hover shadow-[0_2px_12px_rgba(22,163,74,0.25)] hover:shadow-[0_4px_20px_rgba(22,163,74,0.35)]",
        variant === "secondary" &&
          "glass-card text-foreground hover:bg-white/60",
        variant === "glass" &&
          "glass-inset text-foreground hover:bg-white/60 hover:shadow-sm",
        variant === "ghost" &&
          "text-muted hover:bg-black/[0.06] hover:text-foreground",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-5 py-2.5 text-sm",
        className,
      )}
      {...props}
    />
  );
}
