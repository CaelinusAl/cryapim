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

/** Her katmanın scroll aralığında ortaya çıkışı (0–1 toplam yolculuk) */
const LAYER_WINDOWS = [
  [0.06, 0.16],
  [0.14, 0.26],
  [0.24, 0.36],
  [0.34, 0.46],
  [0.44, 0.56],
  [0.54, 0.66],
  [0.64, 0.76],
  [0.74, 0.88],
] as const;

function useLayerOpacity(progress: MotionValue<number>, index: number) {
  const [start, peak] = LAYER_WINDOWS[index] ?? [0, 1];
  const fadeInEnd = start + (peak - start) * 0.45;
  return useTransform(progress, [start, fadeInEnd, 0.92, 1], [0, 1, 1, 1]);
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
  const opacities = [o0, o1, o2, o3, o4, o5, o6, o7];

  const coreGlow = useTransform(progress, [0.5, 0.7, 1], [0.25, 0.85, 1]);
  const assemble = useTransform(progress, [0, 0.08, 0.95], [0.92, 1, 1]);

  if (reduce) {
    return <StaticEgg />;
  }

  return (
    <motion.svg
      viewBox="0 0 400 560"
      className="h-full w-full max-h-[78svh] drop-shadow-[0_0_40px_rgba(201,169,106,0.15)]"
      style={{ scale: assemble }}
      aria-hidden
    >
      <defs>
        <radialGradient id="yolkGlow" cx="50%" cy="52%" r="45%">
          <stop offset="0%" stopColor="#ffe8a8" stopOpacity="1" />
          <stop offset="45%" stopColor="#c9a96a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c9a96a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shellStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9fb4ff" />
          <stop offset="50%" stopColor="#c9a96a" />
          <stop offset="100%" stopColor="#a06bd4" />
        </linearGradient>
        <linearGradient id="wireBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7eb8ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3a6ea8" stopOpacity="0.35" />
        </linearGradient>
        <clipPath id="eggClip">
          <ellipse cx="200" cy="268" rx="118" ry="168" />
        </clipPath>
      </defs>

      {/* Platform */}
      <ellipse
        cx="200"
        cy="478"
        rx="96"
        ry="18"
        fill="none"
        stroke="#c9a96a"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <ellipse
        cx="200"
        cy="478"
        rx="70"
        ry="11"
        fill="none"
        stroke="#c9a96a"
        strokeOpacity="0.2"
        strokeWidth="0.75"
      />

      {/* 01 Kabuk — dış kontur */}
      <motion.g style={{ opacity: opacities[0] }}>
        <ellipse
          cx="200"
          cy="268"
          rx="118"
          ry="168"
          fill="none"
          stroke="url(#shellStroke)"
          strokeWidth="1.75"
        />
        {/* Sol yarı wireframe hissi */}
        <path
          d="M200 100 C142 100 82 168 82 268 C82 368 142 436 200 436"
          fill="none"
          stroke="url(#wireBlue)"
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.7"
        />
        {[0.2, 0.35, 0.5, 0.65, 0.8].map((t) => {
          const y = 100 + t * 336;
          const halfW = 118 * Math.sqrt(1 - Math.pow((y - 268) / 168, 2));
          return (
            <line
              key={t}
              x1={200 - halfW}
              y1={y}
              x2={200}
              y2={y}
              stroke="#7eb8ff"
              strokeOpacity="0.22"
              strokeWidth="0.6"
            />
          );
        })}
      </motion.g>

      {/* 02 Kabuk zarları */}
      <motion.g style={{ opacity: opacities[1] }}>
        <ellipse
          cx="200"
          cy="268"
          rx="108"
          ry="156"
          fill="none"
          stroke="#c9a96a"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <ellipse
          cx="200"
          cy="268"
          rx="102"
          ry="148"
          fill="none"
          stroke="#c9a96a"
          strokeOpacity="0.3"
          strokeWidth="0.75"
        />
      </motion.g>

      {/* 03 Hava boşluğu (üst) */}
      <motion.g style={{ opacity: opacities[2] }}>
        <ellipse
          cx="200"
          cy="142"
          rx="48"
          ry="22"
          fill="#c9a96a"
          fillOpacity="0.06"
          stroke="#c9a96a"
          strokeOpacity="0.45"
          strokeWidth="0.9"
        />
      </motion.g>

      {/* 04 Yumurta akı */}
      <motion.g style={{ opacity: opacities[3] }} clipPath="url(#eggClip)">
        <ellipse
          cx="200"
          cy="290"
          rx="78"
          ry="112"
          fill="#c9a96a"
          fillOpacity="0.07"
          stroke="#c9a96a"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
      </motion.g>

      {/* 05 Şalaza */}
      <motion.g style={{ opacity: opacities[4] }}>
        <path
          d="M200 155 C188 200 212 230 200 268 C188 306 212 340 200 390"
          fill="none"
          stroke="#e8d5a3"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M188 170 C210 220 185 250 205 290 C220 325 190 360 200 385"
          fill="none"
          stroke="#c9a96a"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />
      </motion.g>

      {/* 06 Sarı — öz */}
      <motion.g style={{ opacity: opacities[5] }}>
        <motion.circle
          cx="200"
          cy="290"
          r="52"
          fill="url(#yolkGlow)"
          style={{ opacity: coreGlow }}
        />
        <circle
          cx="200"
          cy="290"
          r="38"
          fill="#c9a96a"
          fillOpacity="0.35"
          stroke="#ffe8a8"
          strokeOpacity="0.7"
          strokeWidth="1.2"
        />
      </motion.g>

      {/* 07 Vitellin zarı */}
      <motion.g style={{ opacity: opacities[6] }}>
        <ellipse
          cx="200"
          cy="290"
          rx="46"
          ry="46"
          fill="none"
          stroke="#ffe8a8"
          strokeOpacity="0.65"
          strokeWidth="1"
        />
      </motion.g>

      {/* 08 Germinal disk */}
      <motion.g style={{ opacity: opacities[7] }}>
        <circle cx="200" cy="278" r="7" fill="#fff6d6" />
        <circle
          cx="200"
          cy="278"
          r="14"
          fill="none"
          stroke="#ffe8a8"
          strokeOpacity="0.8"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="278"
          r="22"
          fill="none"
          stroke="#c9a96a"
          strokeOpacity="0.35"
          strokeWidth="0.75"
        />
      </motion.g>
    </motion.svg>
  );
}

