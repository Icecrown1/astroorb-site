import type { Dignity } from "./moon";

/** Venus in signs — English texts for /en/planets/venus/[sign]. Original English adaptations of the RU set. */
export interface VenusSignEn {
  tagline: string;
  intro: string;
  values: [string, string, string];
  woman: string;
  man: string;
  love: string;
  style: string;
  shadow: string;
  gifts: [string, string, string];
  faq: { q: string; a: string }[];
  /** only for signs with a dignity: same kind as VENUS_RU[slug].dignity.kind */
  dignityNote?: string;
}

export const VENUS_DIGNITY_LABEL_EN: Record<Dignity, string> = {
  domicile: "domicile",
  exaltation: "exaltation",
  detriment: "detriment",
  fall: "fall",
};

export const VENUS_EN: Record<string, VenusSignEn> = {
  aries: {
    tagline: "Says it first and means it",
    intro:
      "Venus in Aries doesn't wait to be noticed: if someone catches its eye, it says so first. Attraction lights up fast and wants action — a date tonight, not next week. Honesty and the thrill of the chase matter more to it than a slow, by-the-book courtship.",
    values: [
      "Directness: 'I like you' instead of hints and games",
      "Momentum and initiative — something has to be happening",
      "Freedom: jealousy and control kill the spark faster than any fight",
    ],
    woman:
      "A woman with Venus in Aries doesn't hide her interest: she may text first, ask you out, or suggest a spur-of-the-moment road trip. Her style is practical and sporty, with one bold detail. For her, being attractive is about drive and confidence rather than coyness. And if she loses interest, she'll tell you that just as plainly.",
    man:
      "A man with Venus in Aries is drawn to bold, independent women with a bit of an edge — women who argue back and don't flinch at bluntness. He courts at full speed: quickly, vividly, with surprises. Winning someone over is half the thrill for him, so both an easy conquest and an endless game of hard-to-get cool him off.",
    love:
      "Venus in Aries loves by doing things together: going places, trying things, taking a chance. It falls fast and shows it straight away, but routine and long gaps in contact wear it down. Fights blow up and blow over just as quickly, and the relationship lasts as long as it feels like a team rather than a cage.",
    style:
      "Taste is bright and functional: red, athletic cuts, clothes you can head out the door in at a moment's notice. Money goes out on impulse — on experiences, sport and gadgets — and comes in easily when there's a challenge to chase.",
    shadow:
      "Impatience and a me-first streak: it can fall for the chase itself and cool off right after the 'win.' When hurt, it lashes out and sometimes says things it later regrets.",
    gifts: [
      "An experience rather than an object: go-karting, a climbing gym, a last-minute weekend away",
      "Sports gear or the gadget they've been mentioning for months",
      "A right-now surprise — no lengthy build-up, no hints",
    ],
    faq: [
      {
        q: "Why is Venus in Aries in detriment?",
        a: "Aries is ruled by Mars, the planet of drive, while Venus stands for softness and harmony. So here its nature comes out through initiative and directness. It isn't a 'bad' Venus — it's a brave one: it goes after the person it wants and has no patience for pretense.",
      },
      {
        q: "How do you win over someone with Venus in Aries?",
        a: "Be direct, lively and self-sufficient. Say plainly that you like them, suggest a concrete plan and don't try to manage their time — that works better than any game.",
      },
    ],
    dignityNote:
      "Aries is Venus's detriment: the planet of harmony lands in the sign of Mars. That's why love here shows up as initiative and directness rather than accommodation.",
  },
  taurus: {
    tagline: "Love you can actually touch",
    intro:
      "Venus in Taurus is at home in its own sign, where its taste for pleasure, beauty and security can show in full. It's slow to fall in love but stays for the long haul. Feelings are proven by deeds and by time: a dinner cooked just for them means more than a passionate declaration.",
    values: [
      "Reliability: someone who keeps their word and sticks around",
      "Physical comfort — touch, good food, a cozy home",
      "An unhurried pace: neither feelings nor decisions can be rushed",
    ],
    woman:
      "A woman with Venus in Taurus is sensual and calm: people are drawn to her voice, her well-kept look, the ease of simply being around her. She chooses quality things and natural fabrics, and she either cooks well or knows exactly where to eat. Trust takes her a while, but once she's chosen someone she holds on to the relationship firmly.",
    man:
      "A man with Venus in Taurus is drawn to feminine, calm, well-groomed women with a pleasant voice and a real appetite for life. He courts thoroughly: gifts that last for years, good restaurants, practical help when it's needed. What he wants with a partner is a calm, predictable life — in the best sense of the word.",
    love:
      "Venus in Taurus cares through the body and the everyday: a hug, a hot meal, a home that feels good to come back to. It's steady and loyal but finds change and uncertainty hard going. It needs to know that tomorrow will be just as good as today.",
    style:
      "Taste is classic and tactile: cashmere, cotton, good shoes, earthy tones. It knows how to save and puts money into things that last; it enjoys spending on beautiful things and good food, just without needless risk.",
    shadow:
      "Stubbornness and possessiveness: it can cling to a relationship that no longer brings joy simply because it's familiar. It gets jealous over whatever it considers 'mine.'",
    gifts: [
      "One quality piece to keep for years — a scarf, a bag, a good perfume",
      "Dinner somewhere with excellent food, or a meal you cooked yourself",
      "A massage, a spa day, a soft warm throw — anything that feels good on the skin",
    ],
    faq: [
      {
        q: "Is Venus in Taurus a strong placement?",
        a: "Yes — Taurus is Venus's domicile, so the planet is in its own sign and expresses itself with ease. People with it know how to enjoy life, make a place feel like home and build relationships that hold up over time.",
      },
      {
        q: "Is Venus in Taurus jealous?",
        a: "It leans possessive, especially when it doesn't feel secure. The calmer and more predictable the relationship, the fewer reasons it has for jealousy.",
      },
    ],
    dignityNote:
      "Taurus is Venus's domicile, one of the two signs it rules. Its love of pleasure, comfort and constancy comes through here naturally and in full.",
  },
  gemini: {
    tagline: "Falls for a great conversation",
    intro:
      "For Venus in Gemini, the way to the heart runs through conversation. Wit, humor and a line that surprises are what draw it in; flirting comes easily, and variety keeps it interested — new places, new topics, new people. Boredom is a bigger threat to this Venus than any argument.",
    values: [
      "Good conversation — texting until 2 a.m. already counts as a date",
      "Lightness and humor, without heavy scenes",
      "Variety: new places, ideas and friends",
    ],
    woman:
      "A woman with Venus in Gemini is charming and quick: witty, sociable, always up on the latest news. Her look changes with her mood, and she enjoys experimenting with it. She falls for the person she can't stop talking to — and loses interest just as fast when things get repetitive.",
    man:
      "A man with Venus in Gemini is drawn to smart, funny, talkative women — the kind he can laugh with and argue with about books, films and the news. He courts with words: long message threads, memes, unexpected invitations. He wants a partner who's also a friend, someone who keeps things interesting and doesn't ask for a report on his every move.",
    love:
      "Venus in Gemini loves out loud: it talks about feelings, jokes, sends messages throughout the day. Heavy jealousy and the silent treatment are hard for it to handle. The relationship holds as long as there's something new in it — trips, classes, projects you take on together.",
    style:
      "Taste is youthful and eclectic: layers, prints, accessories that are easy to swap. Money goes on books, gadgets, trips and meetups — usually lots of small purchases rather than one big one.",
    shadow:
      "Inconsistency and skimming the surface: it may flirt 'just because' and dodge serious talks with a joke. When there are too many options, picking one is hard.",
    gifts: [
      "A book, a subscription, or tickets to a talk, a stand-up show or an escape room",
      "A short trip to a city they've never been to",
      "A quirky, on-trend gadget or accessory",
    ],
    faq: [
      {
        q: "Can Venus in Gemini be faithful?",
        a: "Yes, as long as the relationship stays interesting. What it needs isn't new partners but new experiences: fresh topics, places and shared projects with the same person.",
      },
      {
        q: "How do you keep Venus in Gemini interested?",
        a: "Talk, surprise and give it room. It needs a partner who's still worth talking to five years from now.",
      },
    ],
  },
  cancer: {
    tagline: "Loves like family, through care",
    intro:
      "Venus in Cancer looks for a home and a sense of protection in love. It shows feelings by looking after people: feeding them, tucking them in, remembering what they like. It needs time to open up and has to feel emotionally safe — otherwise it retreats into its shell.",
    values: [
      "Emotional safety: knowing it won't be abandoned or laughed at",
      "Home and family rituals",
      "Attention to small things — remembering what matters to them",
    ],
    woman:
      "A woman with Venus in Cancer is gentle, caring and finely tuned to her partner's mood. Her style is soft and feminine; she keeps mementos and loves family traditions. She doesn't fall in love overnight, but she attaches deeply and remembers every little detail of the relationship's story.",
    man:
      "A man with Venus in Cancer is drawn to soft, caring, homey women — the ones who make a place feel warm. His courtship is touching: he remembers important dates, looks after her, introduces her to his family. He needs to feel someone is waiting for him at home, and he works hard to make that home a secure one.",
    love:
      "Venus in Cancer loves through care and memory: it keeps old messages, gifts and photos of the two of you. Family holidays and the feeling of 'us' mean a great deal to it. Harshness and coldness hurt it more than it shows, and it nurses those hurts for a long time, in silence.",
    style:
      "Taste is cozy and nostalgic: soft fabrics, vintage, jewelry with a story, pastel shades. It sets money aside for a rainy day and happily spends it on the home, the family and the people it loves.",
    shadow:
      "Touchiness and smothering: it can cling to the past and hold its care over you ('after everything I do for you'). When the relationship feels threatened, it withdraws instead of saying what's wrong.",
    gifts: [
      "Something for the home: a throw, beautiful tableware, a lamp with warm light",
      "A gift with memories attached — a photo album, engraved jewelry",
      "Dinner at home and an evening for two, no guests and no phones",
    ],
    faq: [
      {
        q: "Why does Venus in Cancer take so long to commit?",
        a: "It has to be sure it's safe. Once trust is there, it opens up completely — so rather than rushing it, show you're dependable through what you do.",
      },
      {
        q: "Is Venus in Cancer a family-oriented placement?",
        a: "One of the most family-oriented there is: it values home, tradition and care. The key is to keep the care mutual so it doesn't turn into control.",
      },
    ],
  },
  leo: {
    tagline: "Love as a celebration",
    intro:
      "Venus in Leo loves loudly and generously. Admiration is essential: it wants to be proud of its partner and to be a source of pride in return. Grand gestures, gifts and declarations in front of everyone are its love language — without attention, its feelings fade fast.",
    values: [
      "Admiration — compliments are no small thing to it",
      "Generosity: beautiful gestures and big-hearted deeds",
      "Loyalty and being proud of each other",
    ],
    woman:
      "A woman with Venus in Leo makes an entrance: statement jewelry, glossy hair, confident posture. She's generous with the people close to her and loves throwing a party. She needs a partner who admires her openly and isn't shy about showing affection in public.",
    man:
      "A man with Venus in Leo is drawn to vivid, self-assured women with style and charisma — women he's proud to walk into a room with. He courts in style: flowers, restaurants, surprises, big gestures. He wants to be the leading man in her life and to hear that he's the best.",
    love:
      "Venus in Leo does romance on a grand scale: anniversaries, date nights, presents. It's loyal and big-hearted but sensitive to indifference. If it stops being noticed, it starts demanding attention loudly — or looking for it elsewhere.",
    style:
      "Taste is luxurious and eye-catching: gold, rich colors, status labels. It spends generously on gifts, beauty and fun, and likes its spending to be seen.",
    shadow:
      "Pride and a need for applause: criticism stings, and a shortage of attention feels like an insult. Sometimes it picks a partner for the image rather than for the heart.",
    gifts: [
      "Jewelry or a piece from a well-known brand",
      "A date with wow factor: a restaurant with a view, a concert, a box at the theater",
      "Public recognition — a toast, a post, a surprise in front of friends",
    ],
    faq: [
      {
        q: "How can you tell Venus in Leo is in love?",
        a: "They start lavishing attention and gifts, introduce you to their friends and show you off with pride. They want their feelings to be visible.",
      },
      {
        q: "What makes Venus in Leo happy?",
        a: "Open, specific admiration: noticing their look, their wins and the things they do. A compliment paid in front of other people will be remembered for a long time.",
      },
    ],
  },
  virgo: {
    tagline: "Love in the small details",
    intro:
      "Venus in Virgo shows love with actions rather than words: it fixes what's broken, reminds you about the important meeting, writes the shopping list. It notices details and values order and reliability. Big romantic gestures matter less to it than everyday care and honesty.",
    values: [
      "Reliability in small things: showing up on time and doing what was promised",
      "Practical care instead of big words",
      "Neatness and order",
    ],
    woman:
      "A woman with Venus in Virgo is understated and well put together: neat clothes, minimal jewelry, flawless details. She helps in practical ways and notices what you need before you do. She opens up slowly and can be shy about showing feelings, but her care never switches off.",
    man:
      "A man with Venus in Virgo is drawn to neat, intelligent, modest women — good taste without showy luxury. He courts practically: helps with errands, sorts out everyday problems, gives useful gifts. Order in the relationship and mutual respect matter a lot to him.",
    love:
      "Venus in Virgo loves through attention: it remembers what you don't eat, when your deadline is and what needs buying for the weekend. Chaos and carelessness are hard for it to live with. Its remarks are often a form of care — 'I only want things to be better.'",
    style:
      "Taste is minimalist and practical: natural fabrics, a capsule wardrobe, well-made small things. It's careful with money: tracks spending, compares prices and dislikes paying extra for a label.",
    shadow:
      "Nitpicking and worry: it can fixate on small flaws and doubt whether it's good enough. Perfectionism can keep it from committing for a long time.",
    gifts: [
      "Something useful and well made — an organizer, a travel mug, a comfortable bag",
      "A gift card for a massage, a gym or a beauty treatment",
      "Practical help: take over the tasks they never get around to",
    ],
    faq: [
      {
        q: "Venus is in its fall in Virgo — is that bad?",
        a: "No. It means love comes out through practical care and attention to detail rather than romance. People with this placement are very dependable partners.",
      },
      {
        q: "Why does Venus in Virgo criticize its partner?",
        a: "To this Venus, a remark is a way of helping. It's worth agreeing on the form: a request instead of a reproach takes most of the tension out.",
      },
    ],
    dignityNote:
      "Virgo is Venus's fall. Its appetite for pleasure and abandon gives way to analysis and order, so love here shows up as practical care and attention to the little things.",
  },
  libra: {
    tagline: "Love as a beautiful partnership",
    intro:
      "Libra is one of Venus's own signs, and here it's made for partnership, beauty and peaceful relationships. Courtesy, taste and equality matter to it. It's good at reconciling people and makes any evening pleasant, but rudeness and conflict are hard for it to bear.",
    values: [
      "Equality and respect — decisions are made together",
      "Beauty and good manners in the small things",
      "Peace: a calm conversation instead of a scene",
    ],
    woman:
      "A woman with Venus in Libra is elegant and charming: a well-considered look, lovely manners, an ability to keep any conversation going. She's diplomatic and knows how to be liked. She wants a partner she can make a striking couple with and talk everything through as an equal.",
    man:
      "A man with Venus in Libra is drawn to graceful, polished, well-mannered women with taste. He courts with old-fashioned gallantry: beautiful dates, compliments, genuine interest in her opinion. He needs harmony around him — in how things look and in how people speak to each other.",
    love:
      "Venus in Libra loves as a partnership: deciding together, going out together, making plans together. It tries to be fair and weigh both people's interests. The catch is that it avoids conflict and may put up with a lot just to keep the peace.",
    style:
      "Taste is elegant and balanced: pastels, clean lines, art, a good fragrance. Money goes on beauty and culture — exhibitions, interiors, clothes — and it likes everything to go together.",
    shadow:
      "Indecision and leaning on a partner's opinion: it can adapt so much that it loses itself. Sometimes it chooses a convenient person over a beloved one just to avoid being alone.",
    gifts: [
      "A fragrance or a beautiful object for the home",
      "An exhibition, the theater or a concert",
      "A date with a thought-through atmosphere — candles, music, a beautifully set table",
    ],
    faq: [
      {
        q: "Is Venus in Libra the best placement for marriage?",
        a: "Libra is Venus's domicile and the sign of partnership, so building a relationship between equals comes naturally. The main thing is not to sacrifice its own wishes for the sake of peace.",
      },
      {
        q: "Why does Venus in Libra take so long to choose?",
        a: "It weighs every option and is afraid of getting it wrong. A calm conversation about the pros and cons helps — no pressure, no ultimatums.",
      },
    ],
    dignityNote:
      "Libra is Venus's domicile, the second sign it rules. This is where its social side opens up: partnership, taste, diplomacy and a sense of fairness.",
  },
  scorpio: {
    tagline: "All in, or not at all",
    intro:
      "Venus in Scorpio has no use for gray areas: when it loves, it loves deeply, passionately and for real. It needs complete openness and emotional closeness; light flirting doesn't interest it. It gives trust slowly and doesn't forget betrayal.",
    values: [
      "Total honesty — even when it's uncomfortable",
      "Depth and passion instead of something casual",
      "Loyalty and devotion",
    ],
    woman:
      "A woman with Venus in Scorpio draws people in with mystery: dark colors, an attentive gaze, few words. She sees through people and quickly spots who's faking. In love she gives everything and expects the same in return.",
    man:
      "A man with Venus in Scorpio is drawn to mysterious, passionate, strong women with character and depth. He courts intensely: lots of attention, a jealous streak, a need to know everything about her. Absolute loyalty and emotional honesty are non-negotiable for him.",
    love:
      "Venus in Scorpio wants to merge: to know its partner's thoughts and share its own most private ones. At its best, that means deep intimacy that lasts for years. At its worst, it means jealousy, checking phones and draining showdowns.",
    style:
      "Taste is dark and sensual: black, burgundy, leather, velvet, a perfume that lingers. It handles money strategically, with a sharp sense for shared resources and for what's really driving other people in money matters.",
    shadow:
      "Jealousy, control and grudges: it may keep tabs on a partner and remember a hurt for years. The fear of loss hits it hard, and its reactions can be sharp.",
    gifts: [
      "A perfume with a deep, lasting trail, or jewelry with a stone",
      "An evening for two with an honest heart-to-heart — no one else around",
      "A book, film or experience with depth — psychology, mysticism, true crime",
    ],
    faq: [
      {
        q: "Why is Venus in Scorpio in detriment?",
        a: "Scorpio is the sign opposite Taurus, Venus's domicile. Instead of easy pleasure, there's intensity and a need for total closeness. It's a powerful placement for relationships, though not an easy one.",
      },
      {
        q: "Is Venus in Scorpio jealous?",
        a: "It's prone to jealousy, because for it a relationship means complete trust. Transparency and open talk about feelings help — before suspicions have a chance to pile up.",
      },
    ],
    dignityNote:
      "Scorpio is Venus's detriment, opposite its domicile in Taurus. Ease and pleasure give way to intensity: love here is deep, passionate and demands complete openness.",
  },
  sagittarius: {
    tagline: "Love as a shared adventure",
    intro:
      "Venus in Sagittarius falls for free-spirited, vivid people with a passion for something. Shared ideas, travel and laughter matter to it. It's generous and open but chafes at limits: a relationship should widen its world, not shrink it.",
    values: [
      "Freedom and trust, without control",
      "Shared goals, travel and discoveries",
      "Honesty and a sense of humor",
    ],
    woman:
      "A woman with Venus in Sagittarius is open, fun and outspoken: she makes friends easily and loves to travel and learn new things. Her style is relaxed — ethnic prints, jeans, pieces picked up on her travels. She falls for people who inspire her and don't try to fence her in.",
    man:
      "A man with Venus in Sagittarius is drawn to free-spirited, cheerful, curious women — someone he could go anywhere with and talk to about anything. He courts spontaneously: weekend tickets, adventures, candid declarations. He wants a fellow traveler, not a keeper of strict rules.",
    love:
      "Venus in Sagittarius loves by moving forward together: trips, studies, shared plans. It's generous with emotions and gifts but may vanish if it feels pressured. It needs to know there's room for its freedom inside the relationship.",
    style:
      "Taste is free and colorful: ethnic motifs, comfortable clothes, souvenirs from its travels. Money goes on trips, learning and experiences — sometimes with an overly optimistic budget.",
    shadow:
      "Fear of commitment and a lack of tact: it can promise a lot and then disappear, and its bluntness can hurt without meaning to.",
    gifts: [
      "A trip, or tickets for this coming weekend",
      "A course, a workshop or a fascinating book",
      "Something for the road — a backpack, a scratch-off world map, hiking gear",
    ],
    faq: [
      {
        q: "Is Venus in Sagittarius afraid of marriage?",
        a: "What scares it isn't marriage but restriction. If the relationship offers freedom, shared goals and growth, it can be a very loyal and generous partner.",
      },
      {
        q: "How do you capture the heart of someone with Venus in Sagittarius?",
        a: "Suggest an adventure, get them excited about an idea, make them laugh — and don't fence them in. This Venus likes people who broaden its horizons.",
      },
    ],
  },
  capricorn: {
    tagline: "Chooses carefully and commits for years",
    intro:
      "Venus in Capricorn treats love like a long-term project: it chooses deliberately, lets time do the testing and builds on solid ground. On the surface it's reserved, but it's loyal and responsible. It shows its feelings through what it does, not through declarations.",
    values: [
      "Responsibility and a word that's kept",
      "Shared goals and plans that stretch over years",
      "Respect, and a partner with standing in the world",
    ],
    woman:
      "A woman with Venus in Capricorn looks composed and polished: classic cuts, muted colors, quality pieces. She takes her time opening up and watches carefully first. She's drawn to mature, driven people she can rely on.",
    man:
      "A man with Venus in Capricorn is drawn to serious, well-groomed, ambitious women — with a career, taste and good manners. He courts in a steady, slightly old-fashioned way: helps in practical ways, makes plans, thinks ahead. He needs a partner who respects his work and his goals.",
    love:
      "Venus in Capricorn loves through reliability: it turns up when it said it would, helps with practical matters and thinks about the couple's future. Saying feelings out loud and showing weakness come hard to it. Over the years it opens up and grows noticeably warmer.",
    style:
      "Taste is classic and status-conscious: structured silhouettes, navy and graphite, a good watch. With money it's cautious and strategic: it saves, plans ahead and buys expensive things that last.",
    shadow:
      "Coolness and calculation: it may put work ahead of the relationship and choose a partner for status. Looking vulnerable is one of its biggest fears.",
    gifts: [
      "A quality accessory — a watch, a leather planner, a classic bag",
      "Something that helps with work or career",
      "Dinner at an upscale place, without any fuss",
    ],
    faq: [
      {
        q: "Why does Venus in Capricorn seem cold?",
        a: "It shows feelings through reliability and actions rather than words. The more trust there is, the more warmth comes through.",
      },
      {
        q: "Does Venus in Capricorn mean marrying for practical reasons?",
        a: "Not necessarily. Stability and shared goals matter to it, so it chooses a partner deliberately — and that often makes for long, solid relationships.",
      },
    ],
  },
  aquarius: {
    tagline: "Love that starts as friendship",
    intro:
      "Venus in Aquarius falls for unusual, clever, free-thinking people. Shared ideas, friendship and respect for personal space matter to it. Jealousy and possessiveness turn it off: it wants to be with someone, not belong to them.",
    values: [
      "Freedom and personal space",
      "Friendship and shared ideas",
      "Originality — 'like everyone else' bores it",
    ],
    woman:
      "A woman with Venus in Aquarius doesn't fit the mold: an unusual style, unexpected hobbies, a wide circle of friends. She's attracted to smart, independent people. She may be friends with someone for a long time before falling for them, and she values relationships where both people get to stay themselves.",
    man:
      "A man with Venus in Aquarius is drawn to unconventional, intelligent, independent women with ideas and interests of their own. He courts in unexpected ways: interesting places, conversations about the future, projects you do together. He needs a partner who's also a friend and doesn't get jealous of his freedom or his friends.",
    love:
      "Venus in Aquarius sees love as a union of two free people: shared friends, ideas and projects. It shows feelings through understanding and support rather than sentimentality. Emotional pressure and dramatic scenes are hard for it to deal with.",
    style:
      "Taste is avant-garde and tech-savvy: unusual silhouettes, bright accents, gadgets. Money goes on technology, hobbies, charity and community projects.",
    shadow:
      "Detachment and unpredictability: it can suddenly cool off or disappear if it feels pressured. Sometimes reasoning stands in for feeling.",
    gifts: [
      "A gadget or an unusual piece of tech",
      "Tickets to a festival, a talk or a contemporary art show",
      "A gift tied to their hobby or a cause they care about",
    ],
    faq: [
      {
        q: "Is Venus in Aquarius capable of deep feelings?",
        a: "Yes, but it expresses them through friendship, respect and support. It needs love that doesn't cost it its freedom.",
      },
      {
        q: "How do you keep Venus in Aquarius?",
        a: "Be a friend, respect its space and share its ideas. Control and jealousy are the fastest way to lose it.",
      },
    ],
  },
  pisces: {
    tagline: "Love without limits",
    intro:
      "Venus in Pisces is exalted: this is where its capacity for love reaches its peak. It's romantic and compassionate, ready to give without holding anything back. It senses a partner without words, but it easily idealizes them and dissolves into the relationship.",
    values: [
      "Romance and a deep emotional bond",
      "Tenderness and being understood without words",
      "Creativity, music and dreams shared by two",
    ],
    woman:
      "A woman with Venus in Pisces is soft and dreamy: flowing fabrics, delicate shades, music and films woven into everyday life. She sympathizes and forgives — sometimes far too much. She needs a partner who protects her sensitivity and never takes advantage of her kindness.",
    man:
      "A man with Venus in Pisces is drawn to tender, romantic, slightly mysterious women — creative, sensitive, a little otherworldly. He courts in touching ways: poems, songs, close attention to her mood. A soulful connection matters more to him than looks alone.",
    love:
      "Venus in Pisces loves through romance and merging: it's willing to give up a lot for the person it loves and believes in 'the one.' The risk is rose-tinted glasses. It can miss problems for a long time and keep rescuing people who don't appreciate it.",
    style:
      "Taste is romantic and soft: pastels, sea tones, flowing fabrics, pearls. It's impractical with money and spends by mood — on beauty, creative pursuits and helping others.",
    shadow:
      "Idealization and self-sacrifice: it can lose itself in a partner, let its boundaries blur and keep choosing people who need saving.",
    gifts: [
      "Perfume, music, a book of poetry",
      "A date by the water — the sea, a lake, a pool",
      "Something handmade — a letter, a drawing, a playlist",
    ],
    faq: [
      {
        q: "Why is Venus exalted in Pisces?",
        a: "In Pisces, love becomes its most selfless: compassion, romance and accepting someone else just as they are. Tradition counts it among Venus's strongest placements.",
      },
      {
        q: "How can Venus in Pisces avoid losing itself in a relationship?",
        a: "By protecting its own boundaries and interests: its own friends, its own creative work, its own decisions. Loving someone shouldn't mean giving yourself up.",
      },
    ],
    dignityNote:
      "Pisces is Venus's exaltation. Here its love reaches its most elevated form: compassion, romance and a readiness to accept another person without conditions.",
  },
};
