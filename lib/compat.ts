import { SIGNS, Sign, Element, ELEMENT_RU, ELEMENT_EN, signBySlug } from "./zodiac";
import type { Locale } from "./i18n";

/** Базовая совместимость стихий (0–100 основа). */
const ELEMENT_SCORE: Record<Element, Record<Element, number>> = {
  fire: { fire: 78, earth: 55, air: 88, water: 52 },
  earth: { fire: 55, earth: 80, air: 54, water: 86 },
  air: { fire: 88, earth: 54, air: 76, water: 56 },
  water: { fire: 52, earth: 86, air: 56, water: 82 },
};


const ELEMENT_PAIR_TEXT_EN: Record<string, string> = {
 "fire-fire": "Two fires feed one blaze: passion, speed and shared ambition — with occasional battles for the steering wheel.",
 "earth-earth": "Two earth signs build slowly and for keeps: shared plans, money and home feel natural; the risk is routine without sparks.",
 "air-air": "Two air signs never run out of things to say: friendship-in-love, ideas and mobility; grounding the everyday is the challenge.",
 "water-water": "Two water signs understand each other without words: rare emotional depth — and the need not to drown in shared moods.",
 "fire-earth": "Fire ignites, earth gives it form: impulse plus endurance can build a lot — if fire respects the pace and earth allows risk.",
 "fire-air": "Air fans fire: inspiration, travel and big plans come easily; the pair's task is follow-through, not just takeoff.",
 "fire-water": "Steam or a doused flame: strong attraction of opposites that needs careful handling of each other's intensity.",
 "earth-air": "Earth wants results, air wants options: together you can turn ideas into working things — after agreeing on the tempo.",
 "earth-water": "The most fertile combination: feelings find form, care becomes deeds; homes and teams rest on pairs like this.",
 "air-water": "Mind meets feeling: endless conversations about emotions and psychology; the risk is analyzing love instead of living it."
};

const ELEMENT_PAIR_TEXT: Record<string, string> = {
  "fire-fire": "Двойной огонь — это страсть, скорость и постоянная искра. Скучно не будет никогда, но двум лидерам придётся учиться уступать сцену друг другу.",
  "fire-air": "Воздух раздувает огонь: одна из самых лёгких и вдохновляющих комбинаций. Идеи одного мгновенно подхватываются энергией другого.",
  "fire-earth": "Огонь торопит, земля тормозит. Союз контрастов: при взаимном уважении партнёры дают друг другу то, чего каждому не хватает — драйв и опору.",
  "fire-water": "Пар и кипение: сильное взаимное притяжение и такие же сильные эмоциональные качели. Работает при высоком уровне осознанности обоих.",
  "earth-earth": "Два знака земли строят медленно, но на века: общие ценности, быт без войн, финансовая стабильность. Главный риск — увязнуть в рутине.",
  "earth-water": "Вода питает землю: тёплый, глубокий и заботливый союз. Один даёт форму и надёжность, другой — чувства и смысл.",
  "earth-air": "Земле нужны факты, воздуху — идеи. Разные скорости мышления могут раздражать, но вместе вы закрываете и стратегию, и реализацию.",
  "air-air": "Два воздушных знака — это бесконечный диалог, лёгкость и свобода. Следите, чтобы у отношений, кроме слов, появлялись и общие дела.",
  "air-water": "Разум встречает чувство. Воздуху придётся признать логику эмоций, воде — не топить лёгкость партнёра. Зато рост у обоих колоссальный.",
  "water-water": "Две стихии воды понимают друг друга без слов — глубина, нежность, телепатия. Опасность одна: вместе утонуть в эмоциях без берегов.",
};

function elementPairKey(a: Element, b: Element): string {
  const order: Element[] = ["fire", "earth", "air", "water"];
  return order.indexOf(a) <= order.indexOf(b) ? `${a}-${b}` : `${b}-${a}`;
}

export interface CompatResult {
  a: Sign;
  b: Sign;
  score: number;
  headline: string;
  paragraph: string;
  strengths: string[];
  frictions: string[];
}

