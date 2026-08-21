import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import NatalCalculator from "@/components/calculators/NatalCalculator";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Birth Chart Calculator Online — Instant Reading",
  description:
    "Calculate your birth chart free: Sun, Moon, 8 planets and ascendant with Swiss Ephemeris-level precision. Instant result in your browser, no sign-up.",
  alternates: { canonical: "/en/natal-chart", languages: { ru: "/natal-chart", en: "/en/natal-chart", "x-default": "/natal-chart" } },
  openGraph: pageOg("/en/natal-chart", "en"),
};

const FAQ_ITEMS = [
  { q: "How is the chart calculated?", a: "Right in your browser using the astronomy-engine library (JPL-level precision for planetary positions). Nothing is sent to a server — the result appears instantly." },
  { q: "Why does the birth time matter?", a: "The ascendant moves through the whole zodiac every 24 hours — about one sign every two hours. Without a time we show planets in signs; with a time you also get the ascendant, and the Mini App adds the full house grid." },
  { q: "What's in the full reading?", a: "Interpretations of all 10 planets in signs and houses, the aspect grid, strengths and recurring life patterns — written by AI for your exact configuration, with a chat to ask follow-up questions." },
  { q: "Is my data stored?", a: "The site calculator keeps everything in your browser. If you continue in the Mini App, your birth data is stored encrypted and used only for calculations." },
];

export default function EnNatalPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/natal-chart", label: "Birth chart" }]} />
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Birth chart online — <span className="grad-text">with an instant reading</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          The chart builds instantly, right on this page. No registration.
        </p>
        <div className="mt-10">
          <NatalCalculator locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">What a birth chart is</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              A birth chart is a snapshot of the sky at the moment you were born: the exact positions
              of the Sun, Moon and eight planets relative to the point where you arrived. Astrology
              reads this configuration as a personal coordinate system — strengths, recurring
              scenarios, the areas where energy flows easily and the ones that ask for practice.
            </p>
            <p>
              The chart has three layers. Planets answer "what acts": the Sun is will, the Moon is
              feeling, Mercury is thinking, Venus is love and values, Mars is action. Signs show how
              that energy is colored: Mars in Aries acts directly, Mars in Libra negotiates. Houses
              answer "where": career, family, money, relationships — twelve life arenas. The full
              reading connects all three layers, and that's exactly what the AI in Astro Orb does for
              your specific chart.
            </p>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />
    </>
  );
}
