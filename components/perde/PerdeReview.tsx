import Link from "next/link";
import type { FilmReview } from "@/data/perde-archive";
import { SpoilerVeil } from "./SpoilerVeil";

/**
 * PerdeReview — bir filmin yapılandırılmış Perde yorumu.
 *
 * Server component. İki kaynaktan beslenebilir:
 *   1. Curated (data/perde-archive.ts) — CR YAPIM ekibi yazmış.
 *   2. Community (KV cache, AI üretimi) — community prop ile işaretlenir.
 *
 * Tasarım: makale tarzı, kartlar arasında akış. Kırmızı sinema perdesi
 * accent rengi (#c95a5a) sayfa boyunca dominant. Tek interaktif parça
 * SpoilerVeil — heavy spoiler içeren bloklar için "açmak için tıkla" örtüsü.
 */

const ACCENT = "#c95a5a";

export type CommunityMeta = {
  /** Cache'lendiği zaman (epoch ms) */
  askedAt: number;
  /** Kaç defa daha sonra görüntülendiği */
  hitCount: number;
};

export function PerdeReview({
  review,
  community,
}: {
  review: FilmReview;
  /** Verildiyse "topluluk yorumu" bandı görüntülenir */
  community?: CommunityMeta;
}) {
  const isCommunity = !!community;
  const hasMeta = review.filmYear || review.filmCountry || review.filmDirector;

  return (
    <article className="space-y-10">
      {/* Künye — telifli film posteri/karesi KULLANILMAZ; sadece metin */}
      <header className="space-y-4">
        <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="mono-tag-lg px-3 py-1 rounded-full"
            style={{
              color: ACCENT,
              border: `1px solid ${ACCENT}55`,
              background: `${ACCENT}10`,
            }}
          >
            ◧ Perde
          </span>
          {hasMeta && (
            <>
              {(review.filmYear || review.filmCountry) && (
                <span className="mono-tag text-mist-500">
                  {[review.filmYear, review.filmCountry]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              )}
              {review.filmDirector && (
                <span className="mono-tag text-mist-500">
                  · {review.filmDirector}
                </span>
              )}
            </>
          )}
          {isCommunity && (
            <span
              className="mono-tag px-2.5 py-0.5 rounded-full"
              style={{
                color: ACCENT,
                background: `${ACCENT}18`,
                border: `1px solid ${ACCENT}40`,
              }}
              title="Bu yorum bir kullanıcının sorusu üzerine Caelinus AI tarafından üretildi"
            >
              topluluk · ai üretimi
            </span>
          )}
          {review.spoilerLevel !== "none" && (
            <span
              className="mono-tag px-2.5 py-0.5 rounded-full"
              style={{
                color: ACCENT,
                background: `${ACCENT}18`,
                border: `1px solid ${ACCENT}40`,
              }}
            >
              {review.spoilerLevel === "heavy"
                ? "spoiler içerir"
                : "hafif spoiler"}
            </span>
          )}
        </div>

        <h1 className="editorial text-4xl md:text-6xl lg:text-7xl text-mist-100 leading-[1.02]">
          {review.filmTitle}
        </h1>
        {review.filmOriginalTitle &&
          review.filmOriginalTitle !== review.filmTitle && (
            <p className="editorial-italic text-xl md:text-2xl text-mist-300">
              {review.filmOriginalTitle}
            </p>
          )}

        {/* Tek satır öz — vitrin cümlesi */}
        {review.oz && (
          <p
            className="editorial-italic text-2xl md:text-3xl leading-snug pt-4 max-w-3xl"
            style={{ color: ACCENT }}
          >
            “{review.oz}”
          </p>
        )}
        </div>
      </header>

      {/* Topluluk banner — sadece community ise */}
      {isCommunity && community && (
        <CommunityBanner meta={community} />
      )}

      {/* ▣ KONU — yüzeysel hikâye, asla spoiler */}
      {review.konu && (
        <Section
          symbol="▣"
          title="KONU"
          accent={ACCENT}
          subline="yüzeysel hikâye — perde önündeki film"
        >
          <p className="body-readable text-mist-100/90">{review.konu}</p>
        </Section>
      )}

      {/* ◧ ALTINDAKİ — gerçek tema. Heavy spoiler ise veil. */}
      {review.altindaki && (
        <Section
          symbol="◧"
          title="ALTINDAKİ"
          accent={ACCENT}
          subline="perde aralanır — filmin gerçekten anlattığı"
        >
          <SpoilerVeil
            accent={ACCENT}
            active={review.spoilerLevel === "heavy"}
            label="ALTINDAKİ — spoiler içerir, perdeyi aralamak için tıkla"
          >
            <p className="body-readable text-mist-100/90">{review.altindaki}</p>
          </SpoilerVeil>
        </Section>
      )}

      {/* ◈ SEMBOL — bir motif. Heavy spoiler ise veil. */}
      {review.sembol && (review.sembol.metin || review.sembol.baslik) && (
        <Section
          symbol="◈"
          title={
            review.sembol.baslik
              ? `SEMBOL · ${review.sembol.baslik}`
              : "SEMBOL"
          }
          accent={ACCENT}
          subline="bir motif, bir sahne — neyin işareti"
        >
          <SpoilerVeil
            accent={ACCENT}
            active={review.spoilerLevel === "heavy"}
            label="SEMBOL — perdeyi aralamak için tıkla"
          >
            <p className="body-readable text-mist-100/90">
              {review.sembol.metin}
            </p>
          </SpoilerVeil>
        </Section>
      )}

      {/* ◇ NİYET / ALGI — varsa */}
      {review.niyet && (
        <Section
          symbol="◇"
          title="NİYET / ALGI"
          accent={ACCENT}
          subline="yönetmenin niyeti — izleyicinin algısı"
        >
          <p className="body-readable text-mist-100/90">{review.niyet}</p>
        </Section>
      )}

      {/* → Yeniden izlersen şuna dikkat et */}
      {review.izleDikkat && (
        <Section
          symbol="→"
          title="YENİDEN İZLERSEN"
          accent={ACCENT}
          subline="ikinci izleyişte fark edebileceğin"
        >
          <p className="body-readable text-mist-100/90">{review.izleDikkat}</p>
        </Section>
      )}

      {/* Benzer filmler */}
      {review.benzerFilmler.length > 0 && (
        <Section
          symbol="◆"
          title="BENZER FİLMLER"
          accent={ACCENT}
          subline="bu filmi sevdiysen perde'nin önerisi"
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {review.benzerFilmler.map((s, i) => {
              const inner = (
                <div
                  className="rounded-xl px-5 py-4 transition-all"
                  style={{
                    border: `1px solid ${ACCENT}30`,
                    background: "rgba(7, 6, 15, 0.35)",
                  }}
                >
                  <p
                    className="editorial text-lg text-mist-100"
                    style={s.slug ? { color: ACCENT } : undefined}
                  >
                    {s.title}
                    {s.slug && (
                      <span className="mono-tag ml-2 opacity-70">
                        arşivde →
                      </span>
                    )}
                  </p>
                  {s.director && (
                    <p className="mono-tag text-mist-500 mt-1">
                      yönetmen · {s.director}
                    </p>
                  )}
                </div>
              );
              return (
                <li key={`${s.title}-${i}`}>
                  {s.slug ? (
                    <Link
                      href={`/perde/m/${s.slug}`}
                      className="block hover:opacity-90 transition-opacity"
                    >
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </article>
  );
}

/* ---------- alt bileşenler ---------- */

function CommunityBanner({ meta }: { meta: CommunityMeta }) {
  const askedDate = new Date(meta.askedAt);
  const dateLabel = askedDate.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <aside
      className="rounded-2xl p-5 md:p-6 flex flex-wrap items-center gap-3 md:gap-5"
      style={{
        border: `1px dashed ${ACCENT}55`,
        background: `${ACCENT}10`,
      }}
    >
      <span
        aria-hidden
        className="text-2xl shrink-0 leading-none"
        style={{ color: ACCENT, textShadow: `0 0 16px ${ACCENT}55` }}
      >
        ◇
      </span>
      <div className="flex-1 min-w-[16rem]">
        <p className="mono-tag-lg" style={{ color: ACCENT }}>
          topluluk yorumu
        </p>
        <p className="body-readable text-mist-100/85 mt-1">
          Bu yorum, bir izleyicinin Perde'ye yönelttiği soru üzerine{" "}
          <span style={{ color: ACCENT }}>Caelinus AI</span> tarafından
          üretildi. Künye bilgileri eksik olabilir; AI yapımı her yorum gibi
          ikinci izleyişte kendi gözünle de bakman tavsiye edilir.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="mono-tag text-mist-500">{dateLabel}</span>
        {meta.hitCount > 0 && (
          <span
            className="mono-tag px-2.5 py-1 rounded-full"
            style={{
              color: ACCENT,
              border: `1px solid ${ACCENT}40`,
            }}
            title={`Bu yorum cache'ten ${meta.hitCount} defa görüntülendi`}
          >
            {meta.hitCount + 1} kez okundu
          </span>
        )}
      </div>
    </aside>
  );
}

function Section({
  symbol,
  title,
  subline,
  accent,
  children,
}: {
  symbol: string;
  title: string;
  subline?: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl p-6 md:p-8"
      style={{
        border: `1px solid ${accent}25`,
        background: "rgba(10, 7, 25, 0.45)",
      }}
    >
      <header className="flex items-baseline gap-3 mb-4">
        <span
          aria-hidden
          className="text-2xl md:text-3xl shrink-0 leading-none"
          style={{ color: accent, textShadow: `0 0 16px ${accent}55` }}
        >
          {symbol}
        </span>
        <div className="min-w-0">
          <p
            className="mono-tag-lg"
            style={{ color: accent, letterSpacing: "0.12em" }}
          >
            {title}
          </p>
          {subline && (
            <p className="mono-tag text-mist-500 mt-1">{subline}</p>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}