/** Детерминированный расчёт пары: одна и та же пара всегда даёт один результат. */
export function calcCompat(slugA: string, slugB: string, locale: Locale = "ru"): CompatResult | null {
  const a = signBySlug(slugA);
  const b = signBySlug(slugB);
  if (!a || !b) return null;

  let score = ELEMENT_SCORE[a.element][b.element];
  if (a.modality === b.modality && a.slug !== b.slug) score -= 4; // борьба одинаковых стратегий
  if (a.ruler === b.ruler) score += 5;
  if (a.slug === b.slug) score = Math.min(score + 6, 97);
  const ia = SIGNS.findIndex((s) => s.slug === a.slug);
  const ib = SIGNS.findIndex((s) => s.slug === b.slug);
  const dist = Math.min((ia - ib + 12) % 12, (ib - ia + 12) % 12);
  if (dist === 6) score += 7; // ось противоположностей: магнетизм
  if (dist === 4) score += 5; // трин
  if (dist === 3) score -= 3; // квадрат
  score = Math.max(38, Math.min(97, score));

  const pairText = (locale === "en" ? ELEMENT_PAIR_TEXT_EN : ELEMENT_PAIR_TEXT)[elementPairKey(a.element, b.element)];

  const headline =
    locale === "en"
      ? score >= 85
        ? "Strong natural resonance"
        : score >= 70
          ? "Good long-term potential"
          : score >= 55
            ? "A union that takes work — and rewards it"
            : "A union of opposite programs"
      : score >= 85
        ? "Сильный природный резонанс"
        : score >= 70
          ? "Хороший потенциал союза"
          : score >= 55
            ? "Союз-работа: сложно, но перспективно"
            : "Союз противоположных программ";

  const paragraph =
    locale === "en"
      ? a.slug === b.slug
        ? `${a.en.name} with ${b.en.name} is a mirror pair: you recognize yourself in each other instantly. ${pairText} The pair's keyword is "${a.en.keyword}" — together you get twice as much of it, perks and excesses included.`
        : `${a.en.name} (${ELEMENT_EN[a.element]}, ruled by ${a.en.ruler}) brings ${a.en.traits[0]} and ${a.en.traits[2]} to the pair, while ${b.en.name} (${ELEMENT_EN[b.element]}, ruled by ${b.en.ruler}) answers with ${b.en.traits[0]} and ${b.en.traits[1]}. ${pairText}`
      : a.slug === b.slug
        ? `${a.ru} и ${b.ru} — зеркальная пара: вы мгновенно узнаёте себя друг в друге. ${pairText} Ключевое слово этой пары — «${a.keyword}»: вдвоём его вдвое больше, со всеми плюсами и перегибами.`
        : `${a.ru} (${ELEMENT_RU[a.element]}, ${a.ruler}) приносит в пару ${a.traits[0]} и ${a.traits[2]}, ${b.ru} (${ELEMENT_RU[b.element]}, ${b.ruler}) отвечает качествами «${b.traits[0]}» и «${b.traits[1]}». ${pairText}`;

  const strengths =
    locale === "en"
      ? [
          `${a.en.name}: ${a.en.traits.join(", ")}`,
          `${b.en.name}: ${b.en.traits.join(", ")}`,
          dist === 6 ? "Axis of opposites — strong magnetic attraction" : `Elements: ${ELEMENT_EN[a.element]} + ${ELEMENT_EN[b.element]}`,
        ]
      : [
          `${a.ru}: ${a.traits.join(", ")}`,
          `${b.ru}: ${b.traits.join(", ")}`,
          dist === 6 ? "Ось противоположностей — сильное магнетическое притяжение" : `Стихии: ${ELEMENT_RU[a.element]} + ${ELEMENT_RU[b.element]}`,
        ];

  const frictions =
    locale === "en"
      ? [
          a.modality === b.modality && a.slug !== b.slug
            ? "Same behavioral strategy — competing for the same role"
            : "Different decision-making tempos",
          dist === 3 ? "Square between signs: friction that either breaks or tempers" : "Different love languages — you'll have to learn each other's",
        ]
      : [
          a.modality === b.modality && a.slug !== b.slug
            ? "Одинаковая стратегия поведения — конкуренция за одну и ту же роль"
            : "Разный темп принятия решений",
          dist === 3 ? "Квадратура знаков: трение, которое либо разрушает, либо закаляет" : "Разные языки любви — их придётся выучить",
        ];

  return { a, b, score, headline, paragraph, strengths, frictions };
}

/** Все 78 уникальных пар (включая одинаковые знаки) для generateStaticParams. */
export function allPairs(): { pair: string }[] {
  const out: { pair: string }[] = [];
  for (let i = 0; i < SIGNS.length; i++) {
    for (let j = i; j < SIGNS.length; j++) {
      out.push({ pair: `${SIGNS[i].slug}-${SIGNS[j].slug}` });
    }
  }
  return out;
}

export function parsePair(pair: string): [string, string] | null {
  const parts = pair.split("-");
  if (parts.length !== 2) return null;
  return [parts[0], parts[1]];
}

/** Канонический слаг пары (алфавит внутри порядка SIGNS). */
export function canonicalPair(slugA: string, slugB: string): string {
  const ia = SIGNS.findIndex((s) => s.slug === slugA);
  const ib = SIGNS.findIndex((s) => s.slug === slugB);
  return ia <= ib ? `${slugA}-${slugB}` : `${slugB}-${slugA}`;
}

/** 6–8 смежных пар для перелинковки (ТЗ §4). */
export function relatedPairs(slugA: string, slugB: string): { pair: string; title: string }[] {
  const rel: { pair: string; title: string }[] = [];
  const seen = new Set<string>([canonicalPair(slugA, slugB)]);
  const push = (x: string, y: string) => {
    const p = canonicalPair(x, y);
    if (seen.has(p)) return;
    seen.add(p);
    const [s1, s2] = p.split("-");
    rel.push({
      pair: p,
      title: `${signBySlug(s1)!.ru} и ${signBySlug(s2)!.ru}`,
    });
  };
  const ia = SIGNS.findIndex((s) => s.slug === slugA);
  const ib = SIGNS.findIndex((s) => s.slug === slugB);
  for (const off of [1, -1, 6, 4]) {
    push(SIGNS[(ia + off + 12) % 12].slug, slugB);
    push(slugA, SIGNS[(ib + off + 12) % 12].slug);
  }
  return rel.slice(0, 8);
}
