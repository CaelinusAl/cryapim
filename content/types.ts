// ═══════════════════════════════════════════════════════════════
// CONTENT · TİPLER — tüm content/* dosyalarının paylaştığı sözleşme.
//
// İlke: metin ve medya component'e gömülmez; buradaki tiplerle
// content/* dosyalarından beslenir. Bu katman i18n'e hazırdır
// (site.tr.ts → yarın site.en.ts, aynı tipler).
// ═══════════════════════════════════════════════════════════════

/** Buton / bağlantı çağrısı. `intent` görsel ağırlığı belirler. */
export type CTA = {
  label: string;
  href: string;
  intent?: "primary" | "ghost";
  /** Dış bağlantı ise yeni sekmede açılır. */
  external?: boolean;
};

/** Bir medya kaynağı — placeholder'dan gerçek video/görsele kademeli geçiş.
 *  Şimdilik `poster` yeterli; video geldiğinde `video`/`mobileVideo` eklenir. */
export type MediaSource = {
  /** Still görsel (poster). Placeholder aşamasında boş/atlanabilir →
   *  component tasarımlı CSS placeholder gösterir (dummy dosya yok). */
  poster?: string;
  /** Masaüstü video (opsiyonel — gelince otomatik oynar, muted). */
  video?: string;
  /** Mobil için hafif alternatif (opsiyonel). */
  mobileVideo?: string;
  /** Erişilebilirlik: görselin/videonun betimi. */
  alt: string;
};

/** Header + footer navigasyon ögesi. */
export type NavItem = {
  href: string;
  label: string;
  /** Vurgu rengi (token değeri veya hex). */
  accent?: string;
  external?: boolean;
};

export type FooterGroup = {
  title: string;
  links: NavItem[];
};

/** OMURGA adımı: fikir → çalışan dijital evren. */
export type JourneyStep = {
  /** "01" … sıralı damga. */
  index: string;
  /** Emir kipi başlık: "Bir fikir getir." */
  title: string;
  /** Kısa açıklama. */
  description: string;
  /** Bu adımın altında yatan somut yetkinlikler (eski "services"). */
  capabilities: string[];
};

/** Seçili dünya / proje kartı (Caelinus vb.). */
export type Project = {
  id: string;
  /** Dünyanın adı: "Caelinus". */
  title: string;
  /** Tek cümle konumlandırma. */
  tagline: string;
  /** Kısa açıklama. */
  summary: string;
  /** Durum rozeti: "yayında", "geliştiriliyor" vb. */
  status?: string;
  /** Kapak medyası (placeholder poster yeterli). */
  media: MediaSource;
  /** Etiketler. */
  tags: string[];
  /** İç/dış bağlantı (opsiyonel). */
  href?: string;
  /** Vurgu rengi. */
  accent?: string;
};

// ── Ana sayfa bölüm içerikleri ──

export type HeroContent = {
  kicker?: string;
  title: string;
  subtitle: string;
  ctas: CTA[];
  media: MediaSource;
};

export type SelectedWorldsContent = {
  kicker?: string;
  title: string;
  lead?: string;
};

/** Bölüm başlığı için basit intro (kicker + başlık + lead).
 *  "Ne Yaparız" (5 aşama) bölümünün üst metni bunu kullanır. */
export type SectionIntro = {
  kicker?: string;
  title: string;
  lead: string;
};

/** CR Yaklaşımı — altı kelime, altı adım (Duygu→…→İz). Metne boğma. */
export type ApproachContent = {
  kicker?: string;
  title: string;
  /** Altı adım: tek kelimelik ritim (bir çizgi/nefes olarak akar). */
  steps: string[];
  /** Kısa, opsiyonel kapanış. */
  closing?: string;
};

/** İletişim formu (Bölüm 7). Alanlar/seçenekler content'ten gelir. */
export type ContactFormContent = {
  kicker?: string;
  title: string;
  lead: string;
  /** Proje türü seçenekleri. */
  projectTypes: string[];
  /** Bütçe aralığı (opsiyonel alan) seçenekleri. */
  budgetRanges: string[];
  submitLabel: string;
  /** Gönderim sonrası net onay (mimari: "Aldık. 48 saat içinde döneriz."). */
  successTitle: string;
  successNote: string;
};

export type OriginStoryContent = {
  kicker?: string;
  title: string;
  /** Ölçülü, marka-güvenli paragraflar (Çırağan = ilham, kimlik değil). */
  body: string[];
  /** Küçük dipnot / güven notu. */
  note?: string;
  media: MediaSource;
};

export type ContactContent = {
  kicker?: string;
  title: string;
  lead: string;
  ctas: CTA[];
};

/** Tüm ana sayfa içeriği — tek kök nesne (locale başına bir tane).
 *  Sıra (CR-WEB-YARATICI-MIMARI.md): açılış → ne yaparız (5 aşama) →
 *  dünyalar → yaklaşım (6 adım) → Çırağan hikâyesi → CTA → iletişim formu. */
export type SiteContent = {
  hero: HeroContent;
  whatWeDo: SectionIntro;
  selectedWorlds: SelectedWorldsContent;
  approach: ApproachContent;
  originStory: OriginStoryContent;
  contact: ContactContent;
  contactForm: ContactFormContent;
};

export type Locale = "tr" | "en";
