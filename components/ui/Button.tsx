import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center sharp-sm font-mono font-medium transition-all focus-outline disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider";

    const variants = {
      primary:
        "bg-transparent border border-primary text-primary hover:bg-primary/10 hover:shadow-glow active:shadow-glow-lg neon-border",
      secondary:
        "bg-transparent border border-secondary text-secondary hover:bg-secondary/10 hover:shadow-neon-purple active:shadow-neon-purple",
      ghost:
        "border border-border/50 text-foreground hover:border-primary hover:text-primary hover:shadow-glow-sm",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-13 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
