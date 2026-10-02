// Лёгкий модуль без текстов статей: его можно импортировать в клиентские компоненты (Nav).
/** Соответствие слагов RU → EN (для hreflang-пар). */
export const SLUG_RU_TO_EN: Record<string, string> = {
  "retrogradnyj-merkurij-2026": "mercury-retrograde-2026",
  "lunnyj-kalendar-2026": "moon-calendar-2026",
  "kak-uznat-ascendent": "how-to-find-your-rising-sign",
  "luna-v-natalnoj-karte": "moon-sign-meaning",
  "sovmestimost-po-date-rozhdeniya": "birth-date-compatibility",
  "kak-rasschitat-matricu-sudby": "destiny-matrix-calculator-guide",
  "karmicheskij-hvost-matricy-sudby": "karmic-tail-destiny-matrix",
  "denezhnyj-kanal-matricy-sudby": "money-channel-destiny-matrix",
  "karta-dnya-taro-onlajn": "tarot-card-of-the-day",
  "kak-chitat-natalnuyu-kartu": "how-to-read-a-natal-chart",
  "solyar-goroskop-na-god": "solar-return-chart-guide",
  "kak-uznat-svoj-arkan": "personal-arcana-by-birth-date",
  "test-na-sovmestimost-po-date-rozhdeniya": "birthday-compatibility-test",
  "sovmestimost-po-lune": "moon-sign-compatibility",
  "retrogradnyj-merkurij-v-skorpione-2026": "mercury-retrograde-scorpio-2026",
  "lunnyj-kalendar-noyabr-2026": "moon-calendar-november-2026",
};
export const SLUG_EN_TO_RU: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_RU_TO_EN).map(([ru, en]) => [en, ru]),
);
