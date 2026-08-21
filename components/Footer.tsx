import Link from "next/link";
import { SIGNS } from "@/lib/zodiac";
import { deepLink } from "@/lib/site";
import { localePath, ctaPage, type Locale } from "@/lib/i18n";

const T = {
  ru: {
    tagline:
      "Персональный AI-астролог в Telegram. Расчёты Swiss Ephemeris, интерпретации — искусственный интеллект нового поколения.",
    open: "Открыть Mini App ↗",
    tools: "Инструменты",
    natal: "Натальная карта онлайн",
    matrix: "Матрица судьбы",
    compat: "Совместимость знаков",
    horo: "Гороскоп на сегодня",
    horoscopes: "Гороскопы",
    pricing: "Тарифы",
    about: "О проекте и технологии",
    solar: "Соляр (Solar Return)",
    legal:
      "Оплата с чеками по 54-ФЗ. Отмена подписки в один клик. Дата рождения — персональные данные: обрабатываются с вашего согласия (152-ФЗ).",
    bottom: "Сервис носит развлекательно-познавательный характер.",
  },
  en: {
    tagline:
      "Your personal AI astrologer in Telegram. Swiss Ephemeris calculations, interpretations by next-generation AI.",
    open: "Open Mini App ↗",
    tools: "Tools",
    natal: "Birth chart online",
    matrix: "Destiny matrix",
    compat: "Zodiac compatibility",
    horo: "Today's horoscope",
    horoscopes: "Horoscopes",
    pricing: "Pricing",
    about: "About & technology",
    solar: "Solar Return",
    legal:
      "Secure payments, one-click cancellation. Your birth data is personal information — used for calculations only, with your consent.",
    bottom: "Astro Orb is for entertainment and self-reflection purposes.",
  },
} as const;

export default function Footer({ locale = "ru" }: { locale?: Locale }) {
  const t = T[locale];
  const p = (path: string) => localePath(locale, path);
  return (
    <footer className="relative z-10 mt-32 border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-lg">
            Astro <span className="grad-text">Orb</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{t.tagline}</p>
          <a
            href={deepLink(ctaPage(locale, "footer"), "open")}
            className="mt-5 inline-block rounded-full border border-hairline px-4 py-2 text-sm text-ink transition-colors duration-200 hover:border-iris/40"
          >
            {t.open}
          </a>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted">{t.tools}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-ink/80 hover:text-ink" href={p("/natal-chart")}>{t.natal}</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href={p("/matrix")}>{t.matrix}</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href={p("/compatibility")}>{t.compat}</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href={p("/horoscope")}>{t.horo}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted">{t.horoscopes}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {SIGNS.map((s) => (
              <li key={s.slug}>
                <Link className="text-ink/80 hover:text-ink" href={p(`/horoscope/${s.slug}`)}>
                  {locale === "en" ? s.en.name : s.ru}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted">Astro Orb</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-ink/80 hover:text-ink" href={p("/pricing")}>{t.pricing}</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href={p("/about")}>{t.about}</Link></li>
            <li><Link className="text-ink/80 hover:text-ink" href={p("/solar-return")}>{t.solar}</Link></li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted">{t.legal}</p>
        </div>
      </div>
      <div className="border-t border-hairline py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Astro Orb. {t.bottom}
      </div>
    </footer>
  );
}
