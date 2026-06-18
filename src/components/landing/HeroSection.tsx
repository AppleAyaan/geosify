"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PresentationSection } from "@/components/landing/PresentationSection";
import { HeroMapDemo } from "@/components/landing/HeroMapDemo";
import { BrandCarousel } from "@/components/landing/BrandCarousel";
import { heroTrustedBrandIds } from "@/lib/data/brands";
import { RevealGroup, RevealItem, RevealMedia } from "@/components/landing/Reveal";
import { landingContent } from "@/lib/data/landing-content";
import { cn } from "@/lib/utils/cn";

const UNDERLINE_PATHS = [
  "M2 6.5C28 2.5 52 4 98 5.5",
  "M2 5C35 7.5 65 2 98 6",
  "M2 6C40 3 60 7 98 4.5",
  "M2 4.5C30 7 70 3 98 6.5",
  "M2 6.5C45 2 55 6 98 5",
];

const LIGHT_GRAY = "#d4d4d8";
const FOREGROUND_COLOR = "#111827";
const WORD_STAGGER = 0.14;
const WORD_FADE = 0.45;
const CYCLE_HOLD = 0.9;

function getWordCycleTimes(wordIndex: number, wordCount: number) {
  const cycle = wordCount * WORD_STAGGER + WORD_FADE + CYCLE_HOLD;
  const turnStart = Math.max(0.001, (wordIndex * WORD_STAGGER) / cycle);
  const turnEnd = (wordIndex * WORD_STAGGER + WORD_FADE) / cycle;
  const resetAt =
    (wordCount * WORD_STAGGER + WORD_FADE + CYCLE_HOLD * 0.55) / cycle;

  return {
    cycle,
    times: [0, turnStart, turnEnd, resetAt, 1] as number[],
  };
}

function CyclingHeroWord({
  word,
  index,
  wordCount,
}: {
  word: (typeof landingContent.hero.headlineWords)[number];
  index: number;
  wordCount: number;
}) {
  const { cycle, times } = getWordCycleTimes(index, wordCount);

  return (
    <motion.span
      className="inline"
      animate={{
        color: [LIGHT_GRAY, LIGHT_GRAY, FOREGROUND_COLOR, FOREGROUND_COLOR, LIGHT_GRAY],
      }}
      transition={{
        duration: cycle,
        times,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <HeroWordContent index={index + 1} {...word} />
    </motion.span>
  );
}

function HeroWordContent({
  text,
  emphasize,
  italic,
  index,
}: {
  text: string;
  emphasize?: boolean;
  italic?: boolean;
  index: number;
}) {
  if (!emphasize) {
    return <>{text} </>;
  }

  return (
    <span
      className={cn(
        "relative mr-[0.2em] inline-block",
        italic && "italic",
      )}
    >
      {text}
      <svg
        className="hero-word-underline"
        viewBox="0 0 100 8"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={UNDERLINE_PATHS[index % UNDERLINE_PATHS.length]}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function HeroSection() {
  const { hero } = landingContent;

  const scrollToStats = () => {
    const scrollEl = document.getElementById("presentation-scroll");
    const target = document.getElementById("stats");
    if (!scrollEl || !target) return;
    scrollEl.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  return (
    <PresentationSection id="hero">
      <div className="grid h-full items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col justify-center py-4 text-left">
          <RevealGroup>
            <RevealItem>
              <Badge variant="gray" className="mb-5 px-3 py-1 text-xs">
                {hero.badge}
              </Badge>
            </RevealItem>

            <h1 className="text-3xl font-medium leading-[1.14] tracking-tight md:text-4xl lg:text-5xl">
              <span style={{ color: FOREGROUND_COLOR }}>
                {hero.headlineWords[0].text}{" "}
              </span>
              {hero.headlineWords.slice(1).map((word, i, arr) => (
                <CyclingHeroWord
                  key={`${word.text}-${i + 1}`}
                  word={word}
                  index={i}
                  wordCount={arr.length}
                />
              ))}
            </h1>

            <RevealItem>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-[0.9375rem]">
                {hero.subheadline}
              </p>
            </RevealItem>

            <RevealItem>
              <div className="mt-8 max-w-md">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted/70">
                  {hero.trustedByLabel}
                </p>
                <BrandCarousel
                  brandIds={heroTrustedBrandIds}
                  variant="logo"
                  duration={22}
                  logoHeight={26}
                />
              </div>
            </RevealItem>

            <RevealItem>
              <motion.button
                type="button"
                onClick={scrollToStats}
                className="nav-btn mt-6 flex h-9 w-9 items-center justify-center rounded-full text-muted/50"
                aria-label="Scroll to stats"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </motion.button>
            </RevealItem>
          </RevealGroup>
        </div>

        <RevealMedia className="h-full min-h-[280px] lg:min-h-0">
          <div className="h-full max-h-[52dvh] lg:max-h-[62dvh]">
            <HeroMapDemo />
          </div>
        </RevealMedia>
      </div>
    </PresentationSection>
  );
}
