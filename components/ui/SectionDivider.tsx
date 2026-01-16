import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface SectionDividerProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function SectionDivider({ text, className }: SectionDividerProps) {
  if (text) {
    return (
      <div className={cn("flex items-center gap-4 my-8", className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow-sm" />
        <span className="text-primary text-xs font-mono uppercase tracking-widest">
          {text}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow-sm" />
      </div>
    );
  }

  return (
    <div className={cn("relative h-px my-8", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow-sm" />
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-glow" />
    </div>
  );
}
