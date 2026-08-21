import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompatCalculator from "@/components/calculators/CompatCalculator";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { SIGNS } from "@/lib/zodiac";
import { canonicalPair } from "@/lib/compat";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zodiac Compatibility Calculator — All 78 Pairs",
  description:
    "Check zodiac sign compatibility online: percentage, the pair's strengths and friction points. Free calculator plus full synastry from two birth charts.",
  alternates: { canonical: "/en/compatibility", languages: { ru: "/compatibility", en: "/en/compatibility", "x-default": "/compatibility" } },
  openGraph: pageOg("/en/compatibility", "en"),
};

const FAQ_ITEMS = [
  { q: "How much can I trust sign compatibility?", a: "Sun-sign compatibility is the first, most general layer: the base blend of elements and strategies. The real picture appears in synastry — overlaying two complete birth charts, where the Moon, Venus, Mars and cross-chart aspects all count." },
  { q: "How is the percentage calculated here?", a: "By classical rules: element combination (fire, earth, air, water), modality interaction, and the angular distance between signs (trines, squares, oppositions). The calculation is deterministic — one pair always gives one result." },
  { q: "What's inside the full pair reading?", a: "Synastry from two charts: feelings and passion, money and everyday life, communication, crisis points and the pair's resources. Plus AI answers to questions about your relationship." },
  { q: "Do I need my partner's birth date?", a: "Not for the sign-based reading — signs are enough. For precise synastry in Astro Orb you need both birth dates; times are helpful but optional." },
];

export default function EnCompatibilityPage() {
  const popular: [string, string][] = [
    ["aries", "leo"], ["taurus", "virgo"], ["gemini", "libra"], ["cancer", "scorpio"],
    ["leo", "libra"], ["virgo", "capricorn"], ["scorpio", "pisces"], ["sagittarius", "aquarius"],
    ["aries", "libra"], ["taurus", "scorpio"], ["cancer", "capricorn"], ["gemini", "sagittarius"],
  ];

  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/compatibility", label: "Compatibility" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Zodiac compatibility — <span className="grad-text">check online</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Pick two signs to see the compatibility percentage and the pair's character. Free, no sign-up.
        </p>
        <div className="mt-10">
          <CompatCalculator locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Popular pairs</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map(([x, y], i) => {
            const sx = SIGNS.find((s) => s.slug === x)!;
            const sy = SIGNS.find((s) => s.slug === y)!;
            return (
              <Reveal key={`${x}-${y}`} delay={(i % 6) * 50}>
                <Link
                  href={`/en/compatibility/${canonicalPair(x, y)}`}
                  className="flex items-center justify-between rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
                >
                  <span className="font-medium">
                    {sx.symbol} {sx.en.name} & {sy.symbol} {sy.en.name}
                  </span>
                  <span className="text-muted">→</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={150}>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 sm:flex-row sm:items-center">
            <p className="text-sm text-muted sm:flex-1">
              78 sign pairs live on this site. Precise synastry from two charts is calculated in
              Astro Orb. For one person, start with the{" "}
              <Link href="/en/natal-chart" className="text-iris hover:underline">birth chart</Link>.
            </p>
            <CTA page="en_compatibility" cta="hub_bottom">Pair synastry</CTA>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />
    </>
  );
}
