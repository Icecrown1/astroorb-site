import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import VenusCalculator from "@/components/calculators/VenusCalculator";
import { SIGNS } from "@/lib/zodiac";
import { VENUS_RU } from "@/lib/venus";
import { VENUS_DIGNITY_LABEL_EN, VENUS_EN } from "@/lib/venusEn";
import { pageOg } from "@/lib/site";


const TAGLINES = Object.fromEntries(SIGNS.map((x) => [x.slug, VENUS_EN[x.slug].tagline]));
export const metadata: Metadata = {
  title: "Venus Sign Calculator & Meanings: Venus in All 12 Signs",
  description:
    "Find your Venus sign from your date of birth for free: how you love, who you're drawn to, Venus in women and men, taste and money habits. All 12 signs.",
  alternates: { canonical: "/en/planets/venus", languages: { ru: "/planets/venus", en: "/en/planets/venus", "x-default": "/planets/venus" } },
  openGraph: pageOg("/en/planets/venus", "en"),
};

const FAQ_ITEMS = [
  {
    q: "How do I find my Venus sign?",
    a: "Enter your date of birth in the calculator above. Venus stays in one sign for anywhere from three weeks to four months, so the date is almost always enough. You only need your birth time if Venus changed signs on your actual birthday — the calculator will tell you.",
  },
  {
    q: "What does Venus mean in a birth chart?",
    a: "How you love and what you find beautiful: who you're drawn to, how you show affection, what you give and what you hope to receive. Venus also covers taste, style, pleasure and your relationship with money.",
  },
  {
    q: "Why is my Venus in a different sign from my Sun?",
    a: "Venus always stays close to the Sun — never more than about 47° away. So it sits either in your Sun sign or in one of the two signs on each side. A Scorpio Sun, for example, can have Venus in Virgo, Libra, Scorpio, Sagittarius or Capricorn.",
  },
  {
    q: "Does a man's Venus show the type of woman he likes?",
    a: "Largely, yes: in a man's chart Venus describes the women he's drawn to and how he courts. But it also describes him — his taste, his tenderness and how he enjoys life.",
  },
];

const DIGNITY_ROWS = [
  ["Domicile", "taurus", "Home ground: comfort, pleasure and constancy"],
  ["Domicile", "libra", "Home ground: partnership, taste and diplomacy"],
  ["Exaltation", "pisces", "Love at its most devoted: compassion and romance"],
  ["Detriment", "scorpio", "Intensity and a need for total closeness instead of ease"],
  ["Detriment", "aries", "Drive and initiative instead of accommodation"],
  ["Fall", "virgo", "Love shown through practical care and attention to detail"],
] as const;

export default function VenusHubPageEn() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/planets/venus", label: "Venus signs" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Venus sign calculator — <span className="grad-text">find yours by birth date</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Your Venus sign shows how you love: who you&rsquo;re drawn to, how you show affection and what you find
          beautiful. Computed from real astronomical data — free, no sign-up.
        </p>
        <div className="mt-10">
          <VenusCalculator locale="en" taglines={TAGLINES} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Venus in all 12 signs</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((s, i) => {
            const dignity = VENUS_RU[s.slug].dignity;
            return (
              <Reveal key={s.slug} delay={(i % 6) * 50}>
                <Link
                  href={`/en/planets/venus/${s.slug}`}
                  className="group block h-full rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg">
                      <span aria-hidden="true" className="mr-2 text-iris">
                        {s.symbol}
                      </span>
                      Venus in {s.en.name}
                    </span>
                    {dignity && (
                      <span className="text-[11px] uppercase tracking-[0.14em] text-stellar">
                        {VENUS_DIGNITY_LABEL_EN[dignity.kind]}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-muted">{VENUS_EN[s.slug].tagline}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Why Venus is always close to your sign</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            Seen from Earth, Venus never strays more than about 47° from the Sun. So in a birth chart it sits either in
            your Sun sign or one to two signs away. A Leo Sun can have Venus in Gemini, Cancer, Leo, Virgo or Libra —
            but never in Capricorn. That&rsquo;s why people with the same zodiac sign can love so differently: it comes
            down to where their Venus is.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Every year and a half, Venus turns backward for about six weeks — Venus retrograde. In 2026 the retrograde
            runs from October 3 to November 14, from Scorpio back into Libra. What it means and how to handle it is in{" "}
            <Link href="/en/blog/venus-retrograde-2026" className="text-iris hover:underline">
              Venus retrograde 2026
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8 pt-12">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Venus dignities: strong and challenging placements</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            In traditional astrology Venus has two signs of its own, one sign of exaltation and signs where its nature
            has to adapt. A &lsquo;challenging&rsquo; placement isn&rsquo;t a bad one — it&rsquo;s simply a different
            way of loving.
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
                {DIGNITY_ROWS.map(([label, slug, text]) => {
                  const sign = SIGNS.find((x) => x.slug === slug)!;
                  return (
                    <tr key={slug} className="border-t border-hairline">
                      <td className="px-4 py-3 text-ink">{label}</td>
                      <td className="px-4 py-3">
                        <Link href={`/en/planets/venus/${slug}`} className="text-iris hover:underline">
                          Venus in {sign.en.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted">{text}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            Venus shows how you love; the Moon shows what you need to feel safe. Find your{" "}
            <Link href="/en/planets/moon" className="text-iris hover:underline">
              Moon sign
            </Link>{" "}
            too — together they explain most of how you behave in relationships. To compare with a partner, see{" "}
            <Link href="/en/compatibility" className="text-iris hover:underline">
              zodiac compatibility
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />

      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Venus is one of ten planets in your chart</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              AstroOrbi calculates your full birth chart with Swiss Ephemeris and shows which house your Venus sits in
              and which planets it connects to — the details that make the way you love your own.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="en_venus_hub" cta="natal">
                Open AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
