import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import MoonCalculator from "@/components/calculators/MoonCalculator";
import { ELEMENT_EN, SIGNS, signBySlug, type Sign } from "@/lib/zodiac";
import { MOON_RU, moonRelations } from "@/lib/moon";
import { DIGNITY_EN, MODALITY_EN, MOON_EN } from "@/lib/moonEn";
import { pageOg, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return SIGNS.map((s) => ({ sign: s.slug }));
}

export function generateMetadata({ params }: { params: { sign: string } }): Metadata {
  const s = signBySlug(params.sign);
  if (!s) return {};
  const m = MOON_EN[s.slug];
  const name = s.en.name;
  return {
    title: `Moon in ${name}: Meaning for Women, Men & Love`,
    description: `The ${name} Moon: ${m.tagline.toLowerCase()}. Emotional needs, the ${name} Moon woman and man, love and compatibility. Free Moon sign calculator.`,
    alternates: {
      canonical: `/en/planets/moon/${s.slug}`,
      languages: { ru: `/planets/moon/${s.slug}`, en: `/en/planets/moon/${s.slug}`, "x-default": `/planets/moon/${s.slug}` },
    },
    openGraph: { ...pageOg(`/en/planets/moon/${s.slug}`, "en"), type: "article" },
  };
}

const H2 = "mt-12 font-display text-xl md:text-2xl";
const P = "mt-4 text-[15px] leading-relaxed text-muted";

function SignLinks({ signs }: { signs: Sign[] }) {
  return (
    <>
      {signs.map((x, i) => (
        <span key={x.slug}>
          {i > 0 && (i === signs.length - 1 ? " and " : ", ")}
          <Link href={`/en/planets/moon/${x.slug}`} className="text-iris hover:underline">
            {x.en.name}
          </Link>
        </span>
      ))}
    </>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((x) => (
        <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-1 text-stellar">
            ✦
          </span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MoonSignPageEn({ params }: { params: { sign: string } }) {
  const s = signBySlug(params.sign);
  if (!s) notFound();
  const m = MOON_EN[s.slug];
  const dignity = MOON_RU[s.slug].dignity;
  const name = s.en.name;
  const rel = moonRelations(s.slug);
  const others = SIGNS.filter((x) => x.slug !== s.slug);

  const faq = [
    ...m.faq,
    {
      q: `How do I know if my Moon is in ${name}?`,
      a: "Enter your date of birth in the calculator on this page. The Moon changes sign every 2 to 2.5 days, so the date is usually enough; if it switched signs on your birthday, you'll need your birth time.",
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Moon in ${name}: meaning in the birth chart`,
    description: m.tagline,
    inLanguage: "en",
    datePublished: "2026-10-02",
    dateModified: "2026-10-02",
    author: { "@type": "Organization", name: "AstroOrbi", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/en/planets/moon/${s.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/en", label: "Home" },
          { href: "/en/planets/moon", label: "Moon signs" },
          { href: `/en/planets/moon/${s.slug}`, label: `Moon in ${name}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">
          {s.symbol} Moon · {ELEMENT_EN[s.element]} · {MODALITY_EN[s.modality]} sign
          {dignity ? ` · ${DIGNITY_EN[dignity].label}` : ""}
        </p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Moon in <span className="grad-text">{name}</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{m.tagline}</p>
        <p className={P}>{m.intro}</p>

        {dignity && (
          <div className="mt-8 rounded-2xl border border-stellar/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Moon dignity: {DIGNITY_EN[dignity].label}</p>
            <p className="mt-2 text-[15px] leading-relaxed">{DIGNITY_EN[dignity].text}</p>
          </div>
        )}

        <h2 className={H2}>What makes the {name} Moon feel safe</h2>
        <Bullets items={m.needs} />

        <h2 className={H2}>The {name} Moon woman</h2>
        <p className={P}>{m.woman}</p>

        <h2 className={H2}>The {name} Moon man</h2>
        <p className={P}>{m.man}</p>

        <h2 className={H2}>The {name} Moon in love</h2>
        <p className={P}>{m.love}</p>

        <h2 className={H2}>Weak spots</h2>
        <p className={P}>{m.shadow}</p>

        <h2 className={H2}>What helps it recharge</h2>
        <Bullets items={m.restore} />

        <h2 className={H2}>Which Moons it gets along with best</h2>
        <p className={P}>
          It understands Moons of its own element, {ELEMENT_EN[s.element].toLowerCase()}, most easily:{" "}
          <SignLinks signs={rel.same} />. Moons of the complementary element ({ELEMENT_EN[rel.allied[0].element].toLowerCase()}) suit it
          well: <SignLinks signs={rel.allied} />.
          It takes more effort with the Moons that square it — <SignLinks signs={rel.square} />: they show care in different
          ways. More in our guide to{" "}
          <Link href="/en/blog/moon-sign-compatibility" className="text-iris hover:underline">
            Moon sign compatibility
          </Link>
          .
        </p>

        <h2 className={H2}>Check your Moon sign by birth date</h2>
        <p className={P}>Not sure your Moon is in {name}? The calculator works it out from astronomical data.</p>
      </article>

      <section className="mx-auto max-w-3xl px-4 pt-6">
        <MoonCalculator locale="en" />
      </section>

      <FAQ items={faq} title="FAQ" />

      <section className="mx-auto max-w-3xl px-4">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Your Moon — in the context of your whole chart</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Your Moon sign is only part of the picture. AstroOrbi shows which house your Moon sits in, which planets it
              connects to and how that plays out in relationships.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page={`en_moon_${s.slug}`} cta="natal">
                Open AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="The Moon in other signs" className="mx-auto max-w-3xl px-4 pb-24 pt-16">
        <h2 className="font-display text-xl">The Moon in other signs</h2>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={`/en/planets/moon/${x.slug}`} className="text-iris hover:underline">
                {x.symbol} Moon in {x.en.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/en/planets/moon" className="text-muted hover:text-ink">
            ← All signs and the Moon calculator
          </Link>
        </p>
      </nav>
    </>
  );
}
