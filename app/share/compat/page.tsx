import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { calcCompat, canonicalPair, parsePair } from "@/lib/compat";
import { SITE_NAME } from "@/lib/site";
import { ctaPage, localePath, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Props = { searchParams: { pair?: string; a?: string; b?: string; l?: string } };

const clean = (x?: string) => (x || "").replace(/[<>"'`\\]/g, "").trim().slice(0, 20);

function load(sp: Props["searchParams"]) {
  const locale: Locale = sp.l === "en" ? "en" : "ru";
  const parsed = parsePair(sp.pair || "");
  if (!parsed) return null;
  const r = calcCompat(parsed[0], parsed[1], locale);
  if (!r) return null;
  return { locale, r, nameA: clean(sp.a), nameB: clean(sp.b) };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const d = load(searchParams);
  if (!d) return { robots: { index: false } };
  const { locale, r, nameA, nameB } = d;
  const en = locale === "en";
  const A = nameA || (en ? r.a.en.name : r.a.ru);
  const B = nameB || (en ? r.b.en.name : r.b.ru);
  const canon = canonicalPair(r.a.slug, r.b.slug);
  const og = `/api/og?t=compat&pair=${canon}&l=${locale}${nameA ? `&a=${encodeURIComponent(nameA)}` : ""}${nameB ? `&b=${encodeURIComponent(nameB)}` : ""}`;
  const title = en ? `${A} + ${B}: ${r.score}% compatibility` : `${A} + ${B}: совместимость ${r.score}%`;
  return {
    title,
    description: r.headline,
    robots: { index: false, follow: true },
    alternates: { canonical: localePath(locale, `/compatibility/${canon}`) },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description: r.headline,
      url: `/share/compat?pair=${canon}&l=${locale}`,
      siteName: SITE_NAME,
      type: "website",
      locale: en ? "en_US" : "ru_RU",
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default function ShareCompatPage({ searchParams }: Props) {
  const d = load(searchParams);
  if (!d) notFound();
  const { locale, r, nameA, nameB } = d;
  const en = locale === "en";
  const A = nameA || (en ? r.a.en.name : r.a.ru);
  const B = nameB || (en ? r.b.en.name : r.b.ru);
  const canon = canonicalPair(r.a.slug, r.b.slug);

  return (
    <main className="mx-auto max-w-2xl px-4 py-20">
      <div className="shell">
        <div className="core p-8 text-center md:p-12">
          <p className="eyebrow">
            {r.a.symbol} {A} + {B} {r.b.symbol}
          </p>
          <p className="mt-6 font-display text-7xl text-iris md:text-8xl">{r.score}%</p>
          <h1 className="mt-4 font-display text-xl md:text-2xl">{r.headline}</h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{r.paragraph}</p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <CTA page={ctaPage(locale, "share_compat")} cta="open">
              {en ? "Get the full couple reading" : "Полный разбор пары"}
            </CTA>
            <Link
              href={localePath(locale, `/compatibility/${canon}`)}
              className="text-sm text-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
            >
              {en
                ? `${r.a.en.name} + ${r.b.en.name} compatibility in detail`
                : `Подробнее о совместимости: ${r.a.ru} + ${r.b.ru}`}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
