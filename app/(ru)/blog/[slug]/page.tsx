import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import { ARTICLES, articleBySlug, inline, type Block } from "@/lib/blog";
import { pageOg, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = articleBySlug(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { ...pageOg(`/blog/${a.slug}`), type: "article", publishedTime: a.date },
  };
}

const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

function Render({ b, ctaSlug }: { b: Block; ctaSlug: string }) {
  switch (b.type) {
    case "h2":
      return <h2 className="mt-10 font-display text-xl md:text-2xl">{b.text}</h2>;
    case "p":
      return <p className="mt-5 leading-relaxed text-muted">{inline(b.text)}</p>;
    case "list":
      return (
        <ul className="mt-5 space-y-3">
          {b.items.map((x, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-1 text-stellar">✦</span>
              <span>{inline(x)}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-hairline">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left">
                {b.head.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-hairline">
                  {r.map((c, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? "text-ink" : "text-muted"}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <div className="shell mt-10">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">{b.label}</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">{b.text}</p>
            <div className="mt-5 flex justify-center">
              <CTA page={`blog_${ctaSlug}`} cta={b.ctaId}>Открыть Astro Orb</CTA>
            </div>
          </div>
        </div>
      );
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = articleBySlug(params.slug);
  if (!a) notFound();

  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "ru-RU",
    author: { "@type": "Organization", name: "Astro Orb", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs items={[{ href: "/blog", label: "Блог" }, { href: `/blog/${a.slug}`, label: a.h1 }]} />
      <div className="mt-6 flex items-center gap-3 text-xs text-muted">
        <span className="rounded-full border border-hairline px-3 py-1 uppercase tracking-[0.14em]">{a.tag}</span>
        <time dateTime={a.date}>{fmtDate(a.date)}</time>
        <span>· {a.minutes} мин чтения</span>
      </div>
      <h1 className="mt-4 font-display text-3xl leading-tight md:text-4xl">{a.h1}</h1>
      <article>
        {a.blocks.map((b, i) => (
          <Render key={i} b={b} ctaSlug={a.slug.split("-")[0]} />
        ))}
      </article>

      <div className="mt-14 border-t border-hairline pt-8">
        <p className="eyebrow">Ещё по теме</p>
        <div className="mt-4 grid gap-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="text-[15px] text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-iris">
              {r.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
