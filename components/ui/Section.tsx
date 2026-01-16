import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export function Section({
  className,
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {container ? (
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
