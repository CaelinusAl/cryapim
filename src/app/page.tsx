import type { Metadata } from "next";
import { getMatrix } from "@/lib/matrix";
import { MatrixEggJourney } from "@/features/matrix/MatrixEggJourney";
import { MatrixOutro } from "@/features/matrix/MatrixOutro";

const matrix = getMatrix();

export const metadata: Metadata = {
  title: matrix.meta.title,
  description: matrix.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://cryapim.com",
    siteName: "CR YAPIM",
    title: matrix.meta.title,
    description: matrix.meta.description,
    locale: "tr_TR",
  },
};

export default function Home() {
  return (
    <>
      <MatrixEggJourney content={matrix} />
      <MatrixOutro content={matrix} />
    </>
  );
}
