import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Astro Orb — Technology & Method",
  description:
    "Swiss Ephemeris calculations on NASA JPL data, AI interpretations, honest payments. How Astro Orb works under the hood.",
  alternates: { canonical: "/en/about", languages: { ru: "/about", en: "/en/about", "x-default": "/about" } },
  openGraph: pageOg("/en/about", "en"),
};

export default function EnAboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/about", label: "About" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <h1 className="font-display text-3xl leading-[1.15] md:text-5xl">
          Astrology with <span className="grad-text">engineering honesty</span>
        </h1>

        <Reveal>
          <div className="mt-10 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Astro Orb stands on two components. The first is astronomy: all planetary positions are
              calculated by Swiss Ephemeris, the professional standard built on NASA JPL DE ephemerides
              with sub-arc-second precision. Every chart in the app is real sky, not tables from a
              magazine.
            </p>
            <p>
              The second is language. Interpretations are written by a modern AI model that receives
              your exact configuration — planets in signs, houses, aspects — and writes a coherent
              reading for you specifically. Not a horoscope for a twelfth of humanity: a text about
              your chart, with a chat where you can ask follow-ups.
            </p>
            <p>
              We are honest about the genre: astrology is a language of self-reflection, not a
              scientific forecast. The astronomy under it is precise; what you do with the insights
              is up to you. No scare tactics, no "remove the curse" upsells — that's a principle.
            </p>
            <p>
              Astro Orb runs as a Telegram Mini App: no installs, charts saved, subscription
              cancellable in one click. Payments by card, TON or Telegram Stars.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            <CTA page="en_about" cta="main">Open Astro Orb</CTA>
          </div>
        </Reveal>
      </section>
    </>
  );
}
