"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import type { Content } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function ManifestoSection({
  content,
}: {
  content: Content["manifesto"];
}) {
  const reduce = useReducedMotion();

  const stage = (index: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition: { duration: 1, delay: index * 0.25, ease },
        };

  return (
    <section
      id="manifesto"
      className="px-6 py-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" label={content.label} />

        <div className="mx-auto max-w-3xl py-8 text-center">
          <motion.p
            {...stage(0)}
            className="mb-16 font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] leading-relaxed text-muted"
          >
            {content.lead}
          </motion.p>

          <div className="mb-16 space-y-8">
            {content.lines.map((line, i) => (
              <motion.p
                key={line.a}
                {...stage(i + 1)}
                className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-snug text-ink"
              >
                {line.a} <em className="italic text-muted">{line.b}</em>
              </motion.p>
            ))}
          </div>

          <motion.p
            {...stage(4)}
            className="mb-14 font-serif text-[clamp(1.8rem,3.6vw,3rem)] italic leading-snug text-gold"
          >
            {content.close}
          </motion.p>

          <motion.p
            {...stage(5)}
            className="mx-auto max-w-xl text-[0.68rem] uppercase leading-loose tracking-[0.25em] text-dim"
          >
            {content.sig}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
