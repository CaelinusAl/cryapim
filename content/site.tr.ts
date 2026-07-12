// ═══════════════════════════════════════════════════════════════
// SITE İÇERİĞİ · TR — ana sayfa metinleri (tek kaynak).
//
// Sıra (CR-WEB-YARATICI-MIMARI.md): açılış (kurucu/manzara) → ne yaparız
// (5 aşama) → dünyalar (kanıt) → yaklaşım (6 adım) → Çırağan'da doğan
// hikâye → birlikte ne yaratabiliriz (CTA) → iletişim (form).
//
// i18n: yarın site.en.ts aynı SiteContent tipiyle eklenir.
// ═══════════════════════════════════════════════════════════════

import type { SiteContent } from "./types";
import { SECTION_IDS } from "./navigation";

export const siteTr: SiteContent = {
  // 1 · AÇILIŞ — duygusal kanca + kim olduğumuz (kontrol ~8-10 sn sonra)
  hero: {
    kicker: "yaratıcı teknoloji stüdyosu · istanbul",
    title:
      "Bazı şirketler bir ofiste kurulur. Bazıları ise bir manzaraya bakarken doğar.",
    subtitle:
      "CR Yapım — fikirleri dijital dünyalara dönüştüren yaratıcı teknoloji stüdyosu.",
    // Mimari: hero'da buton yığını yok; ince bir "aşağı" daveti (Hero.tsx).
    ctas: [],
    media: { alt: "CR Yapım — Boğaz'a bakan atölye" },
  },

  // 2 · NE YAPARIZ — "Bir fikri dünyaya çeviririz" (5 aşama services.ts'ten)
  whatWeDo: {
    kicker: "ne yaparız",
    title: "Bir fikri dünyaya çeviririz.",
    lead:
      "Teknoloji, hikâye ve tasarımı bir araya getirerek yaşayan dijital deneyimler kuruyoruz.",
  },

  // 3 · DÜNYALAR / SEÇİLİ İŞLER ⭐ (kanıt · kartlar projects.ts'ten)
  selectedWorlds: {
    kicker: "dünyalar",
    title: "Kurduğumuz dünyalardan bazıları.",
    lead: "Her biri bir fikirle başladı; kendi anlatısı, sesi ve teknolojisiyle yaşıyor.",
  },

  // 4 · CR YAKLAŞIMI — altı kelime, altı adım (metne boğma)
  approach: {
    kicker: "yaklaşım",
    title: "Rastgele değil. Bir yolumuz var.",
    steps: ["Duygu", "Hikâye", "Tasarım", "Teknoloji", "Deneyim", "İz"],
    closing: "Duyguyla başlar; geride bir iz bırakarak biter.",
  },

  // 5 · ÇIRAĞAN'DA DOĞAN HİKÂYE (dikkatli · itibar ödünç almadan)
  originStory: {
    kicker: "nerede doğdu",
    title: "Çırağan bizim markamız değil. Ama ilk dünyalarımızın doğduğu yer.",
    body: [
      "İlk fikirlerimiz, İstanbul Boğazı'na bakan bir atölyede şekillendi: taşın, ışığın ve suyun buluştuğu bir eşikte.",
      "Bu manzara bir unvan değil; ilham aldığımız yaratım alanı. Onun ritmi ürettiğimiz her dünyaya siniyor.",
      "Bu yüzden işlerimiz hızlı ama aceleci değil; teknolojik ama soğuk değil.",
    ],
    note:
      "Boğaz'a bakan çalışma alanımızdan doğan ilk fikirler. Resmî bir ortaklık ya da marka temsili değildir.",
    // Gerçek ofis/çalışma alanı çekimi buraya (hero'ya değil). Dosya eklenince
    // otomatik: public/workspace/atolye.jpg → hero özlem, burası gerçek yer.
    media: { poster: "/workspace/atolye.jpg", alt: "Boğaz'a bakan atölyemiz — çalışma alanımız" },
  },

  // 6 · BİRLİKTE NE YARATABİLİRİZ? (CTA · fikirle gelmeye davet)
  contact: {
    kicker: "birlikte",
    title: "Bir fikriniz varsa, birlikte dünyasını kuralım.",
    lead: "Hizmet satmıyoruz; bir fikri yaşayan bir dünyaya dönüştürüyoruz.",
    ctas: [{ label: "Fikrini Anlat", href: `#${SECTION_IDS.contactForm}`, intent: "primary" }],
  },

  // 7 · İLETİŞİM — sürtünmesiz form
  contactForm: {
    kicker: "iletişim",
    title: "Fikrini anlat.",
    lead: "Kısa bir not bırak; 48 saat içinde döneriz.",
    projectTypes: [
      "Web / uygulama",
      "AI / agent",
      "Marka & içerik",
      "Deneyim / etkinlik",
      "Henüz emin değilim",
    ],
    budgetRanges: [
      "Henüz belirsiz",
      "100.000 ₺ altı",
      "100.000 – 300.000 ₺",
      "300.000 ₺ üzeri",
    ],
    submitLabel: "Gönder",
    successTitle: "Aldık.",
    successNote: "48 saat içinde döneriz. Bu arada bir çay koy.",
  },
};

export default siteTr;
