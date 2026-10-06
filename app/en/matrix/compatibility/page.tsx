import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import MatrixPairCalculator from "@/components/calculators/MatrixPairCalculator";
import { arcanaByNumber } from "@/lib/arcana";
import { PAIR_CENTER, PAIR_ZONES } from "@/lib/matrixPair";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Destiny Matrix Compatibility Calculator by Birth Date",
  description:
    "Free Destiny Matrix compatibility: build the couple matrix from two birth dates and see the arcana of five zones — the core of your bond, home life, money, karmic tail and shared purpose.",
  alternates: {
    canonical: "/en/matrix/compatibility",
    languages: { ru: "/matrix/compatibility", en: "/en/matrix/compatibility", "x-default": "/matrix/compatibility" },
  },
  openGraph: pageOg("/en/matrix/compatibility", "en"),
};

const FAQ_ITEMS = [
  {
    q: "How do you calculate Destiny Matrix compatibility?",
    a: "Build each partner's personal matrix from their birth date, then add matching points together: day to day, month to month, center to center. If a sum is over 22, add its digits. The result is the couple matrix — the calculator on this page does it for you.",
  },
  {
    q: "What is the couple center?",
    a: "The sum of the two personal matrix centers, reduced to a number from 1 to 22. It's the main theme of the relationship: what holds you together, what comes easiest as a couple and which pattern switches on when things go wrong.",
  },
  {
    q: "Can the matrix tell us whether we're compatible?",
    a: "The couple matrix doesn't give a 'compatible / not compatible' verdict. Every arcana has a best and a worst expression, so it shows the strengths of your bond and the areas where it's worth agreeing on things in advance. You make the decisions about your relationship, not the numbers.",
  },
  {
    q: "Do I need a birth time?",
    a: "No. The Destiny Matrix only uses birth dates — no time or place. That's the main difference from astrological synastry, which needs the hour and city of birth.",
  },
  {
    q: "Does it work for friends, parents or business partners?",
    a: "The formula is the same for any two people. The money and shared-purpose zones read well for business partners and family, while 'Love and everyday life' is written mainly for couples.",
  },
  {
    q: "What's in the full couple reading in AstroOrbi?",
    a: "Five zones — the core of your bond, love and everyday life, money as a couple, the couple's karmic tail and your purpose as a couple. For each: how you work at your best and where you break down at your worst, in concrete situations, plus three steps for the coming month. Reopening a saved couple reading is free.",
  },
];

const H2 = "font-display text-2xl md:text-3xl";
const P = "text-[15px] leading-relaxed text-muted";

export default function EnMatrixCompatibilityPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Destiny Matrix compatibility calculator",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    inLanguage: "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/en", label: "Home" },
          { href: "/en/matrix", label: "Destiny matrix" },
          { href: "/en/matrix/compatibility", label: "Compatibility" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Destiny Matrix compatibility — <span className="grad-text">by two birth dates</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Enter two dates and the calculator builds your couple matrix: the center of your bond and the arcana of five
          zones — the core of the relationship, home life, money, the shared karmic tail and your purpose as a couple.
          Free, no sign-up.
        </p>
        <div className="mt-10">
          <MatrixPairCalculator locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-24">
        <Reveal>
          <h2 className={H2}>How Destiny Matrix compatibility is calculated</h2>
          <div className="mt-6 space-y-4">
            <p className={P}>
              The Destiny Matrix doesn&rsquo;t compare two people on a &lsquo;match or no match&rsquo; scale. Instead it
              builds a third, shared matrix — the couple matrix. First, each partner&rsquo;s personal matrix is built
              from their birth date. Then matching points are added together: day to day, month to month, center to
              center, across the whole chart. If a sum is over 22, its digits are added until you get a number from 1 to
              22 — the arcana number.
            </p>
            <p className={P}>
              Example: 24 March 1981 and 15 July 1990. The first matrix has a center of 11 (6 + 3 + 19 + 10 = 38, 3 + 8 =
              11), the second has 10 (15 + 7 + 19 + 5 = 46, 4 + 6 = 10). The couple center is 11 + 10 = 21, The World.
              The other points work the same way: days 24 (→ 6) and 15 give 21, months 3 and 7 give 10, years 19 and 19 give
              38, which reduces to 11.
            </p>
            <p className={P}>
              The couple matrix doesn&rsquo;t describe either of you separately — it describes what happens between you:
              the roles you fall into together, where the relationship gives you strength and where the same conflicts
              keep coming back. You can see your own chart in the{" "}
              <Link href="/en/matrix" className="text-iris hover:underline">
                Destiny Matrix calculator
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <Reveal>
          <h2 className={H2}>What the five zones of the couple matrix show</h2>
        </Reveal>
        <div className="mt-6 space-y-3">
          {PAIR_ZONES.map((z) => (
            <div key={z.id} className="rounded-2xl border border-hairline bg-surface p-5">
              <h3 className="font-medium">{z.title.en}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{z.about.en}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <Reveal>
          <h2 className={H2}>The couple center: meanings of arcana 1 to 22</h2>
          <p className={`mt-4 ${P}`}>
            Find your couple center number in the calculator. Each description covers how a couple lives when the center
            works at its best — and where its risk lies.
          </p>
        </Reveal>
        <div className="mt-8 space-y-5">
          {Array.from({ length: 22 }, (_, i) => i + 1).map((n) => {
            const a = arcanaByNumber(n);
            return (
              <div key={n} className="border-b border-hairline pb-5">
                <h3 className="font-display text-lg">
                  <span className="grad-text">{n}</span>{" "}
                  <Link href={`/en/matrix/${a.slug}`} className="hover:text-iris">
                    {a.en.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{PAIR_CENTER[n].en}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <Reveal>
          <h2 className={H2}>Why there&rsquo;s no compatibility percentage</h2>
          <div className="mt-6 space-y-4">
            <p className={P}>
              Every arcana in the matrix has a best and a worst expression. A &lsquo;difficult&rsquo; couple center
              doesn&rsquo;t doom a relationship, and an &lsquo;easy&rsquo; one doesn&rsquo;t guarantee everything will
              work out on its own. That&rsquo;s why we don&rsquo;t give a percentage or a verdict: the couple matrix is a
              map of where your bond has resources and where it pays to agree on things early.
            </p>
            <p className={P}>
              The Destiny Matrix is a numerological system for self-reflection, not a science. For another angle on your
              relationship, compare your signs in{" "}
              <Link href="/en/compatibility" className="text-iris hover:underline">
                zodiac compatibility
              </Link>{" "}
              or read how{" "}
              <Link href="/en/blog/moon-sign-compatibility" className="text-iris hover:underline">
                Moon sign compatibility
              </Link>{" "}
              works.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">The full reading for your couple</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              For each of the five zones, AstroOrbi shows how your couple works at its best and where it breaks down at its
              worst, with examples about home, money and arguments — plus three steps for the month. Your personal
              matrix with section readings is there too.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="en_matrix_pair" cta="page_bottom">
                Open the couple reading
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />
    </>
  );
}
