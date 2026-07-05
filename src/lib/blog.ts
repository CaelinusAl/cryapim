// Dosya tabanlı Markdown blog altyapısı.
// src/content/blog/*.md dosyaları build sırasında okunur (fs + gray-matter),
// markdown gövdesi sunucu tarafında marked ile HTML'e çevrilir.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO tarih (YYYY-MM-DD) */
  date: string;
  /** SEO açıklaması (~150–160 karakter) */
  description: string;
  tags: string[];
  /** "5 dk okuma" biçiminde */
  readingTimeText: string;
  readingMinutes: number;
  /** Ham markdown gövdesi */
  content: string;
}

function parsePostFile(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const minutes = Math.max(1, Math.ceil(readingTime(content).minutes));

  return {
    slug: typeof data.slug === "string" ? data.slug : fileName.replace(/\.md$/, ""),
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTimeText: `${minutes} dk okuma`,
    readingMinutes: minutes,
    content,
  };
}

/** Tüm yazılar, tarihe göre yeniden eskiye sıralı. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parsePostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Slug ile tek yazı; bulunamazsa undefined. */
export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Markdown'ı sunucu tarafında HTML'e çevirir. İçerik kendi
 *  depomuzdan geldiği için sanitize edilmez; marked HTML dışı
 *  metni zaten kaçışlar. */
export async function renderMarkdown(markdown: string): Promise<string> {
  return marked.parse(markdown, { async: true, gfm: true });
}

/** "2026-07-01" → "1 Temmuz 2026" */
export function formatDateTr(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
