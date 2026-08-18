import Link from "next/link";
import { SIGNS } from "@/lib/zodiac";
import { deepLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-lg">
            Astro <span className="grad-text">Orb</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Персональный AI-астролог в Telegram. Расчёты Swiss Ephemeris,
            интерпретации — искусственный интеллект нового поколения.
          </p>
          <a
            href={deepLink("footer", "open")}
            className="mt-5 inline-block rounded-full border border-hairline px-4 py-2 text-sm text-ink transition-colors duration-200 hover:border-iris/40"
          >
            Открыть Mini App ↗
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Инструменты</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-ink/80 hover:text-ink" href="/natal-chart">Натальная карта онлайн</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href="/matrix">Матрица судьбы</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href="/compatibility">Совместимость знаков</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href="/horoscope">Гороскоп на сегодня</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Гороскопы</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {SIGNS.map((s) => (
              <li key={s.slug}>
                <Link className="text-ink/80 hover:text-ink" href={`/horoscope/${s.slug}`}>
                  {s.ru}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Astro Orb</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-ink/80 hover:text-ink" href="/pricing">Тарифы</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href="/about">О проекте и технологии</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href="/solar-return">Соляр (Solar Return)</Link></li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Оплата с чеками по 54-ФЗ. Отмена подписки в один клик.
            Дата рождения — персональные данные: обрабатываются с вашего согласия (152-ФЗ).
          </p>
        </div>
      </div>
      <div className="border-t border-hairline py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Astro Orb. Сервис носит развлекательно-познавательный характер.
      </div>
    </footer>
  );
}
