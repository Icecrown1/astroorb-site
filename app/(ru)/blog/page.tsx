import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/blog";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Блог об астрологии: транзиты, Луна, натальная карта",
  description:
    "Практичная астрология без воды: точные даты транзитов по Swiss Ephemeris, разборы натальной карты, Луна и совместимость. Блог Astro Orb.",
  alternates: { canonical: "/blog" },
  openGraph: pageOg("/blog"),
};

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-32">
      <p className="eyebrow">Блог</p>
      <h1 className="mt-4 font-display text-3xl md:text-5xl">
        Астрология <span className="grad-text">с точными датами</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Транзиты, Луна, натальная карта и совместимость — практично и без эзотерического тумана.
        Все астрономические даты в статьях рассчитаны по Swiss Ephemeris.
      </p>

      <div className="mt-12 grid gap-5">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="shell group block">
            <article className="core p-6 md:p-8">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="rounded-full border border-hairline px-3 py-1 uppercase tracking-[0.14em]">{a.tag}</span>
                <time dateTime={a.date}>{fmtDate(a.date)}</time>
                <span>· {a.minutes} мин</span>
              </div>
              <h2 className="mt-4 font-display text-xl transition-colors group-hover:text-iris md:text-2xl">{a.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
              <span className="mt-4 inline-block text-sm text-iris">Читать →</span>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
