import type { Dignity } from "./moon";

/**
 * Moon in signs — English texts for /en/planets/moon/[sign].
 * Original English adaptations of the RU set (not literal translations).
 * Dignities follow the classical tradition and live in MOON_RU[slug].dignity.
 */

export interface MoonSignEn {
  tagline: string;
  intro: string;
  needs: [string, string, string];
  woman: string;
  man: string;
  love: string;
  shadow: string;
  restore: [string, string, string];
  faq: { q: string; a: string }[];
}

export const MODALITY_EN = { cardinal: "cardinal", fixed: "fixed", mutable: "mutable" } as const;

export const DIGNITY_EN: Record<Dignity, { label: string; text: string }> = {
  domicile: {
    label: "domicile",
    text: "Cancer is the Moon's domicile — the sign it rules. Its nature — care, memory, attachment — comes through most fully here.",
  },
  exaltation: {
    label: "exaltation",
    text: "Taurus is the Moon's exaltation. Its need for calm matches the sign's steady nature, which makes emotions especially stable here.",
  },
  detriment: {
    label: "detriment",
    text: "Capricorn is the Moon's detriment, opposite its domicile. Softness struggles to show openly, so feelings come out through responsibility and actions.",
  },
  fall: {
    label: "fall",
    text: "Scorpio is the Moon's fall, opposite its exaltation. Calm struggles to coexist with the sign's intensity — but the feelings here run especially deep.",
  },
};

