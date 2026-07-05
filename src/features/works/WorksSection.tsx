import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import type { Content } from "@/lib/content";

export function WorksSection({ content }: { content: Content["works"] }) {
  return (
    <section
      id="works"
      className="px-6 py-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" label={content.label} />

        <ol className="space-y-24">
          {content.items.map((work) => (
            <li key={work.name}>
              <Reveal>
                <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
                  <div className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-gold/15 bg-black transition-colors duration-500 hover:border-gold/50">
                    <span className="absolute left-6 top-6 text-[0.62rem] tracking-[0.4em] text-dim">
                      {work.badge}
                    </span>
                    <svg
                      viewBox="0 0 400 300"
                      preserveAspectRatio="xMidYMid slice"
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full opacity-40 transition-opacity duration-700 group-hover:opacity-70"
                    >
                      <ellipse cx="200" cy="150" rx="40" ry="30" fill="none" stroke="#c9a96a" strokeOpacity="0.5" />
                      <ellipse cx="200" cy="150" rx="80" ry="60" fill="none" stroke="#c9a96a" strokeOpacity="0.4" />
                      <ellipse cx="200" cy="150" rx="120" ry="90" fill="none" stroke="#c9a96a" strokeOpacity="0.3" />
                      <ellipse cx="200" cy="150" rx="160" ry="120" fill="none" stroke="#c9a96a" strokeOpacity="0.2" />
                      <ellipse cx="200" cy="150" rx="200" ry="150" fill="none" stroke="#c9a96a" strokeOpacity="0.12" />
                    </svg>
                    <span className="relative font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic text-ink">
                      {work.titleOn}
                    </span>
                  </div>

                  <div>
                    <div className="mb-5 flex items-baseline justify-between text-[0.62rem] tracking-[0.35em] text-dim">
                      <span>{work.metaIndex}</span>
                      <span>{work.year}</span>
                    </div>
                    <h3 className="mb-4 font-serif text-2xl text-ink">
                      {work.name}
                    </h3>
                    <p className="mb-6 text-[0.85rem] leading-relaxed text-muted">
                      {work.desc}
                    </p>
                    <div className="mb-8 text-[0.62rem] uppercase tracking-[0.3em] text-gold/80">
                      {work.tags}
                    </div>
                    <a
                      href="#commission"
                      className="inline-block border-b border-gold/40 pb-1 text-[0.72rem] uppercase tracking-[0.3em] text-ink transition-colors hover:border-gold hover:text-gold"
                    >
                      {work.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
