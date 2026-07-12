import type { SectionIntro, JourneyStep } from "@/content/types";
import { SECTION_IDS } from "@/content/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * WhatWeDo — Bölüm 2: NE YAPARIZ ("Bir fikri dünyaya çeviririz").
 *
 * İkon-hizmet listesi DEĞİL; soldan sağa akan bir üretim hattı. Her aşama
 * bir öncekini "büyütür" (plussing). Masaüstünde yatay hat + akış çizgisi;
 * mobilde dikey, tek fikir/ekran. Aşamalar services.ts'ten; her aşamanın
 * altında somut yetkinlikler. Dünyalardan ÖNCE gelir (netlik → sonra kanıt).
 */
export function WhatWeDo({
  content,
  steps,
}: {
  content: SectionIntro;
  steps: JourneyStep[];
}) {
  return (
    <section
      id={SECTION_IDS.whatWeDo}
      className="relative px-6 md:px-10 py-20 md:py-28 max-w-6xl mx-auto scroll-mt-24"
    >
      <SectionHeading kicker={content.kicker} title={content.title} lead={content.lead} />

      {/* Üretim hattı — akış çizgisi + 5 aşama */}
      <ol className="mt-14 grid gap-px md:grid-cols-5 md:gap-0 relative">
        {/* Yatay akış çizgisi (yalnız masaüstü) */}
        <span
          aria-hidden
          className="hidden md:block absolute left-0 right-0 top-[10px] h-px bg-border-subtle"
        />
        {steps.map((step, i) => (
          <Reveal as="li" key={step.index} delay={i * 90} className="relative">
            <div className="md:pr-6">
              {/* Aşama damgası — hat üstünde küçük nokta + numara */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-[9px] w-[9px] rounded-full bg-tower-gold/70 shrink-0"
                />
                <span className="mono-tag text-mist-500 tabular-nums">{step.index}</span>
              </div>
              <h3 className="editorial text-xl md:text-2xl text-mist-100 mt-4 leading-tight">
                {step.title}
              </h3>
              <p className="body-readable text-mist-300 mt-2 text-[0.95rem]">
                {step.description}
              </p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {step.capabilities.map((c) => (
                  <li key={c} className="mono-tag text-mist-500 normal-case tracking-normal">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
