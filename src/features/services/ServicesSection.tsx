import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import type { Content } from "@/lib/content";

export function ServicesSection({
  content,
}: {
  content: Content["services"];
}) {
  return (
    <section
      id="capabilities"
      className="px-6 py-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" label={content.label} />

        <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i * 0.05, 0.3)}>
              <article className="group flex h-full flex-col border border-gold/15 p-8 transition-colors duration-500 hover:border-gold/60">
                <span className="mb-6 text-[0.62rem] tracking-[0.35em] text-dim">
                  ↳ {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-4 font-serif text-xl leading-snug text-ink">
                  {service.title}
                </h3>
                <p className="mb-8 flex-1 text-[0.82rem] leading-relaxed text-muted">
                  {service.body}
                </p>
                <div className="text-[0.62rem] uppercase tracking-[0.3em] text-gold/80">
                  {service.tags}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
