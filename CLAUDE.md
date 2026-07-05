@AGENTS.md

# CR YAPIM — cryapim.com (Next.js)

Yaratıcı teknoloji stüdyosunun kurumsal sitesi. Prototip (prototip-woad.vercel.app)
deneyiminden devam eder; eski statik site (CaelinusAl/cryapim) içerik kaynağıdır.

## Marka Hikayesi — DEĞİŞTİRİLEMEZ ÇEKİRDEK

Bu kurallar sitedeki her metin, görsel ve etkileşim kararını bağlar.

### Manifesto (tam metin — birebir korunur)
> Her büyük proje bir fikirle başlar. Her fikir ise anlatılmayı bekleyen bir hikâyedir.
> Biz kod yazıyoruz. Ama sadece yazılım üretmiyoruz.
> Biz tasarlıyoruz. Ama sadece arayüz çizmiyoruz.
> Biz içerik üretiyoruz. Ama sadece paylaşım hazırlamıyoruz.
> **Biz, insanların bağ kurabileceği dijital evrenler inşa ediyoruz.**
>
> CR YAPIM — teknolojiyi estetikle, yazılımı hikâyeyle ve yapay zekâyı
> insan yaratıcılığıyla buluşturan yeni nesil dijital yaratım stüdyosu.

### Vizyon
Gelecekte insanlar sadece ürün satın almayacak; **içine girebildikleri dünyaları
seçecekler.** CR YAPIM bu dünyaları kuran stüdyodur.

### Misyon
Markaların, girişimlerin ve yaratıcı fikirlerin yalnızca görünmesini değil,
**kendi dijital evrenlerini kurmasını** sağlamak: hikâye + kimlik + tasarım +
yazılım + yapay zekâ + içerik, tek çatı altında.

### Konumlandırma cümlesi (hero)
- TR: "Fikirleri yaşayan dijital deneyimlere dönüştürüyoruz."
- EN (prototip): "We don't build websites. We build *universes*."

### Ses tonu
Az söz, güçlü söz. Kısa manifesto cümleleri, sinema dili, zanaat vurgusu.
Ağırbaşlı, kendinden emin, şiirsel. Kanka dili YOK, emoji yığını YOK.

## Görsel Dil

- **Zemin:** her zaman siyaha yakın (#000). Parlak renkli arka plan ASLA.
- **Renkler:** siyah + altın/şampanya (#C9A96A civarı) + mor/magenta vurgu.
  Kırık beyaz metin: #f4f1ea. Soluk gri: #8f8c86.
- **Tipografi:** Instrument Serif (başlıklar, italik vurgu) + DM Mono (etiket,
  gövde). Etiketlerde BÜYÜK HARF + geniş letter-spacing (0.3–0.5em).
- **Kompozisyon:** merkezde tek güçlü obje, bol negatif alan, ince altın çizgi
  ayraçlar. Kalabalık kompozisyon ASLA.
- **Hero:** Three.js partikül evreni (CELL→GALAXY→EYE→ATOM→EGG→PLANET morph).
  Yumurta (EGG) marka sembolüdür: doğuş/yaratım metaforu.

## Teknoloji Yığını

- Next.js (App Router) + TypeScript, npm
- Tailwind CSS + shadcn/ui + lucide-react
- Animasyon: Framer Motion (varsayılan); GSAP yalnızca seçili efektler
- 3D: three (hero sahnesi, client component + dynamic import, ssr:false)
- İçerik: `src/content/*.json` (TR birincil, EN ikincil) — v2'de Sanity CMS
- Form: React Hook Form + Zod; gönderim Resend (RESEND_API_KEY env)
- SEO: Metadata API, Open Graph, sitemap.ts, robots.ts, JSON-LD (Organization)
- Deploy: Vercel (proje: caelinus-ai/cryapim)

## Klasör Yapısı

- `src/app/` — route'lar, layout, metadata, sitemap, robots
- `src/components/` — küçük, tekrar kullanılabilir UI parçaları
- `src/features/` — bölüm bazlı kompozisyonlar (hero, manifesto, services…)
- `src/content/` — TR/EN içerik JSON'ları; metinler bileşenlere gömülmez
- `src/lib/` — yardımcılar

## Kurallar

- Her bileşen küçük, tekrar kullanılabilir ve test edilebilir olsun.
- Metin değişiklikleri yalnızca `src/content/` üzerinden yapılır.
- Manifesto ve marka metinleri yeniden yazılmaz; kaynak: eski site
  `translations.js` (CaelinusAl/cryapim reposu; yerel kopya: ../site/).
- İletişim: merhaba@cryapim.com · İstanbul.
- Geliştirme sırası: iskelet → tasarım sistemi → ana sayfa → içerik sayfaları
  → SEO/performans cilası.
