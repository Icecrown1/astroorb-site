import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { ARCANA, arcanaBySlug } from "@/lib/arcana";

export function generateStaticParams() {
  return ARCANA.map((a) => ({ arcana: a.slug }));
}

export function generateMetadata({ params }: { params: { arcana: string } }): Metadata {
  const a = arcanaBySlug(params.arcana);
  if (!a) return {};
  return {
    title: `Аркан ${a.n} «${a.ru}» в матрице судьбы — значение`,
    description: `Аркан ${a.n} (${a.ru}) в матрице судьбы: ${a.keyword}. Проявление в плюсе и минусе, задача энергии и как перевести её в ресурс.`,
    alternates: { canonical: `/matrix/${a.slug}` },
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
    { q: "Где посмотреть весь расклад матрицы?", a: "Полный расклад со всеми позициями (род, карма, деньги, предназначение по возрастам) строится в Astro Orb за минуту по дате рождения." },
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
