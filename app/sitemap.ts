import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SIGNS } from "@/lib/zodiac";
import { ARCANA } from "@/lib/arcana";
import { allPairs } from "@/lib/compat";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] = "weekly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/natal-chart", 0.9),
    page("/matrix", 0.9),
    page("/compatibility", 0.9),
    page("/horoscope", 0.9, "daily"),
    page("/solar-return", 0.7),
    page("/pricing", 0.8),
    page("/about", 0.5, "monthly"),
    ...SIGNS.map((s) => page(`/horoscope/${s.slug}`, 0.8, "daily")),
    ...ARCANA.map((a) => page(`/matrix/${a.slug}`, 0.7, "monthly")),
    ...allPairs().map((p) => page(`/compatibility/${p.pair}`, 0.6, "monthly")),
  ];
}
