import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { mailtoLink, whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title:
    "Bella · Coco · Joi — CR Pet Collection AI dizi · CR Yapım",
  description:
    "Boğaz manzaralı stüdyoda doğan AI destekli pet kısa dizisi. Bella, Coco ve Joi’nin lüks kıyafet markası kurma hikâyesi. Pilot bölüm yayında, koleksiyon çok yakında.",
  openGraph: {
    title: "Bella · Coco · Joi — Bir hikaye başlıyor",
    description:
      "CR Pet Collection’ın AI destekli kısa dizisi. Boğaz’da defile, pembe runway, üç köpek — bir marka.",
    type: "website",
    images: [
      {
        url: "/bella-coco-joi/sahne-3-defile.jpg",
        width: 1024,
        height: 768,
        alt: "Bella, Coco ve Joi — Boğaz manzaralı pet defile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bella · Coco · Joi — CR Pet Collection",
    description:
      "AI destekli pet kısa dizisi. Boğaz manzaralı runway. #BellaCocoJoi",
    images: ["/bella-coco-joi/sahne-3-defile.jpg"],
  },
};

export default function BellaCocoJoiPage() {
  return (
    <div className="relative">
      {/* ===== HERO — Boğaz defile sahnesi full bleed ===== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[4/3] md:aspect-[16/9] w-full max-h-[78vh]">
          <Image
            src="/bella-coco-joi/sahne-3-defile.jpg"
            alt="Bella, Coco ve Joi — Boğaz manzaralı pembe runway"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Alt fade — okunsun */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,6,15,0.10) 0%, rgba(7,6,15,0.0) 35%, rgba(7,6,15,0.85) 100%)",
            }}
          />
          {/* Yazı overlay */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 pb-10 md:pb-16">
            <div className="max-w-5xl mx-auto w-full">
              <Link
                href="/"
                className="mono-tag text-mist-200 hover:text-tower-gold transition-colors mb-6 inline-block"
              >
                ← CR Yapım
              </Link>
              <p className="mono-tag text-pink-300">cr pet collection · pilot dizi</p>
              <h1
                className="editorial mt-3 text-4xl md:text-6xl lg:text-7xl text-white leading-[1.04]"
                style={{
                  textShadow: "0 4px 30px rgba(7,6,15,0.7)",
                }}
              >
                Bella<span className="text-pink-300"> · </span>Coco
                <span className="text-pink-300"> · </span>Joi
              </h1>
              <p className="editorial italic mt-4 text-xl md:text-2xl text-pink-100 max-w-2xl">
                Bir hikâye başlıyor.
              </p>
              <p className="body-readable text-mist-200 mt-4 max-w-2xl">
                Boğaz manzaralı CR Yapım stüdyosunda doğan, AI destekli bir pet
                kısa dizisi. Üç köpek, bir marka, sonsuz pembe ışık.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PILOT VIDEO ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-20 max-w-5xl mx-auto">
        <p className="mono-tag text-pink-300">pilot · 1. bölüm</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Bir markanın doğuşu — pembe ışıkta.
        </h2>
        <p className="body-readable text-mist-300 mt-4 max-w-2xl">
          CR Pet Collection’ın hikâyesi sıradan bir kanepe sahnesinde başlar:
          Bella kurar, Joi dener, Coco sorar. Boğaz fonu, lüks pet kıyafetleri,
          pembe altın bir dünya.
        </p>

        <div className="mt-8 relative rounded-2xl overflow-hidden border border-pink-300/20 bg-bosphorus-900/60">
          <video
            controls
            preload="metadata"
            poster="/bella-coco-joi/sahne-1-salon.jpg"
            className="w-full h-auto block"
          >
            <source src="/bella-coco-joi/pilot.mp4" type="video/mp4" />
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
        </div>
      </section>

      {/* ===== KARAKTERLER ===== */}
      <section className="relative px-6 md:px-10 py-12 md:py-16 max-w-6xl mx-auto">
        <p className="mono-tag text-pink-300">karakterler</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Üç köpek, üç ses.
        </h2>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <CharacterCard
            name="Bella"
            role="Lider · CEO"
            breed="Chihuahua"
            quote="Stil sadece görünmek değil… hissetmektir."
            color="from-pink-400/30"
            accent="text-pink-200"
          />
          <CharacterCard
            name="Coco"
            role="Romantik · Sanat ruhlu"
            breed="Toy Poodle"
            quote="Marka ne? Yenir mi?"
            color="from-pink-300/30"
            accent="text-pink-100"
          />
          <CharacterCard
            name="Joi"
            role="Pragmatik · Test eden"
            breed="Toy Poodle"
            quote="Ben denerim!"
            color="from-tower-gold/30"
            accent="text-tower-gold"
          />
        </ul>
      </section>

      {/* ===== STORYBOARD — 4 SAHNE ===== */}
      <section className="relative px-6 md:px-10 py-12 md:py-16 max-w-6xl mx-auto">
        <p className="mono-tag text-pink-300">storyboard</p>
        <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
          Pilot — dört sahnede bir hikâye.
        </h2>

        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <SceneFrame
            number="1"
            label="Salon"
            title="Bir hikâye başlıyor."
            description="Bella, Coco ve Joi salondaki pembe sahnede ilk kez bir araya gelir. Marka kuruluş anı."
            src="/bella-coco-joi/sahne-1-salon.jpg"
          />
          <SceneFrame
            number="2"
            label="Kıyafet Deneme"
            title="Liderler en iyisini seçer."
            description="Aynanın önünde komedi: kıyafet kafalara takılır, neşe odadan taşar."
            src="/bella-coco-joi/sahne-2-kiyafet.jpg"
          />
          <SceneFrame
            number="3"
            label="Teras Defile"
            title="Boğaz tanık."
            description="Pembe runway, taç, tutu. Bella, Coco ve Joi Boğaz manzarasında ilk defileyi yapar."
            src="/bella-coco-joi/sahne-3-defile.jpg"
            featured
          />
          <SceneFrame
            number="4"
            label="Kapanış"
            title="Yarın daha büyüğünü."
            description="Gün batımı, Boğaz Köprüsü, sonsuz pembe ışık. #BellaCocoJoi başladı."
            src="/bella-coco-joi/sahne-4-kapanis.jpg"
          />
        </ul>
      </section>

      {/* ===== PET COLLECTION COMING SOON ===== */}
      <section className="relative px-6 md:px-10 py-16 md:py-20 max-w-5xl mx-auto">
        <div
          className="rounded-2xl p-8 md:p-12 border border-pink-300/25"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,114,182,0.10) 0%, rgba(212,175,55,0.06) 100%)",
          }}
        >
          <p className="mono-tag text-pink-300">cr pet collection</p>
          <h2 className="editorial mt-3 text-3xl md:text-5xl text-mist-100 leading-tight">
            Çok yakında — koleksiyon yayında.
          </h2>
          <p className="body-readable text-mist-300 mt-4 max-w-2xl">
            Özel tasarım kıyafetler, el yapımı aksesuarlar, yumuşacık konfor,
            sevgiyle üretildi. Çünkü onlar bizim ailemiz.
          </p>

          <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Özel Tasarım", note: "Kıyafetler" },
              { label: "El Yapımı", note: "Aksesuarlar" },
              { label: "Yumuşacık", note: "Konfor" },
              { label: "Sevgiyle", note: "Üretildi" },
            ].map((f) => (
              <li
                key={f.label}
                className="rounded-xl px-4 py-3 border border-pink-300/20 bg-bosphorus-900/40"
              >
                <p className="mono-tag text-tower-gold">{f.label}</p>
                <p className="text-mist-100 text-base mt-1">{f.note}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mailtoLink(
                "Pet Collection bekleme listesi — koleksiyon yayına girince haber verir misiniz?"
              )}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-pink-400/20 border border-pink-300/40 text-pink-100 hover:bg-pink-400/30 transition-colors text-base"
            >
              ✉ Bekleme listesine katıl
            </a>
            <a
              href={whatsappLink(
                "Merhaba, CR Pet Collection hakkında bilgi almak istiyorum."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-mist-100/5 border border-mist-500/25 text-mist-200 hover:text-tower-gold hover:border-tower-gold/40 transition-colors text-base"
            >
              WhatsApp ile sor
            </a>
          </div>

          <p className="mono-tag text-mist-500 mt-6">
            #BellaCocoJoi · #CRPetCollection
          </p>
        </div>
      </section>

      {/* ===== KAPANIŞ NAV ===== */}
      <section className="relative px-6 md:px-10 py-12 md:py-16 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-between items-center border-t border-mist-500/10 pt-8">
          <Link
            href="/"
            className="mono-tag text-mist-500 hover:text-tower-gold transition-colors"
          >
            ← CR Yapım ana sayfa
          </Link>
          <Link
            href="/studio"
            className="mono-tag text-mist-500 hover:text-tower-gold transition-colors"
          >
            Stüdyoyu keşfet →
          </Link>
        </div>
      </section>
    </div>
  );
}

function CharacterCard({
  name,
  role,
  breed,
  quote,
  color,
  accent,
}: {
  name: string;
  role: string;
  breed: string;
  quote: string;
  color: string;
  accent: string;
}) {
  return (
    <li
      className={`rounded-2xl p-6 border border-pink-300/20 bg-gradient-to-b ${color} to-transparent`}
    >
      <p className={`mono-tag ${accent}`}>{role}</p>
      <p className="editorial text-3xl text-mist-100 mt-2 leading-tight">
        {name}
      </p>
      <p className="text-mist-400 text-sm mt-1">{breed}</p>
      <p className="body-readable italic text-mist-200 mt-4">“{quote}”</p>
    </li>
  );
}

function SceneFrame({
  number,
  label,
  title,
  description,
  src,
  featured,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  src: string;
  featured?: boolean;
}) {
  return (
    <li
      className={`group rounded-2xl overflow-hidden border ${
        featured
          ? "border-pink-300/40 ring-1 ring-pink-300/20"
          : "border-mist-500/15"
      } bg-bosphorus-900/30`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={`Sahne ${number} — ${label}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
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
          className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wider text-pink-100 bg-pink-500/30 backdrop-blur-md rounded-full px-3 py-1 border border-pink-200/30"
          aria-hidden
        >
          Sahne {number} · {label}
        </span>
      </div>
      <div className="p-6">
        <p className="editorial text-xl md:text-2xl text-mist-100 leading-tight">
          {title}
        </p>
        <p className="text-base text-mist-400 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </li>
  );
}
