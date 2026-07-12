import Link from "next/link";
import type { Project, SelectedWorldsContent } from "@/content/types";
import { SECTION_IDS } from "@/content/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SelectedWorlds — Bölüm 3: DÜNYALAR / SEÇİLİ İŞLER ⭐ (kanıt).
 *
 * Her kart bir portföy karesi değil, bir DÜNYAYA açılan portal: üstüne
 * gelince dünya "nefes alır" (hafif yükselir + kendi renginde ışır),
 * tıklayınca dünyaya/vakaya girer. Renk disiplini: kart kromu nötr
 * (antrasit + fildişi + çizgi); dünyanın kendi rengi yalnız portal ışığı
 * ve başlıkta, kontrollü.
 */
export function SelectedWorlds({
  content,
  worlds,
}: {
  content: SelectedWorldsContent;
  worlds: Project[];
}) {
  return (
    <section
      id={SECTION_IDS.selectedWorlds}
      className="relative px-6 md:px-10 py-20 md:py-28 max-w-6xl mx-auto scroll-mt-24"
    >
      <SectionHeading kicker={content.kicker} title={content.title} lead={content.lead} />

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {worlds.map((w, i) => (
          <Reveal as="li" key={w.id} delay={i * 80}>
            <WorldCard world={w} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function WorldCard({ world }: { world: Project }) {
  const accent = world.accent ?? "#c9a96a";
  const body = (
    <article
      className="group relative h-full rounded-2xl overflow-hidden border border-border-subtle bg-night-900/40 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:border-tower-gold/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ ["--world-accent" as string]: accent }}
    >
      {/* Portal ışığı — üstüne gelince dünyanın kendi renginde usulca doğar */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1/3 h-2/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, color-mix(in srgb, var(--world-accent) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      <MediaFrame
        media={world.media}
        accent={accent}
        ratio="16 / 9"
        label={`${world.title} · görsel yakında`}
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="relative p-6">
        <div className="flex items-center gap-3">
          <p className="mono-tag" style={{ color: accent }}>
            {world.title}
          </p>
          {world.status && <span className="mono-tag text-mist-500">· {world.status}</span>}
        </div>
        <p className="editorial-italic text-xl text-mist-100 mt-2 leading-snug">
          {world.tagline}
        </p>
        <p className="body-readable text-mist-300 mt-3">{world.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {world.tags.map((t) => (
            <li
              key={t}
              className="mono-tag text-mist-300 rounded-full border border-border-subtle px-3 py-1"
            >
              {t}
            </li>
          ))}
        </ul>
        {world.href && (
          <p
            className="mono-tag mt-5 inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
            style={{ color: accent }}
          >
            Bu dünyayı gez <span aria-hidden>→</span>
          </p>
        )}
      </div>
    </article>
  );

  if (world.href) {
    return (
      <Link href={world.href} className="block h-full">
        {body}
      </Link>
    );
  }
  return body;
}
