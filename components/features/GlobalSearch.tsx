"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants/siteConfig";
import { SKILLS, PROJECTS, EXPERIENCE } from "@/lib/constants/portfolio";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

type SearchResultType = "section" | "skill" | "project" | "experience";

interface SearchResult {
  id: string; // The ID to scroll to
  label: string;
  subLabel?: string;

  type: SearchResultType;
  href?: string; // If it needs navigation to a specific URL (mainly #ids)
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle with Alt + Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.code === "KeyS" || e.key === "s")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus input after a small delay to allow animation to start
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Index data
  const allResults: SearchResult[] = useMemo(() => {
    const results: SearchResult[] = [];

    // 1. Navigation Sections
    NAV_ITEMS.forEach((item) => {
      results.push({
        id: item.href.replace("#", ""),
        label: item.label,
        subLabel: "Section",
        type: "section",
        href: item.href,
      });
    });

    // 2. Skills
    SKILLS.forEach((skill) => {
      results.push({
        id: "skills", // Scroll to skills section
        label: skill.name,
        subLabel: `Skill • ${skill.category}`,
        type: "skill",
        href: "#skills",
      });
    });

    // 3. Projects
    PROJECTS.forEach((project) => {
      results.push({
        id: project.id || "projects", // Assuming projects have IDs or we scroll to projects section
        label: project.title,
        subLabel: "Project",
        type: "project",
        href: "#projects",
      });
    });

    // 4. Experience
    EXPERIENCE.forEach((exp) => {
      results.push({
        id: exp.id || "experience",
        label: `${exp.role} at ${exp.company}`,
        subLabel: "Experience",
        type: "experience",
        href: "#experience",
      });
    });

    return results;
  }, []);

  // Filter results
  const filteredResults = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return allResults.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        item.subLabel?.toLowerCase().includes(lowerQuery),
    );
  }, [query, allResults]);

  // Handle navigation
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);

    // Allow time for modal to close
    setTimeout(() => {
      // Navigate/Scroll
      if (result.href) {
        const element = document.getElementById(result.href.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          // Highlight effect
          // We'll create a temporary highlight overlay or class
          element.classList.add("search-highlight");
          setTimeout(() => {
            element.classList.remove("search-highlight");
          }, 2000);
        } else {
          // If element not found directly on this page (or lazy loaded), just try route
          router.push(result.href);
        }
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : prev,
      );
      // Auto-scroll list
      // implementation omitted for brevity, standard behavior usually fine or need complex ref logic
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: "-40%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: "-40%" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-[101] px-4"
          >
            <div className="bg-black/90 border border-primary/30 rounded-lg shadow-[0_0_50px_rgba(var(--primary),0.2)] overflow-hidden flex flex-col max-h-[60vh]">
              {/* Header / Input */}
              <div className="flex items-center px-4 py-4 border-b border-primary/20 gap-3">
                <Search className="w-5 h-5 text-primary animate-pulse" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Global Search..."
                  className="flex-1 bg-transparent border-none outline-none text-lg font-mono text-foreground placeholder:text-muted-foreground/50"
                  autoComplete="off"
                />
                <div className="hidden sm:flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 text-xs font-mono bg-primary/10 border border-primary/20 rounded text-primary">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Results */}
              <div ref={listRef} className="overflow-y-auto p-2 scrollbar-hide">
                {query ? (
                  filteredResults.length > 0 ? (
                    <div className="space-y-1">
                      {filteredResults.map((result, index) => (
                        <button
                          key={`${result.type}-${result.id}-${index}`}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 group text-left",
                            index === selectedIndex
                              ? "bg-primary/20 border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                              : "hover:bg-primary/10 border border-transparent",
                          )}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span
                              className={cn(
                                "font-mono text-sm group-hover:text-neon-cyan transition-colors",
                                index === selectedIndex
                                  ? "text-neon-cyan"
                                  : "text-foreground",
                              )}
                            >
                              {result.label}
                            </span>
                            {result.subLabel && (
                              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                {result.subLabel}
                              </span>
                            )}
                          </div>

                          {index === selectedIndex && (
                            <ArrowRight className="w-4 h-4 text-neon-cyan animate-in fade-in slide-in-from-left-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground font-mono text-sm">
                      <div className="mb-2">/dev/null</div>
                      No results found for "{query}"
                    </div>
                  )
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-muted-foreground/40 gap-4">
                    <Command className="w-12 h-12 opacity-20" />
                    <p className="font-mono text-sm">
                      Type to search system...
                    </p>
                  </div>
                )}
              </div>

              {/* Footer status */}
              <div className="px-4 py-2 border-t border-primary/10 bg-primary/5 text-[10px] font-mono text-primary/40 flex justify-between uppercase tracking-wider">
                <span>Index: {allResults.length} Items</span>
                <span>System: Online</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
