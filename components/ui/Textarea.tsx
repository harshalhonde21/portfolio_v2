import { cn } from "@/lib/utils/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative group">
        <textarea
          ref={ref}
          className={cn(
            "flex min-h-[100px] w-full bg-background/30 border-b-2 border-border/30 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono transition-all duration-300 resize-y",
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

Textarea.displayName = "Textarea";

export { Textarea };
