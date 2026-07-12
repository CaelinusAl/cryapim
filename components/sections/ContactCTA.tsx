import type { ContactContent } from "@/content/types";
import { SECTION_IDS } from "@/content/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { whatsappLink } from "@/lib/contact";

/**
 * ContactCTA — Bölüm 6: BİRLİKTE NE YARATABİLİRİZ? (davet).
 * Ziyaretçiyi hizmet satın almaya değil, bir fikirle gelmeye çağırır;
 * "Fikrini Anlat" → Bölüm 7 formuna kaydırır. Ek olarak WhatsApp seçeneği.
 */
export function ContactCTA({ content }: { content: ContactContent }) {
  return (
    <section
      id={SECTION_IDS.contact}
      className="relative px-6 md:px-10 py-24 md:py-32 max-w-5xl mx-auto scroll-mt-24"
    >
      <div
        className="rounded-3xl p-10 md:p-16 text-center"
        style={{
          background:
              "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(201,169,106,0.16) 0%, transparent 70%)",
          border: "1px solid rgba(201,169,106,0.28)",
        }}
      >
            {content.kicker && <p className="mono-tag text-mist-300">{content.kicker}</p>}
        <h2 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.06] text-balance">
          {content.title}
        </h2>
        <p className="body-readable text-mist-300 mt-5 max-w-xl mx-auto">{content.lead}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {content.ctas.map((cta) => (
            <CtaButton key={cta.label} cta={cta} />
          ))}
          <CtaButton
            cta={{
              label: "WhatsApp'tan yaz",
              href: whatsappLink("Ana sayfa · İletişim"),
              intent: "ghost",
              external: true,
            }}
          />
        </div>
      </div>
    </section>
  );
}
