import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CardOfDayTool from "@/components/CardOfDayTool";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Карта дня Таро онлайн — бесплатно, себе или другу",
  description:
    "Вытяните карту дня Таро онлайн: 78 карт без повторов, короткое послание и совет на день. Можно тянуть для друга по нику и поделиться картинкой в Threads или Instagram.",
  alternates: { canonical: "/karta-dnya" },
  openGraph: {
    url: "/karta-dnya",
    siteName: "AstroOrbi",
    type: "website",
    locale: "ru_RU",
    title: "Карта дня Таро — вытяните себе или другу",
    description: "78 карт, короткое послание на день и картинка, которой удобно поделиться.",
    images: [{ url: "/tarot-og/star.jpg", width: 1200, height: 630, alt: "Карта дня Таро — AstroOrbi" }],
  },
};

const STEPS = [
  { n: "1", t: "Объявите раздачу", d: "Пост в Threads или сторис: «Ставьте +, вытяну вам карту дня». Чем проще условие, тем больше откликов." },
  { n: "2", t: "Тяните по нику", d: "Скопируйте ник из комментария, вставьте в поле и нажмите «Вытянуть карту». Карты в колоде не повторяются." },
  { n: "3", t: "Ответьте и дальше", d: "«Копировать текст» — и в ответ на комментарий. Или «Картинка» — красивая карточка с ником. Потом «Следующий человек»." },
];

const FAQ_ITEMS = [
  {
    q: "Карты повторяются?",
    a: "Нет, пока не закончится колода. Инструмент помнит, какие карты уже вытянуты на этом устройстве, и раздаёт все 78 по очереди в случайном порядке. Когда колода закончится, она перемешается заново.",
  },
  {
    q: "Можно вытянуть карту для другого человека?",
    a: "Да, для этого и есть поле «Для кого карта». Укажите ник — он появится в тексте ответа и на картинке, а по ссылке человек увидит свою карту с подробностями.",
  },
  {
    q: "Почему все карты прямые?",
    a: "Для карты дня перевёрнутые значения необязательны: короткому посланию на один день хватает прямого смысла. Так послание получается понятным без справочника.",
  },
  {
    q: "Это предсказание?",
    a: "Нет. Карта дня — повод посмотреть на свой день под определённым углом и сделать один конкретный шаг. Решения остаются за вами.",
  },
  {
    q: "Чем отличается от карты дня в приложении?",
    a: "Здесь — короткое послание из готовых авторских текстов. В AstroOrbi трактовка пишется под ваш день и вашу натальную карту, а история карт сохраняется, чтобы вы видели закономерности.",
  },
];

export default function KartaDnyaPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24">
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Карта дня Таро", href: "/karta-dnya" }]} />

      <section className="mt-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Таро · бесплатно</p>
        <h1 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
          Карта дня — <span className="grad-text">себе или другу</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-ink-soft">
          Впишите ник, если тянете для кого-то, или оставьте поле пустым. Вы получите карту из полной колоды, послание
          в пару предложений и картинку, которой удобно поделиться.
        </p>
      </section>

      <div className="mt-8">
        <CardOfDayTool />
      </div>

      <Reveal>
        <section className="mt-16">
          <h2 className="text-center font-display text-2xl sm:text-3xl">Как раздавать карты дня в Threads</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-hairline bg-white/[0.03] p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-iris/15 font-display text-iris">{s.n}</span>
                <h3 className="mt-3 font-medium">{s.t}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-ink-soft">
            Как читать карту дня для себя и вести дневник —{" "}
            <Link href="/blog/karta-dnya-taro-onlajn" className="text-iris hover:underline">
              в нашей статье
            </Link>
            .
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16 rounded-3xl border border-iris/30 bg-iris/[0.06] p-6 text-center sm:p-10">
          <h2 className="font-display text-2xl">Карта дня даёт фокус. Расклад отвечает на вопрос</h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-soft">
            Если на душе конкретный вопрос — о работе, отношениях или решении, — задайте его картам в AstroOrbi. Первый
            расклад с подробной трактовкой бесплатный, прямо в Telegram.
          </p>
          <div className="mt-7 flex justify-center">
            <TrialCTA page="karta_dnya" cta="bottom">
              Задать вопрос картам
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
        Таро — повод для размышления, а не предсказание. Сервис носит информационно-развлекательный характер.
      </p>
    </main>
  );
}
