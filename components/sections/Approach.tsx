import type { ApproachContent } from "@/content/types";
import { SECTION_IDS } from "@/content/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Approach — Bölüm 4: CR YAKLAŞIMI.
 *
 * Altı kelime, altı adım: Duygu → Hikâye → Tasarım → Teknoloji → Deneyim → İz.
 * Manifesto metnine boğmadan; kelimeler bir çizgi/nefes olarak tek tek belirir.
 * (CR-WEB-YARATICI-MIMARI.md · "Görsel ve hareketle anlaşılır, metin minimum.")
 */
export function Approach({ content }: { content: ApproachContent }) {
  return (
    <section
      id={SECTION_IDS.approach}
      className="relative px-6 md:px-10 py-20 md:py-28 max-w-5xl mx-auto scroll-mt-24"
    >
      <SectionHeading kicker={content.kicker} title={content.title} align="center" />

      {/* Altı adım — akan çizgi; her kelime sırayla belirir */}
      <ol className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 md:gap-x-6">
        {content.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-4 md:gap-6">
            <Reveal delay={i * 140}>
              <span className="editorial-italic text-2xl md:text-4xl text-mist-100 whitespace-nowrap">
                {step}
              </span>
            </Reveal>
            {i < content.steps.length - 1 && (
              <span aria-hidden className="text-tower-gold/50 text-xl md:text-2xl select-none">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      {content.closing && (
        <Reveal delay={content.steps.length * 140}>
          <p className="body-readable text-mist-300 mt-12 text-center max-w-xl mx-auto text-balance">
            {content.closing}
          </p>
        </Reveal>
      )}
    </section>
  );
}
