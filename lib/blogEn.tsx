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
];

export const articleBySlugEn = (slug: string) => ARTICLES_EN.find((a) => a.slug === slug) || null;
