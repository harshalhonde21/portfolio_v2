import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, createElement } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  gradient?: boolean;
}

export function Heading({
  as = "h2",
  gradient = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const styles = {
    h1: "text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-wider uppercase leading-tight",
    h2: "text-xl md:text-5xl font-bold font-display tracking-wider uppercase leading-tight",
    h3: "text-2xl md:text-3xl font-bold font-display uppercase tracking-wide leading-snug",
    h4: "text-xl md:text-2xl font-semibold font-display uppercase tracking-wide leading-snug",
    h5: "text-lg md:text-xl font-semibold font-mono uppercase tracking-widest leading-normal",
    h6: "text-base md:text-lg font-medium font-mono uppercase tracking-widest leading-normal",
  };

  return createElement(
    as,
    {
      className: cn(styles[as], className),
      ...props,
    },
    children,
  );
}
