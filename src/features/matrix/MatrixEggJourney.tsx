"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import type { MatrixContent } from "@/lib/matrix";

/**
 * Scroll fazları (örtüşmesiz) — kısa track (~480vh) ile hızlı geçiş:
 * 0.00–0.08  intro
 * 0.08–0.90  8 katman
 * 0.90–1.00  outro
 */
const INTRO_END = 0.08;
const LAYERS_END = 0.9;
const LAYER_SPAN = (LAYERS_END - INTRO_END) / 8;

function layerWindow(i: number): [number, number] {
  const start = INTRO_END + i * LAYER_SPAN;
  return [start, start + LAYER_SPAN];
}

function useLayerOpacity(progress: MotionValue<number>, index: number) {
  const [start, end] = layerWindow(index);
  const mid = start + LAYER_SPAN * 0.35;
  // Önceki katmanlar kalır (birleşim), yenisi fade-in
  return useTransform(progress, [start, mid, LAYERS_END, 0.95], [0, 1, 1, 1]);
}

function EggDiagram({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const o0 = useLayerOpacity(progress, 0);
  const o1 = useLayerOpacity(progress, 1);
  const o2 = useLayerOpacity(progress, 2);
  const o3 = useLayerOpacity(progress, 3);
  const o4 = useLayerOpacity(progress, 4);
  const o5 = useLayerOpacity(progress, 5);
  const o6 = useLayerOpacity(progress, 6);
  const o7 = useLayerOpacity(progress, 7);

  const coreGlow = useTransform(progress, [0.5, 0.72, 1], [0.4, 1, 1]);
  const assemble = useTransform(progress, [0, INTRO_END, 0.95], [0.88, 1, 1]);

  if (reduce) {
    return <StaticEgg />;
  }

  return (
    <motion.svg
      viewBox="0 0 400 560"
      className="h-full w-full max-h-[min(72svh,640px)] drop-shadow-[0_0_55px_rgba(201,169,106,0.35)]"
      style={{ scale: assemble }}
      aria-hidden
    >
      <defs>
        <radialGradient id="yolkGlow" cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor="#fff6d6" stopOpacity="1" />
          <stop offset="40%" stopColor="#e8c87a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#c9a96a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shellStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b8ccff" />
          <stop offset="45%" stopColor="#e8c87a" />
          <stop offset="100%" stopColor="#c28ae8" />
        </linearGradient>
        <linearGradient id="wireBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9ec5ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#5a8fd4" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="shellFill" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c9a96a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </radialGradient>
        <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="eggClip">
          <ellipse cx="200" cy="268" rx="122" ry="172" />
        </clipPath>
      </defs>

      {/* Platform */}
      <ellipse
        cx="200"
        cy="486"
        rx="110"
        ry="22"
        fill="#c9a96a"
        fillOpacity="0.08"
        stroke="#c9a96a"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <ellipse
        cx="200"
        cy="486"
        rx="78"
        ry="13"
        fill="none"
        stroke="#e8c87a"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {/* 01 Kabuk */}
      <motion.g style={{ opacity: o0 }} filter="url(#softGlow)">
        <ellipse cx="200" cy="268" rx="122" ry="172" fill="url(#shellFill)" />
        <ellipse
          cx="200"
          cy="268"
          rx="122"
          ry="172"
          fill="none"
          stroke="url(#shellStroke)"
          strokeWidth="3"
        />
        <path
          d="M200 96 C138 96 78 166 78 268 C78 370 138 440 200 440"
          fill="none"
          stroke="url(#wireBlue)"
          strokeWidth="1.6"
          strokeDasharray="4 6"
          opacity="0.85"
        />
        {[0.18, 0.32, 0.46, 0.6, 0.74].map((t) => {
          const y = 96 + t * 344;
          const halfW = 122 * Math.sqrt(Math.max(0, 1 - Math.pow((y - 268) / 172, 2)));
          return (
            <line
              key={t}
              x1={200 - halfW}
              y1={y}
              x2={200}
              y2={y}
              stroke="#9ec5ff"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          );
        })}
      </motion.g>

      {/* 02 Kabuk zarları */}
      <motion.g style={{ opacity: o1 }}>
        <ellipse
          cx="200"
          cy="268"
          rx="110"
          ry="158"
          fill="none"
          stroke="#e8c87a"
          strokeOpacity="0.75"
          strokeWidth="2"
        />
        <ellipse
          cx="200"
          cy="268"
          rx="102"
          ry="148"
          fill="none"
          stroke="#c9a96a"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
      </motion.g>

      {/* 03 Hava boşluğu */}
      <motion.g style={{ opacity: o2 }}>
        <ellipse
          cx="200"
          cy="138"
          rx="56"
          ry="26"
          fill="#c9a96a"
          fillOpacity="0.12"
          stroke="#e8c87a"
          strokeOpacity="0.7"
          strokeWidth="1.6"
        />
      </motion.g>

      {/* 04 Yumurta akı */}
      <motion.g style={{ opacity: o3 }} clipPath="url(#eggClip)">
        <ellipse
          cx="200"
          cy="292"
          rx="84"
          ry="118"
          fill="#c9a96a"
          fillOpacity="0.14"
          stroke="#e8c87a"
          strokeOpacity="0.65"
          strokeWidth="1.8"
        />
      </motion.g>

      {/* 05 Şalaza */}
      <motion.g style={{ opacity: o4 }} filter="url(#softGlow)">
        <path
          d="M200 150 C184 200 216 232 200 268 C184 304 216 348 200 400"
          fill="none"
          stroke="#fff0c2"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M186 165 C212 218 180 252 208 295 C224 330 186 365 200 395"
          fill="none"
          stroke="#c9a96a"
          strokeWidth="1.3"
          strokeOpacity="0.7"
        />
      </motion.g>

      {/* 06 Sarı */}
      <motion.g style={{ opacity: o5 }} filter="url(#softGlow)">
        <motion.circle
          cx="200"
          cy="292"
          r="58"
          fill="url(#yolkGlow)"
          style={{ opacity: coreGlow }}
        />
        <circle
          cx="200"
          cy="292"
          r="42"
          fill="#c9a96a"
          fillOpacity="0.5"
          stroke="#fff0c2"
          strokeOpacity="0.9"
          strokeWidth="2"
        />
      </motion.g>

      {/* 07 Vitellin */}
      <motion.g style={{ opacity: o6 }}>
        <circle
          cx="200"
          cy="292"
          r="50"
          fill="none"
          stroke="#fff6d6"
          strokeOpacity="0.85"
          strokeWidth="1.8"
        />
      </motion.g>

      {/* 08 Germinal */}
      <motion.g style={{ opacity: o7 }} filter="url(#softGlow)">
        <circle cx="200" cy="278" r="9" fill="#fffaf0" />
        <circle
          cx="200"
          cy="278"
          r="17"
          fill="none"
          stroke="#fff0c2"
          strokeWidth="1.8"
        />
        <circle
          cx="200"
          cy="278"
          r="26"
          fill="none"
          stroke="#c9a96a"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
      </motion.g>
    </motion.svg>
  );
}

function StaticEgg() {
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full max-h-[min(72svh,640px)]"
      aria-hidden
    >
      <ellipse
        cx="200"
        cy="268"
        rx="122"
        ry="172"
        fill="#c9a96a"
        fillOpacity="0.1"
        stroke="#c9a96a"
        strokeWidth="3"
      />
      <ellipse
        cx="200"
        cy="268"
        rx="110"
        ry="158"
        fill="none"
        stroke="#e8c87a"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <ellipse
        cx="200"
        cy="292"
        rx="84"
        ry="118"
        fill="#c9a96a"
        fillOpacity="0.14"
        stroke="#c9a96a"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <circle cx="200" cy="292" r="42" fill="#c9a96a" fillOpacity="0.55" />
      <circle cx="200" cy="278" r="9" fill="#fffaf0" />
      <ellipse
        cx="200"
        cy="486"
        rx="100"
        ry="18"
        fill="none"
        stroke="#c9a96a"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function MatrixEggJourney({ content }: { content: MatrixContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"intro" | "layers" | "outro">("intro");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < INTRO_END) {
      setPhase("intro");
      setActive(0);
      return;
    }
    if (v >= LAYERS_END) {
      setPhase("outro");
      setActive(7);
      return;
    }
    setPhase("layers");
    const idx = Math.min(
      7,
      Math.max(0, Math.floor((v - INTRO_END) / LAYER_SPAN)),
    );
    setActive(idx);
  });

  const introOpacity = useTransform(
    scrollYProgress,
    [0, 0.045, INTRO_END],
    [1, 1, 0],
  );
  const layerPanelOpacity = useTransform(
    scrollYProgress,
    [INTRO_END - 0.015, INTRO_END + 0.015, LAYERS_END - 0.02, LAYERS_END],
    [0, 1, 1, 0],
  );
  const outroOpacity = useTransform(
    scrollYProgress,
    [LAYERS_END - 0.01, LAYERS_END + 0.025, 1],
    [0, 1, 1],
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const layer = content.layers[active] ?? content.layers[0];

  return (
    <div
      ref={containerRef}
      className="matrix-journey relative h-[480vh]"
      data-phase={phase}
    >
      <div className="sticky top-0 flex h-svh w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_48%,rgba(160,107,212,0.16)_0%,transparent_68%)]"
        />
        <div
          aria-hidden
          className="world-stars pointer-events-none absolute inset-0 opacity-45"
        />

        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 z-30 h-[2px] bg-gold"
          style={{ width: progressWidth }}
        />

        {/* Ana sahne — simetrik 3 sütun */}
        <div className="relative mx-auto grid h-full w-full max-w-6xl grid-cols-1 items-center px-5 pt-20 pb-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8 lg:px-10 lg:pt-24 lg:pb-10">
          {/* Sol panel */}
          <motion.aside
            style={{ opacity: layerPanelOpacity }}
            className="pointer-events-none relative z-10 order-2 hidden min-h-[14rem] lg:order-1 lg:block"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              {phase === "layers" ? (
                <motion.div
                  key={layer.id}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-l-2 border-gold/50 pl-6"
                >
                  <p className="mb-3 font-serif text-sm tracking-[0.28em] text-gold">
                    {layer.index}
                  </p>
                  <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.55rem)] font-normal leading-[1.12] text-ink">
                    {layer.title}
                  </h2>
                  <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-muted">
                    {layer.subtitle}
                  </p>
                  <p className="mt-5 max-w-[32ch] text-[0.95rem] leading-[1.65] text-ink/80">
                    {layer.body}
                  </p>
                  <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-gold">
                    {layer.studio}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.aside>

          {/* Orta: yumurta */}
          <div className="order-1 flex h-[48svh] items-center justify-center lg:order-2 lg:h-[min(70svh,620px)]">
            <EggDiagram progress={scrollYProgress} reduce={reduce} />
          </div>

          {/* Sağ panel — katman listesi */}
          <motion.aside
            style={{ opacity: layerPanelOpacity }}
            className="relative z-10 order-3 hidden lg:block"
          >
            <ol className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col gap-3.5">
              {content.layers.map((item, i) => {
                const isActive = phase === "layers" && i === active;
                return (
                  <li key={item.id}>
                    <div
                      className={`flex items-center gap-3 transition-colors duration-500 ${
                        isActive ? "text-gold" : "text-dim"
                      }`}
                    >
                      <span
                        className={`h-px shrink-0 transition-all duration-500 ${
                          isActive ? "w-7 bg-gold" : "w-3.5 bg-gold/30"
                        }`}
                      />
                      <span className="w-6 shrink-0 text-[0.65rem] font-medium tracking-[0.18em]">
                        {item.index}
                      </span>
                      <span
                        className={`font-serif text-[0.95rem] tracking-[0.03em] ${
                          isActive ? "text-ink" : "text-muted"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </motion.aside>

          {/* Mobil katman kartı — yumurtanın altında, tek blok */}
          <motion.div
            style={{ opacity: layerPanelOpacity }}
            className="order-3 z-10 w-full lg:hidden"
          >
            <AnimatePresence mode="wait">
              {phase === "layers" ? (
                <motion.div
                  key={`m-${layer.id}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="mx-auto max-w-md border border-gold/25 bg-black/55 px-5 py-4 backdrop-blur-sm"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-serif text-xl text-ink">{layer.title}</h2>
                    <span className="font-serif text-sm tracking-[0.2em] text-gold">
                      {layer.index}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/75">
                    {layer.body}
                  </p>
                  <p className="mt-3 text-[0.62rem] uppercase tracking-[0.22em] text-gold/90">
                    {layer.studio}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Intro — katmanlarla aynı anda görünmez */}
        <motion.div
          style={{ opacity: introOpacity }}
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center ${
            phase === "intro" ? "pointer-events-none" : "pointer-events-none"
          }`}
          aria-hidden={phase !== "intro"}
        >
          <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-gold">
            {content.intro.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.5rem)] leading-[1.05] text-ink">
            {content.intro.title}{" "}
            <em className="italic text-gold">{content.intro.titleAccent}</em>
          </h1>
          <p className="mt-5 max-w-lg text-[0.88rem] font-medium tracking-[0.14em] text-muted">
            {content.intro.subtitle}
          </p>
          <p className="mt-8 max-w-sm whitespace-pre-line font-serif text-[1.05rem] italic leading-relaxed text-ink/85">
            {content.intro.quote}
          </p>
          <p className="mt-12 text-[0.65rem] font-medium uppercase tracking-[0.36em] text-dim">
            {content.intro.hint}
          </p>
          <span
            aria-hidden
            className="hero-scroll-line mt-3 h-[34px] w-px bg-gradient-to-b from-dim to-transparent"
          />
        </motion.div>

        {/* Outro overlay — katmanlardan sonra */}
        <motion.div
          style={{ opacity: outroOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 px-6 text-center backdrop-blur-[3px]"
          aria-hidden={phase !== "outro"}
        >
          <p className="max-w-xl font-serif text-[clamp(1.25rem,2.6vw,1.75rem)] leading-relaxed text-ink">
            {content.outro.lead}
          </p>
          <p className="mt-6 max-w-lg text-[0.92rem] leading-relaxed text-ink/70">
            {content.outro.close}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
