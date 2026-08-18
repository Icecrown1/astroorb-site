import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { SIGNS } from "@/lib/zodiac";

export const metadata: Metadata = {
  title: "Гороскоп на сегодня для всех знаков зодиака",
  description:
    "Бесплатный гороскоп на сегодня, завтра, неделю и месяц для всех 12 знаков зодиака. Обновляется ежедневно. Личный гороскоп по вашей натальной карте — в Astro Orb.",
  alternates: { canonical: "/horoscope" },
};

const FAQ_ITEMS = [
  { q: "Как часто обновляются гороскопы?", a: "Ежедневно, ночью по московскому времени. Табы «завтра», «неделя» и «месяц» доступны на странице каждого знака." },
  { q: "Чем личный гороскоп отличается от общего?", a: "Общий гороскоп пишется для всех рождённых под знаком — это одна двенадцатая населения планеты. Личный считается по вашей натальной карте: транзиты планет накладываются на ваши дома, поэтому «важный день по деньгам» у вас и у соседа по знаку будет разным." },
  { q: "Какому знаку читать гороскоп, если я на границе дат?", a: "Границы знаков зависят от года и времени рождения. Точный солнечный знак покажет расчёт натальной карты — постройте её бесплатно на нашей странице натальной карты." },
];

export default function HoroscopeHub() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/horoscope", label: "Гороскопы" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Гороскоп на сегодня — <span className="grad-text">все знаки зодиака</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Выберите знак — гороскоп дня, на завтра, неделю и месяц. Обновляется ежедневно.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 60}>
              <Link
                href={`/horoscope/${s.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-hairline bg-surface p-5 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-lg text-stellar">
                  {s.symbol}
                </span>
                <span>
                  <span className="block font-medium">{s.ru}</span>
                  <span className="block text-xs text-muted">{s.dates}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-sm sm:flex-1 text-muted">
              Общий гороскоп — ориентир по погоде дня. Личный прогноз по вашей{" "}
              <Link href="/natal-chart" className="text-iris hover:underline">натальной карте</Link> — в Astro Orb.
            </p>
            <CTA page="horoscope" cta="hub">Личный гороскоп</CTA>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </>
  );
}
