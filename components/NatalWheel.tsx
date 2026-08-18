import { SIGNS } from "@/lib/zodiac";

export interface WheelPlanet {
  symbol: string;
  lon: number; // эклиптическая долгота 0–360
  accent?: boolean;
}

/** Демо-позиции для hero (реальная конфигурация неба, а не случайные точки). */
export const DEMO_PLANETS: WheelPlanet[] = [
  { symbol: "☉", lon: 143, accent: true },
  { symbol: "☽", lon: 262, accent: true },
  { symbol: "☿", lon: 128 },
  { symbol: "♀", lon: 171 },
  { symbol: "♂", lon: 95 },
  { symbol: "♃", lon: 71 },
  { symbol: "♄", lon: 5 },
  { symbol: "♅", lon: 58 },
  { symbol: "♆", lon: 357 },
  { symbol: "♇", lon: 301 },
];

/**
 * Колесо натальной карты: рисует себя со staggered-анимацией (~1.2 c) —
 * «вау-момент» из ТЗ §7. При prefers-reduced-motion статика (см. globals.css).
 */
export default function NatalWheel({
  planets = DEMO_PLANETS,
  ascLon,
  size = 420,
  slowSpin = false,
}: {
  planets?: WheelPlanet[];
  ascLon?: number | null;
  size?: number;
  slowSpin?: boolean;
}) {
  const C = 210; // центр viewBox 420×420
  const rOuter = 200;
  const rSigns = 176;
  const rInner = 152;
  const rPlanets = 118;

  // 0° Овна слева (позиция асцендента), рост долготы против часовой
  const pt = (lon: number, r: number) => {
    const a = ((180 - lon) * Math.PI) / 180;
    return { x: C + r * Math.cos(a), y: C - r * Math.sin(a) };
  };

  const dashOuter = 2 * Math.PI * rOuter;
  const dashInner = 2 * Math.PI * rInner;

  // Анти-коллизия: если планеты ближе 13° — вторую уводим на внутренний радиус
  const sorted = [...planets].sort((a, b) => a.lon - b.lon);
  const radiusOf = new Map<WheelPlanet, number>();
  for (let i = 0; i < sorted.length; i++) {
    const prev = sorted[(i - 1 + sorted.length) % sorted.length];
    const gap = (sorted[i].lon - prev.lon + 360) % 360;
    const prevR = radiusOf.get(prev) ?? rPlanets;
    radiusOf.set(sorted[i], gap < 13 && prevR === rPlanets ? rPlanets - 26 : rPlanets);
  }

  // Аспекты между планетами (орбис 6°): трин/секстиль — сиреневый, квадрат/оппозиция — золотой
  const ASPECTS: { angle: number; tense: boolean }[] = [
    { angle: 60, tense: false },
    { angle: 90, tense: true },
    { angle: 120, tense: false },
    { angle: 180, tense: true },
  ];
  const rAspect = 88;
  const aspectLines: { a: WheelPlanet; b: WheelPlanet; tense: boolean }[] = [];
  for (let i = 0; i < planets.length; i++)
    for (let j = i + 1; j < planets.length; j++) {
      let d = Math.abs(planets[i].lon - planets[j].lon) % 360;
      if (d > 180) d = 360 - d;
      const hit = ASPECTS.find((x) => Math.abs(d - x.angle) <= 6);
      if (hit) aspectLines.push({ a: planets[i], b: planets[j], tense: hit.tense });
    }

  return (
    <svg
      viewBox="0 0 420 420"
      width={size}
      height={size}
      role="img"
      aria-label="Колесо натальной карты"
      className="max-w-full"
    >
      <defs>
        <linearGradient id="wheelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8E7BFF" />
          <stop offset="100%" stopColor="#EFC26B" />
        </linearGradient>
      </defs>

      <g className={slowSpin ? "wheel-slow-spin" : undefined}>
        {/* Внешнее и внутреннее кольца — рисуют себя */}
        <circle
          cx={C}
          cy={C}
          r={rOuter}
          fill="none"
          stroke="url(#wheelGrad)"
          strokeWidth="1.2"
          opacity="0.9"
          className="wheel-ring"
          style={{ ["--dash" as string]: `${dashOuter}px` }}
        />
        <circle
          cx={C}
          cy={C}
          r={rInner}
          fill="none"
          stroke="rgba(233,236,248,0.18)"
          strokeWidth="1"
          className="wheel-ring"
          style={{ ["--dash" as string]: `${dashInner}px`, animationDelay: "0.15s" }}
        />

        {/* Градусная шкала: риски каждые 10° */}
        {Array.from({ length: 36 }, (_, i) => i * 10).map((deg, i) => {
          const long = deg % 30 === 0;
          const t1 = pt(deg, rOuter);
          const t2 = pt(deg, rOuter - (long ? 0 : 5));
          if (long) return null;
          return (
            <line
              key={deg}
              x1={t1.x}
              y1={t1.y}
              x2={t2.x}
              y2={t2.y}
              stroke="rgba(233,236,248,0.22)"
              strokeWidth="1"
              className="wheel-house"
              style={{ animationDelay: `${0.25 + i * 0.012}s` }}
            />
          );
        })}

        {/* Поле аспектов */}
        <circle
          cx={C}
          cy={C}
          r={rAspect}
          fill="none"
          stroke="rgba(233,236,248,0.08)"
          strokeWidth="1"
          className="wheel-house"
          style={{ animationDelay: "0.9s" }}
        />
        {aspectLines.map((l, i) => {
          const p1 = pt(l.a.lon, rAspect);
          const p2 = pt(l.b.lon, rAspect);
          return (
            <line
              key={i}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={l.tense ? "#EFC26B" : "#8E7BFF"}
              strokeWidth="0.9"
              opacity="0.38"
              className="wheel-house"
              style={{ animationDelay: `${1.5 + i * 0.06}s` }}
            />
          );
        })}

        {/* 12 секторов знаков: линии + глифы, staggered */}
        {SIGNS.map((s, i) => {
          const lonStart = i * 30;
          const p1 = pt(lonStart, rInner);
          const p2 = pt(lonStart, rOuter);
          const g = pt(lonStart + 15, rSigns);
          return (
            <g key={s.slug} className="wheel-house" style={{ animationDelay: `${0.3 + i * 0.055}s` }}>
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(233,236,248,0.14)" strokeWidth="1" />
              <text
                x={g.x}
                y={g.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                fill="rgba(233,236,248,0.55)"
              >
                {s.symbol + "\uFE0E"}
              </text>
            </g>
          );
        })}

        {/* Планеты */}
        {planets.map((p, i) => {
          const pos = pt(p.lon, radiusOf.get(p) ?? rPlanets);
          const tick1 = pt(p.lon, rInner);
          const tick2 = pt(p.lon, rInner - 8);
          return (
            <g key={p.symbol + i} className="wheel-planet" style={{ animationDelay: `${0.9 + i * 0.07}s` }}>
              <line x1={tick1.x} y1={tick1.y} x2={tick2.x} y2={tick2.y} stroke="rgba(233,236,248,0.3)" strokeWidth="1" />
              <circle cx={pos.x} cy={pos.y} r="12.5" fill="#12151F" stroke={p.accent ? "url(#wheelGrad)" : "rgba(233,236,248,0.2)"} strokeWidth="1" />
              <text
                x={pos.x}
                y={pos.y + 0.5}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                fill={p.accent ? "#EFC26B" : "#E9ECF8"}
              >
                {p.symbol + "\uFE0E"}
              </text>
            </g>
          );
        })}

        {/* Асцендент */}
        {typeof ascLon === "number" && (
          <g className="wheel-planet" style={{ animationDelay: "1.7s" }}>
            {(() => {
              const a1 = pt(ascLon, rInner);
              const a2 = pt(ascLon, rOuter + 8);
              const label = pt(ascLon, rOuter + 18);
              return (
                <>
                  <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} stroke="#EFC26B" strokeWidth="1.5" />
                  <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="central" fontSize="10" fill="#EFC26B">
                    ASC
                  </text>
                </>
              );
            })()}
          </g>
        )}
      </g>
    </svg>
  );
}
