import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SIGNS } from "@/lib/zodiac";
import { ARCANA } from "@/lib/arcana";
import { allPairs } from "@/lib/compat";
import { ARTICLES } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  type Freq = MetadataRoute.Sitemap[0]["changeFrequency"];
  /** Пара записей RU+EN с взаимными hreflang-альтернативами. */
  const pair = (path: string, priority: number, changeFrequency: Freq = "weekly"): MetadataRoute.Sitemap => {
    const languages = {
      ru: `${SITE_URL}${path}`,
      en: `${SITE_URL}/en${path === "/" ? "" : path}`,
      "x-default": `${SITE_URL}${path}`,
    };
    return [
      { url: languages.ru, lastModified: now, changeFrequency, priority, alternates: { languages } },
      { url: languages.en, lastModified: now, changeFrequency, priority: Math.max(0.1, priority - 0.2), alternates: { languages } },
    ];
  };

  return [
    ...pair("/", 1, "weekly"),
    ...pair("/natal-chart", 0.9),
    ...pair("/matrix", 0.9),
    ...pair("/compatibility", 0.9),
    ...pair("/horoscope", 0.9, "daily"),
    ...pair("/solar-return", 0.7),
    ...pair("/pricing", 0.8),
    ...pair("/about", 0.5, "monthly"),
    ...SIGNS.flatMap((s) => pair(`/horoscope/${s.slug}`, 0.8, "daily")),
    ...ARCANA.flatMap((a) => pair(`/matrix/${a.slug}`, 0.7, "monthly")),
    ...allPairs().flatMap((p) => pair(`/compatibility/${p.pair}`, 0.6, "monthly")),
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
