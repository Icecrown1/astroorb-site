import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { SIGNS, ELEMENT_RU, signBySlug } from "@/lib/zodiac";
import { composeHoroscope, getDayHoroscope } from "@/lib/horoscope";

/** ISR: перегенерация раз в сутки (ТЗ §2 — обновление в 00:05 МСК задаётся кроном/refresh-запросом). */
export const revalidate = 86400;

export function generateStaticParams() {
  return SIGNS.map((s) => ({ sign: s.slug }));
}

export function generateMetadata({ params }: { params: { sign: string } }): Metadata {
  const s = signBySlug(params.sign);
  if (!s) return {};
  const dateRu = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Moscow",
  });
  return {
    title: `Гороскоп ${s.ru} на ${dateRu} — сегодня и завтра`,
    description: `Гороскоп ${s.ruGen} на сегодня, ${dateRu}: работа, отношения, самочувствие и совет дня. Обновляется ежедневно. Личный прогноз по натальной карте — в Astro Orb.`,
    alternates: { canonical: `/horoscope/${s.slug}` },
  };
}

export default async function SignHoroscopePage({ params }: { params: { sign: string } }) {
  const s = signBySlug(params.sign);
  if (!s) notFound();

  const now = new Date();
  const today = await getDayHoroscope(s, now, 0);
  const tomorrow = composeHoroscope(s, now, 1);

  const idx = SIGNS.findIndex((x) => x.slug === s.slug);
  const neighbors = [SIGNS[(idx + 11) % 12], SIGNS[(idx + 1) % 12], SIGNS[(idx + 6) % 12]];

  const faq = [
    { q: `Для кого этот гороскоп?`, a: `Для рождённых с ${s.dates} — солнечный знак ${s.ru}. Если вы родились на границе дат, точный знак покажет расчёт натальной карты.` },
    { q: `Почему гороскоп ${s.ruGen} общий для всех?`, a: `Под знаком ${s.ruGen} рождена примерно одна двенадцатая людей. Общий гороскоп описывает фон дня для знака; личные события зависят от вашей полной карты — её мы разбираем в Astro Orb.` },
    { q: "Когда обновляется прогноз?", a: "Каждую ночь по московскому времени. Прогнозы на завтра, неделю и месяц доступны в Astro Orb вместе с личными транзитами." },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/horoscope", label: "Гороскопы" },
          { href: `/horoscope/${s.slug}`, label: s.ru },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">
          {s.symbol} {s.dates} · {ELEMENT_RU[s.element]} · {s.ruler}
        </p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Гороскоп {s.ruGen} на <span className="grad-text">{today.dateRu}</span>
        </h1>

        <article className="mt-10 space-y-4">
          <p className="text-[15px] leading-relaxed">{today.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <HoroBlock label="Работа и дела" text={today.work} />
            <HoroBlock label="Отношения" text={today.love} />
            <HoroBlock label="Самочувствие" text={today.care} />
            <HoroBlock label={`Число дня: ${today.lucky}`} text={today.advice} />
          </div>
        </article>

        <details className="group mt-8 rounded-2xl border border-hairline bg-surface px-6 py-5">
          <summary className="cursor-pointer list-none font-medium marker:content-none">
            <span className="mr-3 inline-block text-iris transition-transform duration-300 ease-out-strong group-open:rotate-45">+</span>
            Гороскоп на завтра, {tomorrow.dateRu}
          </summary>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <p>{tomorrow.intro}</p>
            <p>{tomorrow.work}</p>
            <p>{tomorrow.love}</p>
          </div>
        </details>

        <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">
            Это общий гороскоп для всех {s.ruPlural}. Ваш личный — по вашей натальной карте, с транзитами
            по вашим домам: когда решаться на важное, а когда переждать. Прогнозы на неделю и месяц — там же.
          </p>
          <div className="mt-5">
            <CTA page={`horoscope_${s.slug}`} cta="personal">Мой личный гороскоп</CTA>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <span className="text-muted">Другие знаки:</span>
          {neighbors.map((n) => (
            <Link key={n.slug} href={`/horoscope/${n.slug}`} className="text-iris hover:underline">
              {n.ru}
            </Link>
          ))}
          <Link href="/horoscope" className="text-muted hover:text-ink">
            Все 12 →
          </Link>
        </div>
      </section>

      <FAQ items={faq} />
    </>
  );
}

function HoroBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
