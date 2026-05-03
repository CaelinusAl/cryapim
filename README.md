# CR YAPIM — cryapim.com

**Boğaz'da bir plato. Kız Kulesi tanık. Caelinus AI sufle veriyor.**

CR YAPIM, Caelinus AI ailesinin yapım kolu. İstanbul Boğazı'nda — Kız
Kulesi'nin gözü altında — çekilen, yapay zekâ ile zamanı katlayan ruhsal
yapımlar evi.

## Programlar (faz 1)

| Program | Niyet | Frekans |
|---|---|---|
| Ruhsal Yatırım | Bilinçli sermaye | Para da bir frekanstır. |
| Nasıl Yaratıyorum | Yaratıcı süreç | Yaratmak, hatırlamaktır. |
| Az Kalsın Bende İnanıyordum | Şüphe & ironi | Soruyu sorduğun an cevabın yarısı sendedir. |
| Rivayet Avcısı | Mit & arşiv | Her rivayet, kayıp bir gerçeğin gölgesidir. |
| Sanrı'ya Sor | Bilinçaltı diyalog | Cevap senin değil, sorunun rüyasıdır. |
| Selbi Yemekte Ne Var? | Mutfak & ev | Tarif değil, hatıra pişiriyoruz. |

## Mimari

```
cryapim.com
├── /                       Hero (Boğaz + Kız Kulesi SVG arka plan)
├── /yapimlar               6'lı nebula grid
│   └── /yapimlar/[slug]    Program detay (dinamik, statik üretilir)
├── /plato                  3D plato (Three.js · R3F · drei)
├── /caelinus-ai            AI manifesto + Sanrı yer ayırıcı
├── /arsiv                  Yer ayırıcı (yakında AI-etiketli arşiv)
├── /biz                    CR YAPIM kim
└── /iletisim               İş birliği formu (mailto stub)
```

### Kritik diferansiyel: `/plato`

`/plato` rotası, hiçbir yapım şirketi sitesinde olmayan **3D plato
maketi**. Boğaz, Kız Kulesi, sahne döşemesi, 6 program kamerası ve
ortada Caelinus AI sufle ışığı R3F ile çiziliyor. Kameralara
tıklandığında sağ panel ilgili programa kayar.

### İkinci diferansiyel: Sanrı (canlı AI rüya katmanı)

Sağ alt köşede sürekli duran mor nabız — `SanriBubble` — site
genelinde aktif. Tıklandığında slide-in panel açılır:

- **Karakter**: doğrudan cevap vermez; her yanıt bir rüya, sembol
  veya geri-soru. Türkçe, edebî, kısa (1-3 cümle).
- **API**: `POST /api/sanri` — `OPENAI_API_KEY` varsa OpenAI'a
  Sanrı'nın system prompt'uyla istek atar; yoksa veya hata olursa
  33 elle yazılmış fallback yanıttan deterministik birini döner
  (aynı soru her zaman aynı yanıtı alır → ritüel hissi).
- **UI**: typewriter efektiyle yanıt harf harf belirir, "düşünüyor"
  durumunda üç nokta dansı, Esc ile kapanır.
