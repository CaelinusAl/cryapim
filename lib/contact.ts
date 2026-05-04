/**
 * CR YAPIM iletişim bilgileri — tek kaynak.
 *
 * Hardcode değerler aşağıda; env varsa env override eder. Bu sayede
 * Vercel'e env eklenmemiş olsa da site canlı çalışır, kullanıcı
 * istediği zaman env üzerinden değiştirebilir.
 *
 * Değişen değer için:
 *   .env.local → NEXT_PUBLIC_CONTACT_PHONE=...
 *   Vercel Settings → Environment Variables → aynısı
 */

const HARDCODED_PHONE = "+90 533 222 22 21";
const HARDCODED_WHATSAPP = "905332222221"; // sadece rakam, intl kod dahil
const HARDCODED_EMAIL = "hello@cryapim.com";
const HARDCODED_INSTAGRAM = "https://instagram.com/cryapim";
const HARDCODED_YOUTUBE = "https://youtube.com/@cryapim";

export const CONTACT = {
  /** Görüntülenecek telefon (insan-okuyabilir) */
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? HARDCODED_PHONE,
  /** WhatsApp wa.me linki için sadece rakam (intl kod dahil) */
  whatsapp:
    (process.env.NEXT_PUBLIC_BOOKING_WHATSAPP || HARDCODED_WHATSAPP).replace(
      /[^\d]/g,
      ""
    ),
  /** İletişim e-postası */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? HARDCODED_EMAIL,
  /** Instagram URL */
  instagram: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM ?? HARDCODED_INSTAGRAM,
  /** YouTube URL */
  youtube: process.env.NEXT_PUBLIC_CONTACT_YOUTUBE ?? HARDCODED_YOUTUBE,
  /** Calendly takvim linki — opsiyonel; varsa Randevu Al butonu önce buraya yönlenir */
  calendly: process.env.NEXT_PUBLIC_BOOKING_CALENDLY ?? "",
} as const;

/**
 * WhatsApp paylaşım linki üret. context varsa hazır mesaja eklenir
 * (örn. "Paket: PRO" → kullanıcı hangi paketten yazdığını bildirir).
 */
export function whatsappLink(context?: string): string {
  const baseMsg = "Merhaba CR Yapım! Stüdyonuzda randevu almak istiyorum.";
  const msg = context ? `${baseMsg} (${context})` : baseMsg;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/**
 * mailto: linki üret. context varsa konu ve gövdeye eklenir.
 */
export function mailtoLink(context?: string): string {
  const subject = context
    ? `CR Yapım Stüdyo — Randevu (${context})`
    : "CR Yapım Stüdyo — Randevu";
  const body =
    "Merhaba,\n\nStüdyonuzda randevu almak istiyorum.\n\n— Tarih:\n— Paket:\n— Ekip büyüklüğü:\n— Çekim tipi:\n\nTeşekkürler.";
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

/** İnsan-okuyabilir telefon → tıklanabilir tel: */
export function telLink(): string {
  return `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;
}
