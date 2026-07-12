// ═══════════════════════════════════════════════════════════════
// SELECTED WORLDS — seçili dünyalar (Caelinus vb.).
//
// "Proje" değil "dünya" diyoruz: her biri kendi anlatısı, sesi ve
// teknolojisiyle yaşayan bir bütün. Gerçek media ilkesi: sahte/stok yok.
// poster yolu yazılır → dosya public/worlds/'e eklenince kendiliğinden
// gerçek görsele geçer; eksikken MediaFrame zarif placeholder gösterir.
// ═══════════════════════════════════════════════════════════════

import type { Project } from "./types";

export const selectedWorlds: Project[] = [
  {
    id: "caelinus",
    title: "Caelinus",
    tagline: "Bilinç ve his zekâsıyla konuşan yaratıcı AI.",
    summary:
      "Fikirden deneyime uzanan AI dünyamız: moodboard'dan sese, personadan yönlendirilmiş yaratıma bir bütün.",
    status: "geliştiriliyor",
    // Gerçek ekran görüntüsü: public/worlds/caelinus.png eklenince otomatik.
    media: { poster: "/worlds/caelinus.png", alt: "Caelinus — yaratıcı AI dünyası" },
    tags: ["AI", "Deneyim", "Marka"],
    href: "/caelinus-ai",
    accent: "#9fe7ff",
  },
  {
    id: "perde",
    title: "Perde",
    tagline: "Film ve anlatı üzerine bir yorum dünyası.",
    summary:
      "İçeriğin ardındaki anlamı açan, arşivlenen ve büyüyen bir eleştiri/anlatı katmanı.",
    status: "yayında",
    media: { alt: "Perde — film yorumu dünyası (görsel yakında)" },
    tags: ["İçerik", "Anlatı"],
    href: "/perde",
    accent: "#c95a5a",
  },
  {
    id: "sanri",
    title: "Sanrı",
    tagline: "Cevap değil, geri-soru veren farkındalık katmanı.",
    summary:
      "İçeriğin ruhu: ritüel ve sembolle kurulan, kullanıcıyı düşünmeye çağıran bir persona dünyası.",
    status: "geliştiriliyor",
    media: { poster: "/sanri-hero.png", alt: "Sanrı — farkındalık ve ritüel dünyası" },
    tags: ["Persona", "Ritüel"],
    href: "/sanri",
    accent: "#b4a6c6",
  },
  {
    id: "bella-coco-joi",
    title: "Bella · Coco · Joi",
    tagline: "AI destekli bir marka hikâyesinin ilk pilotu.",
    summary:
      "Bir fikirden doğan kısa dizi: karakter, görsel dil ve içerik üretiminin uçtan uca örneği.",
    status: "pilot",
    media: { alt: "Bella, Coco ve Joi — marka hikâyesi pilotu (görsel yakında)" },
    tags: ["Marka", "İçerik", "AI"],
    href: "/bella-coco-joi",
    accent: "#c79ba4",
  },
];
