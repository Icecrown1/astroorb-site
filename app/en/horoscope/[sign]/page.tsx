import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { SIGNS, ELEMENT_EN, signBySlug } from "@/lib/zodiac";
import { composeHoroscope, getDayHoroscope } from "@/lib/horoscope";
import { pageOg } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return SIGNS.map((s) => ({ sign: s.slug }));
}

export function generateMetadata({ params }: { params: { sign: string } }): Metadata {
  const s = signBySlug(params.sign);
  if (!s) return {};
  const dateEn = new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", timeZone: "Europe/Moscow" });
  return {
    title: `${s.en.name} Horoscope for ${dateEn} — Today & Tomorrow`,
    description: `${s.en.name} horoscope for today, ${dateEn}: work, relationships, well-being and the day's advice. Updated daily. A personal forecast from your chart is in Astro Orb.`,
    alternates: { canonical: `/en/horoscope/${s.slug}`, languages: { ru: `/horoscope/${s.slug}`, en: `/en/horoscope/${s.slug}`, "x-default": `/horoscope/${s.slug}` } },
    openGraph: pageOg(`/en/horoscope/${s.slug}`, "en"),
  };
}

export default async function EnSignHoroscopePage({ params }: { params: { sign: string } }) {
  const s = signBySlug(params.sign);
  if (!s) notFound();

  const now = new Date();
  const today = await getDayHoroscope(s, now, 0, "en");
  const tomorrow = composeHoroscope(s, now, 1, "en");

  const idx = SIGNS.findIndex((x) => x.slug === s.slug);
  const neighbors = [SIGNS[(idx + 11) % 12], SIGNS[(idx + 1) % 12], SIGNS[(idx + 6) % 12]];

  const nowIso = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Moscow" });
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.en.name} horoscope for ${today.dateRu}`,
    datePublished: nowIso,
    dateModified: nowIso,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Astro Orb" },
    mainEntityOfPage: `/en/horoscope/${s.slug}`,
  };

  const faq = [
    { q: "Who is this horoscope for?", a: `For those born ${s.en.dates} — Sun sign ${s.en.name}. If you were born on a cusp, your exact sign appears in the birth chart calculation.` },
    { q: `Why is the ${s.en.name} horoscope the same for everyone?`, a: `About one twelfth of people share this sign. A general horoscope describes the day's background; personal events depend on your full chart — that's what Astro Orb reads for you.` },
    { q: "When does the forecast update?", a: "Every night. Weekly and monthly forecasts live in Astro Orb together with your personal transits." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Breadcrumbs
        items={[
          { href: "/en", label: "Home" },
          { href: "/en/horoscope", label: "Horoscopes" },
          { href: `/en/horoscope/${s.slug}`, label: s.en.name },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">
          {s.symbol + "\uFE0E"} {s.en.dates} · {ELEMENT_EN[s.element]} · {s.en.ruler}
        </p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          {s.en.name} horoscope for <span className="grad-text">{today.dateRu}</span>
        </h1>

        <article className="mt-10 space-y-4">
          <p className="text-[15px] leading-relaxed">{today.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <HoroBlock label="Work & business" text={today.work} />
            <HoroBlock label="Relationships" text={today.love} />
            <HoroBlock label="Well-being" text={today.care} />
            <HoroBlock label={`Lucky number: ${today.lucky}`} text={today.advice} />
          </div>
        </article>

        <details className="group mt-8 rounded-2xl border border-hairline bg-surface px-6 py-5">
          <summary className="cursor-pointer list-none font-medium marker:content-none">
            <span className="mr-3 inline-block text-iris transition-transform duration-300 ease-out-strong group-open:rotate-45">+</span>
            Tomorrow's horoscope, {tomorrow.dateRu}
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <p>{tomorrow.intro}</p>
            <p>{tomorrow.work}</p>
            <p>{tomorrow.love}</p>
          </div>
        </details>

        <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">
            This is a general horoscope for everyone born under {s.en.name}. Yours is calculated
            from your own natal chart, with transits through your houses: when to push and when to
            wait. Weekly and monthly forecasts live there too.
          </p>
          <div className="mt-5">
            <CTA page={`en_horoscope_${s.slug}`} cta="personal">My personal horoscope</CTA>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <span className="text-muted">Other signs:</span>
          {neighbors.map((n) => (
            <Link key={n.slug} href={`/en/horoscope/${n.slug}`} className="text-iris hover:underline">
              {n.en.name}
            </Link>
          ))}
          <Link href="/en/horoscope" className="text-muted hover:text-ink">All 12 →</Link>
        </div>
      </section>

      <FAQ items={faq} title="FAQ" />
    </>
  );
}

function HoroBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
