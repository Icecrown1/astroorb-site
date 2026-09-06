import { ARTICLES_EN as ARTICLES } from "@/lib/blogEn";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = ARTICLES.map(
    (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/en/blog/${a.slug}</link>
      <guid>${SITE_URL}/en/blog/${a.slug}</guid>
      <pubDate>${new Date(a.date + "T09:00:00+03:00").toUTCString()}</pubDate>
      <description>${esc(a.description)}</description>
    </item>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AstroOrbi — astrology blog</title>
    <link>${SITE_URL}/en/blog</link>
    <description>Practical astrology: transits, the Moon, birth charts, compatibility</description>
    <language>en</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
