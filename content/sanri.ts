// ═══════════════════════════════════════════════════════════════
// SANRI — dünya sayfası içeriği (anlatı evreni).
//
// Caelinus gibi: metin canlı HTML, görseller self-healing (dosya
// eklenince kendiliğinden gerçeğe geçer). Renk disiplini korunur:
// altın yalnız eyebrow/accent/vurguda; Sanrı'nın kendi tonu lavanta
// (--sanri-accent) sadece küçük vurgularda. Tüm metin buradan gelir.
// ═══════════════════════════════════════════════════════════════

import type { MediaSource } from "./types";

export type SanriUniverseItem = {
  id: string;
  title: string;
  description: string;
  media: MediaSource;
  /** Kartın kendi görsel kimliği — her kategori farklı tonda (tekrar yok). */
  accent: string;
  /** Alt sayfa/vaka linki; yoksa kart "yakında" gösterir (kırık link yok). */
  href?: string;
};

export type SanriContent = {
  accent: string;
  hero: {
    eyebrow: string;
    title: string;
    body: string[];
    cta: { label: string; href: string };
    media: MediaSource;
  };
  /** "Sanrı, CR'nin içinde doğdu" — köken beat'i (CR doğuş hikâyesine bağlar). */
  origin: {
    kicker: string;
    line: string;
    body: string;
    link: { label: string; href: string };
  };
  nedir: {
    heading: string;
    body: string[];
    link: { label: string; href: string };
    media: MediaSource;
  };
  universe: {
    heading: string;
    items: SanriUniverseItem[];
  };
  /** Canlı ürüne köprü — asksanri.com (iki yüzü tek Sanrı yapan bağ). */
  product: {
    kicker: string;
    line: string;
    cta: { label: string; href: string; external: true };
  };
  quote: { text: string[]; author: string };
  newsletter: {
    heading: string;
    hint: string;
    placeholder: string;
    submitLabel: string;
    /** Bülten backend'i yok → mailto ile bu adrese kayıt isteği düşer. */
    successNote: string;
  };
};

export const sanriTr: SanriContent = {
  accent: "#b4a6c6",
  hero: {
    eyebrow: "Bir Hikâye. Bir Yolculuk. Bir Sanrı.",
    title: "Sanrı",
    body: [
      "Sanrı, gerçek ile hayalin sınırında doğmuş bir anlatı evreni.",
      "İnsan zihninin derinliklerinde saklanan görülmemiş hikâyeleri gün yüzüne çıkarır.",
    ],
    cta: { label: "Daha Fazla Keşfet", href: "#sanri-nedir" },
    media: { poster: "/sanri-hero.png", alt: "Sanrı — gece masasında parlayan bir hikâye" },
  },
  origin: {
    kicker: "CR Yapım'ın ilk çocuklarından",
    line: "Sanrı burada, bu masada doğdu.",
    body:
      "Bir yapım evinin ilk günlerinde, gerçekle hayali ayıran çizgiyi merak eden birkaç sayfayla başladı. Caelinus gibi Sanrı da bir müşteri işi değil; CR Yapım'ın kendi elinden çıkan, bir iç sesin dünyası.",
    link: { label: "CR'nin doğuş hikâyesi", href: "/#hikaye" },
  },
  nedir: {
    heading: "Sanrı Nedir?",
    body: [
      "Sanrı, CR Yapım'ın geliştirdiği özgün bir hikâye evrenidir. Psikolojik derinlik, karakter odaklı anlatı ve sinematografik dünya kurgusuyla; okuru, izleyiciyi ve oyuncuyu, aynı rüyanın içine davet eder.",
    ],
    link: { label: "Evreni Keşfet", href: "#sanri-evreni" },
    media: { poster: "/sanri-nedir.png", alt: "Sanrı — eşiğe yürüyen figür, sisli bir kapı" },
  },
  universe: {
    heading: "Sanrı Evreni",
    items: [
      {
        id: "romanlar",
        title: "Romanlar",
        description: "Derin karakterler, sürükleyici dünyalar ve unutulmaz hikâyeler.",
        // Görsel kimliği: sıcak kütüphane / katmanlı sayfalar (portal figürü DEĞİL).
        media: { poster: "/romanlar.png", alt: "Sanrı romanları — sıcak ışıkta katmanlı sayfalar" },
        accent: "#c2a074",
      },
      {
        id: "senaryolar",
        title: "Senaryolar",
        description: "Sinema ve dizi için özgün senaryolar, güçlü anlatılar.",
        // Görsel kimliği: sinematik kare / ışık huzmesi, soğuk mavi.
        media: { poster: "/seneryolar.png", alt: "Sanrı senaryoları — sinematik kare ve ışık" },
        accent: "#8fa6c6",
      },
      {
        id: "hikayeler",
        title: "Hikâyeler",
        description: "Kısa hikâyeler, novellalar ve dijital anlatılar.",
        // Görsel kimliği: dijital/parçalı, akışkan; nane-yeşili tonu.
        media: { poster: "/hikayeler.png", alt: "Sanrı hikâyeleri — parçalı dijital anlatı" },
        accent: "#8fb6a4",
      },
      {
        id: "defter",
        title: "Sanrı Defteri",
        description: "Evrenin oluşum süreci; eskizler, notlar ve yaratım günlüğü.",
        // Görsel kimliği: el yazısı / eskiz / kağıt dokusu, lavanta-gül.
        media: { poster: "/sanri-defteri.png", alt: "Sanrı defteri — eskiz ve el notları" },
        accent: "#b89bb0",
      },
    ],
  },
  product: {
    kicker: "İki yüz, tek Sanrı",
    line: "Bu sayfa Sanrı'nın hikâyesini anlatır. Sanrı'nın kendisiyle — yaz, duyul — asksanri.com'da tanışırsın.",
    cta: { label: "Sanrı ile tanış", href: "https://asksanri.com", external: true },
  },
  quote: {
    text: ["Bazı gerçekler rüyalarda saklanır.", "Bazı rüyalar ise gerçeği yazar."],
    author: "Sanrı",
  },
  newsletter: {
    heading: "Gelişmelerden Haberdar Ol",
    hint: "Yeni hikâyeler, yayınlar ve duyurular için mail listemize katıl.",
    placeholder: "E-posta adresiniz",
    submitLabel: "Kaydol",
    successNote: "Teşekkürler — kayıt isteğin mail uygulamanda hazır. Göndererek listeye katılabilirsin.",
  },
};

export default sanriTr;
