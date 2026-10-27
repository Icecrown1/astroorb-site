import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import VenusCalculator from "@/components/calculators/VenusCalculator";
import { SIGNS } from "@/lib/zodiac";
import { RU_PREP } from "@/lib/moon";
import { VENUS_DIGNITY_LABEL_RU, VENUS_RU } from "@/lib/venus";
import { pageOg } from "@/lib/site";


const TAGLINES = Object.fromEntries(SIGNS.map((x) => [x.slug, VENUS_RU[x.slug].tagline]));
export const metadata: Metadata = {
  title: "Венера в знаках зодиака: калькулятор по дате рождения",
  description:
    "Узнайте знак Венеры по дате рождения бесплатно: как вы любите, кто вас привлекает, Венера у женщины и у мужчины, вкус и отношение к деньгам. Все 12 знаков.",
  alternates: { canonical: "/planets/venus", languages: { ru: "/planets/venus", en: "/en/planets/venus", "x-default": "/planets/venus" } },
  openGraph: pageOg("/planets/venus"),
};

const FAQ_ITEMS = [
  {
    q: "Как узнать, в каком знаке у меня Венера?",
    a: "Введите дату рождения в калькулятор выше. Венера остаётся в одном знаке от трёх недель до четырёх месяцев, поэтому почти всегда хватает даты. Время рождения нужно, только если Венера сменила знак именно в ваш день рождения — калькулятор это покажет.",
  },
  {
    q: "За что отвечает Венера в натальной карте?",
    a: "За то, как человек любит и что считает красивым: какой партнёр привлекает, как он проявляет симпатию, что дарит и что хочет получить. Ещё Венера связана со вкусом, стилем, удовольствиями и отношением к деньгам.",
  },
  {
    q: "Почему Венера у меня не в том же знаке, что Солнце?",
    a: "Венера всегда недалеко от Солнца — не дальше примерно 47°. Поэтому она находится либо в вашем знаке зодиака, либо в одном из двух соседних с каждой стороны. Например, у Скорпиона по Солнцу Венера может быть в Деве, Весах, Скорпионе, Стрельце или Козероге.",
  },
  {
    q: "Венера у мужчины — это тип женщин, которые ему нравятся?",
    a: "Во многом да: в мужской карте Венера описывает, какие женщины его привлекают и как он ухаживает. Но она говорит и о нём самом — о его вкусе, нежности и умении получать удовольствие.",
  },
];

const DIGNITY_ROWS = [
  ["Обитель", "taurus", "Своя территория: тяга к комфорту, удовольствию и постоянству"],
  ["Обитель", "libra", "Своя территория: партнёрство, вкус, дипломатия"],
  ["Экзальтация", "pisces", "Самая возвышенная любовь: сострадание и романтика"],
  ["Изгнание", "scorpio", "Вместо лёгкости — интенсивность и потребность в полной близости"],
  ["Изгнание", "aries", "Вместо уступчивости — напор и инициатива"],
  ["Падение", "virgo", "Любовь через практичную заботу и внимание к мелочам"],
] as const;

export default function VenusHubPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/planets/venus", label: "Венера в знаках" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Венера в знаках зодиака — <span className="grad-text">узнайте свою по дате рождения</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Венера в натальной карте показывает, как вы любите: кто вас привлекает, как вы проявляете симпатию и что
          считаете красивым. Расчёт по астрономическим данным — бесплатно и без регистрации.
        </p>
        <div className="mt-10">
          <VenusCalculator taglines={TAGLINES} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Венера во всех 12 знаках</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNS.map((s, i) => {
            const v = VENUS_RU[s.slug];
            return (
              <Reveal key={s.slug} delay={(i % 6) * 50}>
                <Link
                  href={`/planets/venus/${s.slug}`}
                  className="group block h-full rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg">
                      <span aria-hidden="true" className="mr-2 text-iris">
                        {s.symbol}
                      </span>
                      Венера {RU_PREP[s.slug]}
                    </span>
                    {v.dignity && (
                      <span className="text-[11px] uppercase tracking-[0.14em] text-stellar">
                        {VENUS_DIGNITY_LABEL_RU[v.dignity.kind]}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm text-muted">{v.tagline}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Почему Венера всегда рядом с вашим знаком</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            С Земли Венера никогда не отходит от Солнца дальше чем примерно на 47°. Поэтому в натальной карте она стоит либо в
            знаке Солнца, либо в одном-двух соседних. У Льва по Солнцу Венера может быть в Близнецах, Раке, Льве, Деве
            или Весах — и никогда в Козероге. Так что люди одного знака зодиака часто любят очень по-разному: всё
            решает, где у них Венера.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Раз в полтора года Венера примерно на шесть недель разворачивается назад — это ретроградная Венера. В 2026 году
            ретроградная Венера — с 3 октября по 14 ноября, из Скорпиона обратно в Весы. Что это значит и как пережить этот период — в
            статье{" "}
            <Link href="/blog/retrogradnaya-venera-2026" className="text-iris hover:underline">
              «Ретроградная Венера 2026»
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8 pt-12">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Сильные и слабые положения Венеры</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            В классической астрологии у Венеры два «своих» знака, знак экзальтации и знаки, где её природе
            приходится подстраиваться. «Слабое» положение не значит «плохое» — это особый способ любить.
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
                {DIGNITY_ROWS.map(([label, slug, text]) => (
                  <tr key={slug} className="border-t border-hairline">
                    <td className="px-4 py-3 text-ink">{label}</td>
                    <td className="px-4 py-3">
                      <Link href={`/planets/venus/${slug}`} className="text-iris hover:underline">
                        Венера {RU_PREP[slug]}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            Венера описывает, как вы любите, а Луна — что вам нужно, чтобы чувствовать себя в безопасности. Узнайте и
            свою{" "}
            <Link href="/planets/moon" className="text-iris hover:underline">
              Луну в знаке
            </Link>{" "}
            — вместе они объясняют большую часть того, как вы ведёте себя в отношениях. А чтобы сравнить с партнёром,
            посмотрите{" "}
            <Link href="/compatibility" className="text-iris hover:underline">
              совместимость по знакам
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} />

      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Венера — одна из десяти планет вашей карты</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              AstroOrbi рассчитает всю натальную карту по Swiss Ephemeris и покажет, в каком доме стоит ваша Венера и с
              какими планетами она связана — это и делает вашу манеру любить неповторимой.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="venus_hub" cta="natal">
                Открыть AstroOrbi
              </CTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
