import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biz — CR YAPIM",
  description:
    "CR YAPIM, İstanbul Boğazı'nda Kız Kulesi manzaralı bir içerik ve yapım stüdyosu. Programlar üretir, stüdyosunu markalara ve içerik üreticilerine açar.",
};

export default function BizPage() {
  return (
    <div className="px-6 md:px-10 max-w-3xl mx-auto pt-8 pb-24 crane-in">
      <p className="mono-tag text-tower-gold/80">biz</p>
      <h1 className="editorial mt-4 text-4xl md:text-6xl text-mist-100 leading-[1.05]">
        İstanbul'un iki yakası arasında
        <br />
        <span className="editorial-italic text-tower-gold">
          bir avuç insan.
        </span>
      </h1>

      <div className="mt-12 space-y-6 body-readable text-mist-100">
        <p>
          CR YAPIM, İstanbul Boğazı'nın kıyısında kurulmuş bir içerik ve yapım
          stüdyosudur. Bir yandan kendi programlarımızı çekiyor, bir yandan da
          stüdyomuzu markalara ve içerik üreticilerine açıyoruz.
        </p>
        <p>
          Programlarımız ortak bir niyet etrafında durur: zamanı yavaşlatmak,
          soruyu cevaba tercih etmek, izleyiciyi seyirci olmaktan çıkartmak.
        </p>
        <p>
          Plato İstanbul Boğazı'nda, Kız Kulesi'nin görüş açısında. Adresi
          paylaşmıyoruz; mahremiyet yapımın bir parçası. İş birliği ve sahne
          ziyaretleri için iletişim sayfasından ulaşabilirsin.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-mist-500/20 p-7">
          <p className="mono-tag text-mist-500">marka</p>
          <p className="editorial-italic text-mist-100 mt-3 text-2xl">
            CR YAPIM · cryapim.com
          </p>
        </div>
        <div className="rounded-2xl border border-mist-500/20 p-7">
          <p className="mono-tag text-mist-500">kuruluş niyeti</p>
          <p className="editorial-italic text-mist-100 mt-3 text-2xl">
            Duyulmamış bir hikâyeyi, duyulmuş gibi anlatmak.
          </p>
        </div>
      </div>
    </div>
  );
}
