import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookCTA, WhatsAppLink } from "@/components/BookCTA";

export const metadata: Metadata = {
  title: "Stüdyo · CR Yapım — Boğaz manzaralı içerik stüdyosu",
  description:
    "İstanbul Boğazı'na bakan profesyonel içerik stüdyosu. Manzara, Caelinus atölye, podcast köşesi ve mutfak stüdyo. Saatlik, günlük ve deneyim paketleriyle çekim, reels, marka filmleri için hazır.",
  openGraph: {
    title: "CR Yapım Stüdyo — Boğaz manzaralı içerik stüdyosu",
    description:
      "Dört sahne, bir kapı: Manzara, Atölye, Podcast Köşesi, Mutfak Stüdyo. Net fiyatlı kiralama paketleri.",
    type: "website",
    images: [
      {
        url: "/studio-manzara.jpg",
        width: 1024,
        height: 682,
        alt: "CR Yapım Stüdyo — Boğaz manzaralı sahne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CR Yapım Stüdyo — Boğaz manzaralı içerik stüdyosu",
    description:
      "Dört sahne, bir kapı: Manzara, Atölye, Podcast Köşesi, Mutfak Stüdyo.",
    images: ["/studio-manzara.jpg"],
  },
};

export default function StudioPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-12 md:pt-20 pb-16 max-w-5xl mx-auto crane-in">
        <Link
          href="/"
          className="mono-tag text-mist-500 hover:text-tower-gold transition-colors"
        >
          ← Ana sayfa
        </Link>
        <p className="mono-tag text-tower-gold mt-8">stüdyo · kiralama</p>
        <h1 className="editorial mt-4 text-4xl md:text-6xl lg:text-7xl text-mist-100 leading-[1.04]">
          Üç sahne. Bir kapı.
          <br />
          <span className="editorial-italic text-tower-gold">
            Boğaz tanık.
          </span>
        </h1>
        <p className="body-readable text-mist-300 mt-6 max-w-2xl">
          CR Yapım Stüdyo, İstanbul Boğazı'na bakan özel bir lokasyonda
          kurulmuş çok katmanlı bir çekim alanıdır. Üç farklı sahne, tek bir
          ekiple, tek bir günde içerik üretmek için tasarlandı.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BookCTA label="Randevu Al" variant="primary" size="lg" context="Studio Hero" />
          <Link
            href="#paketler"
            className="mono-tag inline-flex items-center gap-2 border border-tower-gold/40 text-tower-gold hover:bg-tower-gold/10 px-6 py-3 rounded-full transition-colors"
          >
            Paketleri gör ↓
          </Link>
        </div>
      </section>

      {/* Sahne alanları detay */}
      <section className="relative px-6 md:px-10 py-12 md:py-16 max-w-6xl mx-auto">
        <p className="mono-tag text-mist-500">sahne alanları</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Dört sahne. Tek mekân.
        </h2>

        <div className="mt-10 space-y-10">
          <SceneDetail
            imageSrc="/studio-manzara.jpg"
            symbol="🌊"
            label="Manzara Sahnesi"
            title="Boğaz, Kız Kulesi, gün batımı."
            description="Sinematik, geniş camlar, doğal gün ışığı + kontre. Reels, portre, marka filmi, lookbook için ana sahne — Boğaz Köprüsü ve Kız Kulesi panoraması direkt arka planda."
            features={[
              "Geniş açık lounge + manzara terası",
              "Boğaz Köprüsü & Kız Kulesi cephesi",
              "Doğal ışık + profesyonel softbox seti",
              "Tripod + slider + kontre LED",
            ]}
            tint="from-bosphorus-700/40"
          />
          <SceneDetail
            imageSrc="/studio-atolye.jpg"
            symbol="🧵"
            label="Caelinus Atölye"
            title="Tasarım, moodboard, sanat."
            description="Caelinus Atölye Tasarım — moodboard duvarı, easel, sanat masası, kırmızı koltuklar, 'Digital Sanat Alanı' panosu. Lookbook, kıyafet provası, set kurulumu, sanat içerik üretimi için."
            features={[
              "Geniş çalışma masası + tasarım istasyonu",
              "Easel + sanat panosu (Digital Sanat)",
              "Moodboard duvarı + foto serisi",
              "Boğaz manzarasına bakan oturma alanı",
            ]}
            tint="from-tower-gold/25"
            reverse
          />
          <SceneDetail
            imageSrc="/studio-kose.jpg"
            symbol="🎙"
            label="Podcast / Sanrı Köşesi"
            title="ON AIR. İki koltuk. Boğaz tanık."
            description="Profesyonel podcast setup'ı: iki kırmızı kapsül koltuk, dual mikrofon kolu, ON AIR neon, kamera tripod. Geniş cam Boğaz panoraması arka planda — sıradan stüdyolarda olmayan bir sahne."
            features={[
              "Dual mikrofon kolu (kondenser)",
              "ON AIR neon göstergesi",
              "Profesyonel softbox aydınlatma",
              "Kamera tripod + canlı yayın hazır",
            ]}
            tint="from-purple-500/25"
          />
          <SceneDetail
            imageSrc="/studio-mutfak.jpg"
            symbol="🍽"
            label="CR Mutfak Stüdyo"
            title="Görselin lezzeti, ilhamın adresi."
            description="Tam donanımlı mutfak: ada masa, modern beyaz dolaplar, profesyonel ışık + kamera, Boğaz manzarası. Yemek tarif YouTube'u, Reels, marka tanıtım, food styling için Türkiye'de ender bir alan."
            features={[
              "Tam donanımlı modern mutfak + ada masa",
              "NANLITE softbox + kamera tripod",
              "Doğal gün ışığı + Boğaz cephesi",
              "Food styling için tam set",
            ]}
            tint="from-tower-gold/25"
            reverse
          />
        </div>
      </section>

      {/* Ekipman */}
      <section className="relative px-6 md:px-10 py-12 md:py-16 max-w-5xl mx-auto">
        <p className="mono-tag text-mist-500">ekipman</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Sahnede hazır olanlar.
        </h2>
        <p className="body-readable text-mist-400 mt-4 max-w-2xl">
          Pro paket ve üzeri için. Basic pakette tripod alanı dahil; ek
          ekipman talep ettiğinde önceden iletmen yeterli.
        </p>
        <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { e: "💡", t: "Profesyonel LED ışık seti" },
            { e: "🎤", t: "Yaka mikrofonu (kablosuz)" },
            { e: "📷", t: "Tripod + slider" },
            { e: "🔦", t: "Softbox + kontre" },
            { e: "🎨", t: "Reflektör + difüzör" },
            { e: "🪞", t: "Tam boy ayna + makyaj köşesi" },
          ].map((i) => (
            <li
              key={i.t}
              className="rounded-xl p-4 border border-mist-500/15 bg-night-900/30 flex items-center gap-3"
            >
              <span className="text-2xl" aria-hidden>
                {i.e}
              </span>
              <span className="text-base text-mist-200">{i.t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Paketler — kısa hatırlatma + ana sayfaya yönlendir */}
      <section
        id="paketler"
        className="relative px-6 md:px-10 py-16 md:py-20 max-w-6xl mx-auto"
      >
        <p className="mono-tag text-tower-gold">paketler</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Açık fiyat. Açık sahne.
        </h2>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "BASIC", usd: "$1.000", tl: "₺40.000", d: "1 saat · tek sahne · tripod alanı" },
            { t: "PRO", usd: "$2.000", tl: "₺80.000", d: "3 saat · ışık + tripod" },
            { t: "FULL DAY", usd: "$3.000", tl: "₺120.000", d: "8 saat · tüm alanlar" },
            { t: "EXPERIENCE", usd: "$10.000+", tl: "₺400.000+", d: "çekim + yönetmen + edit" },
          ].map((p) => (
            <li
              key={p.t}
              className="rounded-2xl p-5 border border-tower-gold/20 bg-night-900/40"
            >
              <p
                className="mono-tag-lg text-tower-gold"
                style={{ letterSpacing: "0.14em" }}
              >
                {p.t}
              </p>
              <p className="editorial text-3xl text-mist-100 mt-2">{p.usd}</p>
              <p className="mono-tag text-mist-400 mt-1">≈ {p.tl} TL</p>
              <p className="text-sm text-mist-400 mt-3">{p.d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href="/#paketler"
            className="mono-tag text-tower-gold hover:underline"
          >
            Detaylı karşılaştırma →
          </Link>
        </div>
      </section>

      {/* SSS */}
      <section className="relative px-6 md:px-10 py-16 md:py-20 max-w-3xl mx-auto">
        <p className="mono-tag text-mist-500">sıkça sorulanlar</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Çekimden önce.
        </h2>

        <ul className="mt-10 space-y-4">
          {[
            {
              q: "Adresi nasıl alıyorum?",
              a: "Mahremiyet için tam adres randevu onayı sonrası WhatsApp'tan iletilir. Civar ulaşımı (metro, otobüs, otopark) bilgisi de aynı mesajda olur.",
            },
            {
              q: "Kendi ekipmanımı getirebilir miyim?",
              a: "Tabii. Stüdyo ekipmanı dahildir, kendi seninkilerini de kurabilirsin. Büyük set kurulumu (rig, kran, vinç) için önceden haber ver — alan ayarlamamız lazım.",
            },
            {
              q: "Ekibimde kaç kişi olabilir?",
              a: "Basic'te 2-3, Pro'da 4-5, Full Day'de 8-10 kişiye kadar konforlu. Kalabalık ekipler için Experience pakette özel düzen yapıyoruz.",
            },
            {
              q: "Hayvan / yiyecek-içecek?",
              a: "Eğitimli hayvan tamam. Yiyecek-içecek serbest; bizim mutfak küçük bir ikram için kullanılabilir, büyük catering için önceden konuşalım.",
            },
            {
              q: "İptal politikası?",
              a: "48 saat önce iptal: tam iade. 24-48 saat: %50 iade. 24 saat içi: iade yok ama tarihi öteliyoruz (1 ay içinde tek değişim hakkı).",
            },
          ].map((f) => (
            <li
              key={f.q}
              className="rounded-2xl p-5 md:p-6 border border-mist-500/15 bg-night-900/40"
            >
              <p className="editorial text-xl md:text-2xl text-mist-100 leading-tight">
                {f.q}
              </p>
              <p className="body-readable text-mist-400 mt-3">{f.a}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="relative px-6 md:px-10 py-20 md:py-24 max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(212,178,106,0.18) 0%, transparent 70%)",
            border: "1px solid rgba(212,178,106,0.30)",
          }}
        >
          <p className="mono-tag text-tower-gold">randevu</p>
          <h2 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.05]">
            Sahneye gel.
          </h2>
          <p className="body-readable text-mist-300 mt-5 max-w-xl mx-auto">
            Tarihini söyle, paketini seç, ekipmanını gönder. Geri kalan
            bizde — ışık, kahve, sahne hazır.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BookCTA
              label="Randevu Al"
              variant="primary"
              size="lg"
              context="Studio CTA"
            />
            <WhatsAppLink label="WhatsApp ile yaz" context="Studio CTA" />
          </div>
        </div>
      </section>
    </div>
  );
}

function SceneDetail({
  imageSrc,
  symbol,
  label,
  title,
  description,
  features,
  tint,
  reverse,
}: {
  imageSrc?: string;
  symbol: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  tint: string;
  reverse?: boolean;
}) {
  return (
    <article
      className={`grid md:grid-cols-2 gap-0 items-stretch rounded-2xl overflow-hidden border border-mist-500/15 bg-gradient-to-br ${tint} to-transparent`}
    >
      <div
        className={`relative aspect-[3/2] md:aspect-auto md:min-h-[320px] overflow-hidden ${
          reverse ? "md:order-2" : ""
        }`}
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
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-12"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 3px)",
              }}
            />
            <span
              className="absolute top-4 left-4 text-2xl md:text-3xl"
              style={{ textShadow: "0 0 20px rgba(7,6,15,0.85)" }}
              aria-hidden
            >
              {symbol}
            </span>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl md:text-8xl opacity-60" aria-hidden>
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

      <div className={`p-6 md:p-8 ${reverse ? "md:order-1" : ""}`}>
        <p className="mono-tag text-tower-gold">{label}</p>
        <p className="editorial text-2xl md:text-3xl text-mist-100 mt-2 leading-tight">
          {title}
        </p>
        <p className="body-readable text-mist-300 mt-4">{description}</p>
        <ul className="mt-5 space-y-2">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-baseline gap-2 text-base text-mist-200"
            >
              <span className="text-tower-gold">·</span> {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
