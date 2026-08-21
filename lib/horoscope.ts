import { Sign } from "./zodiac";
import type { Locale } from "./i18n";

/**
 * Детерминированный генератор общего гороскопа (сид = дата + знак).
 * Это трафик-магнит для ISR-страниц до подключения GPT-5-пайплайна
 * (server/lib/prompts/horoscope*.md в Astro Orb). Точка интеграции:
 * замените composeHoroscope() на fetch к бэкенду и оставьте revalidate.
 */

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number, salt: number): T {
  return arr[(seed + salt * 2654435761) % arr.length];
}


const OPENERS_EN = [
  "The day opens a window for what you have been postponing — the key theme is",
  "Planetary rhythms favor a calm, confident pace today; your leading note is",
  "Today rewards those who act from their strengths — and your strength is",
  "The general background is steady, with a pleasant accent on personal matters; the day's keyword is",
  "A good day to close loose ends and clear space for the new; the theme is",
  "Energy builds gradually today: the morning sets the tone, the evening pays it back; your focus is",
];
const WORK_EN = [
  "At work, focus beats speed today: one finished task will do more for you than five started ones.",
  "A good day for negotiations and messages that have been waiting — your wording lands precisely.",
  "Routine goes unusually smoothly; use the freed attention for a step that has long needed courage.",
  "Colleagues are more receptive than usual: voice the idea you have been keeping to yourself.",
  "Money questions like concrete numbers today — check the figures before agreeing.",
  "Postpone big commitments until tomorrow if you can; today favors preparation over signing.",
];
const LOVE_EN = [
  "In relationships, warmth grows through small gestures — one honest compliment changes the evening.",
  "A conversation you have been avoiding will go softer than you expect if you start it first.",
  "Singles: someone from your existing circle sees you differently today — look around before looking far.",
  "The pair's mood mirrors yours: bring the state you want to receive.",
  "Give your loved ones the same patience you give strangers — the effect will surprise you.",
  "An old chat or memory may resurface; respond from who you are now, not who you were then.",
];
const CARE_EN = [
  "Your body asks for rhythm today: same-hour meals and an earlier night will restore more than any hack.",
  "Tension collects in the shoulders and jaw — two minutes of slow breathing will reset the day.",
  "Water and a walk beat caffeine after lunch; keep the evening screen-light.",
  "Energy is uneven: plan the demanding work into your personal peak hours and keep the rest light.",
  "A small digital pause works wonders today — even thirty offline minutes count.",
  "Listen to the first signal of fatigue instead of the third; rest is part of the plan, not a failure of it.",
];
const ADVICE_EN = [
  "Say yes only to what you would accept twice.",
  "Done imperfectly today beats perfect someday.",
  "Ask one question more than usual — the answer will save you a week.",
  "Keep the promise you made to yourself first.",
  "Choose the calm option where both look equal.",
  "Write it down: today's passing thought is this week's plan.",
];

const OPENERS = [
  "День поддерживает вашу стихию:",
  "Транзитная Луна усиливает вашу природную черту —",
  "Сегодня на первый план выходит",
  "Небо предлагает сделать ставку на",
  "Энергия дня резонирует с вашим ключевым качеством —",
];

const WORK = [
  "В работе избегайте распыления: одна завершённая задача сегодня стоит трёх начатых.",
  "Хороший день для переговоров и писем, которые вы откладывали — вас услышат.",
  "Рутина пойдёт легче обычного: разберите то, что копилось неделями.",
  "Возможен неожиданный поворот в делах — не сопротивляйтесь, в нём выгода.",
  "Коллеги восприимчивы к вашим идеям: озвучьте предложение до обеда.",
];

const LOVE = [
  "В отношениях выбирайте мягкость: прямота сегодня может ранить сильнее, чем вы хотите.",
  "Вечер благоприятен для откровенного разговора — начните его первым.",
  "Одиноким стоит принять приглашение, которое кажется «не вашим» — сюрприз возможен именно там.",
  "Партнёру нужно ваше внимание без телефона в руках: подарите час полного присутствия.",
  "Старый контакт может напомнить о себе — решите заранее, зачем вам этот диалог.",
];

