import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import MoonCalculator from "@/components/calculators/MoonCalculator";
import { SIGNS } from "@/lib/zodiac";
import { DIGNITY_RU, MOON_RU, RU_PREP } from "@/lib/moon";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Луна в знаках зодиака: калькулятор по дате рождения и значение",
  description:
    "Узнайте знак Луны по дате рождения бесплатно и прочитайте, что он значит: эмоциональные потребности, Луна у женщины и у мужчины, в отношениях. Все 12 знаков.",
  alternates: { canonical: "/planets/moon" },
  openGraph: pageOg("/planets/moon"),
};

const FAQ_ITEMS = [
  {
    q: "Как узнать, в каком знаке у меня Луна?",
    a: "Введите дату рождения в калькулятор выше. Луна меняет знак каждые 2–2,5 дня, поэтому в большинстве случаев хватает даты. Если в день рождения Луна сменила знак, калькулятор покажет время перехода — тогда понадобится время рождения.",
  },
  {
    q: "Что важнее — знак Солнца или знак Луны?",
    a: "Они отвечают за разное. Солнце — то, как человек себя проявляет и к чему стремится. Луна — что ему нужно для чувства безопасности и как он переживает. В близких отношениях Луна часто заметнее Солнца.",
  },
  {
    q: "Почему у меня и у подруги одинаковый знак зодиака, но разные характеры?",
    a: "Знак зодиака — это положение Солнца. Луна за тот же месяц успевает пройти все 12 знаков, поэтому у людей одного знака Солнца Луны почти всегда разные — и эмоционально они реагируют по-разному.",
  },
];

export default function MoonHubPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/planets/moon", label: "Луна в знаках" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Луна в знаках зодиака — <span className="grad-text">узнайте свою по дате рождения</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Луна в натальной карте показывает эмоциональные потребности: что даёт чувство безопасности, как человек
          переживает и заботится. Расчёт по астрономическим данным — бесплатно и без регистрации.
        </p>
        <div className="mt-10">
          <MoonCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Луна во всех 12 знаках</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((s, i) => {
            const m = MOON_RU[s.slug];
            return (
              <Reveal key={s.slug} delay={(i % 6) * 50}>
                <Link
                  href={`/planets/moon/${s.slug}`}
                  className="group block h-full rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg">
                      <span aria-hidden="true" className="mr-2 text-iris">
                        {s.symbol}
                      </span>
                      Луна {RU_PREP[s.slug]}
                    </span>
                    {m.dignity && (
                      <span className="text-[11px] uppercase tracking-[0.14em] text-stellar">
                        {DIGNITY_RU[m.dignity].label}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-muted">{m.tagline}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Сильные и слабые положения Луны</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            В классической астрологии у каждой планеты есть знаки, где ей легко, и знаки, где её природе приходится
            подстраиваться. «Слабое» положение не значит «плохое» — это особый способ проявляться.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-hairline">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Положение</th>
                  <th className="px-4 py-3 font-medium">Знак</th>
                  <th className="px-4 py-3 font-medium">Что это значит</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Обитель", "cancer", "Луна в своём знаке: эмоции проявляются полно и естественно"],
                    ["Экзальтация", "taurus", "Эмоции особенно устойчивы, легко восстановить покой"],
                    ["Изгнание", "capricorn", "Мягкость прячется за ответственностью и самоконтролем"],
                    ["Падение", "scorpio", "Покой сталкивается с интенсивностью — чувства особенно глубокие"],
                  ] as const
                ).map(([label, slug, text]) => (
                  <tr key={slug} className="border-t border-hairline">
                    <td className="px-4 py-3 text-ink">{label}</td>
                    <td className="px-4 py-3">
                      <Link href={`/planets/moon/${slug}`} className="text-iris hover:underline">
                        Луна {RU_PREP[slug]}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            Подробнее о том, как Луна работает в карте и почему её знак важен в отношениях, — в статьях{" "}
            <Link href="/blog/luna-v-natalnoj-karte" className="text-iris hover:underline">
              «Луна в натальной карте»
            </Link>{" "}
            и{" "}
            <Link href="/blog/sovmestimost-po-lune" className="text-iris hover:underline">
              «Совместимость по Луне»
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} />

      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Луна — только одна планета из десяти</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              AstroOrbi рассчитает всю натальную карту по Swiss Ephemeris и объяснит, как ваша Луна связана с Солнцем,
              Асцендентом и остальными планетами.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="moon_hub" cta="natal">
                Открыть AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
