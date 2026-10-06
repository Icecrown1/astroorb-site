import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import MatrixPairCalculator from "@/components/calculators/MatrixPairCalculator";
import { arcanaByNumber } from "@/lib/arcana";
import { PAIR_CENTER, PAIR_ZONES } from "@/lib/matrixPair";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Совместимость по матрице судьбы по дате рождения",
  description:
    "Бесплатный расчёт совместимости по матрице судьбы: матрица пары по двум датам рождения и арканы пяти зон — суть союза, быт, деньги, кармический хвост и задача пары.",
  alternates: {
    canonical: "/matrix/compatibility",
    languages: { ru: "/matrix/compatibility", en: "/en/matrix/compatibility", "x-default": "/matrix/compatibility" },
  },
  openGraph: pageOg("/matrix/compatibility"),
};

const FAQ_ITEMS = [
  {
    q: "Как рассчитать совместимость по матрице судьбы?",
    a: "Постройте личные матрицы обоих партнёров по датам рождения и сложите одноимённые точки: день с днём, месяц с месяцем, центр с центром. Если сумма больше 22, сложите её цифры. Получится матрица пары — калькулятор на этой странице делает расчёт автоматически.",
  },
  {
    q: "Что такое центр пары?",
    a: "Сумма центров двух личных матриц, приведённая к числу от 1 до 22. Это главная тема союза: на чём держится пара, что у вас получается вместе легче всего и какой сценарий включается, когда отношения в минусе.",
  },
  {
    q: "Можно ли по матрице понять, подходим ли мы друг другу?",
    a: "Матрица пары не ставит оценку «совместимы / нет». У каждого аркана есть проявление в плюсе и в минусе, поэтому она показывает сильные стороны союза и зоны, где вам стоит договариваться заранее. Решение об отношениях принимаете вы, а не числа.",
  },
  {
    q: "Нужно ли знать время рождения?",
    a: "Нет. Матрица судьбы строится только по датам рождения — время и место не нужны. Этим она отличается от астрологической синастрии, для которой важны часы и город рождения.",
  },
  {
    q: "Подходит ли расчёт для друзей, родителей и коллег?",
    a: "Формула та же для любой пары людей. Зоны денег и общей задачи хорошо читаются для деловых союзов и семьи, а зона «Отношения и быт» рассчитана прежде всего на романтическую пару.",
  },
  {
    q: "Что входит в полный разбор пары в AstroOrbi?",
    a: "Пять зон — суть союза, отношения и быт, деньги пары, кармический хвост пары и задача пары. Для каждой — как пара живёт в плюсе и как ломается в минусе, на конкретных примерах, плюс три шага на ближайший месяц. Сохранённую пару можно открыть повторно бесплатно.",
  },
];

const H2 = "font-display text-2xl md:text-3xl";
const P = "text-[15px] leading-relaxed text-muted";

export default function MatrixCompatibilityPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Калькулятор совместимости по матрице судьбы",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Any",
    inLanguage: "ru",
    offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/matrix", label: "Матрица судьбы" },
          { href: "/matrix/compatibility", label: "Совместимость" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Совместимость по матрице судьбы — <span className="grad-text">расчёт по датам рождения</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Введите две даты — калькулятор построит матрицу пары, покажет центр союза и арканы пяти зон: суть союза, быт,
          деньги, общий кармический хвост и задачу пары. Бесплатно и без регистрации.
        </p>
        <div className="mt-10">
          <MatrixPairCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-24">
        <Reveal>
          <h2 className={H2}>Как считается совместимость по матрице судьбы</h2>
          <div className="mt-6 space-y-4">
            <p className={P}>
              Совместимость в матрице судьбы считают не сравнением «подходит или не подходит», а через третью, общую
              матрицу — матрицу пары. Сначала по датам рождения строятся две личные матрицы. Затем одноимённые точки
              складываются: день с днём, месяц с месяцем, центр с центром и так далее по всей схеме. Если сумма больше
              22, её цифры складываются, пока не получится число от 1 до 22 — номер аркана.
            </p>
            <p className={P}>
              Пример: 24.03.1981 и 15.07.1990. Центр первой матрицы — 11 (6 + 3 + 19 + 10 = 38, 3 + 8 = 11), второй —
              10 (15 + 7 + 19 + 5 = 46, 4 + 6 = 10). Центр пары: 11 + 10 = 21, аркан «Мир». Остальные точки считаются так
              же: дни 24 (→ 6) и 15 дают 21, месяцы 3 и 7 — 10, годы 19 и 19 — 38, то есть 11.
            </p>
            <p className={P}>
              Матрица пары описывает не каждого из вас по отдельности, а то, что возникает между вами: в какой роли вы
              оказываетесь вместе, где союз даёт силы и где включаются повторяющиеся конфликты. Свою личную матрицу
              можно посмотреть в{" "}
              <Link href="/matrix" className="text-iris hover:underline">
                калькуляторе матрицы судьбы
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <Reveal>
          <h2 className={H2}>Что показывают пять зон матрицы пары</h2>
        </Reveal>
        <div className="mt-6 space-y-3">
          {PAIR_ZONES.map((z) => (
            <div key={z.id} className="rounded-2xl border border-hairline bg-surface p-5">
              <h3 className="font-medium">{z.title.ru}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{z.about.ru}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <Reveal>
          <h2 className={H2}>Центр пары: значения арканов от 1 до 22</h2>
          <p className={`mt-4 ${P}`}>
            Найдите в списке число центра, которое показал калькулятор. Каждое описание — про то, как пара живёт, когда тема центра
            работает в плюсе, и в чём её риск.
          </p>
        </Reveal>
        <div className="mt-8 space-y-5">
          {Array.from({ length: 22 }, (_, i) => i + 1).map((n) => {
            const a = arcanaByNumber(n);
            return (
              <div key={n} className="border-b border-hairline pb-5">
                <h3 className="font-display text-lg">
                  <span className="grad-text">{n}</span>{" "}
                  <Link href={`/matrix/${a.slug}`} className="hover:text-iris">
                    {a.ru}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{PAIR_CENTER[n].ru}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <Reveal>
          <h2 className={H2}>Почему здесь нет процента совместимости</h2>
          <div className="mt-6 space-y-4">
            <p className={P}>
              У любого аркана в матрице есть проявление в плюсе и в минусе. «Сложный» центр пары не значит, что союз
              обречён, а «лёгкий» не гарантирует, что всё сложится само. Поэтому мы не выдаём процент и вердикт:
              матрица пары — это карта того, где у союза ресурс, а где вам лучше договориться заранее.
            </p>
            <p className={P}>
              Матрица судьбы — нумерологическая система для саморефлексии, а не научный метод. Если хочется посмотреть на
              пару с другой стороны, сравните знаки в{" "}
              <Link href="/compatibility" className="text-iris hover:underline">
                совместимости по знакам зодиака
              </Link>{" "}
              или прочитайте, как работает{" "}
              <Link href="/blog/sovmestimost-po-lune" className="text-iris hover:underline">
                совместимость по Луне
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <div className="shell">
          <div className="core p-6 text-center md:p-8">
            <p className="font-display text-lg">Полный разбор вашей пары</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              В AstroOrbi для каждой из пяти зон — как ваша пара живёт в плюсе и где ломается в минусе, на примерах
              из быта, денег и ссор, плюс три шага на месяц. Там же — ваша личная матрица с разборами по
              разделам.
            </p>
            <div className="mt-5 flex justify-center">
              <CTA page="matrix_pair" cta="page_bottom">
                Открыть разбор пары
              </CTA>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </>
  );
}
