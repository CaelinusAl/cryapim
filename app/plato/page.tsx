import type { Metadata } from "next";
import Image from "next/image";
import { PlatoExperience } from "@/components/plato/PlatoExperience";

export const metadata: Metadata = {
  title: "Plato — Boğaz'da bir sahne",
  description:
    "CR YAPIM'in İstanbul Boğazı'nda Kız Kulesi manzaralı platosu. Gerçek terası ve dijital ikizi ile birlikte.",
};

export default function PlatoPage() {
  return (
    <div className="px-6 md:px-10 max-w-6xl mx-auto pt-8 pb-24">
      <header className="crane-in mb-10 max-w-3xl">
        <p className="mono-tag text-tower-gold/80">plato · gerçek + dijital</p>
        <h1 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.05]">
          Boğaz'da bir sahne.
          <br />
          <span className="editorial-italic text-tower-gold">
            Kız Kulesi'nin gözü altında.
          </span>
        </h1>
        <p className="mt-6 text-mist-300 text-lg md:text-xl leading-relaxed">
          Platonun iki yüzü var: gündüz, Boğaz'ın iki yakasını kucaklayan
          gerçek bir terası; gece, Caelinus AI'ın suflesiyle açılan dijital
          ikizi. Bu sayfada ikisini de görüyorsun.
        </p>
      </header>

      {/* Gerçek plato fotoğrafı */}
      <section className="crane-in mb-16">
        <div className="flex items-baseline justify-between mb-4">
          <p className="mono-tag text-tower-gold">i · gerçek plato</p>
          <p className="mono-tag text-mist-500 hidden md:block">
            İstanbul · Boğaz · gün ışığı
          </p>
        </div>

        <figure className="relative rounded-3xl overflow-hidden border border-tower-gold/30 shadow-cinema">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src="/plato.jpg"
              alt="CR YAPIM platosu — Boğaz, Kız Kulesi ve köprü manzarasıyla, Sanrı'ya Sor setinde gül-ay-güneş arka planı önünde minderler, sehpa, mumlar ve fenerlerle döşenmiş açık terası."
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            {/* Yumuşak alttan koyulaşma — caption okunsun diye */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-950/85 via-night-950/40 to-transparent" />
            {/* Üstten ince altın letterbox */}
            <div className="absolute inset-x-0 top-0 h-px bg-tower-gold/50" />

            {/* Foto üstündeki anlatı */}
            <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="mono-tag text-tower-gold">cr yapim · plato</p>
              <p className="editorial mt-3 text-2xl md:text-4xl text-mist-100 leading-tight max-w-3xl">
                Boğaz'ın iki yakası, aynı sehpada buluşur.
              </p>
              <p className="editorial-italic text-base md:text-lg text-mist-300 mt-3 max-w-2xl">
                Burada her bölüm bir mum, bir tarif, bir sorudur.
              </p>
            </figcaption>
          </div>
        </figure>

        {/* Foto altı not */}
        <p className="mt-4 text-sm md:text-base text-mist-500 leading-relaxed max-w-3xl">
          Görselde Sanrı'ya Sor setinin günışığındaki hâli — gül, ay, güneş
          sembollerinin önünde minderler ve sehpa. Adres mahremiyet için
          paylaşılmaz; ziyaret iş birliği yoluyladır.
        </p>
      </section>

      {/* Dijital ikizi başlık */}
      <div className="crane-in mb-6 flex items-baseline justify-between">
        <p className="mono-tag text-ai-cyan">ii · dijital ikiz · plato modu</p>
        <p className="mono-tag text-mist-500 hidden md:block">
          three.js · live preview
        </p>
      </div>
      <p className="text-mist-300 text-base md:text-lg max-w-3xl mb-8 leading-relaxed">
        Gece düştüğünde plato dijital bir maket olarak burada açılır.
        Sahnedeki altı kameraya tıkla — hangi programın hangi köşede
        çekildiğini gör. Sürükle: döndür. Tekerlek: yaklaş.
      </p>

      <div className="rounded-3xl overflow-hidden border border-mist-500/20 shadow-cinema bg-night-900">
        <PlatoExperience />
      </div>

      <p className="mt-6 text-sm md:text-base text-mist-500 mono-tag">
        not: dijital maket gerçek platonun ölçekli eskizi; kameralar
        programlara karşılık gelir.
      </p>
    </div>
  );
}
