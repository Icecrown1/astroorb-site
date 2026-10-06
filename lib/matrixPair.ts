/**
 * Совместимость по матрице судьбы (матрица пары).
 *
 * Канон — тот же, что в приложении AstroOrbi (shared/matrix.ts):
 * личная матрица A/B/C/D/E + родовой квадрат + каналы + хвост;
 * матрица пары = одноимённые позиции двух матриц, сложенные и приведённые к 1–22.
 * Центр пары = reduce(центр₁ + центр₂). Результат на сайте совпадает с приложением.
 */

export function reduce22(n: number): number {
  while (n > 22) {
    n = String(n)
      .split("")
      .reduce((s, d) => s + Number(d), 0);
  }
  return n;
}

export interface PairCore {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  rodTL: number;
  rodTR: number;
  rodBR: number;
  rodBL: number;
  sky: number;
  earth: number;
  personalPurpose: number;
  socialPurpose: number;
  moneyEntry: number;
  loveEntry: number;
  tailG: number;
  tailR: number;
  tailS: number;
}

const digitSum = (n: number) =>
  String(n)
    .split("")
    .reduce((s, d) => s + Number(d), 0);

/** Личная матрица по дате рождения (YYYY-MM-DD). */
export function personalCore(iso: string): PairCore | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const year = +m[1];
  const month = +m[2];
  const day = +m[3];
  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) return null;

  const a = reduce22(day);
  const b = reduce22(month);
  const c = reduce22(digitSum(year));
  const d = reduce22(a + b + c);
  const e = reduce22(a + b + c + d);
  const rodTL = reduce22(a + b);
  const rodTR = reduce22(b + c);
  const rodBR = reduce22(c + d);
  const rodBL = reduce22(d + a);
  const sky = reduce22(b + d);
  const earth = reduce22(a + c);
  const personalPurpose = reduce22(sky + earth);
  const maleLine = reduce22(rodTL + rodBR);
  const femaleLine = reduce22(rodTR + rodBL);
  const socialPurpose = reduce22(maleLine + femaleLine);
  const moneyEntry = reduce22(e + rodBR);
  const loveEntry = reduce22(e + rodBL);
  const tailG = d;
  const tailR = reduce22(tailG + e);
  const tailS = reduce22(tailG + tailR);
  return {
    a, b, c, d, e,
    rodTL, rodTR, rodBR, rodBL,
    sky, earth,
    personalPurpose, socialPurpose,
    moneyEntry, loveEntry,
    tailG, tailR, tailS,
  };
}

/** Матрица пары: сумма одноимённых позиций, приведённая к 1–22. */
export function pairCore(p: PairCore, q: PairCore): PairCore {
  const out = {} as PairCore;
  (Object.keys(p) as (keyof PairCore)[]).forEach((k) => {
    out[k] = reduce22(p[k] + q[k]);
  });
  return out;
}

export type PairZoneId = "essence" | "love" | "money" | "tail" | "purpose";

type L = { ru: string; en: string };

export const PAIR_ZONES: { id: PairZoneId; title: L; about: L; roles: L[]; pick: (c: PairCore) => number[] }[] = [
  {
    id: "essence",
    title: { ru: "Суть союза", en: "The core of your bond" },
    about: {
      ru: "Центр пары, левая (день) и верхняя (месяц) точки: на чём держится союз, каким вас видят со стороны и что тянет друг к другу.",
      en: "The couple center plus the left (day) and top (month) points: what holds you together, how others see you and what draws you to each other.",
    },
    roles: [
      { ru: "центр пары", en: "couple center" },
      { ru: "как вас видят", en: "how others see you" },
      { ru: "притяжение", en: "attraction" },
    ],
    pick: (c) => [c.e, c.a, c.b],
  },
  {
    id: "love",
    title: { ru: "Отношения и быт", en: "Love and everyday life" },
    about: {
      ru: "Точка входа в отношения и угол родового квадрата: как вы проявляете чувства, делите дом и выходите из ссор.",
      en: "The relationship entry point and the relationship corner of the ancestral square: how you show affection, share a home and get over fights.",
    },
    roles: [
      { ru: "вход в отношения", en: "relationship entry" },
      { ru: "общие сценарии", en: "shared patterns" },
    ],
    pick: (c) => [c.loveEntry, c.rodBL],
  },
  {
    id: "money",
    title: { ru: "Деньги пары", en: "Money as a couple" },
    about: {
      ru: "Точка входа в деньги, материальная задача и денежный угол: как вы вместе зарабатываете, тратите и договариваетесь о бюджете.",
      en: "The money entry point, the material task and the money corner: how you earn, spend and agree on a budget together.",
    },
    roles: [
      { ru: "вход в деньги", en: "money entry" },
      { ru: "материальная задача", en: "material task" },
      { ru: "траты и накопления", en: "spending and saving" },
    ],
    pick: (c) => [c.moneyEntry, c.c, c.rodBR],
  },
  {
    id: "tail",
    title: { ru: "Кармический хвост пары", en: "The couple's karmic tail" },
    about: {
      ru: "Три нижние точки: что каждый принёс из прошлого опыта, как это всплывает в вашей паре и какой урок вы проходите вместе.",
      en: "The three lower points: what each of you brings from past experience, how it surfaces between you and the lesson you share.",
    },
    roles: [
      { ru: "прошлый опыт", en: "past experience" },
      { ru: "как проявляется", en: "how it shows up" },
      { ru: "общий урок", en: "shared lesson" },
    ],
    pick: (c) => [c.tailG, c.tailR, c.tailS],
  },
  {
    id: "purpose",
    title: { ru: "Задача пары", en: "Your purpose as a couple" },
    about: {
      ru: "Личное и социальное предназначение пары: что вы даёте друг другу и что ваш союз приносит семье и окружающим.",
      en: "The couple's personal and social purpose: what you give each other and what your bond brings to family and others.",
    },
    roles: [
      { ru: "друг для друга", en: "for each other" },
      { ru: "для семьи и окружения", en: "for family and others" },
    ],
    pick: (c) => [c.personalPurpose, c.socialPurpose],
  },
];

