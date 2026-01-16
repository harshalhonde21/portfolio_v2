import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "secondary";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-colors",
    accent:
      "border-neon-magenta/30 text-neon-magenta bg-neon-magenta/5 hover:bg-neon-magenta/10 hover:border-neon-magenta/50 transition-colors",
    secondary:
      "border-secondary/30 text-secondary bg-secondary/5 hover:bg-secondary/10 hover:border-secondary/50 transition-colors",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center sharp border bg-transparent px-2 py-0.5 text-xs font-mono font-medium uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
