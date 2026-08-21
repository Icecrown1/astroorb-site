import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { allPairs, calcCompat, canonicalPair, parsePair, relatedPairs } from "@/lib/compat";
import { ELEMENT_EN, signBySlug } from "@/lib/zodiac";
import { pageOg } from "@/lib/site";

export function generateStaticParams() {
  return allPairs();
}

export function generateMetadata({ params }: { params: { pair: string } }): Metadata {
  const parsed = parsePair(params.pair);
  if (!parsed) return {};
  const r = calcCompat(parsed[0], parsed[1], "en");
  if (!r) return {};
  return {
    title: `${r.a.en.name} and ${r.b.en.name} Compatibility (${r.score}%)`,
    description: `${r.a.en.name} and ${r.b.en.name} compatibility: ${r.score}% — ${r.headline.toLowerCase()}. The pair's strengths, friction points, and what full synastry reveals.`,
    alternates: { canonical: `/en/compatibility/${params.pair}`, languages: { ru: `/compatibility/${params.pair}`, en: `/en/compatibility/${params.pair}`, "x-default": `/compatibility/${params.pair}` } },
    openGraph: pageOg(`/en/compatibility/${params.pair}`, "en"),
  };
}

export default function EnPairPage({ params }: { params: { pair: string } }) {
  const parsed = parsePair(params.pair);
  if (!parsed) notFound();
  const canon = canonicalPair(parsed[0], parsed[1]);
  if (!signBySlug(parsed[0]) || !signBySlug(parsed[1])) notFound();
  if (canon !== params.pair) permanentRedirect(`/en/compatibility/${canon}`);

  const r = calcCompat(parsed[0], parsed[1], "en");
  if (!r) notFound();

  const related = relatedPairs(parsed[0], parsed[1]);

  const faq = [
    { q: `Are ${r.a.en.name} and ${r.b.en.name} a good match?`, a: `${r.headline}. The base sign score is ${r.score}%. This is a blend of ${ELEMENT_EN[r.a.element]} and ${ELEMENT_EN[r.b.element]}; the outcome depends on both partners' full charts.` },
    { q: "What would full synastry add for this pair?", a: "Overlaying two birth charts: how your Moons connect (home and emotions), Venus and Mars (attraction), Saturn (longevity). Synastry often changes the conclusion drawn from signs alone." },
    { q: "The sign match doesn't fit my experience. Why?", a: "The Sun sign is 1 of 10 planets. Ascendants, Moons and personal planets can completely override the Sun-sign blend — which is exactly what a full-chart reading shows." },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/en", label: "Home" },
          { href: "/en/compatibility", label: "Compatibility" },
          { href: `/en/compatibility/${canon}`, label: `${r.a.en.name} & ${r.b.en.name}` },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <h1 className="font-display text-3xl leading-[1.15] md:text-5xl">
          {r.a.en.name} & {r.b.en.name}: <span className="grad-text">{r.score}% compatibility</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{r.headline}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-muted">{r.paragraph}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-iris/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">The pair's strengths</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              {r.strengths.map((s) => (
                <li key={s} className="flex gap-2"><span className="text-stellar">✦</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Friction points</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {r.frictions.map((s) => (
                <li key={s} className="flex gap-2"><span>◦</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">
            This is the Sun-sign layer — the first level of compatibility. The precise picture of
            your pair is in synastry from two complete birth charts: love, money, everyday life and
            crisis points from both partners' birth data.
          </p>
          <div className="mt-5">
            <CTA page={`en_compat_${canon}`} cta="unlock">Our precise pair reading</CTA>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm text-muted">Related pairs:</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {related.map((p) => {
              const [xa, xb] = p.pair.split("-");
              const sa = signBySlug(xa)!; const sb = signBySlug(xb)!;
              return (
                <Link key={p.pair} href={`/en/compatibility/${p.pair}`} className="text-iris hover:underline">
                  {sa.en.name} & {sb.en.name}
                </Link>
              );
            })}
            <Link href="/en/compatibility" className="text-muted hover:text-ink">All pairs →</Link>
          </div>
        </div>
      </section>

      <FAQ items={faq} title="FAQ" />
    </>
  );
}
