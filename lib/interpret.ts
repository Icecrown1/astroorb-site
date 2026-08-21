import type { Element, Sign } from "@/lib/zodiac";
import type { Locale } from "@/lib/i18n";

/**
 * Мини-разбор натальной карты: авторские тексты по знакам.
 * Детерминированный (без AI) — сознательно: мгновенно, бесплатно, офлайн.
 * Полные интерпретации по домам и аспектам — в Mini App.
 */

const SUN: Record<string, string> = {
  aries: "Солнце в Овне — характер первопроходца: решение принимается быстро, действие идёт раньше сомнений. Такому человеку легче начать и поправить по ходу, чем долго готовиться; энергия вспыхивает ярко и требует настоящих вызовов, иначе превращается в раздражительность.",
  taurus: "Солнце в Тельце — характер, который строится на устойчивости: важно, чтобы результат можно было потрогать, а завтрашний день — предсказать. Решения принимаются небыстро, но от принятого Телец не отступает; упрямство здесь — обратная сторона редкой надёжности.",
  gemini: "Солнце в Близнецах — ум, которому нужно движение: два дела сразу, три разговора, новая тема каждую неделю. Сила — в скорости соображения и лёгкости контакта; слабое место — доводить до конца то, что уже перестало быть интересным.",
  cancer: "Солнце в Раке — характер, где главные решения принимаются чувствами, даже если снаружи это выглядит рационально. Огромная сила заботы и памяти: Рак держит семью, команду, историю. Но сначала ему самому нужно чувствовать себя в безопасности.",
  leo: "Солнце во Льве — характер с внутренним прожектором: что бы Лев ни делал, он делает это лично и с подписью. Ему важно признание — не из тщеславия, а как подтверждение, что его вклад увидели. В ответ он умеет великодушно согревать всех вокруг.",
  virgo: "Солнце в Деве — характер мастера: видеть детали, которые другие пропускают, и доводить сырое до рабочего. Дева выражает заботу делом — починить, организовать, проверить. Риск профессии — требовать от себя безупречности там, где хватило бы «хорошо».",
  libra: "Солнце в Весах — характер дипломата: почти любую ситуацию Весы видят с двух сторон сразу, отсюда и знаменитые колебания, и редкий дар находить решение, которое устроит всех. Красота и соразмерность для них не роскошь, а рабочая необходимость.",
  scorpio: "Солнце в Скорпионе — характер, не умеющий «слегка»: чувства, работа и люди берутся всерьёз и до конца. Скорпион видит подтекст и скрытые мотивы почти без усилий. Его суперсила — проходить кризисы, которые ломают других, и выходить обновлённым.",
  sagittarius: "Солнце в Стрельце — характер, которому нужен горизонт: дальняя цель, большая идея, дорога. Стрелец заражает верой в лучшее и говорит правду в лицо — иногда раньше, чем его спросили. Рутина без смысла гасит его быстрее любых трудностей.",
  capricorn: "Солнце в Козероге — характер строителя длинных проектов: там, где другие ищут вдохновение, Козерог просто продолжает работать. Он рано взрослеет, поздно раскрывается и почти всегда добирается до вершины — потому что не свернул.",
  aquarius: "Солнце в Водолее — характер, который сверяется не с традицией, а с собственной картиной будущего. Водолею важны свобода и идея больше, чем статус; он друг всем и принадлежит немногим. Его вклад — видеть, как можно иначе.",
  pisces: "Солнце в Рыбах — характер с тонкой настройкой: Рыбы чувствуют атмосферу, людей и невысказанное раньше слов. Отсюда сострадание, воображение и творческий дар — и необходимость беречь границы, чтобы чужие бури не становились своими.",
};

