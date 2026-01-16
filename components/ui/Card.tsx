import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glowColor?: "cyan" | "magenta" | "purple" | "red";
}

export function Card({
  className,
  hover = true,
  glowColor = "cyan",
  children,
  ...props
}: CardProps) {
  const glowColors = {
    cyan: "hover:border-neon-cyan hover:shadow-[0_0_2px_hsl(var(--neon-cyan))] hover:bg-neon-cyan/5",
    magenta:
      "hover:border-neon-magenta hover:shadow-[0_0_2px_hsl(var(--neon-magenta))] hover:bg-neon-magenta/5",
    purple:
      "hover:border-neon-purple hover:shadow-[0_0_2px_hsl(var(--neon-purple))] hover:bg-neon-purple/5",
    red: "hover:border-neon-magenta hover:shadow-[0_0_2px_hsl(var(--neon-magenta))] hover:bg-neon-magenta/5",
  };

  return (
    <div
      className={cn(
        "relative sharp-sm border border-border/30 bg-card/50 backdrop-blur-sm p-6",
        "scanlines corner-brackets",
        hover && `transition-all ${glowColors[glowColor]}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
