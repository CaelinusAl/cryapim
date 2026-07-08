"use client";

import dynamic from "next/dynamic";
import type { Content } from "@/lib/content";

const UniverseHero = dynamic(() => import("@/features/hero/UniverseHero"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export function HeroSection({ content }: { content: Content["hero"] }) {
  return (
    <header id="top" className="relative h-svh w-full overflow-hidden bg-black">
      <UniverseHero className="absolute inset-0" showFormLabel />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
        <h1
          className="max-w-[16ch] font-serif text-[clamp(2rem,6.4vw,5.4rem)] leading-[1.04] tracking-[0.01em] text-ink"
          style={{
            textShadow:
              "0 0 40px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)",
          }}
        >
          {content.titleL1} <em className="italic">{content.titleL2}</em>
        </h1>
        <div className="mt-[clamp(1.4rem,3vw,2.2rem)] pl-[0.5em] text-[clamp(0.9rem,1.4vw,1.05rem)] font-medium tracking-[0.5em] text-ink">
          {content.brand}
        </div>
        <div className="mt-4 text-[clamp(0.6rem,1vw,0.72rem)] uppercase tracking-[0.32em] text-muted">
          {content.role}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[clamp(0.55rem,0.9vw,0.65rem)] uppercase tracking-[0.32em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
          {content.status}
        </div>
      </div>

      <a
        href="#world-gateway"
        className="absolute bottom-[max(env(safe-area-inset-bottom),clamp(1rem,3vw,2rem))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.4em] text-dim transition-colors hover:text-gold"
      >
        <span>{content.hint}</span>
        <span
          aria-hidden
          className="h-[34px] w-px bg-gradient-to-b from-dim to-transparent"
        />
      </a>
    </header>
  );
}
