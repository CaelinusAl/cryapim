import { getSiteContent, creationJourney, selectedWorlds as selectedWorldsData } from "@/content";
import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { SelectedWorlds } from "@/components/sections/SelectedWorlds";
import { Approach } from "@/components/sections/Approach";
import { OriginStory } from "@/components/sections/OriginStory";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ContactForm } from "@/components/sections/ContactForm";

/**
 * CR YAPIM — kurumsal ana sayfa (tek sayfa akış, Bölüm 1–7).
 *
 * İnce orkestratör: bölümleri CR-WEB-YARATICI-MIMARI.md sırasında dizer.
 * Tüm metin/medya content/*'ten gelir; her section bağımsız geliştirilebilir.
 * Sıra: açılış → ne yaparız (5 aşama) → dünyalar (kanıt) → yaklaşım (6 adım)
 * → Çırağan'da doğan hikâye → birlikte (CTA) → iletişim (form).
 *
 * (Eski stüdyo-kiralama ana sayfası app/_archive/StudioSalesHome.tsx'te.)
 */
export default function HomePage() {
  const c = getSiteContent("tr");
  return (
    <>
      <Hero content={c.hero} />
      <WhatWeDo content={c.whatWeDo} steps={creationJourney} />
      <SelectedWorlds content={c.selectedWorlds} worlds={selectedWorldsData} />
      <Approach content={c.approach} />
      <OriginStory content={c.originStory} />
      <ContactCTA content={c.contact} />
      <ContactForm content={c.contactForm} />
    </>
  );
}
