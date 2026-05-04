import type { Metadata } from "next";
import Link from "next/link";
import { BookCTA, WhatsAppLink } from "@/components/BookCTA";

export const metadata: Metadata = {
  title: "Stüdyo · CR Yapım — Boğaz manzaralı içerik stüdyosu",
  description:
    "İstanbul Boğazı'na bakan profesyonel içerik stüdyosu. Manzara, atölye ve sanrı alanları. Saatlik, günlük ve deneyim paketleriyle çekim, reels, marka filmleri için hazır.",
  openGraph: {
    title: "CR Yapım Stüdyo — Boğaz manzaralı içerik stüdyosu",
    description:
      "Üç sahne, bir kapı: Manzara, Atölye, Sanrı. Net fiyatlı kiralama paketleri.",
    type: "website",
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
          Hangi dokuda çekersin?
        </h2>

        <div className="mt-10 space-y-10">
          <SceneDetail
            symbol="🌊"
            label="Manzara Sahnesi"
            title="Boğaz, gün batımı, doğal ışık."
            description="Sinematik, geniş camlar, doğal gün ışığı + kontre. Reels, portre, marka filmi, lookbook için ideal."
            features={[
              "≈ 25 m² açık sahne",
              "Boğaz & Kız Kulesi gün batımı yönü",
              "Doğal ışık + tek kontre LED",
              "Tripod + softbox stoğu",
            ]}
            tint="from-bosphorus-700/40"
          />
          <SceneDetail
            symbol="🧵"
            label="Atölye Alanı"
            title="Tasarım, prova, set kurulumu."
            description="Caelinus dünyasının fiziksel uzantısı. Kıyafet, malzeme, moodboard, set construction için açık alan."
            features={[
              "Geniş çalışma masası",
              "Prova alanı + ayna",
              "Moodboard duvarı",
              "Set kurulumu için boş alan",
            ]}
            tint="from-tower-gold/25"
            reverse
          />
          <SceneDetail
            symbol="🕯"
            label="Sanrı Alanı"
            title="Ritüel, derinlik, sohbet."
            description="Loş ışık, kadife perde, sembol köşesi. Podcast, kameralı sohbet, içsel monolog veya 'ritüel' tarzı içerik için."
            features={[
              "Loş + ayarlanabilir ışık",
              "Akustik perdeleme",
              "Sembol köşesi (mum, taş, kitap)",
              "Tek/çift kişilik podcast düzeni",
            ]}
            tint="from-purple-500/25"
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
            { t: "BASIC", p: "$1.000", d: "1 saat · tek sahne · tripod alanı" },
            { t: "PRO", p: "$2.000", d: "3 saat · ışık + tripod" },
            { t: "FULL DAY", p: "$3.000", d: "8 saat · tüm alanlar" },
            { t: "EXPERIENCE", p: "$10.000+", d: "çekim + yönetmen + edit" },
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
              <p className="editorial text-3xl text-mist-100 mt-2">{p.p}</p>
              <p className="text-sm text-mist-400 mt-2">{p.d}</p>
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
  symbol,
  label,
  title,
  description,
  features,
  tint,
  reverse,
}: {
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
      className={`grid md:grid-cols-2 gap-6 items-stretch rounded-2xl overflow-hidden border border-mist-500/15 bg-gradient-to-br ${tint} to-transparent`}
    >
      {/* Görsel placeholder — gerçek foto eklenince Image */}
      <div
        className={`relative aspect-[4/3] md:aspect-auto md:min-h-[280px] flex items-center justify-center ${
          reverse ? "md:order-2" : ""
        }`}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      >
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
