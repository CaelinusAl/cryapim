import Link from "next/link";
import { programs } from "@/data/programs";

export default function HomePage() {
  return (
    <div>
      <section className="relative min-h-[88vh] flex items-end px-6 md:px-10 pb-20">
        <div className="relative max-w-5xl crane-in">
          <p className="mono-tag text-tower-gold/80">
            cryapim.com · {new Date().getFullYear()}
          </p>
          <h1 className="editorial mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-mist-100">
            Boğaz'da bir plato.
            <br />
            <span className="text-mist-300">Kız Kulesi tanık.</span>
            <br />
            <span className="editorial-italic text-tower-gold">
              Caelinus AI sufle veriyor.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-mist-300 leading-relaxed crane-in-slow">
            CR YAPIM, İstanbul'un iki yakası arasında — denizin, sisin ve
            yapay zekânın bir araya geldiği bir platoda — zamanı yavaşlatmak
            için çekim yapan ruhsal bir yapım evidir.
          </p>

          <div className="mt-12 flex flex-wrap gap-3 crane-in-slow">
            <Link
              href="/yapimlar"
              className="group inline-flex items-center gap-3 mono-tag bg-tower-gold/90 hover:bg-tower-gold text-night-950 px-5 py-3 rounded-full transition-colors"
            >
              Altı Programa Bak
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/plato"
              className="group inline-flex items-center gap-3 mono-tag border border-ai-cyan/40 text-ai-cyan hover:bg-ai-cyan/10 px-5 py-3 rounded-full transition-colors"
            >
              Plato'yu Dolaş
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                ◐
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-24 max-w-6xl mx-auto">
        <p className="mono-tag text-mist-500">manifesto</p>
        <p className="editorial mt-4 text-2xl md:text-4xl leading-snug text-mist-100 max-w-4xl">
          Burada zaman, kameranın değil,{" "}
          <span className="editorial-italic text-tower-gold">
            niyetin
          </span>{" "}
          hızında akar. Altı program, tek bir plato, tek bir gözcü kule.
          Caelinus AI sahnenin sessiz oyuncusudur.
        </p>
      </section>

      <section className="relative px-6 md:px-10 pb-12 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="mono-tag text-mist-500">yapımlar</p>
            <h2 className="editorial text-3xl md:text-4xl text-mist-100 mt-2">
              Altı bölüm, tek bir plato.
            </h2>
          </div>
          <Link
            href="/yapimlar"
            className="mono-tag text-tower-gold hover:text-mist-100 transition-colors"
          >
            Tümü →
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {programs.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/yapimlar/${p.slug}`}
                className="group block rounded-2xl border border-mist-500/20 hover:border-tower-gold/50 transition-all p-6 md:p-7 h-full"
                style={{
                  background: `linear-gradient(180deg, ${p.surface} 0%, transparent 100%)`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-2xl mb-5"
                  style={{
                    color: p.accent,
                    border: `1px solid ${p.accent}55`,
                  }}
                >
                  {p.symbol}
                </div>
                <p className="editorial text-2xl md:text-[1.7rem] text-mist-100 leading-tight">
                  {p.title}
                </p>
                <p className="editorial-italic text-lg md:text-xl text-mist-300 mt-3 leading-snug">
                  {p.tagline}
                </p>
                <p className="mono-tag mt-5 text-mist-500 group-hover:text-tower-gold transition-colors">
                  {p.cadence}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
