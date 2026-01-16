"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useEffect, useState } from "react";

interface TerminalTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  cursor?: boolean;
  delay?: number;
}

export function TerminalText({
  children,
  cursor = false,
  delay = 0,
  className,
  ...props
}: TerminalTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(cursor);

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(children);
      }, delay);
      return () => clearTimeout(timeout);
    }
    setDisplayText(children);
  }, [children, delay]);

  return (
    <span
      className={cn(
        "font-mono text-primary",
        showCursor && "cursor-blink",
        className
      )}
      {...props}
    >
      {displayText}
    </span>
  );
}
