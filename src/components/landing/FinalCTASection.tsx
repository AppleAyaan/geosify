"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { PresentationSection } from "@/components/landing/PresentationSection";
import { BrandCarousel } from "@/components/landing/BrandCarousel";
import { RevealGroup, RevealItem } from "@/components/landing/Reveal";
import { landingContent } from "@/lib/data/landing-content";

export function FinalCTASection() {
  const { bottomCta, footer } = landingContent;

  return (
    <PresentationSection id="cta" fillHeight>
      <div className="flex flex-1 flex-col justify-center">
        <RevealGroup className="mx-auto w-full max-w-6xl text-center">
          <RevealItem>
            <h2 className="mb-3 text-[clamp(0.65rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-tight whitespace-nowrap">
              {bottomCta.headline}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mb-6 text-sm text-muted md:text-base">
              {bottomCta.subheadline}
            </p>
          </RevealItem>
          <RevealItem>
            <Link href="/explore">
              <Button size="lg">{bottomCta.cta}</Button>
            </Link>
          </RevealItem>
        </RevealGroup>

        <RevealGroup>
          <RevealItem>
            <p className="mt-12 mb-2 text-center text-[10px] font-medium uppercase tracking-widest text-muted/70">
              {bottomCta.usedByLabel}
            </p>
          </RevealItem>
          <RevealItem>
            <BrandCarousel />
          </RevealItem>
        </RevealGroup>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-auto flex shrink-0 flex-col items-center justify-between gap-4 border-t border-white/30 pt-6 pb-4 md:flex-row"
      >
        <div className="flex items-center gap-2">
          <Logo showWordmark={false} size={36} />
          <p className="text-xs text-muted">{footer.tagline}</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-1">
          {footer.links.map((link) => (
            <a
              key={link}
              href="#"
              className="nav-link text-xs text-muted"
            >
              {link}
            </a>
          ))}
        </nav>
      </motion.footer>
    </PresentationSection>
  );
}
