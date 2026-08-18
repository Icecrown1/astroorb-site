import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "О проекте: технология, точность, методология",
  description:
    "Как устроен Astro Orb: расчёты Swiss Ephemeris по эфемеридам NASA JPL, AI-интерпретации, честная оплата с чеками 54-ФЗ. Технология и методология сервиса.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/about", label: "О проекте" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <h1 className="font-display text-3xl leading-[1.15] md:text-5xl">
          Астрология, в которой <span className="grad-text">астрономия — настоящая</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Astro Orb — это AI-астролог в Telegram. Мы соединили профессиональный астрономический расчёт
          с языковыми моделями нового поколения, чтобы каждый мог получить разбор уровня консультации —
          за минуты и без записи за три недели.
        </p>

        <Reveal>
          <h2 className="mt-16 font-display text-2xl md:text-3xl">Технология расчёта</h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Позиции планет считает Swiss Ephemeris — расчётная библиотека, построенная на эфемеридах
              NASA JPL. Это тот же стандарт точности, который используют профессиональные астрологические
              программы: погрешность положения планет — доли угловой секунды на горизонте столетий.
              Момент соляра (возвращения Солнца в натальную позицию) вычисляется астрономически точно,
              а не «на день рождения».
            </p>
            <p>
              Интерпретации генерирует языковая модель последнего поколения — не по шаблону знака, а по
              вашей конкретной конфигурации: планета, знак, дом, аспекты и их сочетания. Тексты адаптируются
              под ваш профиль, и им можно задавать уточняющие вопросы в чате.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-16 font-display text-2xl md:text-3xl">Методология и честность</h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Мы разделяем астрономические факты и интерпретации. Положение Сатурна в вашем 10-м доме —
              проверяемый расчёт; его трактовка — язык символов, инструмент саморефлексии. Astro Orb не
              обещает «предсказать судьбу» и не заменяет врача, психолога или финансового консультанта.
              Сервис носит развлекательно-познавательный характер — и мы честно пишем это на каждой странице.
            </p>
            <p>
              Та же честность — в оплате: цены в рублях без «звёздочек», чеки по 54-ФЗ на каждый платёж,
              отмена подписки в один клик и возврат в течение 24 часов. Дата рождения — персональные данные:
              они хранятся в зашифрованном виде, используются только для расчётов и удаляются по запросу (152-ФЗ).
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-16 font-display text-2xl md:text-3xl">Что умеет Astro Orb</h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
            <li>✦ <Link href="/natal-chart" className="text-iris hover:underline">Натальная карта</Link> — 10 планет, дома, аспекты, кликабельные разборы</li>
            <li>✦ <Link href="/compatibility" className="text-iris hover:underline">Совместимость</Link> — синастрия по двум полным картам</li>
            <li>✦ <Link href="/matrix" className="text-iris hover:underline">Матрица судьбы</Link> — 22 аркана по дате рождения</li>
            <li>✦ <Link href="/solar-return" className="text-iris hover:underline">Соляр</Link> — прогноз на личный год</li>
            <li>✦ <Link href="/horoscope" className="text-iris hover:underline">Гороскопы</Link> — день, неделя, месяц по вашей карте</li>
            <li>✦ Oracle — вопросы к AI с опорой на вашу карту</li>
          </ul>
        </Reveal>

        <Reveal>
          <div className="mt-16 rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-sm text-muted">
              Вопросы, сотрудничество, поддержка — прямо в боте, раздел «Поддержка». Реквизиты и оферта —
              в Mini App в разделе оплаты.
            </p>
            <div className="mt-5">
              <CTA page="about" cta="bottom">Открыть Astro Orb</CTA>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
