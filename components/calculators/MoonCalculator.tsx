"use client";

import Link from "next/link";
import { useState } from "react";
import { moonForBirth, MOON_RU, RU_PREP, type MoonDayResult } from "@/lib/moon";

const INPUT =
  "mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60 disabled:opacity-40";

/** Калькулятор знака Луны по дате рождения (RU). Считает в браузере через astronomy-engine. */
export default function MoonCalculator() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [timeKnown, setTimeKnown] = useState(false);
  const [tz, setTz] = useState("3");
  const [error, setError] = useState("");
  const [result, setResult] = useState<MoonDayResult | null>(null);

  function calc() {
    setError("");
    setResult(null);
    if (!date) {
      setError("Укажите дату рождения.");
      return;
    }
    const tzNum = Number(tz.replace(",", "."));
    if (Number.isNaN(tzNum) || tzNum < -12 || tzNum > 14) {
      setError("Часовой пояс укажите числом от −12 до +14 (например, 3).");
      return;
    }
    try {
      setResult(moonForBirth(date, timeKnown ? time || "12:00" : null, tzNum));
    } catch {
      setError("Не удалось рассчитать Луну для этой даты. Проверьте данные.");
    }
  }

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Дата рождения</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={INPUT} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Время рождения</span>
            <input
              type="time"
              value={time}
              disabled={!timeKnown}
              onChange={(e) => setTime(e.target.value)}
              className={INPUT}
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Часовой пояс, UTC+</span>
            <input inputMode="decimal" value={tz} onChange={(e) => setTz(e.target.value)} className={INPUT} />
          </label>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={timeKnown}
            onChange={(e) => setTimeKnown(e.target.checked)}
            className="h-4 w-4 accent-iris"
          />
          Знаю время рождения
        </label>
        <p className="mt-2 text-xs text-muted">
          Москва — 3, Душанбе и Ташкент — 5, Бишкек — 6. Время и пояс важны только в день, когда Луна меняет знак.
        </p>

        {error && <p className="mt-4 text-sm text-stellar">{error}</p>}

        <button
          onClick={calc}
          className="mt-6 w-full rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98] md:w-auto"
        >
          Узнать знак Луны
        </button>

        {result && (
          <div className="mt-8 rounded-2xl border border-iris/30 bg-surface p-6" aria-live="polite">
            {result.kind === "single" ? (
              <>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Ваша Луна</p>
                <p className="mt-2 font-display text-2xl">
                  {result.sign.symbol} Луна <span className="grad-text">{RU_PREP[result.sign.slug]}</span>
                </p>
                <p className="mt-2 text-[15px] text-muted">{MOON_RU[result.sign.slug].tagline}</p>
                <Link
                  href={`/planets/moon/${result.sign.slug}`}
                  className="mt-4 inline-block text-sm text-iris underline decoration-iris/40 underline-offset-4 hover:decoration-iris"
                >
                  Читать: Луна {RU_PREP[result.sign.slug]} →
                </Link>
              </>
            ) : (
              <>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">В этот день Луна сменила знак</p>
                <p className="mt-2 text-[15px] leading-relaxed">
                  Примерно в <strong className="text-ink">{result.switchLocal}</strong> по вашему часовому поясу Луна
                  перешла из знака {result.before.ruGen} в знак {result.after.ruGen}. Родились раньше — Луна{" "}
                  {RU_PREP[result.before.slug]}, позже — {RU_PREP[result.after.slug]}.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <Link href={`/planets/moon/${result.before.slug}`} className="text-iris hover:underline">
                    Луна {RU_PREP[result.before.slug]} →
                  </Link>
                  <Link href={`/planets/moon/${result.after.slug}`} className="text-iris hover:underline">
                    Луна {RU_PREP[result.after.slug]} →
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
