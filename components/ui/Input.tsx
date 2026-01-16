import { cn } from "@/lib/utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full bg-background/30 border-b-2 border-border/30 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono transition-all duration-300",
            error
              ? "border-danger text-danger placeholder:text-danger/50"
              : "focus:border-primary focus:bg-primary/5 hover:border-primary/50",
            className
          )}
          {...props}
        />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-border/50 group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-border/50 group-hover:border-primary/50 transition-colors duration-300 pointer-events-none" />

        {/* Active indicator line */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out",
            error ? "bg-danger" : "bg-primary",
            "w-0 group-focus-within:w-full"
          )}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
