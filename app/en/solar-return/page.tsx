import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar Return — Your Personal Year Forecast",
  description:
    "Solar Return: a forecast for your personal year based on the exact moment the Sun returns to its natal position. How the year's chart is read and how to build yours.",
  alternates: { canonical: "/en/solar-return", languages: { ru: "/solar-return", en: "/en/solar-return", "x-default": "/solar-return" } },
  openGraph: pageOg("/en/solar-return", "en"),
};

const FAQ_ITEMS = [
  { q: "When does the solar year start?", a: "At the exact moment the Sun returns to its natal degree — up to a day away from your calendar birthday. Astro Orb calculates the moment to the minute." },
  { q: "Does location matter?", a: "Classically the chart is cast for where you are at the solar-return moment; some schools use the birthplace. Astro Orb calculates for your current city, with an option to compare." },
  { q: "How is this different from a yearly horoscope?", a: "A magazine yearly horoscope covers a twelfth of humanity. A Solar Return is your personal year chart: its ascendant, planet placements in houses — a unique configuration that won't repeat." },
  { q: "When is the best time to read it?", a: "Two or three weeks before your birthday — to enter the new personal year with a map: themes, strong months, caution zones." },
];

export default function EnSolarReturnPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/solar-return", label: "Solar Return" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">Premium tool</p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Solar Return — <span className="grad-text">your personal year's map</span>
        </h1>
        <p className="mt-5 text-lg text-muted">
          Once a year the Sun returns to the exact degree it held at your birth. The chart cast for
          that moment describes your next personal year — from birthday to birthday.
        </p>

        <Reveal>
          <div className="mt-12 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              The Solar Return chart is read like a natal chart, but its scope is one year. The
              ascendant of the return sets the year's main theme; the house where the Sun lands
              shows where the energy goes; Venus, Mars and Jupiter mark the areas of love, drive and
              growth for these twelve months.
            </p>
            <p>
              The strongest technique is overlaying the return on the natal chart: which of your
              houses receive the year's planets — that's where events concentrate. This is exactly
              what the AI reading in Astro Orb does: it compares both charts and writes a year plan
              in plain language — themes, months of peak energy, zones of caution.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-sm leading-relaxed text-muted">
              The Solar Return is calculated in Astro Orb Premium: the return moment to the minute,
              the year's chart and a full AI reading.
            </p>
            <div className="mt-5">
              <CTA page="en_solar" cta="main">Build my year's chart</CTA>
            </div>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />
    </>
  );
}
