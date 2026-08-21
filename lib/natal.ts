import { Body, Ecliptic, GeoVector, MakeTime, SiderealTime } from "astronomy-engine";
import { Sign, signByLongitude } from "./zodiac";

export interface PlanetPosition {
  key: string;
  ru: string;
  symbol: string;
  lon: number; // эклиптическая долгота, 0–360
  sign: Sign;
  degInSign: number;
}

export interface NatalResult {
  planets: PlanetPosition[];
  ascendant: { lon: number; sign: Sign; degInSign: number } | null;
  sun: PlanetPosition;
  moon: PlanetPosition;
}

const PLANETS: { body: Body; key: string; ru: string; symbol: string }[] = [
  { body: Body.Sun, key: "sun", ru: "Солнце", symbol: "☉" },
  { body: Body.Moon, key: "moon", ru: "Луна", symbol: "☽" },
  { body: Body.Mercury, key: "mercury", ru: "Меркурий", symbol: "☿" },
  { body: Body.Venus, key: "venus", ru: "Венера", symbol: "♀" },
  { body: Body.Mars, key: "mars", ru: "Марс", symbol: "♂" },
  { body: Body.Jupiter, key: "jupiter", ru: "Юпитер", symbol: "♃" },
  { body: Body.Saturn, key: "saturn", ru: "Сатурн", symbol: "♄" },
  { body: Body.Uranus, key: "uranus", ru: "Уран", symbol: "♅" },
  { body: Body.Neptune, key: "neptune", ru: "Нептун", symbol: "♆" },
  { body: Body.Pluto, key: "pluto", ru: "Плутон", symbol: "♇" },
];

const DEG = Math.PI / 180;

function norm360(x: number): number {
  return ((x % 360) + 360) % 360;
}

/**
 * Расчёт натальной карты в браузере (astronomy-engine, точность уровня JPL
 * для видимых планет). Полные интерпретации и дома — в Mini App, где считает
 * Swiss Ephemeris (server/natal_chart_api.py).
 *
 * @param dateISO дата рождения YYYY-MM-DD
 * @param timeHHMM время рождения HH:MM (локальное)
 * @param tzHours UTC-offset места рождения в часах
 * @param lat широта места рождения
 * @param lon долгота места рождения (восток — плюс)
 * @param timeKnown известно ли время (если нет — асцендент не считаем)
 */
export function calcNatal(
  dateISO: string,
  timeHHMM: string,
  tzHours: number,
  lat: number,
  lon: number,
  timeKnown: boolean,
): NatalResult {
  const [y, m, d] = dateISO.split("-").map(Number);
  const [hh, mm] = (timeKnown ? timeHHMM : "12:00").split(":").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d, hh, mm) - tzHours * 3600 * 1000);
  const time = MakeTime(utc);

  const planets: PlanetPosition[] = PLANETS.map((p) => {
    const vec = GeoVector(p.body, time, true);
    const ecl = Ecliptic(vec);
    const L = norm360(ecl.elon);
    const sign = signByLongitude(L);
    return {
      key: p.key,
      ru: p.ru,
      symbol: p.symbol,
      lon: L,
      sign,
      degInSign: L % 30,
    };
  });

  let ascendant: NatalResult["ascendant"] = null;
  if (timeKnown) {
    // Локальное звёздное время → RAMC
    const gastHours = SiderealTime(time);
    const lstDeg = norm360(gastHours * 15 + lon);
    // Средний наклон эклиптики
    const T = time.tt / 36525;
    const eps = (23.439291 - 0.0130042 * T) * DEG;
    const theta = lstDeg * DEG;
    const phi = lat * DEG;
    const ascRad = Math.atan2(
      -Math.cos(theta),
      Math.sin(theta) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps),
    );
    const ascLon = norm360(ascRad / DEG + 180); // atan2-ветка формулы даёт десцендент; асцендент — противоположная точка (валидировано против Swiss Ephemeris)
    ascendant = {
      lon: ascLon,
      sign: signByLongitude(ascLon),
      degInSign: ascLon % 30,
    };
  }

  return {
    planets,
    ascendant,
    sun: planets[0],
    moon: planets[1],
  };
}
