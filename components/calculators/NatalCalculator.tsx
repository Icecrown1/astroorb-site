"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CITIES } from "@/lib/cities";
import { calcNatal, type NatalResult } from "@/lib/natal";
import { composeNatalSummary } from "@/lib/interpret";
import { UI, ctaPage, type Locale } from "@/lib/i18n";
import NatalWheel from "@/components/NatalWheel";
import CTA from "@/components/CTA";

export default function NatalCalculator({ locale = "ru" }: { locale?: Locale }) {
  const [date, setDate] = useState("1995-06-15");
  const [time, setTime] = useState("12:30");
  const [timeKnown, setTimeKnown] = useState(true);
  const [cityIdx, setCityIdx] = useState(0);
  const [tz, setTz] = useState(String(CITIES[0].tz));
  const resultRef = useRef<HTMLDivElement | null>(null);
  const t = UI[locale].calc;
  const sName = (x: { ru: string; en: { name: string } }) => (locale === "en" ? x.en.name : x.ru);
  const ERR = locale === "en"
    ? { date: "Please enter your date of birth.", tz: "Enter the time zone as a number from −12 to +14 (e.g. 3).", calc: "Could not calculate the chart for this date. Please check the data." }
    : { date: "Укажите дату рождения.", tz: "Часовой пояс укажите числом от −12 до +14 (например, 3).", calc: "Не удалось рассчитать карту для этой даты. Проверьте данные." };
  const [result, setResult] = useState<NatalResult | null>(null);

  useEffect(() => {
    if (!result || !resultRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [result]);
  const [error, setError] = useState("");

  const city = CITIES[cityIdx];

  const wheelPlanets = useMemo(() => {
    if (!result) return undefined;
    return result.planets.map((p) => ({
      symbol: p.symbol,
      lon: p.lon,
      accent: p.key === "sun" || p.key === "moon",
    }));
  }, [result]);

  function build() {
    setError("");
    if (!date) {
      setError(ERR.date);
      return;
    }
    const tzNum = Number(tz.replace(",", "."));
    if (Number.isNaN(tzNum) || tzNum < -12 || tzNum > 14) {
      setError(ERR.tz);
      return;
    }
    try {
      setResult(calcNatal(date, time || "12:00", tzNum, city.lat, city.lon, timeKnown));
    } catch {
      setError(ERR.calc);
    }
  }

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.birthDate}</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.birthTime}</span>
            <input
              type="time"
              value={time}
              disabled={!timeKnown}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60 disabled:opacity-40"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.city}</span>
            <select
              value={cityIdx}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setCityIdx(idx);
                setTz(String(CITIES[idx].tz));
              }}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            >
              {CITIES.map((c, i) => (
                <option key={locale === "en" ? c.en : c.name} value={i}>
                  {locale === "en" ? c.en : c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.tz}</span>
            <input
              type="text"
              inputMode="numeric"
              value={tz}
              onChange={(e) => setTz(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            />
          </label>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={!timeKnown}
            onChange={(e) => setTimeKnown(!e.target.checked)}
            className="h-4 w-4 accent-iris"
          />
          {t.noTime}
        </label>

        {error && <p className="mt-4 text-sm text-stellar">{error}</p>}

        <button
          onClick={build}
          className="mt-6 w-full rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98] md:w-auto"
        >
          {t.build}
        </button>

        {result && (
          <div ref={resultRef} className="mt-10 scroll-mt-24 border-t border-hairline pt-10" key={JSON.stringify(result.sun.lon)}>
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="flex justify-center">
                <NatalWheel
                  planets={wheelPlanets}
                  ascLon={result.ascendant?.lon ?? null}
                  size={360}
                />
              </div>
              <div className="space-y-4">
                <ResultCard
                  label={t.sunLabel}
                  value={`${result.sun.sign.symbol} ${sName(result.sun.sign)}`}
                  detail={`${result.sun.degInSign.toFixed(1)}° · ${(locale === "en" ? result.sun.sign.en.traits : result.sun.sign.traits).join(", ")}`}
                />
                <ResultCard
                  label={t.moonLabel}
                  value={`${result.moon.sign.symbol} ${sName(result.moon.sign)}`}
                  detail={`${result.moon.degInSign.toFixed(1)}° · ${t.innerSupport}: ${locale === "en" ? result.moon.sign.en.keyword : result.moon.sign.keyword}`}
                />
                {result.ascendant ? (
                  <ResultCard
                    label={t.ascLabel}
                    value={`${result.ascendant.sign.symbol} ${sName(result.ascendant.sign)}`}
                    detail={`${result.ascendant.degInSign.toFixed(1)}° · ${t.firstImpression}`}
                  />
                ) : (
                  <ResultCard
                    label={t.ascUnknown}
                    value={locale === "en" ? "Birth time needed" : "Нужно время рождения"}
                    detail={locale === "en" ? "In the Mini App you can refine the time from life events (rectification)" : "В Mini App можно уточнить время по событиям жизни (ректификация)"}
                  />
                )}
              </div>
            </div>

            {(() => {
              const sum = composeNatalSummary(
                result.sun.sign,
                result.moon.sign,
                result.ascendant?.sign ?? null,
                locale,
              );
              return (
                <div className="mt-6 space-y-3 rounded-2xl border border-hairline bg-surface p-6 text-sm leading-relaxed">
                  <p>{sum.sun}</p>
                  <p className="text-muted">{sum.moon}</p>
                  <p className="text-muted">{sum.blend}</p>
                  {sum.asc ? (
                    <p className="text-muted">{sum.asc}</p>
                  ) : (
                    <p className="text-muted">{t.addTimeHint}</p>
                  )}
                </div>
              );
            })()}

            {/* Частичный результат: интерпретации залочены → конверсия */}
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-hairline">
              <div className="select-none space-y-3 p-6 blur-[7px]" aria-hidden>
                <p className="text-sm leading-relaxed text-muted">
                  Ваше Солнце в {result.sun.sign.ru} раскрывается через дом карты, который определяет сферу
                  максимальной реализации. Аспекты к Луне показывают, как энергия личности взаимодействует с
                  эмоциональными потребностями, а положение управителя…
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  Меркурий, Венера и Марс формируют ваш стиль мышления, любви и действия. В вашей карте они
                  образуют конфигурацию, которая…
                </p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/55 p-6 text-center">
                <p className="max-w-md text-sm text-ink">
                  {t.unlockText}
                </p>
                <CTA page={ctaPage(locale, "natal-chart")} cta="result_unlock">{t.unlockCta}</CTA>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-void/60 p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-1.5 font-display text-xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{detail}</p>
    </div>
  );
}
