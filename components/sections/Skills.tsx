"use client";

import { SKILLS } from "@/lib/constants/portfolio";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { SectionDivider } from "@/components/ui/SectionDivider";

export function Skills() {
  const groupedSkills = {
    Frontend: SKILLS.filter((s) => s.category === "frontend"),
    Backend: SKILLS.filter((s) => s.category === "backend"),
    Tools: SKILLS.filter((s) => s.category === "tools"),
  };

  return (
    <Section id="skills" className="relative bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
            <span className="text-neon-cyan">&gt;</span> Section_02
          </p>
          <Heading as="h2" className="neon-text">
            [Technical_Skills]
          </Heading>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="border-l-2 border-primary/30 pl-6">
              {/* Category header - terminal style */}
              <h3 className="text-base font-mono font-semibold mb-4 text-neon-purple uppercase tracking-wider flex items-center gap-2">
                <span className="text-neon-cyan">&gt;</span>
                <span className="w-2 h-2 bg-primary rounded-full shadow-glow-sm" />
                {category}
              </h3>

              {/* Skills grid */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill.name} variant="default">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <SectionDivider className="mt-12" />
      </div>
    </Section>
  );
}