const MOON: Record<string, string> = {
  aries: "Луна в Овне: эмоции вспыхивают мгновенно и так же быстро остывают — без злопамятности. Восстанавливается такой человек не в тишине, а в действии: спорт, быстрый результат, маленькая победа.",
  taurus: "Луна в Тельце: внутренней опорой служат стабильность и телесный комфорт — вкусная еда, привычные вещи, надёжные люди рядом. Перемены выбивают из колеи сильнее, чем кажется со стороны.",
  gemini: "Луна в Близнецах: чувства нужно проговорить — эмоция становится понятной, только оформившись в слова. Лучшее восстановление — разговор с близким человеком или смена картинки.",
  cancer: "Луна в Раке: эмоции глубокие и приливные, с сильной памятью на хорошее и плохое. Дом — не метафора, а реальное место силы; без своего угла и своих людей энергия утекает.",
  leo: "Луна во Льве: сердцу нужно, чтобы его любили заметно — словами, вниманием, праздником. Восстанавливается такой человек там, где его ценят, и увядает там, где принимают как должное.",
  virgo: "Луна в Деве: тревога снимается наведением порядка — в списке дел, в доме, в планах. Забота выражается практично: не «как ты?», а «я привёз лекарства». Важно разрешать себе несовершенство.",
  libra: "Луна в Весах: внутреннее равновесие зависит от гармонии вокруг — ссоры и грубость физически истощают. Восстановление приходит через красоту, музыку и общество приятных людей.",
  scorpio: "Луна в Скорпионе: чувства сильные и скрытые, доверие выдаётся редко и проверяется долго. Такому человеку нужна эмоциональная честность без полутонов — и право иногда побыть на глубине одному.",
  sagittarius: "Луна в Стрельце: настроение держится на смысле и перспективе — пока есть «зачем», переносится почти любое «как». Лечится дорогой, новыми местами и людьми, которые верят в большое.",
  capricorn: "Луна в Козероге: эмоции под контролем, просить о поддержке труднее, чем справиться самому. Опора — в результатах и надёжных правилах. Важно помнить: принимать заботу — тоже навык.",
  aquarius: "Луна в Водолее: чувствам нужен воздух — дистанция, свобода, отсутствие давления. Такой человек переживает через осмысление и разговор «на равных», а не через утешение.",
  pisces: "Луна в Рыбах: эмоциональные границы прозрачны — чужое настроение подхватывается как своё. Восстановление: вода, музыка, сон, творчество и люди, рядом с которыми можно не защищаться.",
};

const ASC: Record<string, string> = {
  aries: "Асцендент в Овне: при первой встрече вы читаетесь как энергия и прямота — человек, который знает, чего хочет. Это открывает двери, но иногда вас считают резче, чем вы есть.",
  taurus: "Асцендент в Тельце: первое впечатление — спокойствие и основательность, рядом с вами люди расслабляются. Вас видят надёжным раньше, чем узнают по-настоящему.",
  gemini: "Асцендент в Близнецах: вы входите в контакт легко и говорите со всеми на их языке — вас запоминают живым и любопытным. Иногда за лёгкостью не сразу замечают глубину.",
  cancer: "Асцендент в Раке: от вас исходит мягкость и внимание — незнакомые люди быстро начинают делиться личным. Ваша сдержанная оболочка на самом деле — способ беречь чувствительность.",
  leo: "Асцендент во Льве: вы заметны, даже когда молчите, — осанка, манера, тёплая уверенность. Людям рядом с вами хочется быть ярче; главное — им это позволять.",
  virgo: "Асцендент в Деве: первое впечатление — собранность и ум, вас сразу воспринимают как человека, на которого можно положиться в деле. Скромная подача часто скрывает масштаб.",
  libra: "Асцендент в Весах: вы производите впечатление вкуса и вежливой доброжелательности — с вами хотят договариваться. Умение нравиться — ваш вход в любую дверь.",
  scorpio: "Асцендент в Скорпионе: ваш взгляд замечают первым — в вас считывают силу и загадку ещё до знакомства. Люди либо тянутся, либо осторожничают; равнодушных мало.",
  sagittarius: "Асцендент в Стрельце: вы входите с открытостью и юмором, от вас веет свободой и планами на большее. Вас часто воспринимают оптимистом — и заряжаются этим.",
  capricorn: "Асцендент в Козероге: первое впечатление — серьёзность и статус, вас принимают за старшего даже среди ровесников. Доверие к вам возникает быстро, тепло — по мере знакомства.",
  aquarius: "Асцендент в Водолее: вы читаетесь как «не такой, как все» — в хорошем смысле: независимость, ирония, свой взгляд. С вами интересно, и вы это знаете.",
  pisces: "Асцендент в Рыбах: в вас считывают мягкость и что-то неуловимо художественное; людям рядом с вами спокойно. Вас часто «дочитывают» неверно — и это ваша защита.",
};

