import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programBySlug, programs } from "@/data/programs";
import { PersonaInline } from "@/components/personas/PersonaInline";
import { PersonaOpenButton } from "@/components/personas/PersonaOpenButton";
import { personaForProgram, getPersona } from "@/lib/personas";

type Params = { slug: string };

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = programBySlug(slug);
  if (!p) return { title: "Bulunamadı" };
  return {
    title: `${p.title} — ${p.tagline}`,
    description: p.description,
    openGraph: {
      title: `${p.title} · CR YAPIM`,
      description: p.tagline,
      images: p.realPhoto ? [{ url: p.realPhoto }] : undefined,
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const p = programBySlug(slug);
  if (!p) notFound();

  const others = programs.filter((x) => x.slug !== p.slug).slice(0, 3);
  const persona = personaForProgram(p.slug); // bu programa demir atan AI varsa
  const sanri = getPersona("sanri"); // diğer programlar için varsayılan kapı

  return (
    <article
      className="relative pt-4 pb-24"
      style={{
        background: `radial-gradient(ellipse 100% 60% at 50% 0%, ${p.surface} 0%, transparent 70%)`,
      }}
    >
      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        <Link
          href="/yapimlar"
          className="mono-tag text-mist-300 hover:text-tower-gold transition-colors"
        >
          ← Tüm yapımlar
        </Link>

        <header className="mt-12 crane-in">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{
                color: p.accent,
                border: `1px solid ${p.accent}aa`,
                boxShadow: `0 0 40px -10px ${p.accent}`,
              }}
            >
              {p.symbol}
            </div>
            <div>
              <p className="mono-tag" style={{ color: p.accent }}>
                {p.channel === "youtube"
                  ? "YouTube programı"
                  : p.channel === "instagram"
                    ? "Instagram serisi"
                    : "Podcast"}
              </p>
              <p className="mono-tag text-mist-500">{p.cadence}</p>
            </div>
          </div>

          <h1 className="editorial mt-8 text-5xl md:text-7xl leading-[1.02] text-mist-100">
            {p.title}
          </h1>
          <p
            className="editorial-italic mt-6 text-2xl md:text-3xl leading-snug max-w-3xl"
            style={{ color: p.accent }}
          >
            “{p.tagline}”
          </p>
        </header>

        {p.realPhoto && (
          <figure className="mt-12 crane-in-slow rounded-3xl overflow-hidden border shadow-cinema relative"
            style={{ borderColor: `${p.accent}55` }}
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={p.realPhoto}
                alt={`${p.title} — platodaki gerçek seti`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-950/85 via-night-950/40 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                <p className="mono-tag" style={{ color: p.accent }}>
                  set · {p.platoSeat.label}
                </p>
                <p className="editorial mt-2 text-xl md:text-3xl text-mist-100 leading-tight max-w-2xl">
                  Bu sahne burada çekiliyor.
                </p>
              </figcaption>
            </div>
          </figure>
        )}

        {persona && (
          <section className="mt-12 crane-in-slow">
            <PersonaInline persona={persona} />
          </section>
        )}

        <section className="mt-16 grid md:grid-cols-3 gap-12 crane-in-slow">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="mono-tag text-mist-500">niyet</p>
              <p className="editorial text-2xl md:text-3xl text-mist-100 mt-3 leading-snug">
                {p.hero}
              </p>
            </div>
            <div>
              <p className="mono-tag text-mist-500">program hakkında</p>
              <p className="body-readable text-mist-100/90 mt-3">
                {p.description}
              </p>
            </div>
            <div>
              <p className="mono-tag text-mist-500">imza</p>
              <p className="editorial-italic text-xl md:text-2xl text-mist-300 mt-3 leading-snug">
                {p.signature}
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-mist-500/20 p-6">
              <p className="mono-tag text-mist-500">platodaki yeri</p>
              <p
                className="editorial text-2xl mt-3"
                style={{ color: p.accent }}
              >
                {p.platoSeat.label}
              </p>
              <p className="text-base text-mist-300 mt-3 leading-relaxed">
                Plato sahnesinde tıklanabilir bir kamera olarak yer alır.
              </p>
              <Link
                href="/plato"
                className="mono-tag mt-5 inline-flex items-center gap-2 text-ai-cyan hover:text-mist-100 transition-colors"
              >
                Plato'da gör →
              </Link>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                border: `1px solid ${(persona ?? sanri).accent}40`,
              }}
            >
              <p className="mono-tag text-mist-500">caelinus AI uzantısı</p>
              {persona ? (
                <>
                  <p className="text-base text-mist-100/90 mt-3 leading-relaxed">
                    Bu programın AI'ı <strong style={{ color: persona.accent }}>{persona.name}</strong>{" "}
                    canlı. {persona.tagline}
                  </p>
                  <PersonaOpenButton
                    personaId={persona.id}
                    label={`${persona.name}'ı aç`}
                    accent={persona.accent}
                  />
                </>
              ) : (
                <>
                  <p className="text-base text-mist-100/90 mt-3 leading-relaxed">
                    Bu bölümü Sanrı'nın diliyle uzat — bir kelime, bir sembol,
                    bir geri-soru.
                  </p>
                  <PersonaOpenButton
                    personaId="sanri"
                    question={`${p.title}: ${p.tagline}`}
                    label="Sanrı'ya bu programı sor"
                    accent={sanri.accent}
                  />
                </>
              )}
            </div>

            <div className="rounded-2xl border border-mist-500/20 p-6">
              <p className="mono-tag text-mist-500">izle / takip et</p>
              <ul className="text-base mt-4 space-y-3">
                <li>
                  <a
                    href="https://youtube.com/@cryapim"
                    className="hover:text-tower-gold transition-colors"
                  >
                    YouTube'da kanal →
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/cryapim"
                    className="hover:text-tower-gold transition-colors"
                  >
                    Instagram'da profil →
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="mt-24">
          <p className="mono-tag text-mist-500 mb-6">başka frekanslar</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/yapimlar/${o.slug}`}
                  className="block rounded-2xl border border-mist-500/20 hover:border-tower-gold/50 p-5 transition-all"
                  style={{
                    background: `linear-gradient(180deg, ${o.surface} 0%, transparent 100%)`,
                  }}
                >
                  <span
                    className="text-lg mr-2"
                    style={{ color: o.accent }}
                  >
                    {o.symbol}
                  </span>
                  <span className="editorial text-mist-100">{o.title}</span>
                  <p className="editorial-italic text-sm text-mist-300 mt-1">
                    {o.tagline}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
