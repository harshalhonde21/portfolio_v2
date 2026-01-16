import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-primary/30 bg-card/50 backdrop-blur-sm">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow-sm" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Terminal-style copyright */}
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <span className="text-primary">&gt;</span> © {currentYear}{" "}
            {PERSONAL_INFO.name}
            <span className="text-primary mx-2">|</span>
            <span className="text-neon-cyan">All rights reserved</span>
          </p>

          {/* Social links with neon glow */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-all focus-outline rounded-sm hover:shadow-glow-sm"
                aria-label={link.platform}
              >
                [{link.platform}]
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
