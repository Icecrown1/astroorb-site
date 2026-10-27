import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import VenusCalculator from "@/components/calculators/VenusCalculator";
import { ELEMENT_RU, SIGNS, signBySlug, type Sign } from "@/lib/zodiac";
import { MODALITY_RU, RU_PREP, moonRelations } from "@/lib/moon";
import { VENUS_DIGNITY_LABEL_RU, VENUS_RU } from "@/lib/venus";
import { pageOg, SITE_URL } from "@/lib/site";


const TAGLINES = Object.fromEntries(SIGNS.map((x) => [x.slug, VENUS_RU[x.slug].tagline]));
export const dynamicParams = false;

export function generateStaticParams() {
  return SIGNS.map((s) => ({ sign: s.slug }));
}

export function generateMetadata({ params }: { params: { sign: string } }): Metadata {
  const s = signBySlug(params.sign);
  if (!s) return {};
  const v = VENUS_RU[s.slug];
  const prep = RU_PREP[s.slug];
  const dignity = v.dignity ? ` ${s.ru} — ${VENUS_DIGNITY_LABEL_RU[v.dignity.kind]} Венеры.` : "";
  return {
    title: `Венера ${prep} у женщины и мужчины: значение в карте`,
    description: `Венера ${prep}: ${v.tagline.toLowerCase()}. Как любит, кто привлекает, Венера у женщины и у мужчины, вкус и деньги.${dignity} Калькулятор знака Венеры.`,
    alternates: {
      canonical: `/planets/venus/${s.slug}`,
      languages: { ru: `/planets/venus/${s.slug}`, en: `/en/planets/venus/${s.slug}`, "x-default": `/planets/venus/${s.slug}` },
    },
    openGraph: { ...pageOg(`/planets/venus/${s.slug}`), type: "article" },
  };
}

const H2 = "mt-12 font-display text-xl md:text-2xl";
const P = "mt-4 text-[15px] leading-relaxed text-muted";
const ELEMENT_ADJ: Record<Sign["element"], string> = { fire: "огненной", earth: "земной", air: "воздушной", water: "водной" };

function SignLinks({ signs }: { signs: Sign[] }) {
  return (
    <>
      {signs.map((x, i) => (
        <span key={x.slug}>
          {i > 0 && (i === signs.length - 1 ? " и " : ", ")}
          <Link href={`/planets/venus/${x.slug}`} className="text-iris hover:underline">
            {RU_PREP[x.slug]}
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

export default function VenusSignPage({ params }: { params: { sign: string } }) {
  const s = signBySlug(params.sign);
  if (!s) notFound();
  const v = VENUS_RU[s.slug];
  const prep = RU_PREP[s.slug];
  const rel = moonRelations(s.slug);
  const others = SIGNS.filter((x) => x.slug !== s.slug);

  const faq = [
    ...v.faq,
    {
      q: `Как узнать, что у меня Венера ${prep}?`,
      a: "Введите дату рождения в калькулятор на этой странице. Венера остаётся в знаке от трёх недель до нескольких месяцев, поэтому обычно хватает даты; время рождения понадобится, только если Венера сменила знак в ваш день рождения.",
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Венера ${prep}: значение в натальной карте`,
    description: v.tagline,
    inLanguage: "ru-RU",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    author: { "@type": "Organization", name: "AstroOrbi", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/planets/venus/${s.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/planets/venus", label: "Венера в знаках" },
          { href: `/planets/venus/${s.slug}`, label: `Венера ${prep}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">
          {s.symbol} Венера · {ELEMENT_RU[s.element]} · {MODALITY_RU[s.modality]} знак
          {v.dignity ? ` · ${VENUS_DIGNITY_LABEL_RU[v.dignity.kind]}` : ""}
        </p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Венера <span className="grad-text">{prep}</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{v.tagline}</p>
        <p className={P}>{v.intro}</p>

        {v.dignity && (
          <div className="mt-8 rounded-2xl border border-stellar/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Положение Венеры: {VENUS_DIGNITY_LABEL_RU[v.dignity.kind]}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed">{v.dignity.note}</p>
          </div>
        )}

        <h2 className={H2}>Что Венера {prep} ценит в любви</h2>
        <Bullets items={v.values} />

        <h2 className={H2}>Венера {prep} у женщины</h2>
        <p className={P}>{v.woman}</p>

        <h2 className={H2}>Венера {prep} у мужчины</h2>
        <p className={P}>{v.man}</p>

        <h2 className={H2}>Как любит Венера {prep}</h2>
        <p className={P}>{v.love}</p>

        <h2 className={H2}>Вкус, стиль и деньги</h2>
        <p className={P}>{v.style}</p>

        <h2 className={H2}>Слабые места</h2>
        <p className={P}>{v.shadow}</p>

        <h2 className={H2}>Чем порадовать Венеру {prep}</h2>
        <Bullets items={v.gifts} />

        <h2 className={H2}>С какими Венерами легче всего</h2>
        <p className={P}>
          Проще всего понять друг друга Венерам одной стихии — {ELEMENT_ADJ[s.element]}: Венера{" "}
          <SignLinks signs={rel.same} />. Венеру {prep} хорошо дополняет Венера союзной стихии — <SignLinks signs={rel.allied} />.
          Больше усилий понадобится с Венерой в квадрате — <SignLinks signs={rel.square} />: любовь такие Венеры
          выражают по-разному. Что вам нужно для чувства безопасности рядом с партнёром, подскажет{" "}
          <Link href={`/planets/moon/${s.slug}`} className="text-iris hover:underline">
            Луна {prep}
          </Link>{" "}
          — или Луна в том знаке, где она стоит у вас.
        </p>

        <h2 className={H2}>Проверьте свою Венеру по дате рождения</h2>
        <p className={P}>
          Не уверены, что ваша Венера {prep}? Калькулятор рассчитает её положение по астрономическим данным.
        </p>
      </article>

      <section className="mx-auto max-w-3xl px-4 pt-6">
        <VenusCalculator taglines={TAGLINES} />
      </section>

      <FAQ items={faq} />

      <section className="mx-auto max-w-3xl px-4">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Ваша Венера — в контексте всей карты</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Знак Венеры — только часть картины. AstroOrbi покажет, в каком доме стоит ваша Венера, с какими планетами
              она связана и как это проявляется в отношениях и в деньгах.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page={`venus_${s.slug}`} cta="natal">
                Открыть AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Венера в других знаках" className="mx-auto max-w-3xl px-4 pb-24 pt-16">
        <h2 className="font-display text-xl">Венера в других знаках</h2>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={`/planets/venus/${x.slug}`} className="text-iris hover:underline">
                {x.symbol} Венера {RU_PREP[x.slug]}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/planets/venus" className="text-muted hover:text-ink">
            ← Все знаки и калькулятор Венеры
          </Link>
        </p>
      </nav>
    </>
  );
}
