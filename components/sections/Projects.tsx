"use client";

import { PROJECTS } from "@/lib/constants/portfolio";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function Projects() {
  return (
    <Section id="projects" className="relative bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
            <span className="text-neon-cyan">&gt;</span> Section_04
          </p>
          <Heading as="h2" className="neon-text-purple">
            [Featured_Projects]
          </Heading>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <SectionDivider className="mt-12" />
      </div>
    </Section>
  );
}
