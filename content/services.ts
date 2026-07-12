// ═══════════════════════════════════════════════════════════════
// NE YAPARIZ — "Bir fikri dünyaya çeviririz" (5 aşamalı üretim hattı).
//
// (CR-WEB-YARATICI-MIMARI.md · Bölüm 2). Generic hizmet listesi DEĞİL;
// soldan sağa akan bir üretim hattı. Her aşamanın altında somut
// yetkinlikler (eski "hizmetler") yaşar. Aşamalar stüdyo-eylemi kipinde:
// Hikâyeyi Buluruz · Dünyayı Tasarlarız · Teknolojiyi Geliştiririz ·
// İçeriği Üretiriz · Markayı Büyütürüz.
// ═══════════════════════════════════════════════════════════════

import type { JourneyStep } from "./types";

export const creationJourney: JourneyStep[] = [
  {
    index: "01",
    title: "Hikâyeyi Buluruz",
    description:
      "Ham fikri dinler, özünü ve amacını çıkarır; insanların bağ kurabileceği bir anlatıya dönüştürürüz.",
    capabilities: ["Keşif & strateji", "Marka anlatısı", "Senaryo & konsept"],
  },
  {
    index: "02",
    title: "Dünyayı Tasarlarız",
    description:
      "Işık, hareket, tipografi ve ritimle fikrin kendine ait, tutarlı bir dünyası olur.",
    capabilities: ["Deneyim tasarımı", "Görsel dil & arayüz", "Hareket & 3B"],
  },
  {
    index: "03",
    title: "Teknolojiyi Geliştiririz",
    description:
      "Dünyayı çalışır kılan altyapıyı kurarız — demolar değil, gerçek ürünler.",
    capabilities: ["Web & uygulama", "AI & agent sistemleri", "Altyapı & entegrasyon"],
  },
  {
    index: "04",
    title: "İçeriği Üretiriz",
    description:
      "Dünyayı yaşatan içeriği üretiriz: metin, görsel, video ve sesle beslenir.",
    capabilities: ["İçerik & metin", "Video & görsel", "Sosyal & yayın"],
  },
  {
    index: "05",
    title: "Markayı Büyütürüz",
    description:
      "Yaşayan dünyayı doğru insanlara açar, büyümesini ölçer ve birlikte geliştiririz.",
    capabilities: ["Lansman", "Topluluk", "Ölçümleme & iterasyon"],
  },
];
