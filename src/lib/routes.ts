// Merkezi rota haritası — header, footer, sitemap ve iç bağlantılar
// yalnızca buradan beslenir. Yeni sayfa eklerken önce burayı güncelle.

export const SITE_URL = "https://cryapim.com";

export interface RouteItem {
  href: string;
  label: string; // TR (birincil dil)
}

/** Header ana navigasyonu */
export const NAV_ROUTES: RouteItem[] = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/projeler", label: "Projeler" },
  { href: "/surec", label: "Süreç" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

/** Hizmet detay sayfaları — content/site.tr.json services[] sırasıyla eşleşir */
export const SERVICE_SLUGS = [
  "yapay-zeka-cozumleri",
  "mobil-uygulama-gelistirme",
  "web-tasarim-ve-yazilim",
  "oyun-gelistirme",
  "dijital-urun-tasarimi-ui-ux",
  "marka-kimligi-ve-stratejisi",
  "hikaye-ve-evren-tasarimi",
  "icerik-uretimi",
  "sosyal-medya-yonetimi",
  "3d-deneyimler-ve-dijital-sunumlar",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Footer'da yer alan yasal sayfalar */
export const LEGAL_ROUTES: RouteItem[] = [
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
];

/** Sitemap'e giren tüm statik rotalar (blog yazıları hariç — onlar dinamik) */
export const ALL_STATIC_ROUTES: string[] = [
  "/",
  ...NAV_ROUTES.map((r) => r.href),
  ...SERVICE_SLUGS.map((s) => `/hizmetler/${s}`),
  ...LEGAL_ROUTES.map((r) => r.href),
];