const BLEND: Record<string, string> = {
  "fire-fire": "Солнце и Луна в огненных знаках: воля и чувства действуют заодно — вы цельны, и когда чего-то хотите, это видно всем. Берегите тех, кто медленнее.",
  "earth-earth": "Солнце и Луна в земных знаках: редкая внутренняя согласованность — что решили, то и чувствуете. Ваша устойчивость — опора для многих, но не забывайте мечтать.",
  "air-air": "Солнце и Луна в воздушных знаках: мысль и эмоция говорят на одном языке — вам легко понимать себя и объяснять себя другим. Слабое место — заземление и телесность.",
  "water-water": "Солнце и Луна в водных знаках: глубина без двойного дна — вы чувствуете цельно и сильно. Ваша интуиция почти не ошибается; важно лишь не тонуть в чужих эмоциях.",
  "fire-earth": "Огненное Солнце и земная Луна (или наоборот): порыв в вас уравновешен практичностью — вы умеете и загореться, и довести. Внутренний спор «рискнуть или закрепить» — ваш вечный двигатель.",
  "fire-air": "Огонь и воздух в светилах: желание и идея разжигают друг друга — вы быстро вдохновляетесь и вдохновляете. Проектов больше, чем времени; выбирайте те, что горят дольше недели.",
  "fire-water": "Огонь и вода в светилах: сильный характер при чувствительном сердце — снаружи решительность, внутри приливы. Когда эти стихии в мире, вы способны на страсть, которая согревает, а не сжигает.",
  "earth-air": "Земля и воздух в светилах: практичность спорит с любопытством — вам нужно и чтобы работало, и чтобы было интересно. Ваш конёк — превращать идеи в работающие вещи.",
  "earth-water": "Земля и вода в светилах: самое плодородное сочетание — чувства находят форму, забота становится делом. Вы из тех, на ком держатся дома и команды.",
  "air-water": "Воздух и вода в светилах: разум наблюдает за чувствами, чувства окрашивают мысли — отсюда ваша психологичность и дар слова. Не всё нужно анализировать; иногда — просто прожить.",
};


const SUN_EN: Record<string, string> = {
  aries: "Sun in Aries — a trailblazer's character: the decision comes fast, action comes before doubt. Starting and correcting on the move beats long preparation; this fire needs real challenges, or it turns into irritability.",
  taurus: "Sun in Taurus — a character built on steadiness: results should be tangible and tomorrow predictable. Decisions take time, but once made, Taurus doesn't back down; the famous stubbornness is the flip side of rare reliability.",
  gemini: "Sun in Gemini — a mind that needs motion: two projects at once, three conversations, a new topic every week. The strength is speed of thought and effortless contact; the weak spot is finishing what has stopped being interesting.",
  cancer: "Sun in Cancer — major decisions are made by feeling, even when they look rational from outside. A great power of care and memory: Cancer holds the family, the team, the history — but first needs to feel safe.",
  leo: "Sun in Leo — a character with an inner spotlight: whatever Leo does carries a personal signature. Recognition matters — not from vanity, but as proof the contribution was seen. In return, Leo generously warms everyone around.",
  virgo: "Sun in Virgo — a craftsman's character: seeing details others miss and turning the raw into the working. Virgo expresses care through deeds — fixing, organizing, checking. The occupational risk: demanding flawlessness where good enough would do.",
  libra: "Sun in Libra — a diplomat's character: Libra sees almost any situation from both sides at once — hence the famous hesitation and the rare gift of finding solutions that suit everyone. Beauty and proportion are working necessities, not luxury.",
  scorpio: "Sun in Scorpio — a character that doesn't do 'lightly': feelings, work and people are taken seriously and to the end. Scorpio reads subtext and hidden motives almost effortlessly. The superpower: passing through crises that break others — and coming out renewed.",
  sagittarius: "Sun in Sagittarius — a character that needs a horizon: a distant goal, a big idea, a road. Sagittarius infects others with faith in the better and tells the truth to your face — sometimes before being asked. Meaningless routine drains this sign faster than any hardship.",
  capricorn: "Sun in Capricorn — a builder of long projects: where others wait for inspiration, Capricorn simply keeps working. Maturing early, opening up late, and almost always reaching the summit — because of never turning back.",
  aquarius: "Sun in Aquarius — a character calibrated not against tradition but against its own picture of the future. Freedom and ideas matter more than status; a friend to everyone, belonging to few. The contribution: seeing how things could be different.",
  pisces: "Sun in Pisces — a finely tuned character: Pisces senses atmosphere, people and the unspoken before words. Hence the compassion, imagination and artistic gift — and the need to guard boundaries so other people's storms don't become your own.",
};

