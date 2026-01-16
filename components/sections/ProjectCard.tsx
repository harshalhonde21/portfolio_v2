"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Determine glow color based on index or specific project ID
  let glowColor: "cyan" | "magenta" | "purple" | "red" = "cyan";

  if (index === 0) glowColor = "red";
  else if (index === 1) glowColor = "cyan";
  else if (index === 2) glowColor = "purple";

  return (
    <Card glowColor={glowColor} className="flex flex-col h-full">
      <article className="flex flex-col h-full space-y-4">
        {/* Project image placeholder with cyberpunk styling */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-primary/10 to-accent/10 sharp border border-border/30 overflow-hidden group shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold font-mono neon-text">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </div>
          </div>

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                hsl(var(--primary) / 0.2) 2px,
                hsl(var(--primary) / 0.2) 4px
              )`,
            }}
          />

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-magenta opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Project info */}
        <div className="space-y-3 flex-grow">
          <h3 className="text-lg font-mono font-semibold text-neon-cyan uppercase tracking-wide">
            [{project.title}]
          </h3>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            <span className="text-primary">&gt; </span>
            {project.description}
          </p>
        </div>

        {/* Tech stack and Links grouped at bottom */}
        <div className="mt-auto space-y-4 pt-4 border-t border-border/10">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="accent">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 font-mono text-xs uppercase tracking-wider">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-neon-cyan focus-outline px-2 py-1 border border-transparent hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all"
              >
                [Live_Demo →]
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-neon-purple focus-outline px-2 py-1 border border-transparent hover:border-neon-purple hover:bg-neon-purple/10 transition-all"
              >
                [GitHub →]
              </a>
            )}
          </div>
        </div>
      </article>
    </Card>
  );
}
