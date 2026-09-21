import type { Article } from "@/lib/blog";

/**
 * English blog articles. Original adaptations (not literal translations) of the RU set.
 * All astronomical timestamps computed with Swiss Ephemeris; shown in Moscow time (UTC+3)
 * with explicit labels — honest and unambiguous for a global audience.
 */

export const ARTICLES_EN: Article[] = [
  {
    slug: "mercury-retrograde-2026",
    title: "Mercury Retrograde 2026: Exact Dates and What Actually Matters",
    h1: "Mercury Retrograde in 2026: dates, signs, practice",
    description:
      "All three Mercury retrograde periods of 2026 with exact station times computed via Swiss Ephemeris, the signs involved, and a no-hysteria guide to what's worth doing.",
    date: "2026-08-23",
    minutes: 6,
    tag: "Transits",
    blocks: [
      {
        type: "p",
        text: "Mercury retrograde is the most talked-about transit of the year — and the most mythologized. Below are the exact dates of all three 2026 periods, computed with **Swiss Ephemeris** (the same NASA-JPL-grade astronomy professional astrologers use), plus a sober look at what it actually means in practice.",
      },
      { type: "h2", text: "Mercury retrograde dates in 2026 (Moscow time, UTC+3)" },
      {
        type: "table",
        head: ["Period", "Stations retrograde", "Stations direct", "Where it happens"],
        rows: [
          ["First", "February 26, 09:48", "March 20, 22:33", "Pisces: 23° back to 8°"],
          ["Second", "June 29, 20:35", "July 24, 01:57", "Cancer: 26° back to 16°"],
          ["Third", "October 24, 10:12", "November 13, 18:53", "Scorpio: 21° back to 5°"],
        ],
      },
      {
        type: "p",
        text: "Notice the pattern: all three loops of 2026 run through **water signs** — Pisces, Cancer and Scorpio. In astrological logic that shifts the usual 'tech and logistics glitches' story toward feelings, memory and things left unsaid: the biggest communication breakdowns these weeks are emotional, not technical.",
      },
      { type: "h2", text: "What retrograde actually is" },
      {
        type: "p",
        text: "The planet never moves backwards — it's an optical effect: Earth and Mercury overtake each other in orbit, so from our viewpoint Mercury appears to slide backwards through the zodiac for a few weeks. Astrology reads this as a season when Mercury's themes — agreements, paperwork, messages, devices, travel — switch into 're-' mode: review, reread, renegotiate, double-check.",
      },
      { type: "h2", text: "Worth doing during the retrograde" },
      {
        type: "list",
        items: [
          "Return to unfinished business: stalled projects, half-written texts and frozen negotiations move easiest during these weeks.",
          "Read contracts twice before signing — especially the fine print.",
          "Back up your data and refresh passwords: a boring tip that somehow proves itself more often than usual in these windows.",
          "Meet people from your past if you've been meaning to: retrograde loops are famous for reunions.",
        ],
      },
      { type: "h2", text: "Better to avoid" },
      {
        type: "list",
        items: [
          "Scheduling deals and launches that cannot be moved or replayed — not out of fear, but out of respect for reschedule statistics.",
          "Buying complex electronics with no return option.",
          "Sorting out relationships over text: the written channel distorts tone most during these periods. A call is more honest.",
        ],
      },
      {
        type: "p",
        text: "Important: the retrograde touches everyone differently. It hits hardest if your personal planets sit in water signs — you can check that in a minute with the [free birth chart calculator](/en/natal-chart). How exactly the transit lands in your houses is what a personal horoscope is for.",
      },
      {
        type: "faq",
        items: [
          { q: "When is the next Mercury retrograde in 2026?", a: "The three 2026 periods are: February 26 – March 20 (Pisces), June 29 – July 24 (Cancer), and October 24 – November 13 (Scorpio), Moscow time. The last window of the year runs October 24 to November 13." },
          { q: "How long does Mercury retrograde last?", a: "About three weeks each time, three times a year. Add roughly a week of 'shadow' on each side, when Mercury crosses the same degrees at normal speed." },
          { q: "What signs are affected by Mercury retrograde 2026?", a: "The retrogrades happen in Pisces, Cancer and Scorpio — all three water signs. They touch everyone, but natal planets in these signs feel the review themes most directly." },
        ],
      },
      {
        type: "cta",
        label: "How this retrograde crosses your chart",
        text: "AstroOrbi overlays the 2026 transits on your natal chart and shows which life areas all three loops will touch — with dates and practical advice.",
        ctaId: "mercury",
      },
    ],
  },
  {
    slug: "moon-calendar-2026",
    title: "Moon Calendar 2026: Every New Moon and Full Moon with Exact Times",
    h1: "New Moons and Full Moons of 2026",
    description:
      "The complete 2026 lunation calendar: exact times of every new moon and full moon, zodiac signs and degrees, eclipses marked. Computed with Swiss Ephemeris.",
    date: "2026-08-23",
    minutes: 5,
    tag: "Moon",
    blocks: [
      {
        type: "p",
        text: "The lunar cycle is astrology's simplest working tool: a new moon opens the cycle and favors beginnings, a full moon is its culmination — results and clarity. Below is every lunation of 2026 with exact times, computed with **Swiss Ephemeris**. Times are Moscow time (UTC+3); subtract 3 hours for UTC.",
      },
      { type: "h2", text: "2026 lunation calendar (Moscow time, UTC+3)" },
      {
        type: "table",
        head: ["Date", "Event", "Sign"],
        rows: [
          ["January 3, 13:03", "Full Moon", "Cancer 13°"],
          ["January 18, 22:53", "New Moon", "Capricorn 29°"],
          ["February 2, 01:09", "Full Moon", "Leo 13°"],
          ["February 17, 15:02", "New Moon · solar eclipse", "Aquarius 29°"],
          ["March 3, 14:38", "Full Moon · lunar eclipse", "Virgo 13°"],
          ["March 19, 04:23", "New Moon", "Pisces 28°"],
          ["April 2, 05:13", "Full Moon", "Libra 12°"],
          ["April 17, 14:52", "New Moon", "Aries 27°"],
          ["May 1, 20:24", "Full Moon", "Scorpio 11°"],
          ["May 16, 23:02", "New Moon", "Taurus 26°"],
          ["May 31, 11:45", "Full Moon", "Sagittarius 10°"],
          ["June 15, 05:55", "New Moon", "Gemini 24°"],
          ["June 30, 02:56", "Full Moon", "Capricorn 8°"],
          ["July 14, 12:44", "New Moon", "Cancer 22°"],
          ["July 29, 17:36", "Full Moon", "Aquarius 7°"],
          ["August 12, 20:36", "New Moon · total solar eclipse", "Leo 20°"],
          ["August 28, 07:18", "Full Moon · lunar eclipse", "Pisces 5°"],
          ["September 11, 06:27", "New Moon", "Virgo 18°"],
          ["September 26, 19:50", "Full Moon", "Aries 4°"],
          ["October 10, 18:50", "New Moon", "Libra 17°"],
          ["October 26, 07:12", "Full Moon", "Taurus 3°"],
          ["November 9, 10:03", "New Moon", "Scorpio 17°"],
          ["November 24, 17:53", "Full Moon", "Gemini 2°"],
          ["December 9, 03:52", "New Moon", "Sagittarius 17°"],
          ["December 24, 04:29", "Full Moon", "Cancer 2°"],
        ],
      },
      { type: "h2", text: "How to use this calendar" },
      {
        type: "list",
        items: [
          "**New moon** — the starting point: plans, launches, first steps. Energy is low on the exact day, so set intentions then and begin acting a day or two later on the waxing moon.",
          "**Full moon** — the peak: completions, results, important conversations. The emotional background runs brighter than usual — budget for it.",
          "**Eclipses** (February 17, March 3, August 12, August 28) are amplified lunations: events around them tend to be bigger and more fateful. The classic advice — don't force new beginnings within ±3 days.",
          "Watch the **sign** of each lunation: it lands hardest on people with Sun, Moon or rising sign there — check yours in the [birth chart calculator](/en/natal-chart).",
        ],
      },
      {
        type: "p",
        text: "Which exact life area answers a given new moon depends on the house it falls into in your chart — that's personal-forecast territory. The general tone of the day for your sign is always in the [daily horoscopes](/en/horoscope).",
      },
      {
        type: "cta",
        label: "Lunations mapped to your houses",
        text: "AstroOrbi shows which house of your chart every new and full moon activates — and sends the key dates in advance.",
        ctaId: "moon",
      },
    ],
  },
  {
    slug: "how-to-find-your-rising-sign",
    title: "How to Find Your Rising Sign: 3 Ways, From Exact to Honestly Approximate",
    h1: "How to find your rising sign (ascendant)",
    description:
      "Your rising sign is the zodiac sign that was ascending in the east when you were born. Three ways to find it: exact calculation, rectification by life events, and appearance-based guessing — ranked by honesty.",
    date: "2026-08-23",
    minutes: 5,
    tag: "Birth chart",
    blocks: [
      {
        type: "p",
        text: "The rising sign (ascendant) is the zodiac sign that was climbing over the eastern horizon at the minute you were born. If the Sun is the core of your character, the ascendant is the front door: how you come across at first meeting, how you start things, how strangers read you. It's why two people with the same Sun sign can make completely different first impressions.",
      },
      { type: "h2", text: "Way 1. Exact: birth time and place" },
      {
        type: "p",
        text: "The ascendant changes sign roughly **every two hours**, so you need your date, time and city of birth. Then it's one minute in the [free birth chart calculator](/en/natal-chart) — it runs on Swiss Ephemeris with NASA-JPL-grade precision and shows your ascendant together with Sun and Moon. Look for the time in hospital records or ask your parents; an error of 15–20 minutes almost never changes the sign.",
      },
      { type: "h2", text: "Way 2. No birth time: rectification" },
      {
        type: "p",
        text: "If the time is unknown, astrologers use **rectification**: they take major dated life events — moves, marriages, career turns — and fit the birth time whose transits and directions best match those dates. It's painstaking work with an astrologer, but it recovers the time to within minutes. The lighter version is bracketing: knowing you were born 'in the morning' already narrows the ascendant to one or two candidates.",
      },
      { type: "h2", text: "Way 3. Approximate: appearance and vibe" },
      {
        type: "p",
        text: "The internet loves 'find your rising sign by your looks' quizzes. Honestly: that's tea-leaf reading — appearance owes far more to genetics than to a degree on the horizon. Such descriptions can help narrow candidates during rectification ('Virgo or Scorpio?'), but they are not a method. If a quiz says one thing and the calculation says another, the calculation is always right.",
      },
      { type: "h2", text: "What knowing your ascendant unlocks" },
      {
        type: "list",
        items: [
          "The exact **house grid** — without it a horoscope can't say which life area a transit will touch.",
          "The gap between 'how people see me' (ascendant) and 'who I am' (Sun) — a frequent source of misunderstandings.",
          "Reading daily horoscopes properly: many astrologers suggest reading both your Sun sign and your rising sign.",
        ],
      },
      {
        type: "cta",
        label: "Your ascendant in one minute",
        text: "Build your chart in AstroOrbi: ascendant, all 10 planets and houses — with a full AI reading of how it all works in your life.",
        ctaId: "asc",
      },
    ],
  },
  {
    slug: "moon-sign-meaning",
    title: "Your Moon Sign: What It Means and Why It Matters More Than You Think",
    h1: "The Moon in your birth chart: your Moon sign",
    description:
      "The Moon sign governs emotions, habits and how you recharge. How it differs from your Sun sign, how to find it, and a cheat sheet for all 12 signs.",
    date: "2026-08-23",
    minutes: 6,
    tag: "Birth chart",
    blocks: [
      {
        type: "p",
        text: "Your Sun sign is 'who I am'; your Moon sign is 'what I need to be okay'. The Moon in a chart governs emotional reactions, habits, the feeling of safety and how you recover. At home and in close relationships people live by their Moon far more than by their Sun — which is why two people 'identical by horoscope' turn out completely different behind closed doors.",
      },
      { type: "h2", text: "Moon vs Sun" },
      {
        type: "p",
        text: "The Sun is conscious will: goals, self-expression, daylight mode. The Moon is the autopilot: how you react before you've had time to think, what soothes you, what 'all is well' is made of. The Sun shows at work and in public; the Moon shows under stress, in daily life, and at 3 a.m. A clash between them — say, a freedom-loving Sagittarius Sun with a home-bound Cancer Moon — isn't a malfunction but an inner dialogue worth knowing by name.",
      },
      { type: "h2", text: "How to find your Moon sign" },
      {
        type: "p",
        text: "The Moon crosses a sign in about 2.5 days, so the birth date is essential and the time is desirable: on sign-change days the time decides. Fastest way — the [free birth chart calculator](/en/natal-chart): it shows your Moon with the exact degree and a short reading, plus your Sun and ascendant.",
      },
      { type: "h2", text: "The Moon through the signs: a cheat sheet" },
      {
        type: "list",
        items: [
          "**Aries** — flash emotions: quick to ignite, quick to cool, no grudges; recovers through action.",
          "**Taurus** — stability and physical comfort as the anchor; change hits harder than it looks.",
          "**Gemini** — a feeling becomes real once it's put into words; talking is the cure.",
          "**Cancer** — deep tidal emotions and a long memory; home is a literal power source.",
          "**Leo** — the heart needs visible love; it wilts where it's taken for granted.",
          "**Virgo** — anxiety is soothed by bringing order; care is expressed practically.",
          "**Libra** — inner balance depends on harmony around; quarrels are physically draining.",
          "**Scorpio** — strong hidden feelings; trust is granted rarely and tested long.",
          "**Sagittarius** — mood runs on meaning and horizon; the road heals.",
          "**Capricorn** — emotions under control; asking for support is harder than coping alone.",
          "**Aquarius** — feelings need air and distance; processes through understanding, not consolation.",
          "**Pisces** — transparent emotional boundaries; other people's moods are caught like weather.",
        ],
      },
      {
        type: "p",
        text: "The full picture is richer than the sign alone: the Moon's house shows **where** you seek safety, and its aspects show how freely emotion flows. Your partner's Moon sign, by the way, matters more for everyday life than their Sun sign — one of the things a [compatibility reading](/en/compatibility) actually computes.",
      },
      {
        type: "cta",
        label: "Your Moon, fully decoded",
        text: "AstroOrbi reads your Moon by sign, house and aspects: what you need to feel grounded and how to use it in love and work.",
        ctaId: "moon_natal",
      },
    ],
  },
  {
    slug: "birth-date-compatibility",
    title: "Birth Date Compatibility: How Astrologers Actually Calculate It",
    h1: "Birth date compatibility: how it really works",
    description:
      "A percentage by Sun signs is only the first layer. How real synastry works: aspects between two charts, the roles of Moon, Venus and Mars — and where the Matrix of Destiny fits in.",
    date: "2026-08-23",
    minutes: 6,
    tag: "Compatibility",
    blocks: [
      {
        type: "p",
        text: "'Aries and Cancer are a bad match' — that's astrology at the magazine-horoscope level. A real compatibility calculation works differently: it compares two complete birth charts, not two Sun signs. Let's unpack the layers, from simple to precise.",
      },
      { type: "h2", text: "Layer 1. Sun signs: a quick temperament check" },
      {
        type: "p",
        text: "Combining signs by element and modality gives a first approximation: fire fans air, earth holds water, fixed signs dig in, cardinal signs race for the wheel. It's an honest but coarse filter — our [free pair calculator](/en/compatibility) is built on it and says so openly: this is a temperament estimate, not a verdict. Happy couples of 'incompatible' signs are common, because the next layers decide.",
      },
      { type: "h2", text: "Layer 2. Synastry: aspects between two charts" },
      {
        type: "p",
        text: "Synastry overlays the charts and reads **aspects** — angular links between two people's planets. The key pairs: your Moon to their Moon (daily-life compatibility), Venus to Mars (attraction), Mercury to Mercury (shared language), Saturn to personal planets (durability and lessons). Harmonious angles (trines, sextiles) give ease; tense ones (squares, oppositions) give spark and growth points. A good synastry isn't one without tension — it's one where the tension lands in areas both people are willing to work on.",
      },
      { type: "h2", text: "Layer 3. Houses: where exactly you meet" },
      {
        type: "p",
        text: "Your partner's planets fall into the **houses** of your chart: their Sun in your 7th house is the classic 'marriage person' signature; their Mars in your 10th — shared ambition. This layer needs both birth times — without them houses can't be built. We covered finding yours in [the rising sign guide](/en/blog/how-to-find-your-rising-sign).",
      },
      { type: "h2", text: "And the Matrix of Destiny — same thing?" },
      {
        type: "p",
        text: "The [Matrix of Destiny](/en/matrix) is a different method: a numerological system built on Tarot arcana that reads a couple's 'energies' from birth dates. It answers not 'will we be drawn to each other' but 'what shared tasks does this union carry'. Many couples benefit from both lenses: synastry for the dynamics, the Matrix for the meaning.",
      },
      {
        type: "cta",
        label: "Full synastry from two charts",
        text: "AstroOrbi builds both birth charts and reads the pair across every layer: love, money, daily life, crisis points — with a rating and honest wording.",
        ctaId: "synastry",
      },
    ],
  },
  {
    slug: "destiny-matrix-calculator-guide",
    title: "Destiny Matrix by Date of Birth: Step-by-Step Calculation Guide",
    h1: "How to calculate your Destiny Matrix",
    description:
      "Calculate the Destiny Matrix by hand: the five base points, the ancestral square, and a fully worked example. No birth time needed — plus a free instant calculator.",
    date: "2026-09-19",
    minutes: 6,
    tag: "Destiny Matrix",
    blocks: [
      {
        type: "p",
        text: "The Destiny Matrix is a numerology system built on the 22 Major Arcana of Tarot: every position derives from your date of birth through simple arithmetic. Unlike a [birth chart](/en/natal-chart), no birth time or city is needed — day, month and year are enough.",
      },
      { type: "h2", text: "The one rule: reduce to 1–22" },
      {
        type: "p",
        text: "Everything rests on a single rule: **if a number exceeds 22, add its digits** and repeat until you land between 1 and 22. Numbers of 22 or less stay as they are. Example: 1985 → 1+9+8+5 = 23 → 2+3 = 5. But a birthday on the 15th stays Arcana 15 — reducing it would be a mistake.",
      },
      { type: "h2", text: "The five base points" },
      {
        type: "list",
        items: [
          "**A — day of birth** (reduced if above 22): how people read you on first contact.",
          "**B — month of birth**: innate talents.",
          "**C — digit sum of the year**: the material sphere and its lessons.",
          "**D = A+B+C** reduced: the karmic foundation.",
          "**E = A+B+C+D** reduced: the center — your comfort zone and core.",
        ],
      },
      { type: "h2", text: "Worked example: March 24, 1981" },
      {
        type: "table",
        head: ["Position", "Calculation", "Arcana"],
        rows: [
          ["A (day)", "24 → 2+4", "6"],
          ["B (month)", "March", "3"],
          ["C (year)", "1+9+8+1", "19"],
          ["D (foundation)", "6+3+19 = 28 → 10", "10"],
          ["E (center)", "6+3+19+10 = 38 → 11", "11"],
        ],
      },
      {
        type: "p",
        text: "From here the ancestral square (sums of adjacent corners), the Sky and Earth lines, the [money channel](/en/blog/money-channel-destiny-matrix) and the [karmic tail](/en/blog/karmic-tail-destiny-matrix) are built with the same add-and-reduce rule.",
      },
      {
        type: "cta",
        label: "Your full Destiny Matrix in 30 seconds — free",
        text: "AstroOrbi builds the complete octagram from your date: all 22 energies, the ancestral square, both channels, with an AI reading of every position.",
        ctaId: "matrix_calc",
      },
      {
        type: "faq",
        items: [
          { q: "Do I need my birth time for the Destiny Matrix?", a: "No. Only day, month and year are used — that's what separates the Matrix from a natal chart, where exact time and city are required." },
          { q: "Is the Destiny Matrix scientific?", a: "No — there is no evidence base. Treat it as a self-reflection tool built on Tarot symbolism, not as a verdict about your life." },
          { q: "Why do different sites show different results?", a: "The base points match everywhere — they're pure arithmetic. Differences appear in the channels' intermediate points, which different schools compute differently; a trustworthy service publishes its method." },
        ],
      },
    ],
  },
  {
    slug: "karmic-tail-destiny-matrix",
    title: "Karmic Tail in the Destiny Matrix: the Three Numbers Readers Start With",
    h1: "The Karmic Tail: your three-number key",
    description:
      "What the karmic tail means in the Destiny Matrix, how to calculate its three energies from your birth date, and why a proper reading starts there.",
    date: "2026-09-20",
    minutes: 5,
    tag: "Destiny Matrix",
    blocks: [
      {
        type: "p",
        text: "The karmic tail is the set of three numbers at the bottom of the [Destiny Matrix](/en/blog/destiny-matrix-calculator-guide), below the center. The tradition reads them as unfinished lessons that keep repeating until worked through — which is why professional readings start with the tail, not with talents.",
      },
      { type: "h2", text: "How to calculate it" },
      {
        type: "list",
        items: [
          "**First number** — the karmic foundation D (day + month + year digit sum, reduced to 1–22).",
          "**Second number** — D + the matrix center E, reduced.",
          "**Third number** — first + second, reduced.",
        ],
      },
      {
        type: "p",
        text: "For March 24, 1981: D = 10, center E = 11. Second number: 10+11 = 21. Third: 10+21 = 31 → 4. The tail reads **10 — 21 — 4**.",
      },
      { type: "h2", text: "Why the tail starts \"in the minus\"" },
      {
        type: "p",
        text: "In the method's logic these energies begin in their shadow expression — that's what makes them lessons. The entry points of the [money channel](/en/blog/money-channel-destiny-matrix) and the love channel sit right next to the tail, so an unworked tail holds both spheres back: the same scenario repeats in money or relationships until the root is addressed.",
      },
      {
        type: "cta",
        label: "Get your karmic tail decoded",
        text: "AstroOrbi computes your three tail energies and explains each one: how the shadow shows up automatically — and what working it through looks like.",
        ctaId: "matrix_tail",
      },
      {
        type: "faq",
        items: [
          { q: "Is a karmic tail a bad sign?", a: "No. It marks a recurring lesson, not a curse — the same energies in their resourceful expression become strengths." },
          { q: "Do people born on the same date share a tail?", a: "The numbers match, as does the whole matrix. How the energies express depends on environment, choices and experience — which is why lives still differ." },
        ],
      },
    ],
  },
  {
    slug: "money-channel-destiny-matrix",
    title: "Money Channel in the Destiny Matrix: How Money Enters and What Blocks It",
    h1: "The Money Channel: entry, unfolding, block",
    description:
      "How the Destiny Matrix money channel works: the money entry point, the profession energy, and material karma — calculated from your date of birth.",
    date: "2026-09-21",
    minutes: 5,
    tag: "Destiny Matrix",
    blocks: [
      {
        type: "p",
        text: "The money channel is one of the most requested zones of the [Destiny Matrix](/en/blog/destiny-matrix-calculator-guide): three linked energies describing how money enters your life, where your earning potential peaks, and what blocks the flow.",
      },
      { type: "h2", text: "The three points" },
      {
        type: "list",
        items: [
          "**Money entry point** — how income shows up: computed from the matrix center and the lower-right corner of the ancestral square.",
          "**The \"profession\" energy** — the field where the channel unfolds and earning potential is highest.",
          "**Material karma** — corner C (year digit sum): the lesson that throttles the flow until passed.",
        ],
      },
      {
        type: "p",
        text: "For March 24, 1981: center E = 11, lower-right ancestral corner = 11 (19+10 = 29 → 11), so the money entry point is 11+11 = **Arcana 22**. Each energy is then read through its resourceful and shadow sides.",
      },
      { type: "h2", text: "An honest caveat" },
      {
        type: "p",
        text: "No matrix \"activates money flows\" or guarantees income — that's marketing, not the method. Used honestly, the channel is a reflection tool: which earning strategies feel native to you, which scripts you keep repeating via the [karmic tail](/en/blog/karmic-tail-destiny-matrix), and what you're ready to change.",
      },
      {
        type: "cta",
        label: "Your money channel, decoded",
        text: "AstroOrbi computes all three channel energies from your date and reads each one: the plus, the minus, and where to start.",
        ctaId: "matrix_money",
      },
      {
        type: "faq",
        items: [
          { q: "What does an energy \"in the minus\" mean here?", a: "The arcana's shadow expression — strategies that undercut earning, like undervaluing your work or fearing visibility. The same energy in the plus works for income." },
          { q: "Can the money channel change over time?", a: "The numbers are fixed by your birth date; their expression isn't. The same combination can shift from shadow to resource as you work with it." },
        ],
      },
    ],
  },
  {
    slug: "tarot-card-of-the-day",
    title: "Tarot Card of the Day: How to Draw and Read It Without the Mystique",
    h1: "Card of the day: a one-minute practice",
    description:
      "How the daily Tarot card works: framing the question, reading Majors vs Minors, whether to use reversals, and keeping a card journal. Free daily card online.",
    date: "2026-09-22",
    minutes: 4,
    tag: "Tarot",
    blocks: [
      {
        type: "p",
        text: "The card of the day is Tarot at its simplest: one card in the morning sets a lens for the day. You don't need all 78 meanings memorized — you need one minute and an honest question.",
      },
      { type: "h2", text: "Frame the question right" },
      {
        type: "p",
        text: "The working formula isn't \"what will happen today\" but **\"what should I pay attention to today\"**. The first turns the card into a prophecy to chase or refute; the second turns it into a lens — you notice what resonates and make decisions more deliberately.",
      },
      { type: "h2", text: "Majors, Minors, court cards" },
      {
        type: "list",
        items: [
          "**A Major Arcana** — a day with a loud theme: watch the big picture, not the routine.",
          "**A numbered Minor** — a specific sphere: Wands for action, Cups for feelings, Swords for decisions and words, Pentacles for money and the body.",
          "**A court card** — often the role you're playing today, or a person beside you.",
        ],
      },
      { type: "h2", text: "Keep a card journal" },
      {
        type: "p",
        text: "The real growth tool is a short evening note: which card came up, what in the day echoed it. A month later you'll have a personal statistics of meanings — worth more than any reference book. AstroOrbi saves your card history automatically and personalizes readings with your [birth chart](/en/natal-chart).",
      },
      {
        type: "cta",
        label: "Draw your card of the day — free",
        text: "A full 78-card deck, honest randomness, and an AI reading tuned to your day. One card daily — free, always.",
        ctaId: "tarot_daily",
      },
      {
        type: "faq",
        items: [
          { q: "Can I redraw until I like the card?", a: "You can, but the practice works when you read the first card. Redrawing turns it into a generator of pleasant pictures." },
          { q: "What if I draw Death or the Tower?", a: "In a daily context these are cards of endings and sudden clarity, not literal disasters: Death asks what to release today, the Tower asks which structure is shaking and needs an honest look." },
        ],
      },
    ],
  },
  {
    slug: "how-to-read-a-natal-chart",
    title: "How to Read a Natal Chart: a Step-by-Step Plan for Beginners",
    h1: "How to read your natal chart",
    description:
      "A beginner's reading order for the natal chart: the Big Three, planets in signs, houses, and aspects — plus the classic beginner mistakes to avoid.",
    date: "2026-09-23",
    minutes: 7,
    tag: "Natal chart",
    blocks: [
      {
        type: "p",
        text: "A natal chart is a snapshot of the sky at your birth, computed astronomically (AstroOrbi uses **Swiss Ephemeris** — the same data professional astrologers rely on). It looks overwhelming, but the reading order is well established.",
      },
      { type: "h2", text: "Step 1: the Big Three" },
      {
        type: "list",
        items: [
          "**Sun** — the core: what fuels you and what you're building.",
          "**Moon** — emotional needs: what makes you feel safe. More in our [Moon sign guide](/en/blog/moon-sign-meaning).",
          "**Rising sign** — your interface and first impression; it requires an exact birth time — [here's how to find yours](/en/blog/how-to-find-your-rising-sign).",
        ],
      },
      { type: "h2", text: "Step 2: personal planets in signs" },
      {
        type: "p",
        text: "Next come Mercury (thinking and speech), Venus (love and values), Mars (action and anger). The sign shows **how** the planet operates: Mars in Aries acts head-on, Mars in Libra negotiates. For outer planets, start by checking their houses only.",
      },
      { type: "h2", text: "Step 3: houses" },
      {
        type: "p",
        text: "Houses are twelve life spheres, from self-presentation (1st) to career (10th) and the subconscious (12th). A planet's house shows **where** its story unfolds: Venus in the 10th charms a career, in the 4th — a home. An empty house isn't an empty sphere; the sign on its cusp describes it.",
      },
      { type: "h2", text: "Step 4: aspects" },
      {
        type: "p",
        text: "Aspects are angles between planets: conjunctions and trines blend energies easily, squares and oppositions create the friction that drives growth. As a beginner, check the major aspects to your Sun, Moon and Rising — those are the loudest storylines.",
      },
      {
        type: "cta",
        label: "Your natal chart with an AI reading",
        text: "AstroOrbi computes your chart with Swiss Ephemeris and explains it in plain language: Big Three, planets, houses and aspects — layer by layer, no jargon.",
        ctaId: "natal_guide",
      },
      {
        type: "faq",
        items: [
          { q: "Can I build a chart without my birth time?", a: "Yes, partially: Sun, planets in signs and an approximate Moon remain, but the Rising sign and exact houses need the time. Birth records usually have it." },
          { q: "How is this different from a magazine horoscope?", a: "A magazine horoscope sorts everyone into 12 groups by Sun sign. A natal chart is an individual astronomical calculation — two identical charts are practically impossible." },
        ],
      },
    ],
  },
  {
    slug: "solar-return-chart-guide",
    title: "Solar Return Chart: Your Personal Year from Birthday to Birthday",
    h1: "Solar Return: your astrological year",
    description:
      "What a Solar Return chart is, how it differs from a calendar-year horoscope, the key points to read, and why your year starts on your birthday.",
    date: "2026-09-24",
    minutes: 5,
    tag: "Forecasts",
    blocks: [
      {
        type: "p",
        text: "A Solar Return is the chart of the moment the Sun comes back to the exact degree it held at your birth. It happens once a year, on or within a day of your birthday, and sets the themes of your personal year — birthday to birthday, not January to December.",
      },
      { type: "h2", text: "How it differs from a yearly horoscope" },
      {
        type: "p",
        text: "A calendar-year horoscope describes transits for everyone at once. A Solar Return is individual: it's computed from your [natal chart](/en/blog/how-to-read-a-natal-chart), the precise moment of the Sun's return, and the place you're in at that moment. Two people with the same Sun sign get different Solar Returns.",
      },
      { type: "h2", text: "The key points to read" },
      {
        type: "list",
        items: [
          "**The Solar Return Ascendant** — the style of the whole year.",
          "**The house holding the Sun** — the year's central sphere: career, relationships, home, learning.",
          "**Stelliums** — where the density of events will gather.",
          "**The year ruler's position** — the tone and the resource to lean on.",
        ],
      },
      { type: "h2", text: "How to actually use it" },
      {
        type: "p",
        text: "A Solar Return isn't a \"this happens in May\" forecast — it's a map of accents: which spheres get loud, where effort is needed, where support flows. Read it at the start of your personal year and revisit mid-year to check how the themes are landing.",
      },
      {
        type: "cta",
        label: "Your Solar Return for this year",
        text: "AstroOrbi computes the exact moment of your Sun's return with Swiss Ephemeris and reads the year sphere by sphere: main themes, strong months, watch zones.",
        ctaId: "solar_year",
      },
      {
        type: "faq",
        items: [
          { q: "Why count the year from my birthday, not January 1?", a: "Because the anchor is an astronomical event — the Sun returning to your natal degree. The calendar date has no relation to your chart." },
          { q: "Does my location on my birthday affect the chart?", a: "Yes: the Solar Return houses are computed for the coordinates where you are at the moment of the return — which is why some people deliberately travel for their birthday." },
        ],
      },
    ],
  },
];

export const articleBySlugEn = (slug: string) => ARTICLES_EN.find((a) => a.slug === slug) || null;
