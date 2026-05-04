import Link from "next/link";
import Image from "next/image";
import { BookCTA, WhatsAppLink } from "@/components/BookCTA";

/**
 * Ana sayfa — satış odaklı stüdyo kiralama vitrini.
 *
 * Mantık:
 *   Ön kapı = Studio (kiralama, paketler, randevu)
 *   Derinlik = Caelinus (moda/AI deneyim) + Sanrı (içerik/ritüel) + Perde (yorum)
 *
 * Sayfanın amacı: ziyaretçiyi 60 saniyede "Randevu Al" butonuna götürmek.
 * Manifesto/sanat dili tamamen alt sayfalara bırakıldı; burada net teklif:
 * sahne, paket, fiyat, süreç, kanıt.
 */

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO — sol metin / sağ teras (alttan ışık parıldar) ===== */}
      <section className="relative min-h-[88vh] flex items-end px-6 md:px-10 pb-16 md:pb-20 overflow-hidden">
        {/* Sağ taraftaki 2D teras görseli — md+ */}
        <div
          aria-hidden
          className="hidden md:block absolute inset-y-0 right-0 w-[58%] lg:w-[55%] z-0 pointer-events-none"
        >
          {/* Alt katmandan parıldayan ışık halesi — Boğaz Köprüsü ışıkları sızıntısı */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 35% at 50% 95%, rgba(159,231,255,0.22), transparent 65%),
                radial-gradient(ellipse 35% 25% at 80% 60%, rgba(212,178,106,0.18), transparent 70%),
                radial-gradient(ellipse 30% 20% at 25% 75%, rgba(159,231,255,0.14), transparent 75%)
              `,
              filter: "blur(8px)",
              animation:
                "hero-light-pulse 7s ease-in-out infinite alternate",
            }}
          />
          {/* Görsel */}
          <Image
            src="/teras.png"
            alt="CR Yapım terası — Boğaz Köprüsü, Kız Kulesi, Caelinus sembolleri"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 58vw"
            className="object-contain object-bottom"
            style={{
              filter:
                "drop-shadow(0 20px 60px rgba(7,6,15,0.55)) drop-shadow(0 0 40px rgba(159,231,255,0.10))",
              mixBlendMode: "normal",
            }}
          />
          {/* Sol kenardan içe doğru fade — metnin okunabilmesi için */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(7,6,15,0.95) 0%, rgba(7,6,15,0.55) 18%, transparent 35%)",
            }}
          />
          {/* Alt kenardan içe — backdrop ışıkları üst katmana sızar */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(7,6,15,0.85))",
            }}
          />
        </div>

        {/* Mobil: hero text üstte, altta teras görseli (yatay) */}
        <div className="relative w-full md:max-w-3xl crane-in z-10">
          <p className="mono-tag text-tower-gold/80">
            cr yapım · istanbul boğaz hattı
          </p>
          <h1 className="editorial mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.04] text-mist-100">
            Boğaz'da bir stüdyo.
            <br />
            <span className="editorial-italic text-tower-gold">
              İçerik, moda ve bilinç
            </span>{" "}
            aynı sahnede.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-mist-300 leading-relaxed crane-in-slow">
            CR Yapım, İstanbul'un en güçlü manzarasında{" "}
            <span className="text-mist-100">çekim yapmak</span>,{" "}
            <span className="text-mist-100">moda deneyimlemek</span> ve{" "}
            <span className="text-mist-100">içerik üretmek</span> için
            tasarlanmış çok katmanlı bir yaratım alanıdır.
          </p>

          <div className="mt-10 md:mt-12 flex flex-wrap gap-3 crane-in-slow">
            <BookCTA
              label="Randevu Al"
              variant="primary"
              size="lg"
              context="Hero"
            />
            <Link
              href="/studio"
              className="group inline-flex items-center gap-3 mono-tag border border-ai-cyan/40 text-ai-cyan hover:bg-ai-cyan/10 px-7 py-4 rounded-full transition-colors"
            >
              Stüdyoyu Keşfet
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <p className="mono-tag text-mist-500 mt-8 crane-in-slow">
            ◉ ışık hazır. sahne senin.
          </p>

          {/* Mobil için teras görseli — hero text'in altında küçük */}
          <div className="md:hidden mt-10 relative aspect-[4/3] rounded-2xl overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 z-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 40% at 50% 95%, rgba(159,231,255,0.25), transparent 60%)",
              }}
            />
            <Image
              src="/teras.png"
              alt="CR Yapım terası — Boğaz manzarası"
              fill
              sizes="100vw"
              className="object-contain object-bottom relative z-10"
              style={{
                filter:
                  "drop-shadow(0 16px 40px rgba(7,6,15,0.55))",
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== 3 ANA KART ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <p className="mono-tag text-mist-500">üç sahne · tek mekân</p>
          <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
            Hangi yüzü açmak istersin?
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <PillarCard
            href="/studio"
            symbol="🎥"
            label="STÜDYO"
            title="Kirala. Çek. Yayınla."
            description="Boğaz manzarasında profesyonel çekim alanı. Fotoğraf, video, reels, marka çekimleri."
            cta="Stüdyoyu Kirala"
            accent="#d4b26a"
          />
          <PillarCard
            href="/caelinus-ai"
            symbol="👗"
            label="CAELINUS AI"
            title="Stilini yarat. Hisset. Satın al."
            description="Dijital moda deneyimi. Kendi avatarında dene, yönlendirilmiş bir konseptle satın al."
            cta="Deneyimi Aç"
            accent="#9fe7ff"
          />
          <PillarCard
            href="/yapimlar/sanriya-sor"
            symbol="🔮"
            label="SANRI"
            title="Soru sor. Farkındalık al."
            description="Cevap değil, geri-soru. İçeriğin ruhu burada başlar — ritüel ve sembol katmanı."
            cta="Sanrı'ya Sor"
            accent="#b8a2ff"
          />
        </ul>
      </section>

      {/* ===== MEKAN TANITIMI ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-24 max-w-5xl mx-auto">
        <p className="mono-tag text-mist-500">mekân</p>
        <h2 className="editorial mt-4 text-4xl md:text-6xl leading-[1.05] text-mist-100">
          Bir ev değil.
          <br />
          <span className="editorial-italic text-tower-gold">Bir sahne.</span>
        </h2>
        <p className="body-readable text-mist-300 mt-8 max-w-3xl">
          CR Yapım, İstanbul Boğazı'na bakan özel bir lokasyonda — çekim,
          üretim ve deneyim için tasarlanmış çok katmanlı bir stüdyodur.
        </p>
        <ul className="mt-8 space-y-2 text-lg md:text-xl text-mist-100">
          <li className="flex items-baseline gap-3">
            <span className="text-tower-gold">—</span> içerik çekilir
          </li>
          <li className="flex items-baseline gap-3">
            <span className="text-tower-gold">—</span> moda deneyimlenir
          </li>
          <li className="flex items-baseline gap-3">
            <span className="text-tower-gold">—</span> sahne kurulur
          </li>
          <li className="flex items-baseline gap-3">
            <span className="text-tower-gold">—</span> hikâye başlar
          </li>
        </ul>
      </section>

      {/* ===== SAHNE ALANLARI ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-20 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="mono-tag text-mist-500">sahne alanları</p>
          <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
            Dört farklı doku, tek bir kapı.
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SceneCard
            imageSrc="/studio-manzara.jpg"
            symbol="🌊"
            label="Manzara Sahnesi"
            title="Boğaz, Kız Kulesi, gün batımı."
            description="Minimal, güçlü, sinematik. Reels, editorial portre, marka filmi — ana sahne."
            tint="from-bosphorus-700/50"
          />
          <SceneCard
            imageSrc="/studio-atolye.jpg"
            symbol="🧵"
            label="Caelinus Atölye"
            title="Tasarım, moodboard, sanat."
            description="Moodboard duvarı, easel, tasarım masası, sanat panosu. Caelinus dünyasının kalbi."
            tint="from-tower-gold/30"
          />
          <SceneCard
            imageSrc="/sanri-kose.png"
            symbol="🎙"
            label="Podcast / Sanrı Köşesi"
            title="İki koltuk. Boğaz tanık."
            description="İki kapsül koltuk, dual mikrofon kolu, çift softbox aydınlatma. Podcast, röportaj, sohbet için Boğaz panoraması."
            tint="from-purple-500/30"
          />
          <SceneCard
            imageSrc="/studio-mutfak.jpg"
            symbol="🍽"
            label="CR Mutfak Stüdyo"
            title="Görselin lezzeti, ilhamın adresi."
            description="Tam donanımlı mutfak, ada masa, profesyonel ışık. Yemek, tarif, içerik üreticileri için."
            tint="from-tower-gold/30"
          />
        </ul>
      </section>

      {/* ===== ALT MARKA TEASER · BELLA · COCO · JOI ===== */}
      <section className="relative px-6 md:px-10 py-12 md:py-16 max-w-6xl mx-auto">
        <Link
          href="/bella-coco-joi"
          className="group block rounded-2xl overflow-hidden border border-pink-300/25 hover:border-pink-300/55 transition-colors"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,114,182,0.08) 0%, rgba(212,175,55,0.05) 100%)",
          }}
        >
          <div className="grid md:grid-cols-5 items-stretch">
            <div className="relative md:col-span-3 aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden">
              <Image
                src="/bella-coco-joi/sahne-3-defile.jpg"
                alt="Bella, Coco ve Joi — pembe runway, Boğaz manzarası"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 50%, rgba(7,6,15,0.55) 100%)",
                }}
              />
            </div>
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
              <p className="mono-tag text-pink-300">yeni · cr alt marka</p>
              <p className="editorial text-3xl md:text-4xl text-mist-100 mt-3 leading-tight">
                Bella<span className="text-pink-300"> · </span>Coco
                <span className="text-pink-300"> · </span>Joi
              </p>
              <p className="editorial italic text-pink-100 mt-2 text-lg">
                Bir hikâye başlıyor.
              </p>
              <p className="body-readable text-mist-300 mt-4">
                CR Pet Collection’ın AI destekli kısa dizisi. Boğaz manzaralı
                stüdyomuzun ilk pilot içeriği — pembe ışıkta üç köpek, bir
                marka.
              </p>
              <span className="mono-tag text-tower-gold mt-5 inline-flex items-center gap-2">
                Pilot bölümü izle <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ===== PAKETLER ===== */}
      <section
        id="paketler"
        className="relative px-6 md:px-10 py-20 md:py-28 max-w-6xl mx-auto"
      >
        <div className="mb-10 md:mb-14">
          <p className="mono-tag text-tower-gold">paketler · net fiyat</p>
          <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
            Açık fiyat. Açık sahne.
          </h2>
          <p className="body-readable text-mist-400 mt-4 max-w-2xl">
            "Fiyat için DM" yok. Net teklif, net süre, net dahilindeki.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <PackageCard
            tier="BASIC"
            usd="1.000"
            tl="40.000"
            duration="1 saat"
            description="Bir sahne. Tripod alanı. Hızlı bir reels veya portre çekimi."
            features={[
              "1 saat tek sahne kullanımı",
              "Tripod alanı",
              "Doğal ışık",
            ]}
          />
          <PackageCard
            tier="PRO"
            usd="2.000"
            tl="80.000"
            duration="3 saat"
            description="Profesyonel set: ışık + tripod ile yarım gün üretim."
            features={[
              "3 saat tek sahne kullanımı",
              "Profesyonel ışık",
              "Tripod + temel ekipman",
            ]}
            highlighted
          />
          <PackageCard
            tier="FULL DAY"
            usd="3.000"
            tl="120.000"
            duration="8 saat"
            description="Tüm alanlar. Bir günde 10 farklı içerik."
            features={[
              "8 saat tüm alanlara erişim",
              "Manzara + Atölye + Sanrı",
              "Profesyonel ışık seti",
            ]}
          />
          <PackageCard
            tier="EXPERIENCE"
            usd="10.000+"
            tl="400.000+"
            duration="özel"
            description="Çekim + sanat yönetmenliği + Caelinus konsept + kısa edit."
            features={[
              "Sanat yönetmeni eşliğinde",
              "Caelinus konsept yönlendirme",
              "Kısa edit + teslim",
            ]}
            accent
          />
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BookCTA
            label="Randevu Al"
            variant="primary"
            size="lg"
            context="Paketler"
          />
          <WhatsAppLink label="paket için yaz" context="Paketler" />
        </div>
      </section>

      {/* ===== NASIL ÇALIŞIR ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-24 max-w-5xl mx-auto">
        <p className="mono-tag text-mist-500">nasıl çalışır</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Dört adım. Bir gün.
        </h2>

        <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: "01", t: "Randevu al", d: "WhatsApp veya form ile sahneyi rezerve et." },
            { n: "02", t: "Sahneni seç", d: "Manzara, Atölye, Sanrı veya hepsi." },
            { n: "03", t: "Çekimini yap", d: "Işık hazır, ekipman hazır, kahve hazır." },
            { n: "04", t: "Yayınla", d: "İstersen Caelinus ile editle, Sanrı ile içerik kur." },
          ].map((s) => (
            <li
              key={s.n}
              className="rounded-2xl p-6 border border-mist-500/15 bg-night-900/40 backdrop-blur-sm"
            >
              <p className="mono-tag-lg text-tower-gold">{s.n}</p>
              <p className="editorial text-2xl text-mist-100 mt-3 leading-tight">
                {s.t}
              </p>
              <p className="text-base text-mist-400 mt-3 leading-relaxed">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== KİMLER İÇİN ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-20 max-w-5xl mx-auto">
        <p className="mono-tag text-mist-500">kimler için</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Sahne herkes için açık değil — bunlar için açık.
        </h2>
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { e: "📸", t: "Influencerlar" },
            { e: "🏷️", t: "Markalar" },
            { e: "✂️", t: "Tasarımcılar" },
            { e: "🎬", t: "İçerik üreticileri" },
            { e: "▶︎", t: "YouTube / Reels" },
          ].map((c) => (
            <li
              key={c.t}
              className="rounded-xl p-4 border border-mist-500/15 bg-night-900/30 text-center"
            >
              <p className="text-2xl mb-2" aria-hidden>
                {c.e}
              </p>
              <p className="mono-tag text-mist-200">{c.t}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== SOSYAL KANIT ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-24 max-w-6xl mx-auto">
        <p className="mono-tag text-mist-500">sahnede gördükleri</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Sahneyi gören ne der?
        </h2>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              q: "İstanbul'da bu kadar güçlü bir sahne yok.",
              w: "ilk müşteri",
            },
            {
              q: "Her köşe ayrı içerik.",
              w: "marka çekimi · 2026",
            },
            {
              q: "Tek günde 10 video çıktık.",
              w: "creator · full day",
            },
          ].map((q) => (
            <li
              key={q.q}
              className="rounded-2xl p-6 md:p-7 border border-tower-gold/20 bg-night-900/40 backdrop-blur-sm"
            >
              <p className="text-3xl text-tower-gold/60" aria-hidden>
                "
              </p>
              <p className="editorial-italic text-xl md:text-2xl text-mist-100 mt-2 leading-snug">
                {q.q}
              </p>
              <p className="mono-tag text-mist-500 mt-5">— {q.w}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== LOKASYON ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-20 max-w-4xl mx-auto">
        <p className="mono-tag text-mist-500">lokasyon</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          İstanbul · Boğaz hattı.
        </h2>
        <p className="body-readable text-mist-400 mt-5 max-w-2xl">
          Mahremiyet için tam adres randevu sonrası paylaşılır. Etrafta park
          alanı vardır; ulaşım randevu onayında detayıyla iletilir.
        </p>
      </section>

      {/* ===== KAPANIŞ CTA ===== */}
      <section className="relative px-6 md:px-10 py-20 md:py-28 max-w-5xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-16 text-center"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(212,178,106,0.18) 0%, transparent 70%)",
            border: "1px solid rgba(212,178,106,0.30)",
          }}
        >
          <p className="mono-tag text-tower-gold">son perde</p>
          <h2 className="editorial mt-4 text-4xl md:text-6xl lg:text-7xl text-mist-100 leading-[1.05]">
            Sahne hazır.
            <br />
            <span className="editorial-italic text-tower-gold">
              Şimdi sen gir.
            </span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <BookCTA
              label="Randevu Al"
              variant="primary"
              size="lg"
              context="Kapanış"
            />
            <WhatsAppLink label="WhatsApp ile yaz" context="Kapanış" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============== alt bileşenler ============== */

function PillarCard({
  href,
  symbol,
  label,
  title,
  description,
  cta,
  accent,
}: {
  href: string;
  symbol: string;
  label: string;
  title: string;
  description: string;
  cta: string;
  accent: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group block h-full rounded-2xl p-7 md:p-8 transition-all"
        style={{
          border: `1px solid ${accent}30`,
          background: `linear-gradient(180deg, ${accent}10 0%, transparent 100%)`,
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-5"
          style={{
            color: accent,
            border: `1px solid ${accent}55`,
            background: `${accent}10`,
          }}
        >
          {symbol}
        </div>
        <p className="mono-tag-lg" style={{ color: accent, letterSpacing: "0.14em" }}>
          {label}
        </p>
        <p className="editorial text-2xl md:text-3xl text-mist-100 mt-3 leading-tight">
          {title}
        </p>
        <p className="body-readable text-mist-300 mt-4">{description}</p>
        <p
          className="mono-tag mt-6 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2"
          style={{ color: accent }}
        >
          {cta} →
        </p>
      </Link>
    </li>
  );
}

function SceneCard({
  imageSrc,
  symbol,
  label,
  title,
  description,
  tint,
}: {
  /** Sahne foto yolu — varsa Image, yoksa emoji fallback */
  imageSrc?: string;
  symbol: string;
  label: string;
  title: string;
  description: string;
  /** Tailwind from-color (gradient başlangıcı, fallback için) */
  tint: string;
}) {
  return (
    <li
      className={`group relative rounded-2xl overflow-hidden border border-mist-500/15 bg-gradient-to-b ${tint} to-transparent`}
    >
      <div
        className="relative aspect-[3/2] overflow-hidden"
        style={
          !imageSrc
            ? {
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }
            : undefined
        }
      >
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={`${label} — ${title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Alt karartma — başlık okunsun + sinematik his */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(7,6,15,0.10) 0%, transparent 35%, rgba(7,6,15,0.55) 100%)",
              }}
            />
            {/* Hafif film grain */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-12"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
              }}
            />
            {/* Sembol — sol üstte minik */}
            <span
              className="absolute top-4 left-4 text-2xl md:text-3xl"
              style={{
                textShadow: "0 0 20px rgba(7,6,15,0.8)",
              }}
              aria-hidden
            >
              {symbol}
            </span>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-7xl opacity-60" aria-hidden>
              {symbol}
            </span>
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
              }}
            />
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="mono-tag text-tower-gold">{label}</p>
        <p className="editorial text-2xl text-mist-100 mt-2 leading-tight">
          {title}
        </p>
        <p className="text-base text-mist-400 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </li>
  );
}

