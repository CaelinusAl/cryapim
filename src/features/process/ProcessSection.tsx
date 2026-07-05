import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import type { Content } from "@/lib/content";

export function ProcessSection({
  content,
}: {
  content: Content["process"];
}) {
  return (
    <section
      id="process"
      className="px-6 py-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" label={content.label} />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="border-t border-gold/25 pt-6">
                <div className="mb-6 font-serif text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3 text-[0.78rem] font-medium uppercase tracking-[0.3em] text-ink">
                  {step.title}
                </h3>
                <p className="text-[0.8rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
