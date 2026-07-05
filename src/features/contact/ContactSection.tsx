"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Reveal } from "@/components/reveal";
import type { Content } from "@/lib/content";

const contactSchema = z.object({
  name: z.string().min(2, "Lütfen adınızı yazın."),
  email: z.email("Geçerli bir e-posta adresi girin."),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalı."),
});

type ContactValues = z.infer<typeof contactSchema>;

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full border border-gold/20 bg-black px-4 py-3 text-[0.85rem] text-ink placeholder:text-dim focus:border-gold focus:outline-none transition-colors";

export function ContactSection({ content }: { content: Content["cta"] }) {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="commission"
      className="border-t border-gold/20 px-6 py-[clamp(5rem,9vw,9rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="mb-6 font-serif text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-ink">
            {content.headingPre}{" "}
            <em className="italic text-gold">{content.headingEm}</em>{" "}
            {content.headingPost}
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-[0.85rem] leading-relaxed text-muted">
            {content.sub}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mx-auto max-w-xl space-y-6 text-left"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-[0.62rem] uppercase tracking-[0.35em] text-dim"
              >
                {content.form.name}
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                className={inputClass}
                {...register("name")}
              />
              {errors.name ? (
                <p className="mt-2 text-[0.72rem] text-gold">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-[0.62rem] uppercase tracking-[0.35em] text-dim"
              >
                {content.form.email}
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                className={inputClass}
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-2 text-[0.72rem] text-gold">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-[0.62rem] uppercase tracking-[0.35em] text-dim"
              >
                {content.form.message}
              </label>
              <textarea
                id="contact-message"
                rows={5}
                className={`${inputClass} resize-y`}
                {...register("message")}
              />
              {errors.message ? (
                <p className="mt-2 text-[0.72rem] text-gold">
                  {errors.message.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full border border-gold/60 px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-black disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? content.form.sending : content.form.submit}{" "}
              <span aria-hidden="true">→</span>
            </button>

            <div aria-live="polite">
              {status === "success" ? (
                <p className="text-[0.78rem] text-gold">
                  {content.form.success}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-[0.78rem] text-muted">
                  {content.form.error}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>

        <div className="mt-16 flex items-center justify-center gap-6 text-[0.68rem] tracking-[0.25em] text-dim">
          <a
            href={`mailto:${content.email}`}
            className="transition-colors hover:text-gold"
          >
            {content.email}
          </a>
          <span className="h-px w-10 bg-gold/30" />
          <span>{content.loc}</span>
        </div>
      </div>
    </section>
  );
}