const MOON_EN: Record<string, string> = {
  aries: "Moon in Aries: emotions flare instantly and cool just as fast — with no grudges. Recovery comes not in silence but in action: sport, a quick result, a small win.",
  taurus: "Moon in Taurus: inner support comes from stability and bodily comfort — good food, familiar things, reliable people nearby. Change is more unsettling than it looks from outside.",
  gemini: "Moon in Gemini: feelings need to be talked through — an emotion becomes clear only once it's put into words. Best recovery: a conversation with someone close, or a change of scenery.",
  cancer: "Moon in Cancer: emotions are deep and tidal, with a long memory for the good and the bad. Home is not a metaphor but a literal place of power; without one's own corner and people, energy leaks away.",
  leo: "Moon in Leo: the heart needs to be loved visibly — with words, attention, celebration. This person recovers where they are valued and wilts where they are taken for granted.",
  virgo: "Moon in Virgo: anxiety is relieved by putting things in order — the to-do list, the home, the plans. Care is expressed practically: not 'how are you?' but 'I brought your medicine'. Allowing yourself imperfection matters.",
  libra: "Moon in Libra: inner balance depends on harmony around — quarrels and rudeness are physically draining. Recovery comes through beauty, music and pleasant company.",
  scorpio: "Moon in Scorpio: feelings are strong and hidden; trust is granted rarely and tested long. This person needs emotional honesty without half-tones — and the right to spend time in the depths alone.",
  sagittarius: "Moon in Sagittarius: mood rests on meaning and perspective — while there's a 'why', almost any 'how' is bearable. Healed by the road, new places, and people who believe in something big.",
  capricorn: "Moon in Capricorn: emotions are kept in check; asking for support is harder than coping alone. Support comes from results and reliable rules. Worth remembering: receiving care is a skill too.",
  aquarius: "Moon in Aquarius: feelings need air — distance, freedom, no pressure. This person processes through understanding and conversation between equals, not through consolation.",
  pisces: "Moon in Pisces: emotional boundaries are translucent — other people's moods are caught like one's own. Recovery: water, music, sleep, art, and people around whom no armor is needed.",
};

