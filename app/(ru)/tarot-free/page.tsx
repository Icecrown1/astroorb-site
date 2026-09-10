import type { Metadata } from "next";
import Image from "next/image";
import { pageOg } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Бесплатный расклад Таро онлайн — задай свой вопрос",
  description:
    "Первый расклад Таро — бесплатно: задайте один вопрос и получите три карты с подробной AI-интерпретацией прямо в Telegram. Без оплаты, карты и регистрации.",
  alternates: { canonical: "/tarot-free", languages: { ru: "/tarot-free", en: "/en/tarot-free", "x-default": "/tarot-free" } },
  openGraph: pageOg("/tarot-free"),
};

const FAQ_ITEMS = [
  { q: "Это правда бесплатно?", a: "Да. Одна проба для новых пользователей — без оплаты, банковской карты и обязательной подписки. Понравится — дальше сами решите, нужен ли полный доступ." },
  { q: "Что нужно, чтобы получить расклад?", a: "Только Telegram и один вопрос о вашей ситуации. Дату рождения и другие данные вводить не нужно — для пробного расклада они не требуются." },
  { q: "Как выглядит результат?", a: "Три карты с позициями, подробная интерпретация каждой, общая картина и конкретный совет. Результат сохраняется — можно вернуться и перечитать." },
  { q: "Кто делает интерпретацию?", a: "AI, обученный на классических значениях карт. Таро — повод для размышления, а не предсказание будущего: расклад помогает посмотреть на ситуацию с новой стороны." },
];

const STEPS = [
  { n: "1", t: "Откройте приложение", d: "Кнопка ниже ведёт в Telegram — ничего устанавливать не нужно." },
  { n: "2", t: "Задайте один вопрос", d: "О работе, отношениях, решении — своими словами, от 10 символов." },
  { n: "3", t: "Получите расклад", d: "Три карты и подробный разбор — примерно за минуту." },
];

const DEMO_CARDS = [
  { img: "/tarot-demo/the-star.webp", name: "The Star", pos: "Суть ситуации" },
  { img: "/tarot-demo/two-of-cups.webp", name: "Two of Cups", pos: "Что помогает" },
  { img: "/tarot-demo/sun.webp", name: "The Sun", pos: "К чему идёт" },
];

export default function TarotFreePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-10">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Бесплатный расклад Таро", href: "/tarot-free" }]} />

      {/* Hero */}
      <Reveal>
        <section className="mt-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Бесплатная проба</p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Первый расклад Таро — <span className="grad-text">бесплатно</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-ink-soft">
            Задайте один вопрос о своей ситуации и получите короткий расклад с
            интерпретацией — прямо в Telegram, за минуту. Без оплаты, банковской
            карты и анкет.
          </p>
          <div className="mt-8 flex justify-center">
            <TrialCTA cta="hero">Получить бесплатный расклад</TrialCTA>
          </div>
          <p className="mt-3 text-xs text-ink-soft/70">
            Одна проба для новых пользователей · данные рождения не нужны
          </p>
        </section>
      </Reveal>

      {/* Шаги */}
      <Reveal>
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-hairline bg-white/[0.03] p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-iris/15 font-display text-iris">{s.n}</span>
              <h3 className="mt-3 font-medium">{s.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* Пример результата */}
      <Reveal>
        <section className="mt-16">
          <h2 className="text-center font-display text-2xl sm:text-3xl">Как выглядит результат</h2>
          <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-hairline bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm text-ink-soft">Вопрос:</p>
            <p className="mt-1 font-display text-lg">«На что мне обратить внимание при смене работы?»</p>

            <div className="mt-6 flex justify-center gap-3 sm:gap-5">
              {DEMO_CARDS.map((c) => (
                <figure key={c.name} className="w-24 text-center sm:w-28">
                  <Image
                    src={c.img}
                    alt={`Карта Таро ${c.name}`}
                    width={512}
                    height={768}
                    className="rounded-xl border border-gold/40"
                  />
                  <figcaption className="mt-2 text-[11px] leading-tight text-ink-soft">
                    <span className="block text-gold/90">{c.pos}</span>
                    {c.name}
                  </figcaption>
                </figure>
              ))}
            </div>

            <blockquote className="mt-6 rounded-2xl border border-iris/25 bg-iris/[0.07] p-4 text-sm leading-relaxed text-ink-soft">
              «Звезда в сути ситуации говорит: перемены назрели не от отчаяния, а
              от роста — худший этап уже позади. Двойка Кубков подсказывает, что
              решающими станут союзники: разговор с одним человеком даст больше,
              чем десять откликов на вакансии…»
            </blockquote>
            <p className="mt-3 text-right text-xs text-ink-soft/60">— фрагмент реального формата разбора</p>
          </div>
        </section>
      </Reveal>

      {/* Семь направлений + CTA */}
      <Reveal>
        <section className="mt-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl">Таро — один из семи разделов</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            В AstroOrbi также есть натальная карта, матрица судьбы, совместимость,
            гороскопы, соляр и Оракул для свободных вопросов. Начните с бесплатного
            расклада — остальное посмотрите внутри.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <TrialCTA cta="bottom">Получить бесплатный расклад</TrialCTA>
            <TrialCTA cta="bottom-ghost" ghost>
              Открыть в Telegram
            </TrialCTA>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <FAQ items={FAQ_ITEMS} />
        </section>
      </Reveal>

      <p className="mt-12 text-center text-xs text-ink-soft/60">
        Таро — повод для размышления. Интерпретацию готовит ИИ. Сервис носит
        информационно-развлекательный характер и не заменяет консультацию
        специалиста.
      </p>
    </main>
  );
}
