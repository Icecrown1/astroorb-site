/**
 * Колода Таро для «Карты дня» на сайте (78 карт, Райдер-Уэйт-Смит).
 * Данные — копия shared/tarot.ts приложения (только то, что нужно сайту).
 * Картинки: public/tarot/<id>.webp (те же, что в приложении).
 */

export type TarotSuit = "major" | "wands" | "cups" | "swords" | "pentacles";

export interface DeckCard {
  id: string;
  suit: TarotSuit;
  nameRu: string;
  /** Ключевые слова прямого значения */
  kw: string;
}

export const DECK: DeckCard[] = [
  { id: "fool", suit: "major", nameRu: "Шут", kw: "начало, свобода, вера, спонтанность" },
  { id: "magician", suit: "major", nameRu: "Маг", kw: "воля, мастерство, манифестация" },
  { id: "high-priestess", suit: "major", nameRu: "Верховная Жрица", kw: "интуиция, тайна, внутреннее знание" },
  { id: "empress", suit: "major", nameRu: "Императрица", kw: "изобилие, забота, творчество" },
  { id: "emperor", suit: "major", nameRu: "Император", kw: "структура, порядок, ответственность" },
  { id: "hierophant", suit: "major", nameRu: "Иерофант", kw: "традиция, обучение, наставник" },
  { id: "lovers", suit: "major", nameRu: "Влюблённые", kw: "выбор сердца, союз, гармония" },
  { id: "chariot", suit: "major", nameRu: "Колесница", kw: "воля к победе, движение, контроль" },
  { id: "strength", suit: "major", nameRu: "Сила", kw: "мягкая сила, терпение, смелость" },
  { id: "hermit", suit: "major", nameRu: "Отшельник", kw: "поиск смысла, уединение, мудрость" },
  { id: "wheel-of-fortune", suit: "major", nameRu: "Колесо Фортуны", kw: "поворот судьбы, циклы, шанс" },
  { id: "justice", suit: "major", nameRu: "Справедливость", kw: "честность, баланс, последствия" },
  { id: "hanged-man", suit: "major", nameRu: "Повешенный", kw: "пауза, новый взгляд, принятие" },
  { id: "death", suit: "major", nameRu: "Смерть", kw: "трансформация, завершение, обновление" },
  { id: "temperance", suit: "major", nameRu: "Умеренность", kw: "баланс, исцеление, терпение" },
  { id: "devil", suit: "major", nameRu: "Дьявол", kw: "привязанности, зависимость, теневое" },
  { id: "tower", suit: "major", nameRu: "Башня", kw: "внезапное разрушение иллюзий, прорыв" },
  { id: "star", suit: "major", nameRu: "Звезда", kw: "надежда, вдохновение, исцеление" },
  { id: "moon", suit: "major", nameRu: "Луна", kw: "иллюзии, подсознание, тревога" },
  { id: "sun", suit: "major", nameRu: "Солнце", kw: "радость, успех, ясность" },
  { id: "judgement", suit: "major", nameRu: "Суд", kw: "пробуждение, переоценка, призвание" },
  { id: "world", suit: "major", nameRu: "Мир", kw: "завершение цикла, целостность, итог" },
  { id: "ace-of-wands", suit: "wands", nameRu: "Туз Жезлов", kw: "новая искра, вдохновение, старт" },
  { id: "two-of-wands", suit: "wands", nameRu: "Двойка Жезлов", kw: "планирование, выбор пути, амбиции" },
  { id: "three-of-wands", suit: "wands", nameRu: "Тройка Жезлов", kw: "расширение, первые результаты" },
  { id: "four-of-wands", suit: "wands", nameRu: "Четвёрка Жезлов", kw: "праздник, дом, стабильная база" },
  { id: "five-of-wands", suit: "wands", nameRu: "Пятёрка Жезлов", kw: "конкуренция, спор, тренировка" },
  { id: "six-of-wands", suit: "wands", nameRu: "Шестёрка Жезлов", kw: "победа, признание, успех" },
  { id: "seven-of-wands", suit: "wands", nameRu: "Семёрка Жезлов", kw: "оборона позиции, стойкость" },
  { id: "eight-of-wands", suit: "wands", nameRu: "Восьмёрка Жезлов", kw: "скорость, новости, движение" },
  { id: "nine-of-wands", suit: "wands", nameRu: "Девятка Жезлов", kw: "последний рубеж, выдержка" },
  { id: "ten-of-wands", suit: "wands", nameRu: "Десятка Жезлов", kw: "перегруз, ноша успеха" },
  { id: "page-of-wands", suit: "wands", nameRu: "Паж Жезлов", kw: "энтузиазм ученика, весть о деле" },
  { id: "knight-of-wands", suit: "wands", nameRu: "Рыцарь Жезлов", kw: "напор, страсть, приключение" },
  { id: "queen-of-wands", suit: "wands", nameRu: "Королева Жезлов", kw: "харизма, уверенность, тепло" },
  { id: "king-of-wands", suit: "wands", nameRu: "Король Жезлов", kw: "лидерство, видение, предприниматель" },
  { id: "ace-of-cups", suit: "cups", nameRu: "Туз Кубков", kw: "новое чувство, открытое сердце" },
  { id: "two-of-cups", suit: "cups", nameRu: "Двойка Кубков", kw: "взаимность, союз двоих" },
  { id: "three-of-cups", suit: "cups", nameRu: "Тройка Кубков", kw: "дружба, праздник, поддержка" },
  { id: "four-of-cups", suit: "cups", nameRu: "Четвёрка Кубков", kw: "апатия, упущенный шанс рядом" },
  { id: "five-of-cups", suit: "cups", nameRu: "Пятёрка Кубков", kw: "утрата, сожаление, траур" },
  { id: "six-of-cups", suit: "cups", nameRu: "Шестёрка Кубков", kw: "ностальгия, детство, подарок" },
  { id: "seven-of-cups", suit: "cups", nameRu: "Семёрка Кубков", kw: "иллюзии выбора, мечты" },
  { id: "eight-of-cups", suit: "cups", nameRu: "Восьмёрка Кубков", kw: "уход от достигнутого, поиск большего" },
  { id: "nine-of-cups", suit: "cups", nameRu: "Девятка Кубков", kw: "исполнение желания, довольство" },
  { id: "ten-of-cups", suit: "cups", nameRu: "Десятка Кубков", kw: "семейное счастье, гармония" },
  { id: "page-of-cups", suit: "cups", nameRu: "Паж Кубков", kw: "весть о чувствах, творческий импульс" },
  { id: "knight-of-cups", suit: "cups", nameRu: "Рыцарь Кубков", kw: "романтика, предложение, шарм" },
  { id: "queen-of-cups", suit: "cups", nameRu: "Королева Кубков", kw: "эмпатия, забота, глубина" },
  { id: "king-of-cups", suit: "cups", nameRu: "Король Кубков", kw: "эмоциональная зрелость, спокойствие" },
  { id: "ace-of-swords", suit: "swords", nameRu: "Туз Мечей", kw: "ясность, прорыв истины, решение" },
  { id: "two-of-swords", suit: "swords", nameRu: "Двойка Мечей", kw: "тупик, отложенный выбор" },
  { id: "three-of-swords", suit: "swords", nameRu: "Тройка Мечей", kw: "боль сердца, разрыв, горе" },
  { id: "four-of-swords", suit: "swords", nameRu: "Четвёрка Мечей", kw: "отдых, восстановление, пауза" },
  { id: "five-of-swords", suit: "swords", nameRu: "Пятёрка Мечей", kw: "победа любой ценой, конфликт" },
  { id: "six-of-swords", suit: "swords", nameRu: "Шестёрка Мечей", kw: "переход к спокойствию, отъезд" },
  { id: "seven-of-swords", suit: "swords", nameRu: "Семёрка Мечей", kw: "хитрость, обход, недосказанность" },
  { id: "eight-of-swords", suit: "swords", nameRu: "Восьмёрка Мечей", kw: "самоограничение, мнимый плен" },
  { id: "nine-of-swords", suit: "swords", nameRu: "Девятка Мечей", kw: "тревога, бессонница, вина" },
  { id: "ten-of-swords", suit: "swords", nameRu: "Десятка Мечей", kw: "дно цикла, завершение, рассвет далее" },
  { id: "page-of-swords", suit: "swords", nameRu: "Паж Мечей", kw: "любопытство, наблюдение, весть" },
  { id: "knight-of-swords", suit: "swords", nameRu: "Рыцарь Мечей", kw: "стремительное решение, натиск" },
  { id: "queen-of-swords", suit: "swords", nameRu: "Королева Мечей", kw: "ясный ум, прямота, независимость" },
  { id: "king-of-swords", suit: "swords", nameRu: "Король Мечей", kw: "логика, закон, беспристрастность" },
  { id: "ace-of-pentacles", suit: "pentacles", nameRu: "Туз Пентаклей", kw: "новая возможность, семя достатка" },
  { id: "two-of-pentacles", suit: "pentacles", nameRu: "Двойка Пентаклей", kw: "баланс дел, гибкость, жонглирование" },
  { id: "three-of-pentacles", suit: "pentacles", nameRu: "Тройка Пентаклей", kw: "мастерство, команда, признание" },
  { id: "four-of-pentacles", suit: "pentacles", nameRu: "Четвёрка Пентаклей", kw: "сбережение, контроль, устойчивость" },
  { id: "five-of-pentacles", suit: "pentacles", nameRu: "Пятёрка Пентаклей", kw: "нужда, полоса лишений" },
  { id: "six-of-pentacles", suit: "pentacles", nameRu: "Шестёрка Пентаклей", kw: "щедрость, помощь, обмен" },
  { id: "seven-of-pentacles", suit: "pentacles", nameRu: "Семёрка Пентаклей", kw: "терпение, оценка урожая" },
  { id: "eight-of-pentacles", suit: "pentacles", nameRu: "Восьмёрка Пентаклей", kw: "ремесло, оттачивание, усердие" },
  { id: "nine-of-pentacles", suit: "pentacles", nameRu: "Девятка Пентаклей", kw: "самодостаточность, заслуженный комфорт" },
  { id: "ten-of-pentacles", suit: "pentacles", nameRu: "Десятка Пентаклей", kw: "наследие, род, богатство семьи" },
  { id: "page-of-pentacles", suit: "pentacles", nameRu: "Паж Пентаклей", kw: "ученичество, новая профессия" },
  { id: "knight-of-pentacles", suit: "pentacles", nameRu: "Рыцарь Пентаклей", kw: "методичность, надёжность" },
  { id: "queen-of-pentacles", suit: "pentacles", nameRu: "Королева Пентаклей", kw: "практичная забота, уют, ресурс" },
  { id: "king-of-pentacles", suit: "pentacles", nameRu: "Король Пентаклей", kw: "достаток, зрелый успех, щедрый итог" },
];

export const cardById = (id: string) => DECK.find((c) => c.id === id);

export const SUIT_RU: Record<TarotSuit, string> = { major: "Старший аркан", wands: "Жезлы", cups: "Кубки", swords: "Мечи", pentacles: "Пентакли" };
