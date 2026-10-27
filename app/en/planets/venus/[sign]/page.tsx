import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import VenusCalculator from "@/components/calculators/VenusCalculator";
import { ELEMENT_EN, SIGNS, signBySlug, type Sign } from "@/lib/zodiac";
import { moonRelations } from "@/lib/moon";
import { MODALITY_EN } from "@/lib/moonEn";
import { VENUS_RU } from "@/lib/venus";
import { VENUS_DIGNITY_LABEL_EN, VENUS_EN } from "@/lib/venusEn";
import { pageOg, SITE_URL } from "@/lib/site";


const TAGLINES = Object.fromEntries(SIGNS.map((x) => [x.slug, VENUS_EN[x.slug].tagline]));
export const dynamicParams = false;

export function generateStaticParams() {
  return SIGNS.map((s) => ({ sign: s.slug }));
}

export function generateMetadata({ params }: { params: { sign: string } }): Metadata {
  const s = signBySlug(params.sign);
  if (!s) return {};
  const v = VENUS_EN[s.slug];
  const name = s.en.name;
  return {
    title: `Venus in ${name}: Meaning for Women, Men & Love`,
    description: `Venus in ${name}: ${v.tagline.toLowerCase()}. How it loves, who it's drawn to, Venus in ${name} in women and men, taste and money. Free Venus sign calculator.`,
    alternates: {
      canonical: `/en/planets/venus/${s.slug}`,
      languages: { ru: `/planets/venus/${s.slug}`, en: `/en/planets/venus/${s.slug}`, "x-default": `/planets/venus/${s.slug}` },
    },
    openGraph: { ...pageOg(`/en/planets/venus/${s.slug}`, "en"), type: "article" },
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
          <Link href={`/en/planets/venus/${x.slug}`} className="text-iris hover:underline">
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

export default function VenusSignPageEn({ params }: { params: { sign: string } }) {
  const s = signBySlug(params.sign);
  if (!s) notFound();
  const v = VENUS_EN[s.slug];
  const dignity = VENUS_RU[s.slug].dignity;
  const name = s.en.name;
  const rel = moonRelations(s.slug);
  const others = SIGNS.filter((x) => x.slug !== s.slug);

  const faq = [
    ...v.faq,
    {
      q: `How do I know if my Venus is in ${name}?`,
      a: "Enter your date of birth in the calculator on this page. Venus stays in a sign for anywhere from three weeks to a few months, so the date is usually enough; you only need your birth time if Venus changed signs on your birthday.",
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Venus in ${name}: meaning in the birth chart`,
    description: v.tagline,
    inLanguage: "en",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    author: { "@type": "Organization", name: "AstroOrbi", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/en/planets/venus/${s.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/en", label: "Home" },
          { href: "/en/planets/venus", label: "Venus signs" },
          { href: `/en/planets/venus/${s.slug}`, label: `Venus in ${name}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">
          {s.symbol} Venus · {ELEMENT_EN[s.element]} · {MODALITY_EN[s.modality]} sign
          {dignity ? ` · ${VENUS_DIGNITY_LABEL_EN[dignity.kind]}` : ""}
        </p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Venus in <span className="grad-text">{name}</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{v.tagline}</p>
        <p className={P}>{v.intro}</p>

        {dignity && v.dignityNote && (
          <div className="mt-8 rounded-2xl border border-stellar/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Venus dignity: {VENUS_DIGNITY_LABEL_EN[dignity.kind]}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed">{v.dignityNote}</p>
          </div>
        )}

        <h2 className={H2}>What Venus in {name} values in love</h2>
        <Bullets items={v.values} />

        <h2 className={H2}>Venus in {name} in a woman&rsquo;s chart</h2>
        <p className={P}>{v.woman}</p>

        <h2 className={H2}>Venus in {name} in a man&rsquo;s chart</h2>
        <p className={P}>{v.man}</p>

        <h2 className={H2}>How Venus in {name} loves</h2>
        <p className={P}>{v.love}</p>

        <h2 className={H2}>Taste, style and money</h2>
        <p className={P}>{v.style}</p>

        <h2 className={H2}>Weak spots</h2>
        <p className={P}>{v.shadow}</p>

        <h2 className={H2}>How to make Venus in {name} happy</h2>
        <Bullets items={v.gifts} />

        <h2 className={H2}>Which Venus signs it gets along with</h2>
        <p className={P}>
          It&rsquo;s easiest with Venus in its own element, {ELEMENT_EN[s.element].toLowerCase()}:{" "}
          <SignLinks signs={rel.same} />. Venus in the complementary element suits it well:{" "}
          <SignLinks signs={rel.allied} />. It takes more effort with Venus in a square —{" "}
          <SignLinks signs={rel.square} />: these placements express love in different ways. For what you need to feel
          safe with a partner, see the{" "}
          <Link href={`/en/planets/moon/${s.slug}`} className="text-iris hover:underline">
            Moon in {name}
          </Link>{" "}
          — or wherever your own Moon is.
        </p>

        <h2 className={H2}>Check your Venus sign by birth date</h2>
        <p className={P}>Not sure your Venus is in {name}? The calculator works it out from astronomical data.</p>
      </article>

      <section className="mx-auto max-w-3xl px-4 pt-6">
        <VenusCalculator locale="en" taglines={TAGLINES} />
      </section>

      <FAQ items={faq} title="FAQ" />

      <section className="mx-auto max-w-3xl px-4">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Your Venus — in the context of your whole chart</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Your Venus sign is only part of the picture. AstroOrbi shows which house your Venus sits in, which planets
              it connects to and how that plays out in love and money.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page={`en_venus_${s.slug}`} cta="natal">
                Open AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Venus in other signs" className="mx-auto max-w-3xl px-4 pb-24 pt-16">
        <h2 className="font-display text-xl">Venus in other signs</h2>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={`/en/planets/venus/${x.slug}`} className="text-iris hover:underline">
                {x.symbol} Venus in {x.en.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/en/planets/venus" className="text-muted hover:text-ink">
            ← All signs and the Venus calculator
          </Link>
        </p>
      </nav>
    </>
  );
}
