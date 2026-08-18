import { Sign } from "./zodiac";

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

export function composeHoroscope(sign: Sign, date: Date, shift = 0): DayHoroscope {
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
export async function getDayHoroscope(sign: Sign, date: Date, shift = 0): Promise<DayHoroscope> {
  const fallback = composeHoroscope(sign, date, shift);
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
