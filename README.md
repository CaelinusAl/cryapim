# CR YAPIM — cryapim.com

**Boğaz'da bir stüdyo. Kız Kulesi tanık.**

CR YAPIM, İstanbul Boğazı'na bakan profesyonel bir içerik ve yapım
stüdyosudur. Bir yandan kendi içerik programlarını çeker, bir yandan
stüdyosunu markalara ve içerik üreticilerine kiralar.

## Hizmetler

| Hizmet | Açıklama |
|---|---|
| **Stüdyo kiralama** | Manzara, Atölye, Podcast ve Mutfak sahneleri; saatlik / günlük / deneyim paketleri |
| **Yapımlar** | CR YAPIM imzalı içerik programları (sohbet, mutfak, mit, yaratım) |
| **İş birliği** | Marka çekimi, sanat yönetmenliği, konsept + edit |

## Sayfa yapısı

```
cryapim.com
├── /                       Ana sayfa (stüdyo vitrini + paketler)
├── /studio                 Stüdyo detayı (sahneler, ekipman, SSS)
├── /yapimlar               Program kataloğu
│   └── /yapimlar/[slug]    Program detayı (dinamik, statik üretilir)
│       └── /[ep]           Bölüm sayfası (video player + meta)
├── /biz                    CR YAPIM kim
└── /iletisim               WhatsApp · telefon · e-posta
```

## Paketler

| Paket | Süre | Fiyat |
|---|---|---|
| BASIC | 1 saat | $1.000 (≈ ₺40.000) |
| PRO | 3 saat | $2.000 (≈ ₺80.000) |
| FULL DAY | 8 saat | $3.000 (≈ ₺120.000) |
| EXPERIENCE | özel | $10.000+ (≈ ₺400.000+) |

"Randevu Al" butonu Calendly (varsa) veya WhatsApp'a yönlenir.

## Teknoloji

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (postcss only)
- Sıfır dış görsel bağımlılığı — Boğaz silüeti ve Kız Kulesi tamamen
  kod ile (SVG/CSS) çiziliyor (`components/BosphorusBackdrop.tsx`).
- Sıfır dış API / üçüncü parti servis bağımlılığı.

## SEO / GEO

- `app/sitemap.ts` — tüm rotalar (statik + program + bölüm) otomatik
- `app/robots.ts` — tüm botlara açık, sitemap referanslı
- `app/layout.tsx` — OpenGraph + Twitter card + `LocalBusiness` JSON-LD
  (arama motorları ve üretken AI motorları için yapılandırılmış kimlik)

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
```

## Yapılandırma

Tüm değerler opsiyoneldir; boşsa `lib/contact.ts` içindeki varsayılanlar
kullanılır. `.env.example` dosyasını `.env.local` olarak kopyala.

| Değişken | İşlev |
|---|---|
| `NEXT_PUBLIC_BOOKING_WHATSAPP` | Randevu butonunun WhatsApp numarası |
| `NEXT_PUBLIC_BOOKING_CALENDLY` | Varsa randevu butonu Calendly'ye gider |
| `NEXT_PUBLIC_CONTACT_*` | Telefon, e-posta, Instagram, YouTube override |

## Tasarım dili (`app/globals.css`)

| Token | Değer | Anlam |
|---|---|---|
| `--color-night-950` | `#07060f` | En derin gece — sayfa zemini |
| `--color-bosphorus-700` | `#0f2a44` | Boğaz lacivertizi |
| `--color-tower-gold` | `#d4b26a` | Kız Kulesi'nin tek ışığı |
| `--font-editorial` | Cormorant Garamond | Başlıklar |
| `--font-grotesk` | Inter | Gövde metni |
| `--font-mono` | JetBrains Mono | Teknik etiketler |

---

*CR YAPIM — duyulmamış bir hikâyeyi, duyulmuş gibi anlatma sanatı.*