const ASC_EN: Record<string, string> = {
  aries: "Ascendant in Aries: at first meeting you read as energy and directness — someone who knows what they want. It opens doors, though people sometimes take you as sharper than you are.",
  taurus: "Ascendant in Taurus: the first impression is calm and groundedness — people relax around you. You are seen as reliable before you are truly known.",
  gemini: "Ascendant in Gemini: you connect easily and speak everyone's language — people remember you as lively and curious. Sometimes the lightness hides the depth at first.",
  cancer: "Ascendant in Cancer: you radiate softness and attention — strangers quickly start sharing personal things. The reserved shell is actually how you protect your sensitivity.",
  leo: "Ascendant in Leo: you are noticeable even in silence — posture, manner, warm confidence. People near you want to shine brighter; the art is letting them.",
  virgo: "Ascendant in Virgo: the first impression is composure and intelligence — people immediately see someone to rely on. The modest delivery often hides the scale.",
  libra: "Ascendant in Libra: you come across with taste and polite goodwill — people want to make deals with you. The ability to be liked is your key to any door.",
  scorpio: "Ascendant in Scorpio: your gaze is noticed first — people sense power and mystery before the introduction. They either gravitate or grow careful; few stay indifferent.",
  sagittarius: "Ascendant in Sagittarius: you enter with openness and humor; there's a scent of freedom and bigger plans about you. People take you for an optimist — and catch it.",
  capricorn: "Ascendant in Capricorn: the first impression is seriousness and status — you're taken for the senior person even among peers. Trust comes fast; warmth, with acquaintance.",
  aquarius: "Ascendant in Aquarius: you read as 'not like the others' — in the best sense: independence, irony, your own angle. You're interesting company, and you know it.",
  pisces: "Ascendant in Pisces: people sense softness and something quietly artistic in you; they feel at ease nearby. You're often 'read' inaccurately — and that is your protection.",
};

const BLEND_EN: Record<string, string> = {
  "fire-fire": "Sun and Moon both in fire signs: will and feeling act as one — you're whole, and when you want something, everyone can see it. Be gentle with the slower ones.",
  "earth-earth": "Sun and Moon both in earth signs: rare inner consistency — what you decide is what you feel. Your steadiness supports many; just don't forget to dream.",
  "air-air": "Sun and Moon both in air signs: thought and emotion speak the same language — you understand yourself and explain yourself with ease. The weak spot is grounding and the body.",
  "water-water": "Sun and Moon both in water signs: depth with no false bottom — you feel wholly and strongly. Your intuition rarely misses; just don't drown in other people's emotions.",
  "fire-earth": "A fire Sun with an earth Moon (or vice versa): impulse balanced by practicality — you can both ignite and deliver. The inner debate of 'risk it or secure it' is your engine.",
  "fire-air": "Fire and air in the luminaries: desire and idea feed each other — you inspire quickly and are quickly inspired. There are more projects than time; pick the ones that burn longer than a week.",
  "fire-water": "Fire and water in the luminaries: a strong character with a sensitive heart — decisiveness outside, tides within. When these elements are at peace, you're capable of passion that warms rather than burns.",
  "earth-air": "Earth and air in the luminaries: practicality argues with curiosity — you need things to work and to be interesting. Your specialty: turning ideas into working things.",
  "earth-water": "Earth and water in the luminaries: the most fertile combination — feelings find form, care becomes deeds. You're one of those on whom homes and teams rest.",
  "air-water": "Air and water in the luminaries: the mind watches the feelings, feelings color the thoughts — hence your psychological insight and gift with words. Not everything needs analysis; some things just need living.",
};

function blendKey(a: Element, b: Element): string {
  const order: Element[] = ["fire", "earth", "air", "water"];
  return order.indexOf(a) <= order.indexOf(b) ? `${a}-${b}` : `${b}-${a}`;
}

export interface NatalSummary {
  sun: string;
  moon: string;
  blend: string;
  asc: string | null;
}

export function composeNatalSummary(
  sun: Sign,
  moon: Sign,
  asc: Sign | null,
  locale: Locale = "ru",
): NatalSummary {
  if (locale === "en") {
    return {
      sun: SUN_EN[sun.slug],
      moon: MOON_EN[moon.slug],
      blend: BLEND_EN[blendKey(sun.element, moon.element)],
      asc: asc ? ASC_EN[asc.slug] : null,
    };
  }
  return {
    sun: SUN[sun.slug],
    moon: MOON[moon.slug],
    blend: BLEND[blendKey(sun.element, moon.element)],
    asc: asc ? ASC[asc.slug] : null,
  };
}
