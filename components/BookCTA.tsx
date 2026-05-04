"use client";

import Link from "next/link";
import { CONTACT, whatsappLink, mailtoLink } from "@/lib/contact";

/**
 * BookCTA — "Randevu Al" butonu.
 *
 * Davranış sırası (otomatik fallback):
 *   1. CONTACT.calendly (env'den) varsa → Calendly link, yeni sekme
 *   2. Yoksa varsayılan: WhatsApp linki (CONTACT.whatsapp her zaman dolu)
 *
 * "force" prop ile davranış override edilebilir:
 *   force="email"    → mailto: hello@cryapim.com hazır mesaj
 *   force="whatsapp" → wa.me/... hazır mesaj
 *   force="calendly" → calendly URL (yoksa whatsapp'a düşer)
 *
 * Variant:
 *   - "primary" → altın dolgu (ana CTA, hero)
 *   - "ghost"   → cam çerçeve
 *   - "outline" → ince altın çerçeve, transparent
 */

export type BookCTAProps = {
  label?: string;
  /** Hazır mesaja eklenecek bağlam (örn. paket adı) */
  context?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  /** Buton önündeki ikon (varsayılan: 📅) */
  icon?: string;
  size?: "sm" | "md" | "lg";
  /** Davranışı override et */
  force?: "calendly" | "whatsapp" | "email";
};

export function BookCTA({
  label = "Randevu Al",
  context,
  variant = "primary",
  className = "",
  icon = "📅",
  size = "md",
  force,
}: BookCTAProps) {
  let href: string;

  const target = force ?? (CONTACT.calendly ? "calendly" : "whatsapp");

  switch (target) {
    case "calendly":
      href = CONTACT.calendly || whatsappLink(context);
      break;
    case "email":
      href = mailtoLink(context);
      break;
    case "whatsapp":
    default:
      href = whatsappLink(context);
      break;
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

  const cls = `group inline-flex items-center gap-3 mono-tag rounded-full transition-all ${sizeCls} ${variantCls} ${className}`;

  // mailto: ve tel: yeni sekme açmıyor; WhatsApp ve Calendly açıyor
  const shouldOpenInNewTab = target === "calendly" || target === "whatsapp";

  return (
    <a
      href={href}
      target={shouldOpenInNewTab ? "_blank" : undefined}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
      className={cls}
    >
      <span aria-hidden>{icon}</span>
      <span>{label}</span>
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

/**
 * WhatsAppLink — kompakt yeşil yazı linki, ikincil yerlerde.
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
  return (
    <a
      href={whatsappLink(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={`mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold transition-colors ${className}`}
    >
      💬 {label}
    </a>
  );
}

/**
 * EmailLink — kompakt iletişim e-posta linki.
 */
export function EmailLink({
  label,
  context,
  className = "",
}: {
  label?: string;
  context?: string;
  className?: string;
}) {
  return (
    <a
      href={mailtoLink(context)}
      className={`mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold transition-colors ${className}`}
    >
      ✉ {label ?? CONTACT.email}
    </a>
  );
}

/**
 * Tüm bağlantıları yan yana gösteren mini iletişim çubuğu — footer veya
 * Stüdyo sayfası altı için.
 */
export function ContactStrip({
  context,
  className = "",
}: {
  context?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 md:gap-5 ${className}`}
    >
      <BookCTA
        label="Randevu Al"
        variant="primary"
        size="sm"
        context={context}
      />
      <WhatsAppLink label={CONTACT.phone} context={context} />
      <EmailLink context={context} />
    </div>
  );
}
