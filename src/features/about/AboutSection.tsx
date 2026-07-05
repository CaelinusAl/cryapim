import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import type { Content } from "@/lib/content";

export function AboutSection({ content }: { content: Content["about"] }) {
  return (
    <section
      id="about"
      className="px-6 py-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label={content.label} />

        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
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