function PackageCard({
  tier,
  usd,
  tl,
  duration,
  description,
  features,
  highlighted,
  accent,
}: {
  tier: string;
  /** USD rakamı (örn. "1.000") */
  usd: string;
  /** TL rakamı (örn. "40.000") */
  tl: string;
  duration: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  accent?: boolean;
}) {
  const ringColor = accent
    ? "rgba(159,231,255,0.5)"
    : highlighted
    ? "rgba(212,178,106,0.6)"
    : "rgba(168,164,184,0.2)";
  const bgGradient = accent
    ? "linear-gradient(180deg, rgba(159,231,255,0.10) 0%, transparent 100%)"
    : highlighted
    ? "linear-gradient(180deg, rgba(212,178,106,0.10) 0%, transparent 100%)"
    : "rgba(7, 6, 15, 0.45)";

  return (
    <li
      className="rounded-2xl p-6 md:p-7 flex flex-col h-full backdrop-blur-sm"
      style={{
        border: `1px solid ${ringColor}`,
        background: bgGradient,
      }}
    >
      {highlighted && (
        <p className="mono-tag text-tower-gold mb-3">★ en çok seçilen</p>
      )}
      {accent && (
        <p className="mono-tag text-ai-cyan mb-3">◈ butik konsept</p>
      )}
      <p
        className="mono-tag-lg"
        style={{
          color: accent ? "#9fe7ff" : highlighted ? "#d4b26a" : "#a8a4b8",
          letterSpacing: "0.14em",
        }}
      >
        {tier}
      </p>
      {/* Dual currency: USD üstte editorial, TL altta mono */}
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-mist-400 text-xl">$</span>
        <span className="editorial text-4xl md:text-5xl text-mist-100">
          {usd}
        </span>
        <span className="mono-tag text-mist-500 ml-1">USD</span>
      </div>
      <p className="mono-tag text-mist-400 mt-1">
        ≈ ₺{tl} <span className="text-mist-500">TL</span>
      </p>
      <p className="mono-tag text-mist-500 mt-2">{duration}</p>
      <p className="body-readable text-mist-300 mt-4">{description}</p>

      <ul className="mt-5 space-y-2 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-baseline gap-2 text-base text-mist-200">
            <span className="text-tower-gold">✓</span> {f}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <BookCTA
          label="Bu paketi seç"
          variant={highlighted ? "primary" : "outline"}
          size="sm"
          context={`Paket: ${tier}`}
        />
      </div>
    </li>
  );
}