const CARE = [
  "Телу нужна вода и движение: короткая прогулка перезагрузит мысли лучше кофе.",
  "Следите за режимом сна: решения после полуночи сегодня будут не в вашу пользу.",
  "Снизьте информационный шум — час без новостей вернёт ясность.",
  "Энергия дня волнообразна: планируйте важное на первую половину.",
  "Хороший день, чтобы начать маленькую полезную привычку — она приживётся.",
];

const ADVICE = [
  "Совет дня: скажите «нет» одному лишнему обязательству.",
  "Совет дня: запишите идею, которая придёт между делом — она ценнее, чем кажется.",
  "Совет дня: сделайте первый шаг в деле, которое пугает масштабом.",
  "Совет дня: поблагодарите того, кто помог вам в этом месяце.",
  "Совет дня: наведите порядок в одном маленьком пространстве — стол, папка, экран.",
];

export interface DayHoroscope {
  dateRu: string;
  intro: string;
  work: string;
  love: string;
  care: string;
  advice: string;
  lucky: number;
}

export function composeHoroscope(sign: Sign, date: Date, shift = 0, locale: Locale = "ru"): DayHoroscope {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + shift);
  const iso = d.toISOString().slice(0, 10);
  const seed = hashSeed(`${iso}:${sign.slug}`);

  const dateRu = d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Moscow",
  });

  if (locale === "en") {
    const dateEn = d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Moscow" });
    return {
      dateRu: dateEn,
      intro: `${pick(OPENERS_EN, seed, 1)} ${sign.en.keyword}. ${sign.en.name} acts from a position of strength today — your ruler ${sign.en.ruler} is on your side.`,
      work: pick(WORK_EN, seed, 2),
      love: pick(LOVE_EN, seed, 3),
      care: pick(CARE_EN, seed, 4),
      advice: pick(ADVICE_EN, seed, 5),
      lucky: (seed % 22) + 1,
    };
  }
  return {
    dateRu,
    intro: `${pick(OPENERS, seed, 1)} ${sign.keyword}. ${sign.ru} сегодня действует из сильной позиции — управитель ${sign.ruler} на вашей стороне.`,
    work: pick(WORK, seed, 2),
    love: pick(LOVE, seed, 3),
    care: pick(CARE, seed, 4),
    advice: pick(ADVICE, seed, 5),
    lucky: (seed % 22) + 1,
  };
}

/**
 * Основной источник гороскопа для страниц знаков.
 * Если задан HOROSCOPE_API_URL (бэкенд Astro Orb, GET /api/public/sign-horoscope/:sign),
 * берёт AI-гороскоп от GPT (кэш на бэкенде — 12 вызовов/день). Иначе или при ошибке —
 * детерминированный композер. Работает на сервере (SSG/ISR), CORS не нужен.
 */
export async function getDayHoroscope(sign: Sign, date: Date, shift = 0, locale: Locale = "ru"): Promise<DayHoroscope> {
  const fallback = composeHoroscope(sign, date, shift, locale);

  // Бэкенд пока пишет гороскопы только на русском — EN живёт на композере.
  if (locale === "en") return fallback;
  const api = process.env.HOROSCOPE_API_URL;

  // Бэкенд генерирует только «сегодня»; «завтра» всегда из композера.
  if (!api || shift !== 0) return fallback;

  try {
    const res = await fetch(
      `${api.replace(/\/+$/, "")}/api/public/sign-horoscope/${sign.slug}`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(20000) }
    );
    if (!res.ok) return fallback;
    const json = await res.json();
    const d = json?.data;
    if (!json?.ok || !d?.intro || !d?.work || !d?.love) return fallback;
    return {
      ...fallback, // dateRu и любые недостающие поля
      intro: String(d.intro),
      work: String(d.work),
      love: String(d.love),
      care: String(d.care || fallback.care),
      advice: String(d.advice || fallback.advice),
      lucky: Number.isFinite(+d.lucky) ? +d.lucky : fallback.lucky,
    };
  } catch {
    return fallback;
  }
}
