export type Locale = "ru" | "en";

/** Префикс пути для локали (ru — в корне, en — в /en). */
export function localePath(locale: Locale, path: string): string {
  return locale === "en" ? `/en${path === "/" ? "" : path}` || "/en" : path;
}

/** Идентификатор страницы для deep-link атрибуции с учётом локали. */
export function ctaPage(locale: Locale, page: string): string {
  return locale === "en" ? `en_${page}` : page;
}

export const UI = {
  ru: {
    nav: {
      natal: "Натальная карта",
      matrix: "Матрица судьбы",
      compat: "Совместимость",
      horoscope: "Гороскопы",
      blog: "Блог",
      pricing: "Тарифы",
      about: "О проекте",
      open: "Открыть в Telegram",
    },
    footer: {
      tools: "Инструменты",
      horoscopes: "Гороскопы",
      brand: "Astro Orb",
      disclaimer:
        "Сервис носит развлекательно-познавательный характер и не заменяет консультации специалистов. Оплата — чеки по 54-ФЗ. Персональные данные обрабатываются согласно 152-ФЗ.",
      solar: "Соляр",
      pricing: "Тарифы",
      about: "О проекте",
      allSigns: "Все знаки",
    },
    share: {
      button: "Поделиться результатом",
      copied: "Ссылка скопирована — отправьте её в любой чат",
    },
    faqTitle: "Частые вопросы",
    breadcrumbsHome: "Главная",
    calc: {
      birthDate: "Дата рождения",
      birthTime: "Время рождения",
      city: "Город рождения",
      tz: "Часовой пояс (UTC±)",
      noTime: "Не знаю время рождения (асцендент не рассчитывается)",
      build: "Построить карту бесплатно",
      sunLabel: "Солнце — ядро личности",
      moonLabel: "Луна — эмоции и потребности",
      ascLabel: "Асцендент — как вас видят",
      ascUnknown: "Асцендент",
      firstImpression: "первое впечатление",
      innerSupport: "внутренняя опора",
      ascNeedsTime: "укажите время рождения",
      unlockText: "Полная расшифровка всех 10 планет, домов и аспектов — уже рассчитана и ждёт вас в Astro Orb",
      unlockCta: "Открыть полный разбор",
      addTimeHint:
        "Добавьте время рождения — откроется асцендент: то, каким вас видят при первой встрече, и точная сетка домов.",
      yourSign: "Ваш знак",
      selectSign: "Выберите знак",
      calculate: "Рассчитать",
      compatFirst: "Ваш знак",
      compatSecond: "Знак партнёра",
      pairPage: "Страница пары",
    },
  },
  en: {
    nav: {
      natal: "Birth chart",
      matrix: "Destiny matrix",
      compat: "Compatibility",
      horoscope: "Horoscopes",
      pricing: "Pricing",
      about: "About",
      open: "Open in Telegram",
    },
    footer: {
      tools: "Tools",
      horoscopes: "Horoscopes",
      brand: "Astro Orb",
      disclaimer:
        "Astro Orb is for entertainment and self-reflection; it does not replace professional advice. Payments are processed securely; personal data is used only for calculations.",
      solar: "Solar Return",
      pricing: "Pricing",
      about: "About",
      allSigns: "All signs",
    },
    share: {
      button: "Share result",
      copied: "Link copied — paste it into any chat",
    },
    faqTitle: "FAQ",
    breadcrumbsHome: "Home",
    calc: {
      birthDate: "Date of birth",
      birthTime: "Time of birth",
      city: "City of birth",
      tz: "Time zone (UTC±)",
      noTime: "I don't know my birth time (no ascendant)",
      build: "Build my chart — free",
      sunLabel: "Sun — core identity",
      moonLabel: "Moon — emotions & needs",
      ascLabel: "Ascendant — how people see you",
      ascUnknown: "Ascendant",
      firstImpression: "first impression",
      innerSupport: "inner support",
      ascNeedsTime: "add your birth time",
      unlockText: "The full reading of all 10 planets, houses and aspects is already calculated and waiting for you in Astro Orb",
      unlockCta: "Open my full reading",
      addTimeHint:
        "Add your birth time to unlock the ascendant — how people see you at first meeting — and the exact house grid.",
      yourSign: "Your sign",
      selectSign: "Select sign",
      calculate: "Calculate",
      compatFirst: "Your sign",
      compatSecond: "Partner's sign",
      pairPage: "Pair page",
    },
  },
} as const;
