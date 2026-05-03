import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/data/programs";

export const metadata: Metadata = {
  title: "Arşiv — Yakında",
};

export default function ArsivPage() {
  const total = programs.reduce((acc, p) => acc + p.episodes, 0);
  return (
    <div className="px-6 md:px-10 max-w-4xl mx-auto pt-8 pb-24 crane-in">
      <p className="mono-tag text-tower-gold/80">arşiv · yakında</p>
      <h1 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.05]">
        {total} bölüm,
        <br />
        <span className="editorial-italic text-tower-gold">
          aranabilir bir hafıza olacak.
        </span>
      </h1>
      <p className="mt-8 text-mist-300 max-w-2xl leading-relaxed">
        Tüm bölümler Caelinus AI ile etiketlenecek; konukları, niyeti, saat
        dilimine ve frekansa göre arayabileceksin. Şimdilik kanaldan izle.
      </p>
      <div className="mt-10 flex gap-3">
        <a
          href="https://youtube.com/@cryapim"
          className="mono-tag inline-flex items-center gap-2 bg-tower-gold/90 text-night-950 hover:bg-tower-gold px-5 py-3 rounded-full transition-colors"
        >
          YouTube kanalına git →
        </a>
        <Link
          href="/yapimlar"
          className="mono-tag inline-flex items-center gap-2 text-mist-300 hover:text-tower-gold px-5 py-3 rounded-full transition-colors"
        >
          Yapımlara dön
        </Link>
      </div>
    </div>
  );
}
