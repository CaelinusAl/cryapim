import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import type { Content } from "@/lib/content";

export function AboutSection({ content }: { content: Content["about"] }) {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_120%_80%_at_15%_0%,#170d20_0%,#0a080c_55%,#000_100%)] px-6 py-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label={content.label} />

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr_1fr]">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden border border-gold/25 lg:mx-0">
              <Image
                src="/brand/egg-wordmark-800.webp"
                alt="CR YAPIM marka kimliği — altın ve mor fırça darbeli seramik yumurta formu"
                fill
                sizes="(min-width: 1024px) 220px, 60vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.15] text-ink">
              {content.headlineL1}
              <br />
              <em className="italic text-gold">{content.headlineL2}</em>
              <br />
              {content.headlineL3}
            </h3>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6 text-[0.9rem] leading-relaxed text-muted">
              {content.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}

              <dl className="mt-10 divide-y divide-gold/15 border-y border-gold/20">
                {content.meta.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between py-3"
                  >
                    <dt className="text-[0.62rem] uppercase tracking-[0.35em] text-dim">
                      {row.label}
                    </dt>
                    <dd className="text-[0.78rem] text-ink">
                      {row.accent ? (
                        <span className="mr-2 text-gold">●</span>
                      ) : null}
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
