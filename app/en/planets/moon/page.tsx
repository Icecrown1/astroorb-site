import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import MoonCalculator from "@/components/calculators/MoonCalculator";
import { SIGNS } from "@/lib/zodiac";
import { MOON_RU } from "@/lib/moon";
import { DIGNITY_EN, MOON_EN } from "@/lib/moonEn";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Moon Sign Calculator & Meanings: the Moon in All 12 Signs",
  description:
    "Find your Moon sign from your date of birth for free, then read what it means: emotional needs, the Moon sign in women and men, love and compatibility. All 12 signs.",
  alternates: { canonical: "/en/planets/moon", languages: { ru: "/planets/moon", en: "/en/planets/moon", "x-default": "/planets/moon" } },
  openGraph: pageOg("/en/planets/moon", "en"),
};

const FAQ_ITEMS = [
  {
    q: "How do I find my Moon sign?",
    a: "Enter your date of birth in the calculator above. The Moon changes sign every 2 to 2.5 days, so the date is usually enough. If the Moon changed signs on your birthday, the calculator shows the exact switch time — then your birth time decides it.",
  },
  {
    q: "Which matters more — my Sun sign or my Moon sign?",
    a: "They describe different things. The Sun is how you express yourself and what you strive for. The Moon is what you need to feel safe and how you process emotions. In close relationships, the Moon often shows more than the Sun.",
  },
  {
    q: "Why do people with the same zodiac sign have such different personalities?",
    a: "Your zodiac sign is the Sun's position. In the same month the Moon passes through all 12 signs, so people with the same Sun sign almost always have different Moons — and react emotionally in different ways.",
  },
];

const DIGNITY_ROWS = [
  ["Domicile", "cancer", "The Moon in its own sign: emotions come through fully and naturally"],
  ["Exaltation", "taurus", "Emotions are especially steady; calm is easy to restore"],
  ["Detriment", "capricorn", "Softness hides behind responsibility and self-control"],
  ["Fall", "scorpio", "Calm meets intensity — feelings run especially deep"],
] as const;

export default function MoonHubPageEn() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/planets/moon", label: "Moon signs" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Moon sign calculator — <span className="grad-text">find yours by birth date</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Your Moon sign describes your emotional needs: what makes you feel safe, how you process feelings and how you
          care for others. Computed from real astronomical data — free, no sign-up.
        </p>
        <div className="mt-10">
          <MoonCalculator locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">The Moon in all 12 signs</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((s, i) => {
            const dignity = MOON_RU[s.slug].dignity;
            return (
              <Reveal key={s.slug} delay={(i % 6) * 50}>
                <Link
                  href={`/en/planets/moon/${s.slug}`}
                  className="group block h-full rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg">
                      <span aria-hidden="true" className="mr-2 text-iris">
                        {s.symbol}
                      </span>
                      Moon in {s.en.name}
                    </span>
                    {dignity && (
                      <span className="text-[11px] uppercase tracking-[0.14em] text-stellar">{DIGNITY_EN[dignity].label}</span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-muted">{MOON_EN[s.slug].tagline}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Where the Moon is strong and where it struggles</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            In traditional astrology every planet has signs where it's at ease and signs where its nature has to adapt.
            A &ldquo;weak&rdquo; placement isn&rsquo;t a bad one — it&rsquo;s a different way of expressing itself.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Dignity</th>
                  <th className="px-4 py-3 font-medium">Sign</th>
                  <th className="px-4 py-3 font-medium">What it means</th>
                </tr>
              </thead>
              <tbody>
                {DIGNITY_ROWS.map(([label, slug, text]) => (
                  <tr key={slug} className="border-t border-hairline">
                    <td className="px-4 py-3 text-ink">{label}</td>
                    <td className="px-4 py-3">
                      <Link href={`/en/planets/moon/${slug}`} className="text-iris hover:underline">
                        Moon in {SIGNS.find((x) => x.slug === slug)?.en.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            More on how the Moon works in a chart and why it matters in relationships:{" "}
            <Link href="/en/blog/moon-sign-meaning" className="text-iris hover:underline">
              Moon sign meaning
            </Link>{" "}
            and{" "}
            <Link href="/en/blog/moon-sign-compatibility" className="text-iris hover:underline">
              Moon sign compatibility
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />

      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">The Moon is just one planet out of ten</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              AstroOrbi computes your full birth chart with Swiss Ephemeris and explains how your Moon connects to your
              Sun, rising sign and the other planets.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="en_moon_hub" cta="natal">
                Open AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
