import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 md:px-10 max-w-xl mx-auto pt-24 pb-24 crane-in text-center">
      <p className="mono-tag text-tower-gold/80">404 · sahne dışı</p>
      <h1 className="editorial mt-4 text-4xl md:text-5xl text-mist-100 leading-[1.05]">
        Bu sahne henüz çekilmedi.
      </h1>
      <p className="mt-6 text-mist-300">
        Aradığın sayfa platonun bir köşesinde değil. Belki başka bir frekansa
        bakıyorsundur.
      </p>
      <Link
        href="/"
        className="mono-tag inline-flex items-center gap-2 mt-10 bg-tower-gold/90 text-night-950 hover:bg-tower-gold px-5 py-3 rounded-full transition-colors"
      >
        Ana plato →
      </Link>
    </div>
  );
}
