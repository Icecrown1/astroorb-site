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
}

export const ELEMENT_RU: Record<Element, string> = {
  fire: "Огонь",
  earth: "Земля",
  air: "Воздух",
  water: "Вода",
};

export const SIGNS: Sign[] = [
  { slug: "aries", ru: "Овен", ruGen: "Овна", ruPlural: "Овнов", symbol: "♈", dates: "21 марта — 19 апреля", element: "fire", modality: "cardinal", ruler: "Марс", traits: ["инициатива", "прямота", "азарт"], keyword: "импульс" },
  { slug: "taurus", ru: "Телец", ruGen: "Тельца", ruPlural: "Тельцов", symbol: "♉", dates: "20 апреля — 20 мая", element: "earth", modality: "fixed", ruler: "Венера", traits: ["устойчивость", "чувственность", "практичность"], keyword: "опора" },
  { slug: "gemini", ru: "Близнецы", ruGen: "Близнецов", ruPlural: "Близнецов", symbol: "♊", dates: "21 мая — 20 июня", element: "air", modality: "mutable", ruler: "Меркурий", traits: ["любопытство", "лёгкость", "коммуникация"], keyword: "связи" },
  { slug: "cancer", ru: "Рак", ruGen: "Рака", ruPlural: "Раков", symbol: "♋", dates: "21 июня — 22 июля", element: "water", modality: "cardinal", ruler: "Луна", traits: ["эмпатия", "память", "забота"], keyword: "дом" },
  { slug: "leo", ru: "Лев", ruGen: "Льва", ruPlural: "Львов", symbol: "♌", dates: "23 июля — 22 августа", element: "fire", modality: "fixed", ruler: "Солнце", traits: ["харизма", "щедрость", "творчество"], keyword: "сцена" },
  { slug: "virgo", ru: "Дева", ruGen: "Девы", ruPlural: "Дев", symbol: "♍", dates: "23 августа — 22 сентября", element: "earth", modality: "mutable", ruler: "Меркурий", traits: ["анализ", "польза", "точность"], keyword: "порядок" },
  { slug: "libra", ru: "Весы", ruGen: "Весов", ruPlural: "Весов", symbol: "♎", dates: "23 сентября — 22 октября", element: "air", modality: "cardinal", ruler: "Венера", traits: ["баланс", "эстетика", "дипломатия"], keyword: "гармония" },
  { slug: "scorpio", ru: "Скорпион", ruGen: "Скорпиона", ruPlural: "Скорпионов", symbol: "♏", dates: "23 октября — 21 ноября", element: "water", modality: "fixed", ruler: "Плутон", traits: ["глубина", "воля", "трансформация"], keyword: "интенсивность" },
  { slug: "sagittarius", ru: "Стрелец", ruGen: "Стрельца", ruPlural: "Стрельцов", symbol: "♐", dates: "22 ноября — 21 декабря", element: "fire", modality: "mutable", ruler: "Юпитер", traits: ["свобода", "оптимизм", "смысл"], keyword: "горизонт" },
  { slug: "capricorn", ru: "Козерог", ruGen: "Козерога", ruPlural: "Козерогов", symbol: "♑", dates: "22 декабря — 19 января", element: "earth", modality: "cardinal", ruler: "Сатурн", traits: ["дисциплина", "стратегия", "выдержка"], keyword: "вершина" },
  { slug: "aquarius", ru: "Водолей", ruGen: "Водолея", ruPlural: "Водолеев", symbol: "♒", dates: "20 января — 18 февраля", element: "air", modality: "fixed", ruler: "Уран", traits: ["независимость", "идеи", "будущее"], keyword: "свобода" },
  { slug: "pisces", ru: "Рыбы", ruGen: "Рыб", ruPlural: "Рыб", symbol: "♓", dates: "19 февраля — 20 марта", element: "water", modality: "mutable", ruler: "Нептун", traits: ["воображение", "сострадание", "интуиция"], keyword: "поток" },
];

export function signBySlug(slug: string): Sign | undefined {
  return SIGNS.find((s) => s.slug === slug);
}

/** Знак по эклиптической долготе (0° = Овен). */
export function signByLongitude(lon: number): Sign {
  const idx = Math.floor((((lon % 360) + 360) % 360) / 30);
  return SIGNS[idx];
}
