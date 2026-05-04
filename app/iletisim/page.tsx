import type { Metadata } from "next";
import Link from "next/link";
import {
  CONTACT,
  whatsappLink,
  mailtoLink,
  telLink,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "İletişim — CR Yapım Stüdyo",
  description:
    "WhatsApp, telefon veya e-posta ile bize ulaş. İstanbul Boğaz manzaralı içerik stüdyosu CR Yapım — randevu, paket bilgisi, iş birliği için.",
};

/**
 * İletişim sayfası — form değil; üç doğrudan kanal.
 *
 * Form (mailto) eskiden vardı; pivot sonrası "satış odaklı" akışta
 * üç büyük buton ve net iletişim bilgisi daha doğru. Form ihtiyacı
 * olursa Plausible/Tally/Formspree ile geri eklenebilir.
 */

const ACCENT_GOLD = "#d4b26a";
const ACCENT_GREEN = "#25d366"; // WhatsApp green

export default function IletisimPage() {
  return (
    <div className="px-6 md:px-10 max-w-4xl mx-auto pt-8 pb-24 crane-in">
      <p className="mono-tag text-tower-gold/80">iletişim · randevu · işbirliği</p>
      <h1 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.04]">
        Sahnenin arkasından
        <br />
        <span className="editorial-italic text-tower-gold">
          yanıtlıyoruz.
        </span>
      </h1>

      <p className="body-readable text-mist-300 mt-6 max-w-2xl">
        Stüdyo randevusu, paket detayı, marka iş birliği veya basit bir soru —
        en hızlı yol WhatsApp. Genelde aynı gün dönüyoruz.
      </p>

      {/* Üç ana iletişim kanalı */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        <ChannelCard
          href={whatsappLink("İletişim sayfası")}
          external
          symbol="💬"
          label="WhatsApp"
          title={CONTACT.phone}
          description="En hızlı yol. Hazır mesaj otomatik açılır; sen sadece tarihini ekle."
          accent={ACCENT_GREEN}
          cta="WhatsApp'tan yaz"
        />
        <ChannelCard
          href={telLink()}
          symbol="📞"
          label="Telefon"
          title={CONTACT.phone}
          description="Sesli konuşma. Hafta içi 10:00 — 19:00 arası ulaşabilirsin."
          accent={ACCENT_GOLD}
          cta="Şimdi ara"
        />
        <ChannelCard
          href={mailtoLink("İletişim sayfası")}
          symbol="✉"
          label="E-posta"
          title={CONTACT.email}
          description="Detaylı brief, marka deck'i, davet vb. için en doğru kanal."
          accent={ACCENT_GOLD}
          cta="E-posta yaz"
        />
      </div>

      {/* Lokasyon */}
      <section className="mt-16 rounded-3xl p-8 md:p-10 border border-mist-500/15 bg-night-900/40 backdrop-blur-sm">
        <p className="mono-tag text-tower-gold">lokasyon</p>
        <h2 className="editorial mt-3 text-2xl md:text-3xl text-mist-100 leading-tight">
          İstanbul · Boğaz hattı.
        </h2>
        <p className="body-readable text-mist-400 mt-4 max-w-2xl">
          Mahremiyet için tam adres randevu sonrası WhatsApp'tan iletilir.
          Civar ulaşım (metro, otobüs, otopark) bilgisi de aynı mesajda olur.
        </p>
      </section>

      {/* Sosyal */}
      <section className="mt-12">
        <p className="mono-tag text-mist-500 mb-4">sosyal · sahne arkası</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-tag inline-flex items-center gap-2 border border-mist-500/30 text-mist-200 hover:border-tower-gold hover:text-tower-gold px-5 py-2.5 rounded-full transition-colors"
          >
            ◆ Instagram
          </a>
          <a
            href={CONTACT.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-tag inline-flex items-center gap-2 border border-mist-500/30 text-mist-200 hover:border-tower-gold hover:text-tower-gold px-5 py-2.5 rounded-full transition-colors"
          >
            ▶︎ YouTube
          </a>
          <Link
            href="/studio"
            className="mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold px-5 py-2.5 transition-colors"
          >
            stüdyoyu keşfet →
          </Link>
        </div>
      </section>

      <p className="mt-12 mono-tag text-mist-500">
        cr yapım · cryapim.com · {new Date().getFullYear()}
      </p>
    </div>
  );
}

function ChannelCard({
  href,
  external,
  symbol,
  label,
  title,
  description,
  accent,
  cta,
}: {
  href: string;
  external?: boolean;
  symbol: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  cta: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group block rounded-2xl p-6 transition-all"
      style={{
        border: `1px solid ${accent}33`,
        background: `linear-gradient(180deg, ${accent}0d 0%, transparent 100%)`,
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4"
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
      <p className="editorial text-xl md:text-2xl text-mist-100 mt-2 leading-tight break-words">
        {title}
      </p>
      <p className="text-sm md:text-base text-mist-400 mt-3 leading-relaxed">
        {description}
      </p>
      <p
        className="mono-tag mt-5 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
        style={{ color: accent }}
      >
        {cta} →
      </p>
    </a>
  );
}
