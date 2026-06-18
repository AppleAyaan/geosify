"use client";

import { Badge } from "@/components/ui/Badge";
import { PresentationSection } from "@/components/landing/PresentationSection";
import { AnimatedStat } from "@/components/landing/AnimatedStat";
import { RevealGroup, RevealItem } from "@/components/landing/Reveal";
import { landingContent } from "@/lib/data/landing-content";

export function StatsSection() {
  const { stats } = landingContent;

  return (
    <PresentationSection id="stats">
      <RevealGroup className="text-center">
        <RevealItem>
          <Badge className="mb-3">Platform at a glance</Badge>
        </RevealItem>
        <RevealItem>
          <h2 className="mb-10 text-2xl font-semibold tracking-tight md:text-3xl">
            Land intelligence that scales
          </h2>
        </RevealItem>
      </RevealGroup>
      <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => (
          <RevealItem key={stat.label}>
            <div className="glass-panel rounded-xl p-5 text-center md:p-6">
              <p className="mb-1 text-2xl font-semibold text-foreground md:text-3xl">
                <AnimatedStat
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.suffix === "B" ? 1 : 0}
                />
              </p>
              <p className="text-xs text-muted md:text-sm">{stat.label}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </PresentationSection>
  );
}
