import type { Metadata } from "next";
import Link from "next/link";
import NatalWheel from "@/components/NatalWheel";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import { deepLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Натальная карта с точностью NASA — AI-астролог Astro Orb в Telegram",
  description:
    "Персональный AI-астролог в Telegram: натальная карта Swiss Ephemeris, разбор под вас, матрица судьбы, совместимость. Постройте карту бесплатно за 2 минуты — без установки приложения.",
  alternates: { canonical: "/" },
};

const FEATURES = [
  { title: "Натальная карта", text: "10 планет, дома, аспекты — и живой разбор, написанный под вас, а не шаблон.", cta: "features_natal", href: "/natal-chart" },
  { title: "Совместимость", text: "Синастрия по двум полным картам: любовь, деньги, быт, кризисные точки.", cta: "features_compat", href: "/compatibility" },
  { title: "Матрица судьбы", text: "22 аркана по дате рождения: предназначение, род, кармические задачи.", cta: "features_matrix", href: "/matrix" },
  { title: "Соляр", text: "Прогноз на личный год от дня рождения до дня рождения — по точному моменту возвращения Солнца.", cta: "features_solar", href: "/solar-return" },
  { title: "Важные даты", text: "Лунные фазы и транзиты, наложенные на дома вашей карты: когда действовать, когда ждать.", cta: "features_dates", href: "/horoscope" },
  { title: "Oracle", text: "Задайте любой вопрос — AI ответит, опираясь на вашу карту, а не на общие слова.", cta: "features_oracle", href: "/about" },
];

