import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPost,
  renderMarkdown,
  formatDateTr,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/routes";
import styles from "./blog-post.module.css";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | CR YAPIM Blog`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url,
      siteName: "CR YAPIM",
      title: post.title,
      description: post.description,
      locale: "tr_TR",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const otherPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    inLanguage: "tr",
    keywords: post.tags.join(", "),
    author: {
      "@type": "Organization",
      name: "CR YAPIM",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "CR YAPIM",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pt-36 pb-28 md:px-10">
      <article>
        {/* Üst bilgi satırı */}
        <header className="mb-14">
          <Link
            href="/blog"
            className="mb-10 inline-block text-[0.62rem] uppercase tracking-[0.35em] text-dim transition-colors hover:text-gold"
          >
            ← Günlük / Blog
          </Link>
          <div className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[0.62rem] uppercase tracking-[0.35em] text-dim">
            <time dateTime={post.date} className="text-gold">
              {formatDateTr(post.date)}
            </time>
            <span>{post.readingTimeText}</span>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h1 className="font-serif text-4xl leading-tight text-ink md:text-5xl">
            {post.title}
          </h1>
        </header>

        {/* Gövde */}
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {/* Diğer yazılar */}
      {otherPosts.length > 0 ? (
        <aside className="mt-24 border-t border-gold/20 pt-12">
          <p className="mb-10 text-[0.62rem] font-medium uppercase tracking-[0.45em] text-gold">
            Diğer Yazılar
          </p>
          <div className="grid gap-10 md:grid-cols-2">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group block"
              >
                <time
                  dateTime={other.date}
                  className="text-[0.6rem] uppercase tracking-[0.35em] text-dim"
                >
                  {formatDateTr(other.date)}
                </time>
                <h2 className="mt-3 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-gold">
                  {other.title}
                </h2>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}

      {/* CTA */}
      <div className="mt-24 border-t border-gold/20 pt-12 text-center">
        <p className="font-serif text-2xl text-ink md:text-3xl">
          Bir sonraki <em className="italic text-gold">dijital evreni</em>{" "}
          birlikte kuralım.
        </p>
        <Link
          href="/iletisim"
          className="mt-8 inline-block border border-gold/40 px-8 py-3 text-[0.62rem] uppercase tracking-[0.4em] text-gold transition-colors hover:border-gold hover:bg-gold hover:text-black"
        >
          İletişime geç
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
