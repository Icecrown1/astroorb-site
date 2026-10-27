import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import MatrixPositionCalculator from "@/components/calculators/MatrixPositionCalculator";
import { ARCANA, arcanaBySlug } from "@/lib/arcana";
import { TAIL_RU } from "@/lib/matrixTail";
import { TAIL_STATS, hasMoneyPage, hasTailPage } from "@/lib/matrixStats";
import { pageOg, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARCANA.filter((a) => hasTailPage(a.n)).map((a) => ({ arcana: a.slug }));
}

export function generateMetadata({ params }: { params: { arcana: string } }): Metadata {
  const a = arcanaBySlug(params.arcana);
  if (!a) return {};
  const path = `/matrix/${a.slug}/karmic-tail`;
  return {
    title: `${a.n} аркан в кармическом хвосте матрицы судьбы: значение`,
    description: `${a.n} аркан «${a.ru}» в кармическом хвосте: какой сценарий повторяется, как он проявляется сейчас и как его проработать. Самые частые хвосты с этим арканом и расчёт по дате рождения.`,
    alternates: { canonical: path },
    openGraph: { ...pageOg(path), type: "article" },
  };
}

const H2 = "mt-12 font-display text-xl md:text-2xl";
const P = "mt-4 text-[15px] leading-relaxed text-muted";
const fmt = (x: number) => String(x).replace(".", ",");
const POS = ["первым числом", "вторым числом", "третьим числом"];
const POS_SHORT = ["первым", "вторым", "третьим"];

const ARCANA_LITE = ARCANA.map((x) => ({ n: x.n, slug: x.slug, ru: x.ru }));
const AVAILABLE = ARCANA.filter((x) => hasTailPage(x.n)).map((x) => x.n);

