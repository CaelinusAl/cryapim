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