const HOME_FAQ = [
  { q: "Это бесплатно?", a: "Да, натальная карта с базовым разбором строится бесплатно. Расширенные интерпретации, совместимость, матрица судьбы и соляр доступны по подписке от 99 ₽/мес при оплате за год." },
  { q: "Нужно ли устанавливать приложение?", a: "Нет. Astro Orb работает как Mini App прямо внутри Telegram — на телефоне и на компьютере. Один клик по кнопке — и карта строится." },
  { q: "Насколько точны расчёты?", a: "Положения планет считаются библиотекой Swiss Ephemeris на основе эфемерид NASA JPL — это стандарт профессиональной астрологии. Интерпретации генерирует AI по вашей конкретной карте." },
  { q: "Как оплачивать и как отменить подписку?", a: "Оплата картой (чеки по 54-ФЗ), криптовалютой TON или Telegram Stars. Отмена — в один клик в настройках, без писем в поддержку. Возврат в течение 24 часов, если сервис не подошёл." },
  { q: "Что происходит с моими данными?", a: "Дата, время и место рождения используются только для расчётов и хранятся в зашифрованном виде. Обработка — с вашего согласия, по 152-ФЗ. Профиль можно удалить в любой момент." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-4 pb-16 pt-32 lg:grid-cols-2">
        <div>
          <p className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full grad-line" />
            AI-астролог в Telegram
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.12] md:text-5xl">
            Твоя натальная карта с точностью NASA — <span className="grad-text">за 2 минуты</span> в Telegram
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Расчёт Swiss Ephemeris по эфемеридам NASA. Интерпретации пишет AI — под вашу карту,
            ваш возраст и ваши вопросы. Без установки приложения.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CTA page="home" cta="hero">Построить карту бесплатно</CTA>
            <a
              href="#demo"
              className="group inline-flex items-center gap-3 rounded-full border border-hairline bg-white/[0.04] px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-iris/40"
            >
              Посмотреть пример разбора
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 ease-out-strong group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
          <p className="mt-6 text-xs text-muted">
            Бесплатно · Точность NASA JPL · Результат за минуту
          </p>
        </div>
        <div className="flex justify-center">
          <NatalWheel slowSpin size={440} />
        </div>
      </section>

      {/* ДЕМО ВАУ-МОМЕНТА */}
      <section id="demo" className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <p className="eyebrow">Пример разбора</p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl md:text-4xl">
            Так выглядит живая интерпретация — не гороскоп из газеты
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="shell mt-10">
            <div className="core p-6 md:p-10">
              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-iris/30 bg-void/60 p-6">
                  <p className="text-lg">☉ Солнце во Льве, 10-й дом</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Ваша энергия просит сцены — но не любой, а профессиональной. Признание через дело,
                    которое видно людям: руководство, публичность, собственный проект. Тень: работать
                    на аплодисменты вместо результата.
                  </p>
                </article>
                <article className="rounded-2xl border border-iris/30 bg-void/60 p-6">
                  <p className="text-lg">☽ Луна в Рыбах, 5-й дом</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Эмоциям нужно творчество как воздух. Вы восстанавливаетесь не отдыхом, а созданием:
                    музыка, тексты, образы. Дети и влюблённость — отдельный источник энергии и уязвимости.
                  </p>
                </article>
                <div className="relative overflow-hidden rounded-2xl border border-hairline">
                  <article className="select-none p-6 blur-[7px]" aria-hidden>
                    <p className="text-lg">♀ Венера в Деве, 11-й дом</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      В любви вы выбираете головой, и это не недостаток: ваша забота проявляется
                      через полезные действия, а круг друзей…
                    </p>
                  </article>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-void/55 p-6 text-center">
                    <p className="text-sm text-ink">Ещё 8 планет — в вашей карте</p>
                    <CTA page="home" cta="demo_unlock">Открыть свою</CTA>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <p className="eyebrow">Как это работает</p>
          <h2 className="mt-5 font-display text-3xl md:text-4xl">Три шага — прямо в Telegram</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { n: "1", t: "Дата, время, место", d: "Вводите данные рождения один раз. Не знаете время — подскажем, как уточнить." },
            { n: "2", t: "Расчёт Swiss Ephemeris", d: "Позиции планет считаются по эфемеридам NASA JPL за доли секунды." },
            { n: "3", t: "AI-разбор под вас", d: "Интерпретация пишется для вашей карты — с учётом сочетаний планет, домов и аспектов." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="shell h-full">
                <div className="core h-full p-7">
                  <span className="font-display text-3xl grad-text">{s.n}</span>
                  <p className="mt-4 text-lg font-medium">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <p className="mt-8 text-center text-sm text-muted">
            Без установки приложения — Mini App открывается внутри Telegram на любом устройстве.
          </p>
        </Reveal>
      </section>

      {/* ФИЧИ */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <p className="eyebrow">Что внутри</p>
          <h2 className="mt-5 font-display text-3xl md:text-4xl">Шесть инструментов в одном боте</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 transition-[border-color,transform] duration-300 ease-out-strong hover:-translate-y-0.5 hover:border-iris/40">
                <p className="text-lg font-medium">{f.title}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{f.text}</p>
                <div className="mt-5 flex items-center justify-between">
                  <Link href={f.href} className="text-sm text-muted hover:text-ink">
                    Подробнее
                  </Link>
                  <a href={deepLink("home", f.cta)} className="text-sm text-iris hover:underline">
                    Попробовать ↗
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ДОВЕРИЕ */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <p className="eyebrow">Почему точно</p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl md:text-4xl">
            Астрономия — настоящая. Оплата — прозрачная.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            { t: "Swiss Ephemeris", d: "Тот же расчётный движок, что у профессиональных астрологов: точность эфемерид NASA JPL, а не «примерно по таблицам»." },
            { t: "Чеки по 54-ФЗ", d: "Каждый платёж — с официальным чеком. Оплата картой, TON или Telegram Stars." },
            { t: "Отмена в один клик", d: "Подписка отключается в настройках без писем в поддержку и «удерживающих» экранов." },
            { t: "Возврат 24 часа", d: "Не подошло — вернём оплату в течение суток после покупки, без вопросов." },
          ].map((x, i) => (
            <Reveal key={x.t} delay={i * 70}>
              <div className="flex gap-4 rounded-2xl border border-hairline bg-surface p-6">
                <span className="mt-1 h-8 w-1 shrink-0 rounded-full grad-line" />
                <div>
                  <p className="font-medium">{x.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* СРАВНЕНИЕ */}
      <section className="mx-auto max-w-4xl px-4 py-24">
        <Reveal>
          <h2 className="text-center font-display text-3xl md:text-4xl">Сколько стоит узнать себя</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="shell mt-10">
            <div className="core">
              <table className="w-full text-[13px] sm:text-sm">
                <thead>
                  <tr className="border-b border-hairline text-left text-muted">
                    <th className="p-3 sm:p-5 font-normal">Вариант</th>
                    <th className="p-3 sm:p-5 font-normal">Цена</th>
                    <th className="p-3 sm:p-5 font-normal">Что получаете</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-hairline">
                    <td className="p-3 align-top sm:p-5">Консультация астролога</td>
                    <td className="p-3 align-top sm:p-5 sm:whitespace-nowrap">5 000–15 000 ₽</td>
                    <td className="p-3 align-top sm:p-5 text-muted">1–2 часа разбора, запись за недели</td>
                  </tr>
                  <tr className="border-b border-hairline">
                    <td className="p-3 align-top sm:p-5">Шаблонный гороскоп в ленте</td>
                    <td className="p-3 align-top sm:p-5">0 ₽</td>
                    <td className="p-3 align-top sm:p-5 text-muted">Один текст на 650 млн человек вашего знака</td>
                  </tr>
                  <tr className="bg-iris/[0.06]">
                    <td className="p-3 align-top sm:p-5 font-medium">Astro Orb</td>
                    <td className="p-3 align-top sm:p-5 sm:whitespace-nowrap font-medium grad-text">от 99 ₽/мес</td>
                    <td className="p-3 align-top sm:p-5">Личный AI-астролог 24/7 по вашей точной карте</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl">
            Небо уже рассчитано. <span className="grad-text">Осталось прочитать.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Постройте натальную карту бесплатно — интерпретация трёх ключевых точек в подарок.
          </p>
          <div className="mt-8 flex justify-center">
            <CTA page="home" cta="final">Построить карту бесплатно</CTA>
          </div>
        </Reveal>
      </section>

      <FAQ items={HOME_FAQ} />
    </>
  );
}