function StaticEgg() {
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full max-h-[78svh]"
      aria-hidden
    >
      <ellipse
        cx="200"
        cy="268"
        rx="118"
        ry="168"
        fill="none"
        stroke="#c9a96a"
        strokeWidth="1.5"
      />
      <ellipse
        cx="200"
        cy="268"
        rx="108"
        ry="156"
        fill="none"
        stroke="#c9a96a"
        strokeOpacity="0.4"
      />
      <ellipse
        cx="200"
        cy="290"
        rx="78"
        ry="112"
        fill="#c9a96a"
        fillOpacity="0.08"
        stroke="#c9a96a"
        strokeOpacity="0.35"
      />
      <circle cx="200" cy="290" r="40" fill="#c9a96a" fillOpacity="0.4" />
      <circle cx="200" cy="278" r="7" fill="#fff6d6" />
      <ellipse
        cx="200"
        cy="478"
        rx="90"
        ry="16"
        fill="none"
        stroke="#c9a96a"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

export function MatrixEggJourney({ content }: { content: MatrixContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Aktif katman: her pencerenin ortasına göre
    let idx = 0;
    for (let i = 0; i < LAYER_WINDOWS.length; i++) {
      const [, peak] = LAYER_WINDOWS[i];
      if (v >= peak - 0.04) idx = i;
    }
    if (v >= 0.9) idx = 7;
    setActive(idx);
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 0.4, 0]);
  const outroOpacity = useTransform(scrollYProgress, [0.88, 0.94, 1], [0, 0.6, 1]);
  const layerTextOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.12, 0.86, 0.9],
    [0, 1, 1, 0],
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const layer = content.layers[active] ?? content.layers[0];

  return (
    <div ref={containerRef} className="matrix-journey relative h-[900vh]">
      <div className="sticky top-0 flex h-svh w-full overflow-hidden">
        {/* atmosfera */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(160,107,212,0.12)_0%,transparent_65%)]"
        />
        <div aria-hidden className="world-stars pointer-events-none absolute inset-0 opacity-40" />

        {/* scroll progress */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 z-30 h-px bg-gold/70"
          style={{ width: progressWidth }}
        />

        <div className="relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 py-20 lg:grid-cols-[1fr_minmax(280px,420px)_1fr] lg:gap-4 lg:px-10">
          {/* Sol: katman metni */}
          <motion.div
            style={{ opacity: layerTextOpacity }}
            className="order-2 z-10 max-w-md lg:order-1 lg:justify-self-end"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={layer.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="border-l border-gold/30 pl-5 lg:pl-6"
              >
                <p className="mb-3 font-serif text-[0.72rem] tracking-[0.35em] text-gold">
                  {layer.index}
                </p>
                <h2 className="font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-ink">
                  {layer.title}
                </h2>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.32em] text-muted">
                  {layer.subtitle}
                </p>
                <p className="mt-5 text-[0.84rem] leading-relaxed text-muted">
                  {layer.body}
                </p>
                <p className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-gold/80">
                  {layer.studio}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Orta: yumurta */}
          <div className="order-1 flex h-[42svh] items-center justify-center lg:order-2 lg:h-[78svh]">
            <EggDiagram progress={scrollYProgress} reduce={reduce} />
          </div>

          {/* Sağ: katman listesi */}
          <div className="order-3 hidden justify-self-start lg:block">
            <ol className="space-y-2.5">
              {content.layers.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.id}>
                    <div
                      className={`flex items-baseline gap-3 transition-colors duration-500 ${
                        isActive ? "text-gold" : "text-dim"
                      }`}
                    >
                      <span
                        className={`h-px transition-all duration-500 ${
                          isActive ? "w-6 bg-gold" : "w-3 bg-gold/25"
                        }`}
                      />
                      <span className="w-5 text-[0.58rem] tracking-[0.2em]">
                        {item.index}
                      </span>
                      <span
                        className={`font-serif text-[0.85rem] tracking-[0.04em] ${
                          isActive ? "text-ink" : ""
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Intro overlay */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-4 text-[0.62rem] uppercase tracking-[0.5em] text-gold">
            {content.intro.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,6vw,4.2rem)] leading-[1.05] text-ink">
            {content.intro.title}{" "}
            <em className="italic text-gold">{content.intro.titleAccent}</em>
          </h1>
          <p className="mt-4 max-w-lg text-[0.78rem] tracking-[0.18em] text-muted">
            {content.intro.subtitle}
          </p>
          <p className="mt-8 max-w-sm whitespace-pre-line font-serif text-[0.95rem] italic leading-relaxed text-ink/70">
            {content.intro.quote}
          </p>
          <p className="mt-12 text-[0.58rem] uppercase tracking-[0.4em] text-dim">
            {content.intro.hint}
          </p>
          <span
            aria-hidden
            className="hero-scroll-line mt-3 h-[34px] w-px bg-gradient-to-b from-dim to-transparent"
          />
        </motion.div>

        {/* Outro overlay */}
        <motion.div
          style={{ opacity: outroOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/55 px-6 text-center backdrop-blur-[2px]"
        >
          <p className="max-w-xl font-serif text-[clamp(1.15rem,2.4vw,1.6rem)] leading-relaxed text-ink">
            {content.outro.lead}
          </p>
          <p className="mt-6 max-w-lg text-[0.82rem] leading-relaxed text-muted">
            {content.outro.close}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
