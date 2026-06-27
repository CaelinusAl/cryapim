import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programBySlug } from "@/data/programs";
import {
  episodeBySlug,
  episodesByProgram,
  allEpisodeParams,
  formatDate,
  formatDuration,
} from "@/data/episodes";
import { VideoPlayer } from "@/components/video/VideoPlayer";

type Params = { slug: string; ep: string };

export function generateStaticParams() {
  return allEpisodeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, ep } = await params;
  const program = programBySlug(slug);
  const episode = episodeBySlug(slug, ep);
  if (!program || !episode) return { title: "Bölüm bulunamadı" };
  return {
    title: `${episode.title} — ${program.title}`,
    description: episode.description,
    openGraph: {
      title: `${episode.title} · ${program.title}`,
      description: episode.description,
      images: episode.poster ? [{ url: episode.poster }] : undefined,
      type: "video.episode",
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, ep } = await params;
  const program = programBySlug(slug);
  const episode = episodeBySlug(slug, ep);
  if (!program || !episode) notFound();

  const siblings = episodesByProgram(program.slug)
    .filter((e) => e.slug !== episode.slug)
    .slice(0, 5);

  const isComingSoon =
    episode.video.provider === "placeholder" &&
    episode.video.reason !== "lost";

  return (
    <article
      className="relative pt-4 pb-24"
      style={{
        background: `radial-gradient(ellipse 100% 60% at 50% 0%, ${program.surface} 0%, transparent 70%)`,
      }}
    >
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        {/* Geri dön — programın detay sayfasına */}
        <Link
          href={`/yapimlar/${program.slug}`}
          className="mono-tag transition-colors"
          style={{ color: program.accent }}
        >
          ← {program.title}
        </Link>

        {/* Player — sinematik, büyük */}
        <div className="mt-6 crane-in">
          <VideoPlayer
            episode={episode}
            accent={program.accent}
            programSymbol={program.symbol}
            programTitle={program.title}
          />
        </div>

        {/* Bölüm meta + başlık */}
        <header className="mt-8 crane-in">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="mono-tag-lg" style={{ color: program.accent }}>
              Bölüm {String(episode.episodeNumber).padStart(2, "0")}
            </span>
            <span className="mono-tag text-mist-500">
              {formatDate(episode.publishedAt)}
            </span>
            <span className="mono-tag text-mist-500">
              · {formatDuration(episode.durationSec)}
            </span>
            {isComingSoon && (
              <span
                className="mono-tag px-2.5 py-1 rounded-full border"
                style={{
                  color: program.accent,
                  borderColor: `${program.accent}66`,
                  background: `${program.accent}10`,
                }}
              >
                yakında
              </span>
            )}
          </div>

          <h1 className="editorial mt-6 text-4xl md:text-6xl leading-[1.05] text-mist-100">
            {episode.title}
          </h1>
          <p className="body-readable text-mist-100/90 mt-6 max-w-3xl">
            {episode.description}
          </p>
        </header>

        {/* AI uzantı + diğer bölümler — yan yana */}
        <section className="mt-16 grid md:grid-cols-3 gap-10">
          <aside className="space-y-6 md:col-span-1">
            {/* Programa dön */}
            <div
              className="rounded-2xl p-6"
              style={{ border: `1px solid ${program.accent}30` }}
            >
              <p className="mono-tag text-mist-500">program</p>
              <p
                className="editorial text-2xl mt-3"
                style={{ color: program.accent }}
              >
                {program.symbol} {program.title}
              </p>
              <p className="editorial-italic text-mist-300 text-lg mt-2 leading-snug">
                “{program.tagline}”
              </p>
              <Link
                href={`/yapimlar/${program.slug}`}
                className="mono-tag mt-4 inline-flex items-center gap-2 transition-colors"
                style={{ color: program.accent }}
              >
                Tüm bölümler →
              </Link>
            </div>
          </aside>

          {/* Diğer bölümler */}
          <div className="md:col-span-2">
            <p className="mono-tag text-mist-500 mb-5">
              {program.title}'in diğer bölümleri
            </p>
            {siblings.length === 0 ? (
              <p className="text-mist-300 text-base">
                Bu programın başka bölümü henüz arşivde değil.
              </p>
            ) : (
              <ul className="space-y-3">
                {siblings.map((s) => {
                  const placeholder = s.video.provider === "placeholder";
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/yapimlar/${program.slug}/${s.slug}`}
                        className="block rounded-2xl border border-mist-500/20 hover:border-tower-gold/50 p-5 transition-all group"
                        style={{
                          background: `linear-gradient(180deg, ${program.surface} 0%, transparent 100%)`,
                        }}
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span
                            className="mono-tag-lg"
                            style={{ color: program.accent }}
                          >
                            B{String(s.episodeNumber).padStart(2, "0")}
                          </span>
                          <span className="mono-tag text-mist-500">
                            {formatDuration(s.durationSec)}
                          </span>
                        </div>
                        <p className="editorial text-xl text-mist-100 mt-2 group-hover:text-tower-gold transition-colors">
                          {s.title}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="mono-tag text-mist-500">
                            {formatDate(s.publishedAt)}
                          </span>
                          {placeholder && (
                            <span className="mono-tag text-mist-500">
                              · yakında
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