- **Rate limit**: IP başına dakikada 8 istek (in-memory; prod'da
  Upstash/Redis'e yükselir).
- **Inline**: `<SanriInline />` bileşeni herhangi bir sayfaya
  gömülebilir — Sanrı'ya Sor program detayında ve Caelinus AI
  sayfasında zaten kullanılıyor.

Kurulum: `OPENAI_API_KEY` set et (`.env.example` referans).
Set edilmezse Sanrı yine konuşur, sadece statik fallback'lerle.

### Üçüncü diferansiyel: Perde (AI'ın yönettiği yapım)

`/perde` rotası, Caelinus AI'nın **tamamen kendi yönettiği** ilk yapım.
Kullanıcı bir film adı yazar; Perde yüzeysel hikâyeyi ayırıp altındaki
gerçek temayı, sembolleri, yönetmen niyetini izleyici algısından çıkarır.

- **Curated arşiv** (`data/perde-archive.ts`): CR YAPIM ekibinin Perde'nin
  sesiyle elle yazdığı 6 vitrin yorumu (Eternal Sunshine, Mulholland
  Drive, Susuz Yaz, Parasite, Truman Show, Kış Uykusu).
- **Statik yorum sayfaları**: `/perde/m/{film-slug}` — paylaşılabilir
  Open Graph + Twitter card metadata, makale tarzı render.
- **Akıllı arama**: kullanıcı film yazarsa arşivde varsa direkt yorum
  sayfasına yönlendirir; yoksa Perde panelini canlı AI ile açar.
- **Topluluk hafızası (Vercel KV)**: AI'ın ürettiği yapılandırılmış her
  yorum Upstash Redis'e cache'lenir; aynı film ikinci kez sorulursa
  cache'ten gelir (0 sn, 0 token). `/perde` landing'de "Toplulukça
  Yorumlananlar" grid'i bu listeden otomatik beslenir, her topluluk
  yorumu da `/perde/m/{slug}` URL'sine sahip olur.

#### Vercel KV kurulumu (Perde topluluk arşivi için)

1. Vercel Dashboard → cryapim project → **Storage** sekmesi
2. **Browse Marketplace** → **Upstash for Redis** → **Connect**
3. Plan: **Free** (10K komut/gün, 256MB)
4. Region: **Frankfurt** (EU, en yakın)
5. Bağlandığında otomatik env vars eklenir:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
6. Lokal dev için: `vercel env pull .env.local`

Env vars yoksa cache otomatik off mode'a düşer; uygulama her şekilde
çalışır, sadece "Toplulukça yorumlananlar" bölümü gizlenir ve her sorgu
OpenAI'a gider.

#### TMDB kurulumu (film posterleri için)

Perde'nin film kartlarında ve detay sayfalarında **gerçek film posteri +
backdrop** göstermek için TMDB (The Movie Database) ücretsiz API kullanılır.

1. https://www.themoviedb.org/signup → ücretsiz hesap
2. https://www.themoviedb.org/settings/api → **Request an API Key** →
   **Developer** seç → form doldur (proje adı: CR YAPIM Perde)
3. Onay genelde anında gelir. **API Read Access Token (v4 auth)** kopyala
   (uzun JWT, `eyJ...` ile başlar).
4. Vercel'de env var olarak ekle: `TMDB_API_TOKEN`
5. Lokal dev için: `vercel env pull .env.local`

Env yoksa kartlar mevcut ◧/◇ sembol tasarımına düşer. Yorum içeriği
etkilenmez.

**Mimari:**
- `lib/tmdb/poster.ts` — TMDB wrapper, in-memory 24sa cache
- Curated arşiv: `/perde` ve `/perde/m/[slug]` server component'leri
  build/ISR sırasında TMDB lookup yapar (poster + backdrop)
- Topluluk yorumları: AI yanıtı cache'lenirken TMDB lookup paralel
  çalışır, poster URL'si `CachedPerdeReview`'e yazılır
- Open Graph + Twitter card paylaşımlarda da poster otomatik kullanılır

## Teknoloji

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **Tailwind CSS 4** (postcss only)
- Sıfır dış görsel bağımlılığı — Boğaz silüeti ve plato maketi tamamen
  kod ile çiziliyor (faz 2'de gerçek plato fotoğrafları aynı slot'a
  doku olarak gelir).

## Geliştirme

```bash
npm install
npm run dev
```

Geliştirme sunucusu `http://localhost:3000`.

## Tasarım dili (`app/globals.css`)

| Token | Değer | Anlam |
|---|---|---|
| `--color-night-950` | `#07060f` | En derin gece — sayfa zemini |
| `--color-bosphorus-700` | `#0f2a44` | Boğaz lacivertizi |
| `--color-tower-gold` | `#d4b26a` | Kız Kulesi'nin tek ışığı |
| `--color-ai-cyan` | `#9fe7ff` | Caelinus AI'ın sesi |
| `--font-editorial` | Cormorant Garamond | Başlıklar — Anadolu/sinema hissi |
| `--font-grotesk` | Inter | Gövde — okunabilirlik |
| `--font-mono` | JetBrains Mono | AI/teknik etiketler |

## Yol haritası

| Faz | Çıktı | Durum |
|---|---|---|
| 0 | Vizyon + tasarım brief | ✅ |
| 1 | Hero + Yapımlar grid + 6 detay + Plato 3D | ✅ (bu repo) |
| 2 | Gerçek plato fotoğrafları, video teaser'lar, Sanrı asistan demo | sıradaki |
| 3 | Arşiv + AI etiketleme + abone akışı | tasarımı sonra |
| 4 | Caelinus monorepo'ya entegrasyon (paylaşılan paketler) | araştırma |
```

---

*CR YAPIM — duyulmamış bir hikâyeyi, duyulmuş gibi anlatma sanatı.*
