import type { Metadata } from "next";
import { pageOg } from "@/lib/site";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CompatCalculator from "@/components/calculators/CompatCalculator";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { SIGNS } from "@/lib/zodiac";
import { canonicalPair } from "@/lib/compat";

export const metadata: Metadata = {
  title: "Совместимость знаков зодиака по дате рождения",
  description:
    "Совместимость знаков зодиака онлайн: процент, сильные стороны пары и точки трения. Бесплатно + полная синастрия по двум картам.",
  alternates: { canonical: "/compatibility" },
  openGraph: pageOg("/compatibility"),
};

const FAQ_ITEMS = [
  { q: "Насколько можно верить совместимости по знакам?", a: "Совместимость по солнечным знакам — это первый, самый общий слой: базовое сочетание стихий и стратегий. Реальная картина видна в синастрии — наложении двух полных натальных карт, где учитываются Луна, Венера, Марс и аспекты между картами." },
  { q: "Как считается процент на этой странице?", a: "По классическим правилам: сочетание стихий (огонь, земля, воздух, вода), взаимодействие модальностей и угловое расстояние между знаками (трины, квадраты, оппозиции). Расчёт детерминированный — одна пара всегда даёт один результат." },
  { q: "Что входит в полный разбор пары?", a: "Синастрия по двум картам: чувства и страсть, деньги и быт, коммуникация, кризисные точки и ресурсы пары. Плюс ответы AI на вопросы о ваших отношениях." },
  { q: "Нужна ли дата рождения партнёра?", a: "Для разбора по знакам — нет, достаточно знаков. Для точной синастрии в Astro Orb нужны даты рождения обоих; время — желательно, но не обязательно." },
];

export default function CompatibilityPage() {
  const popular: [string, string][] = [
    ["aries", "leo"], ["taurus", "virgo"], ["gemini", "libra"], ["cancer", "scorpio"],
    ["leo", "libra"], ["virgo", "capricorn"], ["scorpio", "pisces"], ["sagittarius", "aquarius"],
    ["aries", "libra"], ["taurus", "scorpio"], ["cancer", "capricorn"], ["gemini", "sagittarius"],
  ];

  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/compatibility", label: "Совместимость" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Совместимость знаков зодиака — <span className="grad-text">проверить онлайн</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Выберите два знака — увидите процент совместимости и характер пары. Бесплатно, без регистрации.
        </p>
        <div className="mt-10">
          <CompatCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Как астрология оценивает пары</h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Базовая совместимость знаков строится на трёх правилах. Первое — стихии: огонь и воздух питают
              друг друга, земля и вода дают друг другу форму и содержание, а пары «огонь + вода» или
              «воздух + земля» требуют осознанной настройки. Второе — модальности: два кардинальных знака будут
              соперничать за инициативу, два фиксированных — упираться, два мутабельных — сомневаться вместе.
              Третье — угол между знаками: противоположности (180°) магнетически притягиваются, трины (120°)
              дают лёгкость, квадраты (90°) — рост через трение.
            </p>
            <p>
              Но солнечный знак — только одна из десяти планет. Настоящая совместимость видна в синастрии:
              его Луна к вашей Венере, ваш Марс к его Сатурну. Именно поэтому пары с «плохой» совместимостью
              по знакам бывают счастливы десятилетиями — их карты связаны на других уровнях. Разбор по знакам
              используйте как быстрый ориентир, а решения о людях принимайте по полной картине.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl">Популярные пары</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map(([x, y], i) => {
            const sx = SIGNS.find((s) => s.slug === x)!;
            const sy = SIGNS.find((s) => s.slug === y)!;
            return (
              <Reveal key={`${x}-${y}`} delay={(i % 6) * 50}>
                <Link
                  href={`/compatibility/${canonicalPair(x, y)}`}
                  className="flex items-center justify-between rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
                >
                  <span className="font-medium">
                    {sx.symbol} {sx.ru} и {sy.symbol} {sy.ru}
                  </span>
                  <span className="text-muted">→</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={150}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-sm sm:flex-1 text-muted">
              Всего на сайте — 78 пар знаков. Точная синастрия по двум картам считается в Astro Orb.
              Для одного человека начните с <Link href="/natal-chart" className="text-iris hover:underline">натальной карты</Link>.
            </p>
            <CTA page="compatibility" cta="hub_bottom">Синастрия пары</CTA>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </>
  );
}
