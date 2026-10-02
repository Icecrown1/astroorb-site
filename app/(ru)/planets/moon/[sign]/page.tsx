import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import MoonCalculator from "@/components/calculators/MoonCalculator";
import { ELEMENT_RU, SIGNS, signBySlug, type Sign } from "@/lib/zodiac";
import { DIGNITY_RU, MODALITY_RU, MOON_RU, RU_PREP, moonRelations } from "@/lib/moon";
import { pageOg, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return SIGNS.map((s) => ({ sign: s.slug }));
}

export function generateMetadata({ params }: { params: { sign: string } }): Metadata {
  const s = signBySlug(params.sign);
  if (!s) return {};
  const m = MOON_RU[s.slug];
  const prep = RU_PREP[s.slug];
  const dignity = m.dignity ? ` ${s.ru} — ${DIGNITY_RU[m.dignity].label} Луны.` : "";
  return {
    title: `Луна ${prep} у женщины и мужчины: значение в натальной карте`,
    description: `Луна ${prep}: ${m.tagline.toLowerCase()}. Эмоциональные потребности, проявление у женщины и у мужчины, в отношениях.${dignity} Калькулятор знака Луны.`,
    alternates: {
      canonical: `/planets/moon/${s.slug}`,
      languages: { ru: `/planets/moon/${s.slug}`, en: `/en/planets/moon/${s.slug}`, "x-default": `/planets/moon/${s.slug}` },
    },
    openGraph: { ...pageOg(`/planets/moon/${s.slug}`), type: "article" },
  };
}

const H2 = "mt-12 font-display text-xl md:text-2xl";
const ELEMENT_ADJ: Record<Sign["element"], string> = { fire: "огненной", earth: "земной", air: "воздушной", water: "водной" };
const P = "mt-4 text-[15px] leading-relaxed text-muted";

function SignLinks({ signs }: { signs: Sign[] }) {
  return (
    <>
      {signs.map((x, i) => (
        <span key={x.slug}>
          {i > 0 && (i === signs.length - 1 ? " и " : ", ")}
          <Link href={`/planets/moon/${x.slug}`} className="text-iris hover:underline">
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

export default function MoonSignPage({ params }: { params: { sign: string } }) {
  const s = signBySlug(params.sign);
  if (!s) notFound();
  const m = MOON_RU[s.slug];
  const prep = RU_PREP[s.slug];
  const rel = moonRelations(s.slug);
  const others = SIGNS.filter((x) => x.slug !== s.slug);

  const faq = [
    ...m.faq,
    {
      q: `Как узнать, что у меня Луна ${prep}?`,
      a: "Введите дату рождения в калькулятор на этой странице. Луна меняет знак каждые 2–2,5 дня, поэтому обычно хватает даты; если в день рождения был переход, понадобится время рождения.",
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Луна ${prep}: значение в натальной карте`,
    description: m.tagline,
    inLanguage: "ru-RU",
    datePublished: "2026-10-02",
    dateModified: "2026-10-02",
    author: { "@type": "Organization", name: "AstroOrbi", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/planets/moon/${s.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/planets/moon", label: "Луна в знаках" },
          { href: `/planets/moon/${s.slug}`, label: `Луна ${prep}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">
          {s.symbol} Луна · {ELEMENT_RU[s.element]} · {MODALITY_RU[s.modality]} знак
          {m.dignity ? ` · ${DIGNITY_RU[m.dignity].label}` : ""}
        </p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Луна <span className="grad-text">{prep}</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{m.tagline}</p>
        <p className={P}>{m.intro}</p>

        {m.dignity && (
          <div className="mt-8 rounded-2xl border border-stellar/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Положение Луны: {DIGNITY_RU[m.dignity].label}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed">{DIGNITY_RU[m.dignity].text}</p>
          </div>
        )}

        <h2 className={H2}>Что даёт Луне {prep} чувство безопасности</h2>
        <Bullets items={m.needs} />

        <h2 className={H2}>Луна {prep} у женщины</h2>
        <p className={P}>{m.woman}</p>

        <h2 className={H2}>Луна {prep} у мужчины</h2>
        <p className={P}>{m.man}</p>

        <h2 className={H2}>Луна {prep} в отношениях</h2>
        <p className={P}>{m.love}</p>

        <h2 className={H2}>Слабые места</h2>
        <p className={P}>{m.shadow}</p>

        <h2 className={H2}>Что помогает восстановиться</h2>
        <Bullets items={m.restore} />

        <h2 className={H2}>С какими Лунами легче всего ладить</h2>
        <p className={P}>
          Проще всего понять друг друга Лунам одной стихии — {ELEMENT_ADJ[s.element]}:{" "}
          <SignLinks signs={rel.same} />. Её хорошо дополняют Луны союзной стихии — <SignLinks signs={rel.allied} />.
          Больше усилий потребуется с Лунами в квадрате к ней — <SignLinks signs={rel.square} />: заботу такие Луны
          проявляют по-разному. Подробнее — в статье{" "}
          <Link href="/blog/sovmestimost-po-lune" className="text-iris hover:underline">
            «Совместимость по Луне»
          </Link>
          .
        </p>

        <h2 className={H2}>Проверьте свою Луну по дате рождения</h2>
        <p className={P}>
          Не уверены, что ваша Луна {prep}? Калькулятор рассчитает её положение по астрономическим данным.
        </p>
      </article>

      <section className="mx-auto max-w-3xl px-4 pt-6">
        <MoonCalculator />
      </section>

      <FAQ items={faq} />

      <section className="mx-auto max-w-3xl px-4">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Ваша Луна — в контексте всей карты</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Знак Луны — только часть картины. AstroOrbi покажет, в каком доме стоит ваша Луна, с какими планетами она
              связана и как это проявляется в отношениях.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page={`moon_${s.slug}`} cta="natal">
                Открыть AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Луна в других знаках" className="mx-auto max-w-3xl px-4 pb-24 pt-16">
        <h2 className="font-display text-xl">Луна в других знаках</h2>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={`/planets/moon/${x.slug}`} className="text-iris hover:underline">
                {x.symbol} Луна {RU_PREP[x.slug]}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/planets/moon" className="text-muted hover:text-ink">
            ← Все знаки и калькулятор Луны
          </Link>
        </p>
      </nav>
    </>
  );
}
