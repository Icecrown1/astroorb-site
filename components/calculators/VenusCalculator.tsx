"use client";

import Link from "next/link";
import { useState } from "react";
import { RU_PREP } from "@/lib/moon";
import { venusForBirth, type VenusDayResult } from "@/lib/venus";
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
    hint: "Москва — 3, Душанбе и Ташкент — 5, Бишкек — 6. Время и пояс важны, только если Венера в день рождения сменила знак.",
    button: "Узнать знак Венеры",
    errDate: "Укажите дату рождения.",
    errTz: "Часовой пояс укажите числом от −12 до +14 (например, 3).",
    errCalc: "Не удалось рассчитать Венеру для этой даты. Проверьте данные.",
    yourVenus: "Ваша Венера",
    switched: "В этот день Венера сменила знак",
  },
  en: {
    date: "Date of birth",
    time: "Time of birth",
    tz: "UTC offset, hours",
    tzDefault: "0",
    knowTime: "I know my birth time",
    hint: "London — 0 (1 in summer), New York — −5 (−4 in summer), Moscow — 3. Time and zone only matter if Venus changed signs on your birthday.",
    button: "Find my Venus sign",
    errDate: "Please enter your date of birth.",
    errTz: "Enter the time zone as a number from −12 to +14 (e.g. −5).",
    errCalc: "Could not calculate Venus for this date. Please check your details.",
    yourVenus: "Your Venus",
    switched: "Venus changed signs that day",
  },
} as const;

/**
 * Калькулятор знака Венеры по дате рождения. Считает в браузере через astronomy-engine.
 * Подписи знаков (taglines) приходят пропсом со страницы — тексты не попадают в клиентский бандл.
 */
export default function VenusCalculator({ locale = "ru", taglines }: { locale?: Locale; taglines: Record<string, string> }) {
  const en = locale === "en";
  const t = T[en ? "en" : "ru"];
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [timeKnown, setTimeKnown] = useState(false);
  const [tz, setTz] = useState<string>(t.tzDefault);
  const [error, setError] = useState("");
  const [result, setResult] = useState<VenusDayResult | null>(null);

  const href = (s: Sign) => `${en ? "/en" : ""}/planets/venus/${s.slug}`;
  const venusIn = (s: Sign) => (en ? `Venus in ${s.en.name}` : `Венера ${RU_PREP[s.slug]}`);
  const tagline = (s: Sign) => taglines[s.slug] ?? "";

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
      setResult(venusForBirth(date, timeKnown ? time || "12:00" : null, tzNum));
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
            <input type="date" value={date} min="1900-01-01" onChange={(e) => setDate(e.target.value)} className={INPUT} />
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
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t.yourVenus}</p>
                <p className="mt-2 font-display text-2xl">
                  {result.sign.symbol}{" "}
                  {en ? (
                    <>
                      Venus in <span className="grad-text">{result.sign.en.name}</span>
                    </>
                  ) : (
                    <>
                      Венера <span className="grad-text">{RU_PREP[result.sign.slug]}</span>
                    </>
                  )}
                </p>
                <p className="mt-2 text-[15px] text-muted">{tagline(result.sign)}</p>
                <Link
                  href={href(result.sign)}
                  className="mt-4 inline-block text-sm text-iris underline decoration-iris/40 underline-offset-4 hover:decoration-iris"
                >
                  {en ? "Read" : "Читать"}: {venusIn(result.sign)} →
                </Link>
              </>
            ) : (
              <>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t.switched}</p>
                <p className="mt-2 text-[15px] leading-relaxed">
                  {en ? (
                    <>
                      Around <strong className="text-ink">{result.switchLocal}</strong> in your time zone, Venus moved
                      from {result.before.en.name} into {result.after.en.name}. Born before then? Your Venus is in{" "}
                      {result.before.en.name}. After? It&rsquo;s in {result.after.en.name}.
                    </>
                  ) : (
                    <>
                      Примерно в <strong className="text-ink">{result.switchLocal}</strong> по вашему часовому поясу
                      Венера перешла из знака {result.before.ruGen} в знак {result.after.ruGen}. Родились раньше —
                      Венера {RU_PREP[result.before.slug]}, позже — {RU_PREP[result.after.slug]}.
                    </>
                  )}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <Link href={href(result.before)} className="text-iris hover:underline">
                    {venusIn(result.before)} →
                  </Link>
                  <Link href={href(result.after)} className="text-iris hover:underline">
                    {venusIn(result.after)} →
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
