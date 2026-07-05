import { Reveal } from "@/components/reveal";

interface PageHeroProps {
  label: string;
  titlePre?: string;
  titleEm: string;
  titlePost?: string;
  lead?: string;
}

/**
 * İç sayfa girişi: mono BÜYÜK HARF etiket + serif başlık (italik altın vurgu)
 * + kısa lead. Altında ince altın ayraç.
 */
export function PageHero({
  label,
  titlePre,
  titleEm,
  titlePost,
  lead,
}: PageHeroProps) {
  return (
    <header className="px-6 pt-[clamp(8rem,16vw,12rem)] sm:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-8 text-[0.68rem] font-medium uppercase tracking-[0.45em] text-gold">
            {label}
          </p>
          <h1 className="font-serif text-[clamp(2.4rem,6.5vw,4.8rem)] leading-[1.08] text-ink">
            {titlePre ? <>{titlePre} </> : null}
            <em className="italic text-gold">{titleEm}</em>
            {titlePost ? <> {titlePost}</> : null}
          </h1>
          {lead ? (
            <p className="mt-8 max-w-2xl text-[0.88rem] leading-relaxed text-muted">
              {lead}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-16 h-px w-full bg-gold/20" aria-hidden="true" />
      </div>
    </header>
  );
}
