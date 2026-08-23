import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES_EN as ARTICLES } from "@/lib/blogEn";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Astrology Blog: Transits, the Moon, Birth Charts",
  description:
    "Practical astrology without the fluff: exact transit dates via Swiss Ephemeris, birth chart guides, the Moon and compatibility. The Astro Orb blog.",
  alternates: { canonical: "/en/blog", languages: { ru: "/blog", en: "/en/blog", "x-default": "/blog" } },
  openGraph: pageOg("/en/blog", "en"),
};

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPageEn() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-32">
      <p className="eyebrow">Blog</p>
      <h1 className="mt-4 font-display text-3xl md:text-5xl">
        Astrology <span className="grad-text">with exact dates</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Transits, the Moon, birth charts and compatibility — practical and free of mystical fog.
        Every astronomical date here is computed with Swiss Ephemeris.
      </p>

      <div className="mt-12 grid gap-5">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/en/blog/${a.slug}`} className="shell group block">
            <article className="core p-6 md:p-8">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="rounded-full border border-hairline px-3 py-1 uppercase tracking-[0.14em]">{a.tag}</span>
                <time dateTime={a.date}>{fmtDate(a.date)}</time>
                <span>· {a.minutes} min</span>
              </div>
              <h2 className="mt-4 font-display text-xl transition-colors group-hover:text-iris md:text-2xl">{a.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
              <span className="mt-4 inline-block text-sm text-iris">Read →</span>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
