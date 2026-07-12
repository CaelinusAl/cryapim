"use client";

import { useState, type FormEvent } from "react";
import type { ContactFormContent } from "@/content/types";
import { SECTION_IDS } from "@/content/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT, whatsappLink } from "@/lib/contact";

/**
 * ContactForm — Bölüm 7: İLETİŞİM (sürtünmesiz form).
 *
 * Alanlar: ad/marka · e-posta · proje türü · kısa fikir · (ops.) bütçe ·
 * görüşme talebi. Backend henüz yok → gönderim, kullanıcının kendi mail
 * istemcisinde önden-doldurulmuş bir e-posta açar (mailto, güvenilir ve
 * dürüst). İleride /api/contact veya form servisi buraya takılabilir.
 * Gönderim sonrası net onay: "Aldık. 48 saat içinde döneriz."
 */
export function ContactForm({ content }: { content: ContactFormContent }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("type") ?? "");
    const idea = String(data.get("idea") ?? "");
    const budget = String(data.get("budget") ?? "");
    const call = data.get("call") ? "Evet" : "Hayır";

    const subject = `CR Yapım — Yeni fikir: ${name || "isimsiz"}`;
    const body = [
      `Ad / marka: ${name}`,
      `E-posta: ${email}`,
      `Proje türü: ${type}`,
      `Bütçe: ${budget}`,
      `Görüşme talebi: ${call}`,
      "",
      "Fikir:",
      idea,
    ].join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section
      id={SECTION_IDS.contactForm}
      className="relative px-6 md:px-10 py-20 md:py-28 max-w-3xl mx-auto scroll-mt-24"
    >
      <SectionHeading kicker={content.kicker} title={content.title} lead={content.lead} />

      {sent ? (
        <div
          className="mt-12 rounded-3xl p-10 md:p-14 text-center"
          role="status"
          aria-live="polite"
          style={{ border: "1px solid rgba(201,169,106,0.28)", background: "rgba(201,169,106,0.06)" }}
        >
          <p className="editorial text-4xl md:text-5xl text-tower-gold">{content.successTitle}</p>
          <p className="body-readable text-mist-300 mt-4 max-w-md mx-auto">{content.successNote}</p>
          <a
            href={whatsappLink("Ana sayfa · Fikrini anlat")}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-tag mt-8 inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold transition-colors"
          >
            WhatsApp'tan da yazabilirsin <span aria-hidden>→</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Ad / marka" htmlFor="cf-name">
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
              />
            </Field>
            <Field label="E-posta" htmlFor="cf-email">
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Proje türü" htmlFor="cf-type">
              <select id="cf-type" name="type" className={inputClass} defaultValue="">
                <option value="" disabled>
                  Seç…
                </option>
                {content.projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Bütçe aralığı (opsiyonel)" htmlFor="cf-budget">
              <select id="cf-budget" name="budget" className={inputClass} defaultValue="">
                <option value="">Belirtmek istemiyorum</option>
                {content.budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Kısa fikir" htmlFor="cf-idea">
            <textarea
              id="cf-idea"
              name="idea"
              required
              rows={4}
              placeholder="Aklındaki fikri birkaç cümleyle anlat…"
              className={`${inputClass} resize-y`}
            />
          </Field>

          <label className="flex items-center gap-3 text-mist-300 body-readable cursor-pointer">
            <input
              type="checkbox"
              name="call"
              className="h-4 w-4 rounded border-border-subtle bg-transparent accent-[color:var(--color-tower-gold)]"
            />
            Kısa bir görüşme istiyorum.
          </label>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="submit"
              className="group inline-flex items-center gap-2.5 mono-tag rounded-full px-7 py-4 border border-tower-gold/55 text-tower-gold hover:bg-tower-gold/10 transition-colors"
            >
              {content.submitLabel}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <span className="mono-tag text-mist-500 normal-case tracking-normal">
              ya da {CONTACT.email}
            </span>
          </div>
        </form>
      )}
    </section>
  );
}

const inputClass =
  "w-full rounded-xl bg-night-900/60 border border-border-subtle px-4 py-3 text-mist-100 body-readable outline-none transition-colors focus:border-tower-gold/50";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="mono-tag text-mist-300 normal-case tracking-normal">
        {label}
      </label>
      {children}
    </div>
  );
}
