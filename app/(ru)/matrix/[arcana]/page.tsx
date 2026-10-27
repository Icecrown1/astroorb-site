import type { Metadata } from "next";
import { pageOg } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { ARCANA, arcanaBySlug } from "@/lib/arcana";
import { hasMoneyPage, hasTailPage } from "@/lib/matrixStats";

export function generateStaticParams() {
  return ARCANA.map((a) => ({ arcana: a.slug }));
}

export function generateMetadata({ params }: { params: { arcana: string } }): Metadata {
  const a = arcanaBySlug(params.arcana);
  if (!a) return {};
  return {
    title: `Аркан ${a.n} «${a.ru}» в матрице судьбы — значение по дате рождения`,
    description: `Аркан ${a.n} (${a.ru}) в матрице судьбы: ${a.keyword}. Как рассчитать аркан ${a.n} по дате рождения, проявление в плюсе и минусе, задача энергии.`,
    alternates: { canonical: `/matrix/${a.slug}`, languages: { ru: `/matrix/${a.slug}`, en: `/en/matrix/${a.slug}`, "x-default": `/matrix/${a.slug}` } },
    openGraph: pageOg(`/matrix/${a.slug}`),
  };
}

export default function ArcanaPage({ params }: { params: { arcana: string } }) {
  const a = arcanaBySlug(params.arcana);
  if (!a) notFound();

  const prev = ARCANA[(a.n - 2 + 22) % 22];
  const next = ARCANA[a.n % 22];

  const faq = [
    { q: `Что значит аркан ${a.n} в личной позиции?`, a: `Личный аркан «${a.ru}» описывает характер и стиль действий: ${a.keyword}. В плюсе это ресурс, в минусе — повторяющийся сценарий, который стоит осознать.` },
    { q: `Аркан «${a.ru}» — это хорошо или плохо?`, a: "В матрице судьбы нет плохих арканов: у каждой энергии есть плюс- и минус-проявление. Задача — замечать минус и осознанно переводить энергию в плюс." },
    { q: `Как рассчитать аркан ${a.n} по дате рождения?`, a: `Позиции матрицы считаются из даты рождения одним правилом: числа больше 22 сводятся суммой цифр к диапазону 1–22. Аркан ${a.n} появляется в вашей матрице, если он выпал в одной из позиций расчёта — в личных точках, родовом квадрате, каналах или кармическом хвосте.` },
    { q: "Где посмотреть весь расклад матрицы?", a: "Полный расклад со всеми позициями (род, карма, деньги, предназначение по возрастам) строится в AstroOrbi за минуту по дате рождения." },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/matrix", label: "Матрица судьбы" },
          { href: `/matrix/${a.slug}`, label: `Аркан ${a.n}. ${a.ru}` },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">Энергия {a.n} из 22</p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Аркан {a.n}. <span className="grad-text">{a.ru}</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{a.keyword}</p>

        <div className="mt-10 space-y-4">
          <div className="rounded-2xl border border-iris/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">В плюсе</p>
            <p className="mt-2 text-[15px] leading-relaxed">{a.plus}</p>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">В минусе</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.minus}</p>
          </div>
          <div className="rounded-2xl border border-stellar/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Задача энергии</p>
            <p className="mt-2 text-[15px] leading-relaxed">{a.task}</p>
          </div>
        </div>

        <h2 className="mt-12 font-display text-xl md:text-2xl">Аркан {a.n} в позициях матрицы</h2>
        {hasMoneyPage(a.n) || hasTailPage(a.n) ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {hasMoneyPage(a.n) && (
              <Link
                href={`/matrix/${a.slug}/money-channel`}
                className="rounded-2xl border border-hairline bg-surface p-5 transition-colors duration-300 hover:border-iris/40"
              >
                <span className="block font-medium">{a.n} аркан в денежном канале</span>
                <span className="mt-1 block text-sm text-muted">Как приходят деньги, что блокирует доход, профессии</span>
              </Link>
            )}
            {hasTailPage(a.n) && (
              <Link
                href={`/matrix/${a.slug}/karmic-tail`}
                className="rounded-2xl border border-hairline bg-surface p-5 transition-colors duration-300 hover:border-iris/40"
              >
                <span className="block font-medium">{a.n} аркан в кармическом хвосте</span>
                <span className="mt-1 block text-sm text-muted">Какой сценарий повторяется и как его проработать</span>
              </Link>
            )}
          </div>
        ) : null}
        {!hasTailPage(a.n) && (
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {a.n === 1
              ? "По классической схеме расчёта 1 аркан не попадает ни в кармический хвост, ни в денежный канал: эти точки складываются из нескольких чисел, и их сумма не может свестись к единице. Если другой калькулятор показал вам 1 в хвосте или денежном канале, скорее всего, он считает по иной схеме."
              : `По классической схеме расчёта ${a.n} аркан не попадает в кармический хвост: числа хвоста складываются из нескольких позиций, и их сумма не может свестись к ${a.n} ни при какой дате рождения. В денежном канале он встречается только как материальная задача — у родившихся в 2000 году.`}
          </p>
        )}

        <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">
            Аркан «{a.ru}» может стоять в разных позициях матрицы — личной, родовой, кармической или денежной,
            и в каждой он читается по-своему. Узнать, где именно эта энергия стоит у вас и в каком состоянии
            она работает сейчас, можно в полном раскладе.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <CTA page={`matrix_${a.slug}`} cta="unlock">Мой полный расклад</CTA>
            <Link href="/matrix" className="text-sm text-iris hover:underline">
              ← Калькулятор матрицы
            </Link>
            <Link href="/blog/kak-rasschitat-matricu-sudby" className="text-sm text-iris hover:underline">
              Как считается матрица →
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <span className="text-muted">Соседние арканы:</span>
          <Link href={`/matrix/${prev.slug}`} className="text-iris hover:underline">
            {prev.n}. {prev.ru}
          </Link>
          <Link href={`/matrix/${next.slug}`} className="text-iris hover:underline">
            {next.n}. {next.ru}
          </Link>
        </div>
      </section>

      <FAQ items={faq} />
    </>
  );
}
