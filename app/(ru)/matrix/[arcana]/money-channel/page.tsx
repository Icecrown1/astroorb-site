import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import MatrixPositionCalculator from "@/components/calculators/MatrixPositionCalculator";
import { ARCANA, arcanaBySlug } from "@/lib/arcana";
import { MONEY_RU } from "@/lib/matrixMoney";
import { MONEY_STATS, hasMoneyPage, hasTailPage } from "@/lib/matrixStats";
import { pageOg, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARCANA.filter((a) => hasMoneyPage(a.n)).map((a) => ({ arcana: a.slug }));
}

export function generateMetadata({ params }: { params: { arcana: string } }): Metadata {
  const a = arcanaBySlug(params.arcana);
  if (!a) return {};
  const path = `/matrix/${a.slug}/money-channel`;
  return {
    title: `${a.n} аркан в денежном канале матрицы судьбы: значение`,
    description: `${a.n} аркан «${a.ru}» в денежном канале: как приходят деньги, что блокирует доход, подходящие профессии и первые шаги. Расчёт денежного канала по дате рождения.`,
    alternates: { canonical: path },
    openGraph: { ...pageOg(path), type: "article" },
  };
}

const H2 = "mt-12 font-display text-xl md:text-2xl";
const P = "mt-4 text-[15px] leading-relaxed text-muted";
const fmt = (x: number) => String(x).replace(".", ",");

const ARCANA_LITE = ARCANA.map((x) => ({ n: x.n, slug: x.slug, ru: x.ru }));
const AVAILABLE = ARCANA.filter((x) => hasMoneyPage(x.n)).map((x) => x.n);

export default function MoneyChannelArcanaPage({ params }: { params: { arcana: string } }) {
  const a = arcanaBySlug(params.arcana);
  if (!a || !hasMoneyPage(a.n)) notFound();
  const m = MONEY_RU[a.n];
  const st = MONEY_STATS[a.n];
  const others = ARCANA.filter((x) => x.n !== a.n && hasMoneyPage(x.n));

  const faq = [
    ...m.faq,
    {
      q: "Как рассчитать денежный канал по дате рождения?",
      a: "Канал состоит из трёх чисел: точка входа в деньги (центр матрицы плюс денежный угол), материальная задача (сумма цифр года рождения) и сам денежный угол — правый нижний угол родового квадрата. Все суммы больше 22 сводятся сложением цифр. Калькулятор на этой странице делает расчёт автоматически.",
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${a.n} аркан «${a.ru}» в денежном канале матрицы судьбы`,
    description: m.lead,
    inLanguage: "ru-RU",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    author: { "@type": "Organization", name: "AstroOrbi", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    mainEntityOfPage: `${SITE_URL}/matrix/${a.slug}/money-channel`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/matrix", label: "Матрица судьбы" },
          { href: `/matrix/${a.slug}`, label: `Аркан ${a.n} «${a.ru}»` },
          { href: `/matrix/${a.slug}/money-channel`, label: "В денежном канале" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">Денежный канал · аркан {a.n}</p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          {a.n} аркан <span className="grad-text">«{a.ru}»</span> в денежном канале
        </h1>
        <p className="mt-4 text-lg text-stellar">{m.lead}</p>

        <div className="mt-8 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Как часто встречается</p>
          <p className="mt-2 text-[15px] leading-relaxed">
            {st.entry > 0 ? (
              <>
                Точкой входа в деньги {a.n} аркан бывает у <strong className="text-ink">{fmt(st.entry)}%</strong> людей, а
                хотя бы в одной из трёх точек денежного канала — у <strong className="text-ink">{fmt(st.any)}%</strong>.
              </>
            ) : (
              <>
                Точкой входа в деньги {a.n} аркан не бывает, но в денежном канале встречается у{" "}
                <strong className="text-ink">{fmt(st.any)}%</strong> людей — через другие точки канала.
              </>
            )}{" "}
            <span className="text-muted">Расчёт по всем датам рождения с 1950 по 2010 год.</span>
          </p>
        </div>

        <h2 className={H2}>Как к вам приходят деньги</h2>
        <p className={P}>{m.plus}</p>

        <h2 className={H2}>Что блокирует доход</h2>
        <p className={P}>{m.minus}</p>

        <h2 className={H2}>Профессии и сферы</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {m.jobs.map((j) => (
            <li key={j} className="flex gap-3 text-[15px] text-muted">
              <span aria-hidden="true" className="text-stellar">
                ✦
              </span>
              <span>{j}</span>
            </li>
          ))}
        </ul>

        <h2 className={H2}>С чего начать в этом месяце</h2>
        <ol className="mt-4 space-y-3">
          {m.steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
              <span className="font-semibold text-iris">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        <h2 className={H2}>Где в матрице денежный канал</h2>
        <p className={P}>
          Денежный канал — три связанные точки матрицы: точка входа в деньги, материальная задача и денежный угол родового
          квадрата. Аркан читают по-разному в зависимости от того, в какой из них он стоит, а сильнее всего проявляется
          связка из трёх чисел. Подробно об устройстве канала — в статье{" "}
          <Link href="/blog/denezhnyj-kanal-matricy-sudby" className="text-iris hover:underline">
            «Денежный канал в матрице судьбы»
          </Link>
          , общее значение аркана — на странице{" "}
          <Link href={`/matrix/${a.slug}`} className="text-iris hover:underline">
            «Аркан {a.n}. {a.ru}»
          </Link>
          {hasTailPage(a.n) && (
            <>
              , а как он проявляется в кармическом хвосте — в разделе{" "}
              <Link href={`/matrix/${a.slug}/karmic-tail`} className="text-iris hover:underline">
                «{a.n} аркан в кармическом хвосте»
              </Link>
            </>
          )}
          .
        </p>
        <p className={P}>
          Матрица судьбы — инструмент самоанализа, а не прогноз дохода: она подсказывает, какие способы зарабатывать вам
          органичны и какие сценарии вы повторяете, но не обещает денег.
        </p>

        <h2 className={H2}>Рассчитайте свой денежный канал</h2>
        <p className={P}>Введите дату рождения — калькулятор покажет все три числа канала со ссылками на их значения.</p>
      </article>

      <section className="mx-auto max-w-3xl px-4 pt-6">
        <MatrixPositionCalculator mode="money" current={a.n} arcana={ARCANA_LITE} available={AVAILABLE} />
      </section>

      <FAQ items={faq} />

      <section className="mx-auto max-w-3xl px-4">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Ваш денежный канал целиком</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              В AstroOrbi — разбор денежного канала по вашей дате: каждое из трёх чисел в плюсе и в минусе, как они
              работают вместе и что сделать в ближайший месяц.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="matrix_money" cta={`arcana_${a.n}`}>
                Открыть разбор
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Другие арканы в денежном канале" className="mx-auto max-w-3xl px-4 pb-24 pt-16">
        <h2 className="font-display text-xl">Другие арканы в денежном канале</h2>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          {others.map((x) => (
            <li key={x.slug}>
              <Link href={`/matrix/${x.slug}/money-channel`} className="text-iris hover:underline">
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
