export type Element = "fire" | "earth" | "air" | "water";
export type Modality = "cardinal" | "fixed" | "mutable";

export interface Sign {
  slug: string;
  ru: string;
  ruGen: string; // родительный падеж: «гороскоп Овна»
  ruPlural: string; // «для всех Овнов»
  symbol: string;
  dates: string;
  element: Element;
  modality: Modality;
  ruler: string;
  traits: string[];
  keyword: string;
  en: { name: string; dates: string; traits: [string, string, string]; keyword: string; ruler: string };
}

export const ELEMENT_RU: Record<Element, string> = {
  fire: "Огонь",
  earth: "Земля",
  air: "Воздух",
  water: "Вода",
};

export const SIGNS: Sign[] = [
  { slug: "aries", ru: "Овен", ruGen: "Овна", ruPlural: "Овнов", symbol: "♈", dates: "21 марта — 19 апреля", element: "fire", modality: "cardinal", ruler: "Марс", traits: ["инициатива", "прямота", "азарт"], keyword: "импульс", en: { name: "Aries", dates: "Mar 21 \u2014 Apr 19", traits: ["initiative", "directness", "drive"], keyword: "impulse", ruler: "Mars" } },
  { slug: "taurus", ru: "Телец", ruGen: "Тельца", ruPlural: "Тельцов", symbol: "♉", dates: "20 апреля — 20 мая", element: "earth", modality: "fixed", ruler: "Венера", traits: ["устойчивость", "чувственность", "практичность"], keyword: "опора", en: { name: "Taurus", dates: "Apr 20 \u2014 May 20", traits: ["steadiness", "sensuality", "practicality"], keyword: "stability", ruler: "Venus" } },
  { slug: "gemini", ru: "Близнецы", ruGen: "Близнецов", ruPlural: "Близнецов", symbol: "♊", dates: "21 мая — 20 июня", element: "air", modality: "mutable", ruler: "Меркурий", traits: ["любопытство", "лёгкость", "коммуникация"], keyword: "связи", en: { name: "Gemini", dates: "May 21 \u2014 Jun 20", traits: ["curiosity", "wit", "adaptability"], keyword: "connection", ruler: "Mercury" } },
  { slug: "cancer", ru: "Рак", ruGen: "Рака", ruPlural: "Раков", symbol: "♋", dates: "21 июня — 22 июля", element: "water", modality: "cardinal", ruler: "Луна", traits: ["эмпатия", "память", "забота"], keyword: "дом", en: { name: "Cancer", dates: "Jun 21 \u2014 Jul 22", traits: ["care", "memory", "intuition"], keyword: "belonging", ruler: "Moon" } },
  { slug: "leo", ru: "Лев", ruGen: "Льва", ruPlural: "Львов", symbol: "♌", dates: "23 июля — 22 августа", element: "fire", modality: "fixed", ruler: "Солнце", traits: ["харизма", "щедрость", "творчество"], keyword: "сцена", en: { name: "Leo", dates: "Jul 23 \u2014 Aug 22", traits: ["generosity", "confidence", "creativity"], keyword: "radiance", ruler: "Sun" } },
  { slug: "virgo", ru: "Дева", ruGen: "Девы", ruPlural: "Дев", symbol: "♍", dates: "23 августа — 22 сентября", element: "earth", modality: "mutable", ruler: "Меркурий", traits: ["анализ", "польза", "точность"], keyword: "порядок", en: { name: "Virgo", dates: "Aug 23 \u2014 Sep 22", traits: ["precision", "service", "analysis"], keyword: "mastery", ruler: "Mercury" } },
  { slug: "libra", ru: "Весы", ruGen: "Весов", ruPlural: "Весов", symbol: "♎", dates: "23 сентября — 22 октября", element: "air", modality: "cardinal", ruler: "Венера", traits: ["баланс", "эстетика", "дипломатия"], keyword: "гармония", en: { name: "Libra", dates: "Sep 23 \u2014 Oct 22", traits: ["diplomacy", "taste", "fairness"], keyword: "balance", ruler: "Venus" } },
  { slug: "scorpio", ru: "Скорпион", ruGen: "Скорпиона", ruPlural: "Скорпионов", symbol: "♏", dates: "23 октября — 21 ноября", element: "water", modality: "fixed", ruler: "Плутон", traits: ["глубина", "воля", "трансформация"], keyword: "интенсивность", en: { name: "Scorpio", dates: "Oct 23 \u2014 Nov 21", traits: ["depth", "willpower", "transformation"], keyword: "intensity", ruler: "Pluto" } },
  { slug: "sagittarius", ru: "Стрелец", ruGen: "Стрельца", ruPlural: "Стрельцов", symbol: "♐", dates: "22 ноября — 21 декабря", element: "fire", modality: "mutable", ruler: "Юпитер", traits: ["свобода", "оптимизм", "смысл"], keyword: "горизонт", en: { name: "Sagittarius", dates: "Nov 22 \u2014 Dec 21", traits: ["freedom", "honesty", "optimism"], keyword: "meaning", ruler: "Jupiter" } },
  { slug: "capricorn", ru: "Козерог", ruGen: "Козерога", ruPlural: "Козерогов", symbol: "♑", dates: "22 декабря — 19 января", element: "earth", modality: "cardinal", ruler: "Сатурн", traits: ["дисциплина", "стратегия", "выдержка"], keyword: "вершина", en: { name: "Capricorn", dates: "Dec 22 \u2014 Jan 19", traits: ["discipline", "ambition", "endurance"], keyword: "structure", ruler: "Saturn" } },
  { slug: "aquarius", ru: "Водолей", ruGen: "Водолея", ruPlural: "Водолеев", symbol: "♒", dates: "20 января — 18 февраля", element: "air", modality: "fixed", ruler: "Уран", traits: ["независимость", "идеи", "будущее"], keyword: "свобода", en: { name: "Aquarius", dates: "Jan 20 \u2014 Feb 18", traits: ["independence", "vision", "friendship"], keyword: "future", ruler: "Uranus" } },
  { slug: "pisces", ru: "Рыбы", ruGen: "Рыб", ruPlural: "Рыб", symbol: "♓", dates: "19 февраля — 20 марта", element: "water", modality: "mutable", ruler: "Нептун", traits: ["воображение", "сострадание", "интуиция"], keyword: "поток", en: { name: "Pisces", dates: "Feb 19 \u2014 Mar 20", traits: ["empathy", "imagination", "flow"], keyword: "compassion", ruler: "Neptune" } },
];

export function signBySlug(slug: string): Sign | undefined {
  return SIGNS.find((s) => s.slug === slug);
}

/** Знак по эклиптической долготе (0° = Овен). */
export function signByLongitude(lon: number): Sign {
  const idx = Math.floor((((lon % 360) + 360) % 360) / 30);
  return SIGNS[idx];
}

export const ELEMENT_EN: Record<Element, string> = { fire: "Fire", earth: "Earth", air: "Air", water: "Water" };
