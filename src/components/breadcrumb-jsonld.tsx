import { SITE_URL } from "@/lib/routes";

export interface Crumb {
  name: string;
  /** "/hakkimizda" gibi kök-göreli yol */
  path: string;
}

/**
 * BreadcrumbList JSON-LD. Ana Sayfa otomatik olarak ilk sıraya eklenir;
 * items yalnızca sonraki kırıntıları içerir.
 */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: SITE_URL,
      },
      ...items.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
