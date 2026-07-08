import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { NAV_ROUTES } from "@/lib/routes";
import type { MatrixContent } from "@/lib/matrix";

export function MatrixOutro({ content }: { content: MatrixContent }) {
  return (
    <section className="relative border-t border-gold/15 px-6 py-[clamp(5rem,10vw,9rem)] sm:px-12 lg:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,169,106,0.1)_0%,transparent_60%)]"
      />

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-gold">
                {content.outro.visionLabel}
              </p>
              <p className="font-serif text-[1.3rem] leading-relaxed text-ink">
                {content.outro.vision}
              </p>
            </div>
            <div>
              <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-gold">
                {content.outro.missionLabel}
              </p>
              <p className="font-serif text-[1.3rem] leading-relaxed text-ink">
                {content.outro.mission}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-gold/20 pt-12 text-center">
            <p className="mb-2 text-[0.62rem] uppercase tracking-[0.4em] text-dim">
              {content.outro.ctaHint}
            </p>
            <h2 className="mb-10 font-serif text-[clamp(1.65rem,3.2vw,2.4rem)] text-ink">
              {content.outro.cta}
            </h2>
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {NAV_ROUTES.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="inline-block border border-gold/30 px-5 py-3 font-serif text-[0.95rem] tracking-[0.06em] text-ink transition-colors hover:border-gold hover:text-gold"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
