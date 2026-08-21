import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { SIGNS } from "@/lib/zodiac";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Today's Horoscope for All Zodiac Signs",
  description:
    "Free daily horoscope for all 12 zodiac signs, updated every day. A personal forecast from your own birth chart is available in Astro Orb.",
  alternates: { canonical: "/en/horoscope", languages: { ru: "/horoscope", en: "/en/horoscope", "x-default": "/horoscope" } },
  openGraph: pageOg("/en/horoscope", "en"),
};

const FAQ_ITEMS = [
  { q: "How often are the horoscopes updated?", a: "Daily. Each sign's page shows today and a preview of tomorrow." },
  { q: "How is a personal horoscope different?", a: "A general horoscope is written for everyone born under the sign — one twelfth of the planet. A personal one is calculated from your natal chart: transits are mapped onto your houses, so your 'big money day' won't match your sign-neighbor's." },
  { q: "Which sign should I read if I'm on a cusp?", a: "Sign boundaries shift by year and birth time. Your exact Sun sign appears in the birth chart calculation — build it free on our birth chart page." },
];

export default function EnHoroscopeHub() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/horoscope", label: "Horoscopes" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Today's horoscope — <span className="grad-text">all zodiac signs</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Pick your sign for today's forecast plus a look at tomorrow. Updated daily.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 60}>
              <Link
                href={`/en/horoscope/${s.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
              >
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-lg text-stellar">
                  {s.symbol}
                </span>
                <span>
                  <span className="block font-medium">{s.en.name}</span>
                  <span className="block text-xs text-muted">{s.en.dates}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 sm:flex-row sm:items-center">
            <p className="text-sm text-muted sm:flex-1">
              A general horoscope is the day's weather report. Your personal forecast from your{" "}
              <Link href="/en/natal-chart" className="text-iris hover:underline">birth chart</Link> is in Astro Orb.
            </p>
            <CTA page="en_horoscope" cta="hub">My personal horoscope</CTA>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />
    </>
  );
}
