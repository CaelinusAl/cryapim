import type { HeroContent } from "@/content/types";
import { SECTION_IDS } from "@/content/navigation";
import { HeroMedia } from "@/components/media/HeroMedia";
import { CtaButton } from "@/components/ui/CtaButton";

/**
 * Hero — Bölüm 1: AÇILIŞ (CR-WEB-YARATICI-MIMARI.md).
 *
 * Full-bleed gerçek medya + kimlik cümlesi + tek satır ne yaptığımız.
 * Mimari kural: buton yığını YOK — yalnızca ince bir "aşağı" daveti.
 * Kontrol ~8-10 sn sonra kullanıcıda (sabit nav + serbest scroll). Metin
 * görsele gömülmez; canlı HTML olarak akar (mobil + düzenlenebilirlik).
 * (content.ctas doluysa yine gösterilir — geriye dönük esneklik.)
 */
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-[92vh] flex items-end overflow-hidden"
      aria-label="Giriş"
    >
      <HeroMedia alt={content.media.alt} />

      {/* Okunabilirlik perdesi — metnin oturduğu sol-alt köşe koyu; sağdaki
          pencere/Boğaz nefes alsın diye asimetrik (göz önce metne gider). */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 92% 72% at 14% 104%, rgba(18,16,12,0.84) 0%, rgba(18,16,12,0.32) 46%, transparent 72%), linear-gradient(180deg, rgba(18,16,12,0.28) 0%, transparent 38%, rgba(18,16,12,0.42) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-6 md:px-10 pb-16 md:pb-24 max-w-5xl mx-auto crane-in">
        {content.kicker && <p className="mono-tag text-mist-300">{content.kicker}</p>}
        <h1 className="editorial mt-5 text-4xl md:text-6xl lg:text-7xl leading-[1.06] text-mist-100 max-w-4xl text-balance">
          {content.title}
        </h1>
        <p className="body-readable text-mist-300 mt-6 max-w-2xl crane-in-slow">
          {content.subtitle}
        </p>

        {content.ctas.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3 crane-in-slow">
            {content.ctas.map((cta) => (
              <CtaButton key={cta.label} cta={cta} />
            ))}
          </div>
        )}

        {/* İnce "aşağı" daveti — kullanıcıyı zorlamadan yolculuğa çağırır. */}
        <a
          href={`#${SECTION_IDS.whatWeDo}`}
          className="group mt-12 inline-flex items-center gap-3 crane-in-slow text-mist-300 hover:text-mist-100 transition-colors"
          aria-label="Aşağı kaydır — ne yaptığımızı gör"
        >
          <span className="mono-tag">keşfet</span>
          <span
            aria-hidden
            className="inline-block h-8 w-px bg-current opacity-40 origin-top scroll-cue"
          />
        </a>
      </div>
    </section>
  );
}
