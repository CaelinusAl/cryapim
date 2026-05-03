import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim — İş birliği",
};

export default function IletisimPage() {
  return (
    <div className="px-6 md:px-10 max-w-2xl mx-auto pt-8 pb-24 crane-in">
      <p className="mono-tag text-tower-gold/80">iletişim · iş birliği</p>
      <h1 className="editorial mt-4 text-4xl md:text-5xl text-mist-100 leading-[1.05]">
        Sahnenin arkasından
        <br />
        <span className="editorial-italic text-tower-gold">
          yanıtlıyoruz.
        </span>
      </h1>

      <p className="mt-6 text-mist-300">
        Sponsorluk, konuk önerisi, sanatçı başvurusu ya da sahne ziyareti için
        kısa bir not yaz. Genelde 48 saat içinde dönüyoruz.
      </p>

      <form
        className="mt-10 space-y-5"
        action="mailto:hello@cryapim.com"
        method="post"
        encType="text/plain"
      >
        <Field label="İsim" name="ad" />
        <Field label="E-posta" name="eposta" type="email" />
        <Field label="Konu" name="konu" placeholder="Sponsorluk · Konuk · Sanatçı · Ziyaret" />
        <div>
          <label className="mono-tag text-mist-500">Mesaj</label>
          <textarea
            name="mesaj"
            rows={5}
            className="mt-2 w-full bg-night-800 border border-mist-500/20 rounded-2xl px-4 py-3 text-mist-100 focus:outline-none focus:border-tower-gold transition-colors"
          />
        </div>
        <button
          type="submit"
          className="mono-tag bg-tower-gold/90 hover:bg-tower-gold text-night-950 px-6 py-3 rounded-full transition-colors"
        >
          Gönder →
        </button>
      </form>

      <p className="mt-10 text-xs text-mist-500 mono-tag">
        not: form geçici olarak mail istemcine açar; backend yakında.
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mono-tag text-mist-500">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-2 w-full bg-night-800 border border-mist-500/20 rounded-2xl px-4 py-3 text-mist-100 focus:outline-none focus:border-tower-gold transition-colors"
      />
    </div>
  );
}
