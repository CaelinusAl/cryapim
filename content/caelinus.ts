// ═══════════════════════════════════════════════════════════════
// CAELINUS — dünya sayfası içeriği (amiral gemi · "yaşayan kanıt").
//
// CR-WEB-YARATICI-MIMARI.md: Caelinus = motorun kendi ürünü, en büyük
// referans. Bu sayfa onu bir ürün broşürü değil, "doğmakta olan bir
// evren" olarak sunar. Metin canlı HTML; görsel (küre) kodda üretilir.
// ═══════════════════════════════════════════════════════════════

export type CaelinusCapability = {
  /** İkon anahtarı — component'teki ICONS ile eşleşir. */
  icon: "pen" | "book" | "bulb" | "design" | "star";
  title: string;
  description: string;
};

export type CaelinusContent = {
  title: string;
  tagline: string;
  /** Giriş paragrafları (canlı HTML). */
  body: string[];
  /** Küre altındaki alt-başlık. */
  orbitCaption: string;
  capabilitiesTitle: string;
  capabilities: CaelinusCapability[];
  /** Kapanış cümlesi. */
  quote: string;
  /** Durum damgası. */
  status: string;
};

export const caelinusTr: CaelinusContent = {
  title: "Caelinus",
  tagline: "Bir Dünya. Bir Hikâye. Bir Miras.",
  body: [
    "Caelinus, hayal gücünün sınırlarını zorlayan epik bir evren. İnsanlığın izlerini, unutulmuş uygarlıkları ve geleceğin ihtimallerini bir araya getiren yaşayan bir dünya.",
    "Biz bu dünyayı sadece tasarlamıyoruz; onu yaşıyoruz, yazıyoruz, inşa ediyoruz.",
    "Caelinus bir proje değil, bir yolculuk.",
  ],
  orbitCaption: "Bir evren doğuyor",
  capabilitiesTitle: "Biz ne yapıyoruz?",
  capabilities: [
    {
      icon: "pen",
      title: "Senaryo Yazıyoruz",
      description: "Güçlü karakterler, derin dünyalar ve unutulmaz hikâyeler yazıyoruz.",
    },
    {
      icon: "book",
      title: "Kitap Yazıyoruz",
      description: "Romanlardan evren hikâyelerine, fikirleri kelimelere dönüştürüyoruz.",
    },
    {
      icon: "bulb",
      title: "Fikir Üretiyoruz",
      description:
        "Özgün konular, yaratıcı yaklaşımlar ve geleceğin hikâyelerini geliştiriyoruz.",
    },
    {
      icon: "design",
      title: "Tasarlıyoruz",
      description: "Markalar, arayüzler, dijital deneyimler ve görsel dünyalar tasarlıyoruz.",
    },
    {
      icon: "star",
      title: "Hikâyeli Tasarım Koleksiyonları",
      description:
        "Bir hikâyeye sahip tasarım koleksiyonlarıyla markalara yeni bir anlatım dili kazandırıyoruz.",
    },
  ],
  quote: "Her dünya, bir ilk cümleyle başlar.",
  status: "Caelinus · Yakında",
};

export default caelinusTr;
