import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import MatrixCalculator from "@/components/calculators/MatrixCalculator";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { ARCANA } from "@/lib/arcana";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Destiny Matrix Calculator — 22 Arcana from Your Birth Date",
  description:
    "Calculate your Destiny Matrix free: personal and destiny arcana revealed instantly, all 22 energies explained. A birth-date method built on tarot arcana.",
  alternates: { canonical: "/en/matrix", languages: { ru: "/matrix", en: "/en/matrix", "x-default": "/matrix" } },
  openGraph: pageOg("/en/matrix", "en"),
};

const FAQ_ITEMS = [
  { q: "What is the Destiny Matrix?", a: "A birth-date method that maps your date onto the 22 major arcana of tarot. Each position of the matrix — personality, family line, karma, money — carries one of 22 energies with a 'plus' and 'minus' expression." },
  { q: "How is it calculated?", a: "The digits of your birth date are reduced to numbers from 1 to 22. The day gives the personal arcana, the full sum gives the destiny arcana; further positions combine these numbers." },
  { q: "Is this astrology?", a: "No — it's a numerological system that uses tarot imagery. Many people use both: the birth chart for the psyche's mechanics, the matrix as a language of life scenarios. Astro Orb calculates both." },
  { q: "What does the full reading add?", a: "The complete matrix: family-line programs, the karmic tail, the money zone, purpose by ages — with AI explanations of how your specific energies interact." },
];

export default function EnMatrixPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/matrix", label: "Destiny matrix" }]} />
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Destiny Matrix — <span className="grad-text">calculate by birth date</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Two key energies open instantly and free; the full layout of all positions is in Astro Orb.
        </p>
        <div className="mt-10">
          <MatrixCalculator locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">All 22 arcana</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ARCANA.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 4) * 40}>
              <Link
                href={`/en/matrix/${a.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-4 text-sm transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline font-display text-stellar">
                  {a.n}
                </span>
                <span>
                  <span className="block font-medium">{a.en.name}</span>
                  <span className="block text-xs text-muted">{a.en.keyword}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} title="FAQ" />
    </>
  );
}
