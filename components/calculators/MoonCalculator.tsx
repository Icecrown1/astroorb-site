"use client";

import Link from "next/link";
import { useState } from "react";
import { moonForBirth, MOON_RU, RU_PREP, type MoonDayResult } from "@/lib/moon";
import { MOON_EN } from "@/lib/moonEn";
import type { Locale } from "@/lib/i18n";
import type { Sign } from "@/lib/zodiac";

const INPUT =
  "mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60 disabled:opacity-40";

const T = {
  ru: {
    date: "Дата рождения",
    time: "Время рождения",
    tz: "Часовой пояс, UTC+",
    tzDefault: "3",
    knowTime: "Знаю время рождения",
    hint: "Москва — 3, Душанбе и Ташкент — 5, Бишкек — 6. Время и пояс важны только в день, когда Луна меняет знак.",
    button: "Узнать знак Луны",
    errDate: "Укажите дату рождения.",
    errTz: "Часовой пояс укажите числом от −12 до +14 (например, 3).",
    errCalc: "Не удалось рассчитать Луну для этой даты. Проверьте данные.",
    yourMoon: "Ваша Луна",
    switched: "В этот день Луна сменила знак",
  },
  en: {
    date: "Date of birth",
    time: "Time of birth",
    tz: "UTC offset, hours",
    tzDefault: "0",
    knowTime: "I know my birth time",
    hint: "London — 0 (1 in summer), New York — −5 (−4 in summer), Moscow — 3. Time and zone only matter on days the Moon changes sign.",
    button: "Find my Moon sign",
    errDate: "Please enter your date of birth.",
    errTz: "Enter the time zone as a number from −12 to +14 (e.g. −5).",
    errCalc: "Could not calculate the Moon for this date. Please check your details.",
    yourMoon: "Your Moon",
    switched: "The Moon changed signs that day",
  },
} as const;

/** Калькулятор знака Луны по дате рождения. Считает в браузере через astronomy-engine. */
export default function MoonCalculator({ locale = "ru" }: { locale?: Locale }) {
  const en = locale === "en";
  const t = T[en ? "en" : "ru"];
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [timeKnown, setTimeKnown] = useState(false);
  const [tz, setTz] = useState<string>(t.tzDefault);
  const [error, setError] = useState("");
  const [result, setResult] = useState<MoonDayResult | null>(null);

  const href = (s: Sign) => `${en ? "/en" : ""}/planets/moon/${s.slug}`;
  const moonIn = (s: Sign) => (en ? `Moon in ${s.en.name}` : `Луна ${RU_PREP[s.slug]}`);
  const tagline = (s: Sign) => (en ? MOON_EN[s.slug].tagline : MOON_RU[s.slug].tagline);

  function calc() {
    setError("");
    setResult(null);
    if (!date) {
      setError(t.errDate);
      return;
    }
    const tzNum = Number(tz.replace(",", ".").replace("−", "-"));
    if (Number.isNaN(tzNum) || tzNum < -12 || tzNum > 14) {
      setError(t.errTz);
      return;
    }
    try {
      setResult(moonForBirth(date, timeKnown ? time || "12:00" : null, tzNum));
    } catch {
      setError(t.errCalc);
    }
  }

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.date}</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={INPUT} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.time}</span>
            <input
              type="time"
              value={time}
              disabled={!timeKnown}
              onChange={(e) => setTime(e.target.value)}
              className={INPUT}
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.tz}</span>
            <input inputMode="text" value={tz} onChange={(e) => setTz(e.target.value)} className={INPUT} />
          </label>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={timeKnown}
            onChange={(e) => setTimeKnown(e.target.checked)}
            className="h-4 w-4 accent-iris"
          />
          {t.knowTime}
        </label>
        <p className="mt-2 text-xs text-muted">{t.hint}</p>

        {error && <p className="mt-4 text-sm text-stellar">{error}</p>}

        <button
          onClick={calc}
          className="mt-6 w-full rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98] md:w-auto"
        >
          {t.button}
        </button>

        {result && (
          <div className="mt-8 rounded-2xl border border-iris/30 bg-surface p-6" aria-live="polite">
            {result.kind === "single" ? (
              <>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t.yourMoon}</p>
                <p className="mt-2 font-display text-2xl">
                  {result.sign.symbol}{" "}
                  {en ? (
                    <>
                      Moon in <span className="grad-text">{result.sign.en.name}</span>
                    </>
                  ) : (
                    <>
                      Луна <span className="grad-text">{RU_PREP[result.sign.slug]}</span>
                    </>
                  )}
                </p>
                <p className="mt-2 text-[15px] text-muted">{tagline(result.sign)}</p>
                <Link
                  href={href(result.sign)}
                  className="mt-4 inline-block text-sm text-iris underline decoration-iris/40 underline-offset-4 hover:decoration-iris"
                >
                  {en ? "Read" : "Читать"}: {moonIn(result.sign)} →
                </Link>
              </>
            ) : (
              <>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t.switched}</p>
                <p className="mt-2 text-[15px] leading-relaxed">
                  {en ? (
                    <>
                      Around <strong className="text-ink">{result.switchLocal}</strong> in your time zone, the Moon moved
                      from {result.before.en.name} into {result.after.en.name}. Born before then? Your Moon is in{" "}
                      {result.before.en.name}. After? It&rsquo;s in {result.after.en.name}.
                    </>
                  ) : (
                    <>
                      Примерно в <strong className="text-ink">{result.switchLocal}</strong> по вашему часовому поясу Луна
                      перешла из знака {result.before.ruGen} в знак {result.after.ruGen}. Родились раньше — Луна{" "}
                      {RU_PREP[result.before.slug]}, позже — {RU_PREP[result.after.slug]}.
                    </>
                  )}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <Link href={href(result.before)} className="text-iris hover:underline">
                    {moonIn(result.before)} →
                  </Link>
                  <Link href={href(result.after)} className="text-iris hover:underline">
                    {moonIn(result.after)} →
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