export default function KarmicTailArcanaPage({ params }: { params: { arcana: string } }) {
  const a = arcanaBySlug(params.arcana);
  if (!a || !hasTailPage(a.n)) notFound();
  const t = TAIL_RU[a.n];
  const st = TAIL_STATS[a.n];
  const others = ARCANA.filter((x) => x.n !== a.n && hasTailPage(x.n));
  const positions = [st.g, st.r, st.s]
    .map((v, i) => (v > 0 ? `${POS[i]} — у ${fmt(v)}%` : null))
    .filter(Boolean) as string[];
  const neverIdx = [st.g, st.r, st.s].map((v, i) => (v === 0 ? i : -1)).filter((i) => i >= 0);
  const never = neverIdx.length === 1 ? POS[neverIdx[0]] : neverIdx.length > 1 ? `${neverIdx.map((i) => POS_SHORT[i]).join(" и ")} числом` : "";

  const faq = [
    ...t.faq,
    {
      q: "Как рассчитать кармический хвост по дате рождения?",
      a: "Первое число — кармическое основание: сумма дня, месяца и суммы цифр года рождения. Второе — первое число плюс центр матрицы. Третье — сумма первых двух. Всё, что больше 22, сводится сложением цифр. Калькулятор на этой странице считает хвост автоматически.",
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${a.n} аркан «${a.ru}» в кармическом хвосте матрицы судьбы`,
    description: t.lead,
    inLanguage: "ru-RU",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    author: { "@type": "Organization", name: "AstroOrbi", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/matrix/${a.slug}/karmic-tail`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/matrix", label: "Матрица судьбы" },
          { href: `/matrix/${a.slug}`, label: `Аркан ${a.n} «${a.ru}»` },
          { href: `/matrix/${a.slug}/karmic-tail`, label: "В кармическом хвосте" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">Кармический хвост · аркан {a.n}</p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          {a.n} аркан <span className="grad-text">«{a.ru}»</span> в кармическом хвосте
        </h1>
        <p className="mt-4 text-lg text-stellar">{t.lead}</p>

        <div className="mt-8 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Как часто встречается</p>
          <p className="mt-2 text-[15px] leading-relaxed">
            {a.n} аркан есть в кармическом хвосте у <strong className="text-ink">{fmt(st.any)}%</strong> людей: {positions.join(", ")}
            {never && <> ({never} он не бывает)</>}.
          </p>
          {st.trips.length > 0 && (
            <p className="mt-3 text-[15px] leading-relaxed">
              Самые частые хвосты с этим арканом:{" "}
              {st.trips.map(([k, v], i) => (
                <span key={k}>
                  {i > 0 && ", "}
                  <strong className="text-ink">{k.replace(/-/g, " — ")}</strong> ({fmt(v)}%)
                </span>
              ))}
              .
            </p>
          )}
          <p className="mt-3 text-sm text-muted">Расчёт по всем датам рождения с 1950 по 2010 год.</p>
        </div>

        <h2 className={H2}>Какой сценарий повторяется</h2>
        <p className={P}>{t.past}</p>

        <h2 className={H2}>Как он проявляется</h2>
        <p className={P}>{t.now}</p>

        <h2 className={H2}>Каким аркан становится после проработки</h2>
        <p className={P}>{t.worked}</p>

        <h2 className={H2}>Как проработать</h2>
        <ol className="mt-4 space-y-3">
          {t.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span className="font-semibold text-iris">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        <h2 className={H2}>Как читать хвост целиком</h2>
        <p className={P}>
          Кармический хвост — три числа в нижней части матрицы. Первое показывает, что тянется из прошлого, второе — через
          что урок проявляется сейчас, третье — итоговую задачу. Аркан читают с учётом позиции и соседей: один и тот же{" "}
          {a.n} аркан звучит по-разному в связке с разными числами. Подробнее — в статье{" "}
          <Link href="/blog/karmicheskij-hvost-matricy-sudby" className="text-iris hover:underline">
            «Кармический хвост в матрице судьбы»
          </Link>
          , общее значение аркана — на странице{" "}
          <Link href={`/matrix/${a.slug}`} className="text-iris hover:underline">
            «Аркан {a.n}. {a.ru}»
          </Link>
          {hasMoneyPage(a.n) && (
            <>
              , а как он работает в деньгах — в разделе{" "}
              <Link href={`/matrix/${a.slug}/money-channel`} className="text-iris hover:underline">
                «{a.n} аркан в денежном канале»
              </Link>
            </>
          )}
          .
        </p>
        <p className={P}>
          Хвост — не приговор и не «плохая карма»: это повторяющийся сценарий, который можно заметить и изменить. Матрица
          судьбы — инструмент самоанализа, а не замена психологической помощи.
        </p>

        <h2 className={H2}>Рассчитайте свой кармический хвост</h2>
        <p className={P}>Введите дату рождения — калькулятор покажет три числа хвоста со ссылками на их значения.</p>
      </article>

      <section className="mx-auto max-w-3xl px-4 pt-6">
        <MatrixPositionCalculator mode="tail" current={a.n} arcana={ARCANA_LITE} available={AVAILABLE} />
      </section>

      <FAQ items={faq} />

      <section className="mx-auto max-w-3xl px-4">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Ваш кармический хвост целиком</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              В AstroOrbi — разбор хвоста по вашей дате: все три числа вместе, где сценарий включается сам и с чего начать
              проработку.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="matrix_tail" cta={`arcana_${a.n}`}>
                Открыть разбор
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Другие арканы в кармическом хвосте" className="mx-auto max-w-3xl px-4 pb-24 pt-16">
        <h2 className="font-display text-xl">Другие арканы в кармическом хвосте</h2>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={`/matrix/${x.slug}/karmic-tail`} className="text-iris hover:underline">
                {x.n} · {x.ru}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/matrix" className="text-muted hover:text-ink">
            ← Калькулятор матрицы судьбы
          </Link>
        </p>
      </nav>
    </>
  );
}