/** Центр пары: короткое описание для каждого из 22 арканов (собственные тексты AstroOrbi). */
export const PAIR_CENTER: Record<number, L> = {
  1: {
    ru: "Пара-стартап: идеи у вас быстро превращаются в дела — ремонт, переезд или общий проект запускаются за одни выходные. Риск — соревноваться, кто главный, и бросать начатое, когда пропадает азарт.",
    en: "A start-up couple: ideas quickly turn into action — a renovation, a move or a joint project gets launched in a single weekend. The risk: competing over who's in charge and dropping things once the excitement fades.",
  },
  2: {
    ru: "Союз тихого понимания: вы считываете настроение друг друга без слов и бережёте общие секреты. Риск — копить недосказанность и ждать, что партнёр догадается сам.",
    en: "A bond of quiet understanding: you read each other's mood without words and keep your shared secrets. The risk: letting things go unsaid and expecting your partner to guess.",
  },
  3: {
    ru: "Пара, которая создаёт дом: вкусная еда, красивый быт, дети, животные, растения. Риск — раствориться в заботе о хозяйстве и тратить больше, чем позволяет бюджет.",
    en: "A couple that builds a home: good food, a beautiful space, children, pets, plants. The risk: disappearing into running the household and spending more than the budget allows.",
  },
  4: {
    ru: "Союз-крепость: у вас всё по плану — бюджет, отпуск, ремонт — и вы надёжная опора друг для друга. Риск — спорить за контроль и говорить друг с другом приказным тоном.",
    en: "A fortress couple: everything runs to plan — budget, holidays, renovation — and you are each other's solid support. The risk: fighting for control and talking to each other in orders.",
  },
  5: {
    ru: "Пара с традициями: семейные праздники, общие ценности, вы многому учите друг друга. Риск — поучать партнёра и спорить о том, «как правильно».",
    en: "A couple with traditions: family celebrations, shared values, and you learn a lot from each other. The risk: lecturing your partner and arguing about 'the right way' to do things.",
  },
  6: {
    ru: "Союз, построенный на чувствах и выборе: вы много разговариваете, любите красивые вещи и общую компанию друзей. Риск — сомневаться, «тот ли это человек», и ревновать к чужому вниманию.",
    en: "A bond built on feelings and choice: you talk a lot and love beautiful things and a shared circle of friends. The risk: doubting whether this is 'the one' and getting jealous of other people's attention.",
  },
  7: {
    ru: "Пара в движении: поездки, переезды, карьерные рывки — вместе вы быстро идёте к цели. Риск — жить на бегу и не останавливаться, чтобы поговорить о чувствах.",
    en: "A couple on the move: trips, relocations, career leaps — together you move fast toward your goals. The risk: always being on the go and never stopping to talk about feelings.",
  },
  8: {
    ru: "Союз честных договорённостей: вы делите обязанности и деньги по-взрослому и держите слово. Риск — вести счёт, кто сколько сделал, и превращать ссоры в разбирательство.",
    en: "A bond of fair agreements: you split chores and money like adults and keep your word. The risk: keeping score of who did what and turning arguments into a trial.",
  },
  9: {
    ru: "Пара, которой хорошо вдвоём без толпы: тихие вечера, долгие разговоры, общее увлечение. Риск — закрыться от мира и разойтись по разным комнатам вместо разговора.",
    en: "A couple happy on their own: quiet evenings, long talks, a shared hobby. The risk: shutting the world out and retreating to separate rooms instead of talking.",
  },
  10: {
    ru: "Союз перемен и удачных совпадений: вы легко ловите шансы — новая работа, внезапная поездка, выгодное предложение. Риск — жить от случая к случаю и ничего не планировать.",
    en: "A bond of change and lucky timing: you catch opportunities easily — a new job, a spontaneous trip, a good offer. The risk: living from one chance to the next and planning nothing.",
  },
  11: {
    ru: "Страстная и выносливая пара: вы вытаскиваете друг друга из трудностей и многое делаете вместе физически — спорт, походы, стройка. Риск — бурные ссоры и борьба характеров.",
    en: "A passionate, resilient couple: you pull each other through hard times and do a lot together physically — sport, hiking, building things. The risk: stormy fights and a clash of wills.",
  },
  12: {
    ru: "Союз с нестандартным взглядом: вы живёте не «как все» и поддерживаете необычные идеи друг друга. Риск — жертвовать собой ради партнёра и молча ждать благодарности.",
    en: "A bond with an unusual outlook: you don't live 'like everyone else' and back each other's offbeat ideas. The risk: sacrificing yourself for your partner and silently waiting for gratitude.",
  },
  13: {
    ru: "Пара, которая проходит через перемены вместе: переезды, смену профессий и кризисы вы переживаете вдвоём и выходите из них другими. Риск — держаться за отжившее или рубить сгоряча.",
    en: "A couple that goes through change together: you weather moves, career switches and crises side by side and come out changed. The risk: clinging to what's over or cutting ties in the heat of the moment.",
  },
  14: {
    ru: "Союз спокойствия и меры: с вами двумя легко, вы умеете мириться и находить середину. Риск — обходить острые темы и копить невысказанное ради мира в доме.",
    en: "A bond of calm and balance: you're easy to be around, you make up quickly and find the middle ground. The risk: avoiding sharp topics and bottling things up to keep the peace.",
  },
  15: {
    ru: "Сильное притяжение и общий вкус к деньгам и удовольствиям: вместе вы умеете зарабатывать и наслаждаться жизнью. Риск — зависимость друг от друга, ревность и попытки управлять партнёром.",
    en: "Strong attraction and a shared taste for money and pleasure: together you know how to earn and enjoy life. The risk: dependence on each other, jealousy and trying to control your partner.",
  },
  16: {
    ru: "Пара-строители: вы вместе строите дом, бизнес и планы — и так же решительно ломаете то, что не работает. Риск — внезапные взрывы и ссоры с хлопаньем дверью.",
    en: "A builder couple: together you build a home, a business, plans — and tear down just as decisively whatever doesn't work. The risk: sudden blow-ups and door-slamming fights.",
  },
  17: {
    ru: "Вдохновляющий союз: вы верите в мечты друг друга, вместе творите, вами любуются со стороны. Риск — жить красивой картинкой для других и стесняться настоящих проблем.",
    en: "An inspiring bond: you believe in each other's dreams, create together, and people admire you from the outside. The risk: living for appearances and feeling ashamed of real problems.",
  },
  18: {
    ru: "Союз глубоких чувств: вы чувствуете друг друга на расстоянии, у вас свой мир со своими шутками и ритуалами. Риск — домыслы и подозрения вместо прямого вопроса.",
    en: "A bond of deep feeling: you sense each other from a distance and have your own world of jokes and rituals. The risk: guessing and suspicion instead of simply asking.",
  },
  19: {
    ru: "Солнечная пара: вокруг вас всегда люди, праздники, дети и смех, вы щедры друг к другу. Риск — соревноваться за внимание и не замечать, что партнёр устал.",
    en: "A sunny couple: you're always surrounded by people, celebrations, children and laughter, and you're generous with each other. The risk: competing for attention and missing that your partner is tired.",
  },
  20: {
    ru: "Союз, тесно связанный с семьёй: вы объединяете родственников и часто становитесь центром большой семьи. Риск — вмешательство родных и жизнь по семейным сценариям вместо своих.",
    en: "A bond closely tied to family: you bring relatives together and often become the center of a big family. The risk: relatives interfering and living by family scripts instead of your own.",
  },
  21: {
    ru: "Пара широкого горизонта: путешествия, переезды, друзья из разных стран и большие общие планы. Риск — распыляться и откладывать завершение важных дел на потом.",
    en: "A couple with wide horizons: travel, relocations, friends from different countries and big shared plans. The risk: spreading yourselves thin and putting off finishing what matters.",
  },
  22: {
    ru: "Лёгкий и игривый союз: с вами весело, вы легки на подъём и не боитесь начинать заново. Риск — несерьёзное отношение к деньгам и обещаниям там, где пора повзрослеть вместе.",
    en: "A light, playful bond: you're fun to be around, always up for something new and unafraid to start over. The risk: not taking money and promises seriously when it's time to grow up together.",
  },
};
