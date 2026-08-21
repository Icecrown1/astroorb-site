import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { SIGNS, type Sign } from "@/lib/zodiac";
import { composeNatalSummary } from "@/lib/interpret";
import { SITE_NAME } from "@/lib/site";
import { ctaPage, localePath, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Props = { searchParams: { sun?: string; moon?: string; asc?: string; l?: string } };

function load(sp: Props["searchParams"]) {
  const locale: Locale = sp.l === "en" ? "en" : "ru";
  const by = (s?: string) => SIGNS.find((x) => x.slug === s) || null;
  const sun = by(sp.sun);
  const moon = by(sp.moon);
  if (!sun || !moon) return null;
  return { locale, sun, moon, asc: by(sp.asc) };
}

const nm = (s: Sign, en: boolean) => (en ? s.en.name : s.ru);

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const d = load(searchParams);
  if (!d) return { robots: { index: false } };
  const { locale, sun, moon, asc } = d;
  const en = locale === "en";
  const title = en
    ? `Sun ${nm(sun, en)} · Moon ${nm(moon, en)}${asc ? ` · Asc ${nm(asc, en)}` : ""}`
    : `Солнце ${sun.ru} · Луна ${moon.ru}${asc ? ` · Асц ${asc.ru}` : ""}`;
  const og = `/api/og?t=natal&sun=${sun.slug}&moon=${moon.slug}${asc ? `&asc=${asc.slug}` : ""}&l=${locale}`;
  return {
    title,
    description: en ? "My birth chart in Astro Orb" : "Моя натальная карта в Astro Orb",
    robots: { index: false, follow: true },
    alternates: { canonical: localePath(locale, "/natal-chart") },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description: en ? "Build yours free in 2 minutes" : "Постройте свою бесплатно за 2 минуты",
      url: `/share/natal?sun=${sun.slug}&moon=${moon.slug}&l=${locale}`,
      siteName: SITE_NAME,
      type: "website",
      locale: en ? "en_US" : "ru_RU",
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default function ShareNatalPage({ searchParams }: Props) {
  const d = load(searchParams);
  if (!d) notFound();
  const { locale, sun, moon, asc } = d;
  const en = locale === "en";
  const sum = composeNatalSummary(sun, moon, asc, locale);

  const Row = ({ label, s, accent }: { label: string; s: Sign; accent: string }) => (
    <div className="flex items-center justify-between rounded-2xl border border-hairline bg-surface px-5 py-4">
      <span className="text-xs uppercase tracking-[0.18em] text-muted">{label}</span>
      <span className={`font-display text-lg ${accent}`}>
        {s.symbol} {nm(s, en)}
      </span>
    </div>
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-20">
      <div className="shell">
        <div className="core p-8 md:p-12">
          <p className="eyebrow text-center">{en ? "Birth chart" : "Натальная карта"}</p>
          <div className="mt-6 space-y-3">
            <Row label={en ? "Sun — core self" : "Солнце — ядро"} s={sun} accent="text-stellar" />
            <Row label={en ? "Moon — emotions" : "Луна — эмоции"} s={moon} accent="text-ink" />
            {asc && <Row label={en ? "Ascendant" : "Асцендент"} s={asc} accent="text-iris" />}
          </div>
          <div className="mt-6 space-y-3 rounded-2xl border border-hairline bg-surface p-6 text-sm leading-relaxed">
            <p>{sum.sun}</p>
            <p className="text-muted">{sum.blend}</p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <CTA page={ctaPage(locale, "share_natal")} cta="open">
              {en ? "Build my chart free" : "Построить свою карту бесплатно"}
            </CTA>
            <Link
              href={localePath(locale, "/natal-chart")}
              className="text-sm text-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
            >
              {en ? "Free birth chart calculator" : "Бесплатный калькулятор натальной карты"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