export const MOON_EN: Record<string, MoonSignEn> = {
  aries: {
    tagline: "Feelings that flare fast and fade without grudges",
    intro:
      "The Aries Moon reacts first and reflects later. Emotions strike like a match — a flash, an action, and half an hour later the anger is gone and forgotten. What makes this Moon feel safe isn't a quiet harbor; it's the freedom to act.",
    needs: [
      "Permission to react honestly, without polishing every word",
      "Movement and challenge — boredom unsettles it more than conflict",
      "The sense that it has the final say over its own life",
    ],
    woman:
      "A woman with the Moon in Aries cares through action: she'll fix it, drive over at midnight, solve the problem before you've finished asking. Sitting with someone's sadness for long is harder for her — she wants to do something about it. Don't hover over her; respect her independence. Care that feels like supervision reads to her as a leash.",
    man:
      "A man with the Moon in Aries runs hot and direct: if something stung him, you'll know right away. He doesn't hold grudges, but he doesn't enjoy long post-mortems either. He relaxes with a partner who isn't fazed by his heat and speaks just as plainly — hints and silences annoy him far more than an open argument.",
    love:
      "The Aries Moon wants aliveness: initiative, spontaneity, a little friendly rivalry. Fights are loud but short, and making up is quick. Cold silences and quiet resentment are what it struggles with most — its style is to have it out and move on.",
    shadow:
      "Waiting, being controlled and feeling helpless are its triggers. Irritation and snap decisions follow — the kind it later regrets.",
    restore: ["A hard workout, a run, a fast walk", "One concrete action instead of looping thoughts", "A little time alone to cool down"],
    faq: [
      {
        q: "Does an Aries Moon mean a bad temper?",
        a: "More often it means fast reactions. Emotions flare quickly and fade just as quickly, without stored-up grudges. It turns into a temper when anger is suppressed for too long and never gets an outlet in action.",
      },
      {
        q: "How do you support a child with an Aries Moon?",
        a: "Give their energy an outlet and their independence some room: sports, timed challenges, decisions of their own. Explain the rules rather than simply forbidding things — an unexplained 'no' lands as a dare.",
      },
    ],
  },
  taurus: {
    tagline: "Calm that's built over years",
    intro:
      "The Moon in Taurus is one of the steadiest emotional placements in the zodiac. These people take a while to get upset and a while to get over it. Safety, for them, means predictability, physical comfort and things you can actually touch.",
    needs: [
      "A stable home base: your own space, a familiar routine, savings for a rainy day",
      "Physical comfort — good food, warmth, well-made things",
      "Time: feelings and decisions ripen slowly, and rushing them backfires",
    ],
    woman:
      "A woman with the Moon in Taurus makes a home feel good without making a fuss: warm, well-fed, dependable. She's loyal and patient but doesn't love change — even the good kind. Her care is tangible: feeding you, keeping you warm, keeping an eye on the budget. She values being cared for the same way — with deeds, not grand promises.",
    man:
      "A man with the Moon in Taurus is emotionally calm and solid; it takes a lot to rattle him. He looks for a partner he can fully unwind with, and values home comforts more than he lets on. His weak spot is stubbornness: once he's decided things are good as they are, changing the routine is an uphill battle.",
    love:
      "The Taurus Moon chooses for the long haul and loves through consistency: the same rituals, the same touch, dinners together. Its jealousy is possessive but quiet. It needs a predictable partner — a sudden change of plans hurts it more than a small fight.",
    shadow:
      "Rushing, money worries and abrupt change knock it off balance. The response is to dig in and shut down: 'leave me alone until I've decided.'",
    restore: ["A good meal, eaten slowly", "Nature, gardening, working with your hands", "Massage, a sauna — anything that brings you back into your body"],
    faq: [
      {
        q: "Why is the Moon in Taurus considered strong?",
        a: "Because its emotional reserves refill easily: good sleep, a decent meal and a familiar routine are often enough to reset. The flip side is resistance to change — even a welcome change takes this Moon time to accept.",
      },
      {
        q: "How do you support someone with a Taurus Moon?",
        a: "With actions and steadiness: feed them, stay close, don't rush their decision. Long talks about feelings help this Moon less than a calm, steady presence.",
      },
    ],
  },
  gemini: {
    tagline: "Feelings that need to be talked through",
    intro:
      "The Moon in Gemini processes feelings through words: until an emotion is named and discussed, it doesn't quite make sense. Moods shift quickly, and so do interests. What steadies this Moon is conversation, novelty and the chance to figure out what's going on.",
    needs: [
      "Talking it out — out loud, in writing, with someone",
      "Fresh input: information soothes it, boredom makes it anxious",
      "Lightness — the freedom not to get stuck in heavy feelings",
    ],
    woman:
      "A woman with the Moon in Gemini cares with words: a supportive message, an article she found about your problem, a joke at exactly the right moment. Her moods change fast, and she needs that accepted without reproach. Her home is always full of conversation, books and people.",
    man:
      "A man with the Moon in Gemini hides feelings behind humor and analysis — explaining an emotion comes easier than feeling it. He needs a partner who's also a great conversationalist, someone he can tell anything. Heavy emotional scenes wear him out, and he may retreat into his head or his phone.",
    love:
      "The Gemini Moon wants a friend and a sparring partner: inside jokes, endless texting, new places. It needs lightness; pressure and drama push it away. Monotony is more dangerous for this Moon than conflict.",
    shadow:
      "Isolation, an information vacuum and having to sit in other people's intense emotions for too long throw it off. The result is restless busyness, jumping between tasks, sleepless nights of overthinking.",
    restore: ["A talk with a friend, or a journal", "A change of scene — a walk, a short trip", "Reading, podcasts, something new for the mind"],
    faq: [
      {
        q: "Does a Gemini Moon mean shallow feelings?",
        a: "No. The feelings aren't shallower — they move faster and pass through the head first: understand, then feel. That's why people with this Moon are often the best at naming what's happening to them.",
      },
      {
        q: "What should you avoid with a Gemini Moon?",
        a: "Leaving them on read or going silent. For this Moon, a lack of information is more unsettling than any direct conversation, even an unpleasant one.",
      },
    ],
  },
  cancer: {
    tagline: "Home, memory and deep attachment",
    intro:
      "The Moon in Cancer works at full strength. Feelings run deep, memory holds on tight, and attachments last for years. For this Moon, safety means home, the people closest to you, and knowing you won't be left behind.",
    needs: [
      "Home and family in the broad sense — people you can always come back to",
      "Emotional reciprocity: care should flow both ways",
      "Predictable loved ones — surprises in relationships feel unsettling",
    ],
    woman:
      "A woman with the Moon in Cancer is the one who holds the family together: she remembers what everyone likes, starts traditions and gives care to the point of self-sacrifice. She's highly sensitive to tone and may be hurt by something you didn't even notice. She needs her care to be seen and appreciated.",
    man:
      "A man with the Moon in Cancer is deeply attached to family and home, even if he hides it behind reserve. He looks for a partner with whom it's safe to be soft. He processes hurt slowly and silently, often retreating into his shell for a while before he can talk about it.",
    love:
      "The Cancer Moon wants closeness, family, a shared history. It gives care and expects care back; a partner's coldness hits it hard. It remembers fights for a long time — and loves loyally, for a long time too.",
    shadow:
      "Rejection, emotional coldness and any threat to home throw it off balance. The reaction is to withdraw into hurt, shut down, sometimes to guilt-trip.",
    restore: ["Time at home, in your own space", "Cooking for loved ones, family rituals", "Water: a bath, the sea, a walk by the river"],
    faq: [
      {
        q: "Why is the Moon in Cancer considered the strongest?",
        a: "Because here the Moon's needs and the sign's nature point the same way, so feelings don't need translating — they're expressed directly. That brings deep empathy and a long memory, and also a tendency to take things to heart.",
      },
      {
        q: "Cancer Moon sensitivity: how do you handle it?",
        a: "Name the hurt right away instead of letting it pile up. For loved ones: don't dismiss their feelings with 'you're imagining things' — for a Cancer Moon that's the most painful response there is.",
      },
    ],
  },
  leo: {
    tagline: "A heart that needs to be seen",
    intro:
      "The Moon in Leo feels vividly and generously — and wants those feelings to be noticed. It needs to be special to the people it loves, not one of many. Its anchor is love that's expressed openly and a place where it's truly appreciated.",
    needs: ["Recognition and warm words — said out loud, not just implied", "Room to create, play and be seen", "Loyalty and pride in the relationship"],
    woman:
      "A woman with the Moon in Leo is generous with love: gifts, celebrations, full attention for the people she's chosen. She needs to feel loved and admired — without it, she dims fast. When hurt, she's proud: she'd rather stay silent than show it stung.",
    man:
      "A man with the Moon in Leo is emotionally big-hearted and protective of his people. He needs his partner to be proud of him, and he takes being ignored or criticized in public hard. He answers recognition with warmth — give him a sincere compliment and you'll see this Moon at its best.",
    love:
      "The Leo Moon loves in style: grand gestures, surprises, celebrations. It needs feelings expressed in return — a reserved partner can come across as indifferent. It's loyal and expects loyalty; what wounds it isn't a fight, but feeling unseen.",
    shadow:
      "Being ignored, criticized in front of others or taken for granted throws it off. The reaction is proud hurt, drama — or the opposite, a cold distance.",
    restore: ["Creative outlets: music, dance, the stage, a passion project", "A celebration, a beautiful evening, friends' attention", "Playing with kids or pets"],
    faq: [
      {
        q: "Is a Leo Moon selfish?",
        a: "No — it needs recognition. The Leo Moon gives warmth freely and hopes it will be noticed. It only becomes selfish when it demands admiration without giving any back.",
      },
      {
        q: "How do you support someone with a Leo Moon?",
        a: "Tell them plainly that you value them and you're proud of them. For this Moon, words of recognition work better than advice or practical help.",
      },
    ],
  },
  virgo: {
    tagline: "Care through order and usefulness",
    intro:
      "The Moon in Virgo calms down when things are under control: tasks sorted, everything in its place, the problem broken into steps. It shows feelings through actions rather than words. Safety, for this Moon, is order and the sense of being useful.",
    needs: ["Order at home and a clear plan", "Being useful — helping in concrete, practical ways", "Healthy habits: routine, decent sleep, good food"],
    woman:
      "A woman with the Moon in Virgo cares practically: she'll remind you about the doctor, sort out your paperwork, plan the trip down to the last detail. She notices details and may criticize — but for her, criticism is often a form of care. It's hard for her to relax while something's left undone.",
    man:
      "A man with the Moon in Virgo is reserved about feelings and shows them through help: he'll fix it, organize it, sort it out. He feels at ease with a tidy, reliable partner. He tends to worry about small things and replay what he could have done better.",
    love:
      "The Virgo Moon values reliability and attention to detail: remembering exactly how a partner takes their coffee is its love language. Big emotional scenes scare it; it prefers a calm, practical kind of closeness. Don't dismiss its care, and don't mistake its remarks for a lack of love.",
    shadow:
      "Chaos, uncertainty and the fear of having missed something unsettle it most. Worry and self-criticism kick in, along with an urge to control everything around it.",
    restore: ["Tidying up: cleaning, a to-do list, clearing out a closet", "Routine: sleep, a walk, simple wholesome food", "A craft — working with your hands, where the result is visible"],
    faq: [
      {
        q: "Why do people with a Virgo Moon criticize so much?",
        a: "For a Virgo Moon, spotting flaws is a way of caring: fix it so it's better. It helps to agree on the format — first what went well, then what could be improved.",
      },
      {
        q: "Virgo Moon and worry: what helps?",
        a: "Turn the worry into action: make a plan, break the task into steps. For this Moon, a sleep routine and movement work better than any 'don't worry about it.'",
      },
    ],
  },
  libra: {
    tagline: "Harmony worth protecting at almost any cost",
    intro:
      "The Moon in Libra seeks balance — in relationships, in surroundings, in the moods of the people around it. Conflict and ugly environments feel almost physically uncomfortable. It feels secure where there's peace, fairness and partnership.",
    needs: ["A peaceful atmosphere and good manners", "A partner nearby — it feels steadier as part of a pair", "Beauty around it — aesthetics affect its mood directly"],
    woman:
      "A woman with the Moon in Libra reads a room instantly and can smooth over any tension. She cares through attention and tact. Her challenge is voicing her own displeasure: she may go along with things for a long time, then quietly drift away.",
    man:
      "A man with the Moon in Libra is gracious and avoids scenes. He needs a partner with whom life feels beautiful and calm — the relationship is his emotional anchor. Emotional decisions come hard to him: he weighs them at length so as not to hurt anyone.",
    love:
      "The Libra Moon is made for partnership: attentive, romantic, focused on 'us.' It expects reciprocity and fairness, and an imbalance in care hurts it. It prefers to resolve conflict by negotiation, and rudeness can switch off its feelings for a long time.",
    shadow:
      "Rudeness, open conflict and loneliness throw it off. The reaction is people-pleasing, putting off decisions, saying 'I'm fine' when it isn't.",
    restore: ["Beautiful surroundings: a museum, a lovely café, a tidy home", "Time with someone close", "Music, art, small aesthetic rituals"],
    faq: [
      {
        q: "Why is it hard for people with a Libra Moon to say no?",
        a: "For this Moon, conflict feels like a threat to balance. It helps to remember that an honest 'no' protects a relationship better than a forced 'yes.'",
      },
      {
        q: "Does a Libra Moon need a relationship?",
        a: "No, but it does find life steadier as part of a pair — partnership is a source of emotional stability. The goal is support, not dependence on someone else's mood.",
      },
    ],
  },
  scorpio: {
    tagline: "Depth that doesn't do half-measures",
    intro:
      "The Moon in Scorpio feels deeply, intensely and privately: its need for calm keeps colliding with the sign's intensity. For this Moon, safety means complete trust and total honesty from the people closest to it.",
    needs: ["Unconditional trust — and the certainty of not being betrayed", "Depth: small talk leaves it hungry", "Private space and the right to its secrets"],
    woman:
      "A woman with the Moon in Scorpio is perceptive and spots insincerity instantly. In love she goes all in and expects the same. She shows her vulnerable side only to those she trusts completely — and that trust has to be earned. She'd rather hear a painful truth than a comfortable lie.",
    man:
      "A man with the Moon in Scorpio is emotionally intense, even if he looks composed on the outside. He attaches deeply and takes betrayal very hard. He needs a partner he can be real with — someone who won't play games with his feelings.",
    love:
      "The Scorpio Moon wants to merge completely and expects total honesty. Jealousy and a need for control are its shadow; loyalty and depth are its strength. It doesn't forgive betrayal easily — but with this Moon, closeness is never superficial.",
    shadow:
      "Lies, things left unsaid and a loss of control throw it off. It responds with suspicion, withdrawal, checking up on people — and sometimes cutting ties for good.",
    restore: ["A deep conversation with someone you trust", "Journaling, talking to a counselor if it feels right, working through the past", "Time alone with yourself"],
    faq: [
      {
        q: "Is a Scorpio Moon bad because it's in its fall?",
        a: "No. A weaker placement isn't a worse one: emotions don't settle easily here, so this Moon learns to work with them consciously. Many people with it become remarkably good at crisis support and honest conversations.",
      },
      {
        q: "How do you earn the trust of someone with a Scorpio Moon?",
        a: "Through honesty and consistency: do what you said you'd do and don't hide important things. For this Moon, one exposed lie outweighs a dozen good deeds.",
      },
    ],
  },
  sagittarius: {
    tagline: "Freedom, meaning and an optimism that won't quit",
    intro:
      "The Moon in Sagittarius copes with hard times through optimism and a search for meaning. It needs space — physical and inner. Its anchor is freedom, movement and the sense that something interesting lies ahead.",
    needs: ["Freedom and space — no tight control", "Travel, learning, new horizons", "Meaning: understanding what it's all for"],
    woman:
      "A woman with the Moon in Sagittarius is a source of optimism: in a tough spot she's the first to say it'll work out — and then she finds a way. She supports by inspiring, not by mothering. Restrictions and household routine dim her fast.",
    man:
      "A man with the Moon in Sagittarius is cheerful, generous and blunt — sometimes to the point of tactlessness. He needs a partner who's also a travel companion: someone to explore, learn and argue about the meaning of life with. Trying to tie him down with jealousy and control backfires.",
    love:
      "The Sagittarius Moon wants an ally for adventures. Honesty, humor and shared plans for the future matter most. It struggles with emotional heaviness and tends to escape problems into optimism — so important conversations are best not postponed.",
    shadow:
      "Routine, confinement and prohibitions are what it can't stand. Its instinct is to escape: into a trip, a new project, promises that are hard to keep.",
    restore: ["The road: a trip, a new route, even a short drive out of town", "Learning, books, lectures — widening the horizon", "Outdoor sports"],
    faq: [
      {
        q: "Why does a Sagittarius Moon avoid heavy conversations?",
        a: "Its way of coping is optimism and moving forward. That keeps it from getting stuck, but can leave problems unresolved. It helps to agree on the conversation in advance and keep it free of pressure.",
      },
      {
        q: "Is a Sagittarius Moon bad at serious relationships?",
        a: "Not at all — as long as the relationship has freedom and a shared goal. With the right partner, the Sagittarius Moon is very loyal, just in its own way.",
      },
    ],
  },
  capricorn: {
    tagline: "Reserve with reliability underneath",
    intro:
      "With the Moon in Capricorn, softness and vulnerability hide behind responsibility and self-control. These people learn early to handle things on their own. For this Moon, safety means stability, structure and a secure future.",
    needs: ["Control over its own life and clear rules", "Financial and professional stability", "Respect — it matters more than tender words"],
    woman:
      "A woman with the Moon in Capricorn is dependable and responsible — someone you can lean on in any crisis. She cares by organizing the lives of the people she loves and doesn't like showing weakness. Behind her reserve is deep attachment, expressed through actions and time.",
    man:
      "A man with the Moon in Capricorn is reserved about feelings and serious about commitments. He shows love through responsibility: being someone you can rely on, keeping his word, building a shared future. Asking for support is hard for him — so it matters that his partner notices when he's tired, without waiting for him to say so.",
    love:
      "The Capricorn Moon opens up slowly, but chooses seriously and for the long term. It values maturity, loyalty and shared goals over romantic gestures. With the years, people with this Moon often grow warmer: trust builds up gradually.",
    shadow:
      "Chaos, financial uncertainty and feeling incompetent throw it off. The reaction is to bury itself in work and become colder and more demanding of itself and others.",
    restore: ["Structure: a plan, finished tasks, a clear schedule", "Time in quiet and solitude", "Mountains, forests, long walks"],
    faq: [
      {
        q: "Does a Capricorn Moon mean a cold person?",
        a: "No — a reserved one. The feelings are real and deep, but they show up as reliability: turning up, keeping promises, solving problems. Warmth tends to grow with trust and with age.",
      },
      {
        q: "How do you support someone with a Capricorn Moon?",
        a: "With practical help and recognition of their effort. Pity doesn't land well, but respect and a concrete 'I'm here — how can I help?' mean a lot.",
      },
    ],
  },
  aquarius: {
    tagline: "Closeness that leaves room to breathe",
    intro:
      "The Moon in Aquarius feels through understanding: it's easier to make sense of an emotion than to dissolve into it. It's friendly, independent and values people for their ideas. It feels at ease where it can be itself and relate as an equal.",
    needs: ["Personal space and independence", "Relationships between equals — friendship inside love", "Its own ideas and a community of kindred spirits"],
    woman:
      "A woman with the Moon in Aquarius is a friend first: honest, open, never possessive. She supports with understanding and a fresh angle on the problem. Jealous scenes and attempts to limit who she talks to trigger resistance.",
    man:
      "A man with the Moon in Aquarius is emotionally independent and can seem detached. He needs a partner who's also a friend and respects his freedom and interests. He cares in his own way — with unexpected solutions and a readiness to help at any moment — but doesn't always know how to talk about feelings.",
    love:
      "The Aquarius Moon looks for a union of two free people. Shared interests and intellectual closeness matter most. Emotional pressure and over-protectiveness push it away — but respect for its independence makes it deeply loyal.",
    shadow:
      "Control, emotional pressure and living 'like everyone else' push it away. It steps back into cool rationality.",
    restore: ["Time with friends and like-minded people", "Something new: tech, experiments, unusual hobbies", "Solitude without guilt"],
    faq: [
      {
        q: "Why does an Aquarius Moon seem cold?",
        a: "It makes sense of a feeling before it lets itself feel it. That's not coldness but a different way of experiencing emotions — with a distance that helps it stay itself.",
      },
      {
        q: "Can an Aquarius Moon be happy in marriage?",
        a: "Yes, if the marriage leaves room for friendship, freedom and personal interests. Marriage as control and obligation is the hardest version for this Moon.",
      },
    ],
  },
  pisces: {
    tagline: "Compassion without borders",
    intro:
      "The Moon in Pisces is exceptionally sensitive: it picks up other people's emotions almost physically. Its imagination is rich, its compassion boundless, its boundaries blurry. What restores it is quiet, gentleness and the chance to retreat into its inner world.",
    needs: ["Quiet and time alone — to recover from other people's emotions", "Creativity, music, daydreams", "Gentle, non-judgmental loved ones"],
    woman:
      "A woman with the Moon in Pisces is an empath: she understands without words, comforts, forgives. She dissolves easily into the people she loves and can forget about herself. She needs a partner who protects her sensitivity and helps her hold her boundaries.",
    man:
      "A man with the Moon in Pisces is gentle, romantic and very sensitive, even if he hides it. He empathizes deeply and struggles with harshness. He needs a partner with whom he can be vulnerable without fear of being mocked.",
    love:
      "The Pisces Moon seeks soulful closeness and romance. It tends to idealize a partner and sacrifice itself. The key is for love to be mutual care, not rescuing.",
    shadow:
      "Harshness, noise, conflict and too much of other people's trouble throw it off. The reaction is to withdraw — into itself, into fantasy, away from reality.",
    restore: ["Music, film, creativity", "The sea or a pool — water calms it faster than words", "Sleep and time in silence"],
    faq: [
      {
        q: "How can a Pisces Moon set boundaries?",
        a: "Notice where its own feelings end and other people's begin, and allow time to recover after heavy conversations. Simple rules help: don't rush to fix other people's problems, and don't answer everything the same day.",
      },
      {
        q: "Does a Pisces Moon mean being overly emotional?",
        a: "More like highly sensitive: it registers more shades of feeling, its own and others'. That's a strength in creativity and empathy — as long as there's time to recharge.",
      },
    ],
  },
};
