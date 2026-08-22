import { ARTICLES } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = ARTICLES.map(
    (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/blog/${a.slug}</link>
      <guid>${SITE_URL}/blog/${a.slug}</guid>
      <pubDate>${new Date(a.date + "T09:00:00+03:00").toUTCString()}</pubDate>
      <description>${esc(a.description)}</description>
    </item>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Astro Orb — блог об астрологии</title>
    <link>${SITE_URL}/blog</link>
    <description>Практичная астрология: транзиты, Луна, натальная карта, совместимость</description>
    <language>ru</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
