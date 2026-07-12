"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/contact";
import type { SanriContent } from "@/content/sanri";

/**
 * SanriNewsletter — "Gelişmelerden Haberdar Ol" bülten kaydı.
 *
 * Bülten backend'i yok; friction'sız kalması için gönderim bir mailto
 * isteğine dönüşür (kullanıcının mail uygulaması açılır, kayıt CR Yapım'a
 * düşer). İleride gerçek bir endpoint'e (Resend/Buttondown vb.) bağlanabilir.
 */
export function SanriNewsletter({ content }: { content: SanriContent["newsletter"] }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim();
    if (!clean) return;
    const subject = "Sanrı — Bülten Kaydı";
    const body = `Merhaba,\n\nSanrı evreninden gelişmeler için bülten listesine katılmak istiyorum.\n\nE-posta: ${clean}\n\nTeşekkürler.`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="body-readable text-mist-200 max-w-md" role="status">
        {content.successNote}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="flex items-center gap-2 border-b border-mist-500/30 focus-within:border-[color:var(--sanri-accent)] transition-colors py-2">
        <label htmlFor="sanri-newsletter" className="sr-only">
          {content.placeholder}
        </label>
        <input
          id="sanri-newsletter"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={content.placeholder}
          className="flex-1 bg-transparent text-mist-100 placeholder:text-mist-500 outline-none body-readable"
        />
        <button
          type="submit"
          aria-label={content.submitLabel}
          className="shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center transition-colors"
          style={{
            color: "var(--sanri-accent)",
            border: "1px solid color-mix(in srgb, var(--sanri-accent) 50%, transparent)",
          }}
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
