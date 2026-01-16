"use client";

import { EXPERIENCE } from "@/lib/constants/portfolio";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function Experience() {
  return (
    <Section id="experience" className="relative cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
            <span className="text-neon-cyan">&gt;</span> Section_03
          </p>
          <Heading as="h2" className="neon-text-magenta">
            [Experience_Log]
          </Heading>
        </div>

        {/* Experience timeline */}
        <div className="relative space-y-8">
          {/* Vertical neon line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent shadow-glow-sm" />

          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-6 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-glow animate-glow-pulse" />

              <Card
                hover={false}
                glowColor={index % 2 === 0 ? "cyan" : "purple"}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-mono font-semibold text-neon-cyan uppercase tracking-wide">
                        [{exp.role}]
                      </h3>
                      <p className="text-primary font-mono font-medium text-sm">
                        <span className="text-muted-foreground">&gt;</span>{" "}
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider border border-border/30 px-2 py-1 sharp">
                      {exp.period}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 font-mono text-sm text-muted-foreground border-l-2 border-primary/20 pl-4">
                    {exp.description.map((item, i) => (
                      <p key={i} className="leading-relaxed">
                        <span className="text-primary">&gt; </span>
                        {item}
                      </p>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <SectionDivider className="mt-12" />
      </div>
    </Section>
  );
}
