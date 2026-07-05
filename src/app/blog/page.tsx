import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDateTr } from "@/lib/blog";
import { SITE_URL } from "@/lib/routes";

const PAGE_TITLE = "Blog | CR YAPIM — Teknoloji, Tasarım ve Hikâye Üzerine";
const PAGE_DESCRIPTION =
  "Dijital evrenler, yapay zekâ, marka hikâyesi ve zanaat üzerine yazılar. CR YAPIM'in teknoloji, tasarım ve hikâye anlatıcılığına dair günlüğü.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "CR YAPIM",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    locale: "tr_TR",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CR YAPIM Blog",
    url: `${SITE_URL}/blog`,
    description: PAGE_DESCRIPTION,
    inLanguage: "tr",
    publisher: {
      "@type": "Organization",
      name: "CR YAPIM",
      url: SITE_URL,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      description: post.description,
    })),
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 pt-36 pb-28 md:px-10">
      {/* Sayfa girişi */}
      <header className="mb-20">
        <p className="mb-6 text-[0.62rem] font-medium uppercase tracking-[0.45em] text-gold">
          Günlük / Blog
        </p>
        <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl">
          Teknoloji, tasarım ve{" "}
          <em className="italic text-gold">hikâye</em> üzerine.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
          Dijital evrenler kurarken öğrendiklerimiz. Az söz, güçlü söz.
        </p>
      </header>

      {/* Yazı listesi */}
      <div className="border-t border-gold/20">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gold/20">
            <Link
              href={`/blog/${post.slug}`}
              className="group block py-10 transition-colors"
            >
              <div className="mb-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[0.62rem] uppercase tracking-[0.35em] text-dim">
                <time dateTime={post.date}>{formatDateTr(post.date)}</time>
                <span>{post.readingTimeText}</span>
              </div>
              <h2 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-gold md:text-3xl">
                {post.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.6rem] uppercase tracking-[0.3em] text-dim"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-[0.62rem] tracking-[0.3em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Oku →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
