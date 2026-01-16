"use client";

import { NAV_ITEMS } from "@/lib/constants/siteConfig";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
    }
  };

  return (
    <nav className="flex items-center gap-6">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className={cn(
            "relative text-xs font-mono font-medium uppercase tracking-wider transition-all focus-outline",
            "text-muted-foreground hover:text-primary",
            activeSection === item.href && "text-primary"
          )}
        >
          <span className="relative">
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary shadow-glow-sm transition-all group-hover:w-full" />
          </span>
        </a>
      ))}
    </nav>
  );
}
