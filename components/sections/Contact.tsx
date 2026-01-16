"use client";

import { useState, FormEvent } from "react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants/portfolio";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <Section id="contact" className="relative cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
            <span className="text-neon-cyan">&gt;</span> Section_05
          </p>
          <Heading as="h2" className="neon-text">
            [Establish_Connection]
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Terminal-style contact form */}
          <Card hover={false} glowColor="cyan" className="space-y-6">
            {/* Terminal header */}
            <div className="border-b border-primary/30 pb-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger" />
                <div className="w-3 h-3 rounded-full bg-neon-purple" />
                <div className="w-3 h-3 rounded-full bg-neon-cyan" />
              </div>
              <span className="text-xs font-mono text-muted-foreground tracking-wider">
                contact_terminal.exe
              </span>
            </div>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="text-neon-cyan text-4xl mb-4">✓</div>
                <h3 className="text-xl font-mono text-primary">
                  Message Transmitted
                </h3>
                <p className="text-muted-foreground font-mono text-sm">
                  Connection established successfully.
                  <br />
                  Stand by for response...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-mono uppercase text-muted-foreground"
                  >
                    Target_ID (Name)
                  </label>
                  <Input
                    id="name"
                    required
                    placeholder="Enter your designation..."
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono uppercase text-muted-foreground"
                  >
                    Comms_Link (Email)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter frequency..."
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-mono uppercase text-muted-foreground"
                  >
                    Transmission_Data (Message)
                  </label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Enter encrypted payload..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-pulse">[Transmitting...]</span>
                  ) : (
                    "[Execute_Send]"
                  )}
                </Button>
              </form>
            )}

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border-t border-border/30 pt-4">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-glow-pulse" />
              <span className="uppercase tracking-wider">
                System Online // Ready for Input
              </span>
            </div>
          </Card>

          {/* Contact Info Side */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4 h-fit">
              <h3 className="text-lg font-mono text-primary mb-4">
                &gt; Direct_Channels
              </h3>

              <div className="space-y-4">
                <div className="group">
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    Email_Protocol
                  </p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-foreground hover:text-neon-cyan transition-colors font-mono block"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <div className="group">
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    Phone_Protocol
                  </p>
                  <a
                    href={`tel:${PERSONAL_INFO.number}`}
                    className="text-foreground hover:text-neon-cyan transition-colors font-mono block"
                  >
                    {PERSONAL_INFO.number}
                  </a>
                </div>

                <div className="group">
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    Location_Node
                  </p>
                  <p className="text-foreground font-mono">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/30">
                <p className="text-xs text-muted-foreground uppercase mb-4">
                  Social_Uplinks
                </p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-all border border-border/30 hover:border-primary px-3 py-1.5 rounded-sm hover:shadow-glow-sm"
                    >
                      [{link.platform}]
                    </a>
                  ))}
                </div>
              </div>
            </Card>

            <div className="p-4 border border-primary/20 bg-primary/5 rounded-sm">
              <p className="font-mono text-xs text-primary leading-relaxed">
                <span className="animate-pulse text-danger">WARNING:</span>{" "}
                Unauthorized solicitations will be redirected to{" "}
                <span className="text-neon-purple">/dev/null</span>. Priority
                access granted to interesting projects and high-bandwidth
                collaborations. Encryption protocols active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
