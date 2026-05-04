"use client";

import Link from "next/link";

/**
 * BookCTA — "Randevu Al" butonu.
 *
 * Davranış sırası (env-driven, kullanıcı sonradan ekleyecek):
 *   1. NEXT_PUBLIC_BOOKING_CALENDLY varsa → Calendly linkine git (yeni sekme)
 *   2. NEXT_PUBLIC_BOOKING_WHATSAPP varsa → wa.me/{numara}?text={mesaj}
 *   3. Hiçbiri yoksa → /iletisim sayfasına yönlendir (form fallback)
 *
 * Numara format: env'a uluslararası "+90555..." veya sadece "905555..." (her
 * ikisi de çalışır; kod baştaki + ve boşlukları temizler). Mesaj URL-encoded.
 *
 * Variant:
 *   - "primary" → altın dolgu (ana CTA, hero)
 *   - "ghost"   → cam çerçeve (ikincil CTA, içerik içinde)
 *   - "outline" → ince altın çerçeve, transparent (kart içi)
 */

export type BookCTAProps = {
  label?: string;
  /** WhatsApp/email mesajına eklenecek ek bağlam (örn. seçilen paket adı) */
  context?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  /** Buton önündeki ikon (varsayılan: 📅) */
  icon?: string;
  /** Yeni sekmede aç (Calendly + WhatsApp her zaman yeni sekme) */
  size?: "sm" | "md" | "lg";
};

const DEFAULT_MESSAGE =
  "Merhaba CR Yapım! Stüdyonuzda randevu almak istiyorum.";

export function BookCTA({
  label = "Randevu Al",
  context,
  variant = "primary",
  className = "",
  icon = "📅",
  size = "md",
}: BookCTAProps) {
  const calendly = process.env.NEXT_PUBLIC_BOOKING_CALENDLY;
  const whatsapp = process.env.NEXT_PUBLIC_BOOKING_WHATSAPP;

  const message = context
    ? `${DEFAULT_MESSAGE} (${context})`
    : DEFAULT_MESSAGE;

  let href = "/iletisim";
  let isExternal = false;

  if (calendly) {
    href = calendly;
    isExternal = true;
  } else if (whatsapp) {
    const cleaned = whatsapp.replace(/[^\d]/g, "");
    href = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
    isExternal = true;
  }

  const sizeCls =
    size === "lg"
      ? "px-7 py-4 text-base md:text-lg"
      : size === "sm"
      ? "px-4 py-2 text-sm"
      : "px-5 py-3 text-base";

  const variantCls =
    variant === "primary"
      ? "bg-tower-gold text-night-950 hover:bg-tower-gold/90 shadow-[0_0_36px_-6px_var(--color-tower-gold)]"
      : variant === "ghost"
      ? "bg-night-900/60 backdrop-blur border border-tower-gold/40 text-tower-gold hover:bg-tower-gold/10"
      : "border border-tower-gold/50 text-tower-gold hover:bg-tower-gold/10";

  const inner = (
    <>
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  const cls = `group inline-flex items-center gap-3 mono-tag rounded-full transition-all ${sizeCls} ${variantCls} ${className}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/**
 * WhatsAppLink — sadece WhatsApp ikonu+link, ikincil yerlerde
 * kullanılan kompakt buton. Numara yoksa /iletisim'e düşer.
 */
export function WhatsAppLink({
  label = "WhatsApp",
  context,
  className = "",
}: {
  label?: string;
  context?: string;
  className?: string;
}) {
  const whatsapp = process.env.NEXT_PUBLIC_BOOKING_WHATSAPP;
  const message = context
    ? `${DEFAULT_MESSAGE} (${context})`
    : DEFAULT_MESSAGE;

  if (!whatsapp) {
    return (
      <Link
        href="/iletisim"
        className={`mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold transition-colors ${className}`}
      >
        💬 {label}
      </Link>
    );
  }
  const cleaned = whatsapp.replace(/[^\d]/g, "");
  return (
    <a
      href={`https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold transition-colors ${className}`}
    >
      💬 {label}
    </a>
  );
}
