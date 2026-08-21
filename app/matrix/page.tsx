import type { Metadata } from "next";
import { pageOg } from "@/lib/site";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import MatrixCalculator from "@/components/calculators/MatrixCalculator";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { ARCANA } from "@/lib/arcana";

export const metadata: Metadata = {
  title: "Матрица судьбы рассчитать по дате рождения онлайн",
  description:
    "Рассчитайте матрицу судьбы по дате рождения бесплатно: личный аркан, аркан судьбы и ключевые энергии. Онлайн-калькулятор + расшифровка всех 22 арканов.",
  alternates: { canonical: "/matrix" },
  openGraph: pageOg("/matrix"),
};

const FAQ_ITEMS = [
  { q: "Что такое матрица судьбы?", a: "Метод самопознания на основе даты рождения и 22 старших арканов Таро. Дата раскладывается в схему из энергий: личные качества, задачи рода, кармический опыт, зоны таланта и денег." },
  { q: "Как рассчитывается матрица?", a: "Число дня, месяца и года рождения редуцируются до значений от 1 до 22 — каждому соответствует аркан. Их суммы дают дополнительные позиции: аркан судьбы, энергии рода, зону комфорта. Наш калькулятор делает это мгновенно." },
  { q: "Чем матрица отличается от натальной карты?", a: "Натальная карта — астрономия: реальные позиции планет в момент рождения. Матрица — нумерологическая система на архетипах Таро. Многие используют оба метода как разные «языки» описания личности." },
  { q: "Что входит в полный разбор в Astro Orb?", a: "Все позиции матрицы с плюс- и минус-проявлениями каждой энергии, задачи по возрастам, финансовый канал и совместимость матриц — плюс возможность задавать вопросы AI по вашему раскладу." },
];

export default function MatrixPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/matrix", label: "Матрица судьбы" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Матрица судьбы — <span className="grad-text">расчёт по дате рождения</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Введите дату рождения — калькулятор мгновенно покажет ваши ключевые арканы. Бесплатно и без регистрации.
        </p>
        <div className="mt-10">
          <MatrixCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Как устроена матрица судьбы</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Матрица судьбы — популярный метод самопознания, в котором дата рождения раскладывается на энергии
              22 старших арканов Таро. Каждое число даты редуцируется: если оно больше 22, его цифры складываются,
              пока не получится значение от 1 до 22. Так день рождения превращается в личный аркан — характер и
              стиль действий, месяц — в энергию эмоциональной сферы, год — в опыт, с которым человек «пришёл».
            </p>
            <p>
              Сумма трёх чисел даёт аркан судьбы — центральную энергию матрицы, главную задачу воплощения. Дальше
              схема разворачивается: линии рода по диагоналям, детско-родительские сценарии, зона комфорта и денег,
              точки предназначения по возрастам 20, 40 и 60 лет. Важно, что каждая энергия читается в двух
              состояниях: в плюсе она даёт талант, в минусе — повторяющийся негативный сценарий. Работа с матрицей —
              это перевод своих энергий из минуса в плюс.
            </p>
            <p>
              Ниже — значения всех 22 арканов: от Мага до Шута. Найдите свои по результату калькулятора и посмотрите,
              как энергия проявляется в обе стороны. Полный расклад матрицы со всеми позициями, детским и
              финансовым каналом доступен в Astro Orb — вместе с натальной картой, чтобы увидеть себя сразу в двух системах.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">22 аркана матрицы судьбы</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ARCANA.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 6) * 50}>
              <Link
                href={`/matrix/${a.slug}`}
                className="group flex items-baseline gap-3 rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
              >
                <span className="font-display text-xl grad-text">{a.n}</span>
                <span>
                  <span className="block font-medium">{a.ru}</span>
                  <span className="block text-xs text-muted">{a.keyword}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-sm sm:flex-1 text-muted">
              Матрица показывает архетипы. Астрономическую основу личности смотрите в{" "}
              <Link href="/natal-chart" className="text-iris hover:underline">натальной карте</Link>.
            </p>
            <CTA page="matrix" cta="hub_bottom">Полный расклад матрицы</CTA>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </>
  );
}
