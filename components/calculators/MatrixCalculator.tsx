"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { arcanaByNumber, calcMatrix, type MatrixResult } from "@/lib/arcana";
import CTA from "@/components/CTA";
import ShareButton from "@/components/ShareButton";
import { ctaPage, localePath, type Locale } from "@/lib/i18n";

export default function MatrixCalculator({ locale = "ru" }: { locale?: Locale }) {
  const [date, setDate] = useState("1995-06-15");
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [result, setResult] = useState<MatrixResult | null>(null);

  useEffect(() => {
    if (!result || !resultRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [result]);
  const [error, setError] = useState("");

  function build() {
    setError("");
    if (!date) {
      setError(T.errDate);
      return;
    }
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d || y < 1900 || y > 2100) {
      setError(T.errYear);
      return;
    }
    setResult(calcMatrix(d, m, y));
  }

  const T = locale === "en"
    ? { date: "Date of birth", calc: "Calculate matrix", personal: "Personal arcana · energy", destiny: "Destiny arcana · energy", full: "Full meaning of", locked: "3 more positions are calculated: family line, karma, money. The full reading of all your matrix energies is in Astro Orb", open: "Unlock all energies", errDate: "Please enter your date of birth.", errYear: "Check the date: year must be 1900–2100." }
    : { date: "Дата рождения", calc: "Рассчитать матрицу", personal: "Личный аркан · энергия", destiny: "Аркан судьбы · энергия", full: "Полное значение аркана", locked: "{T.locked}", open: "Открыть все энергии", errDate: "Укажите дату рождения.", errYear: "Проверьте дату: год от 1900 до 2100." };
  const aName = (a: { ru: string; en: { name: string } }) => (locale === "en" ? a.en.name : a.ru);
  const aKeyword = (a: { keyword: string; en: { keyword: string } }) => (locale === "en" ? a.en.keyword : a.keyword);
  const aPlus = (a: { plus: string; en: { plus: string } }) => (locale === "en" ? a.en.plus : a.plus);
  const aTask = (a: { task: string; en: { task: string } }) => (locale === "en" ? a.en.task : a.task);
  const day = result ? arcanaByNumber(result.day) : null;
  const core = result ? arcanaByNumber(result.core) : null;

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="block flex-1">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{T.date}</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            />
          </label>
          <label className="block flex-1">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              {locale === "en" ? "Name (optional)" : "Имя (необязательно)"}
            </span>
            <input
              type="text"
              value={name}
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              placeholder={locale === "en" ? "Anna" : "Аня"}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            />
          </label>
          <button
            onClick={build}
            className="rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98]"
          >
            {T.calc}
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-stellar">{error}</p>}

        {result && day && core && (
          <div ref={resultRef} className="mt-10 scroll-mt-24 border-t border-hairline pt-10" key={date}>
            {/* Открытые энергии: личный аркан и аркан судьбы */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card-flip rounded-2xl border border-iris/30 bg-void/60 p-6" style={{ animationDelay: "0ms" }}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{T.personal} {result.day}</p>
                <p className="mt-2 font-display text-2xl">
                  {result.day}. {aName(day)}
                </p>
                <p className="mt-1 text-sm text-stellar">{aKeyword(day)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{aPlus(day)}</p>
                <Link href={localePath(locale, `/matrix/${day.slug}`)} className="mt-4 inline-block text-sm text-iris hover:underline">
                  {T.full} «{aName(day)}» →
                </Link>
              </div>
              <div className="card-flip rounded-2xl border border-stellar/30 bg-void/60 p-6" style={{ animationDelay: "140ms" }}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{T.destiny} {result.core}</p>
                <p className="mt-2 font-display text-2xl">
                  {result.core}. {aName(core)}
                </p>
                <p className="mt-1 text-sm text-stellar">{aKeyword(core)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{aTask(core)}</p>
                <Link href={localePath(locale, `/matrix/${core.slug}`)} className="mt-4 inline-block text-sm text-iris hover:underline">
                  {T.full} «{aName(core)}» →
                </Link>
              </div>
            </div>

            {/* Залоченные позиции матрицы → конверсия */}
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-hairline">
              <div className="grid select-none gap-4 p-6 blur-[7px] sm:grid-cols-3" aria-hidden>
                {[
                  { t: locale === "en" ? "Family line energy" : "Энергия рода", n: result.month },
                  { t: locale === "en" ? "Karmic tail" : "Кармический хвост", n: result.year },
                  { t: locale === "en" ? "Comfort & money zone" : "Зона комфорта и денег", n: result.comfort },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-hairline p-4">
                    <p className="text-xs text-muted">{x.t}</p>
                    <p className="mt-1 font-display text-xl">
                      {x.n}. {aName(arcanaByNumber(x.n))}
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/55 p-6 text-center">
                <p className="max-w-md text-sm text-ink">
                  {T.locked}
                </p>
                <CTA page={ctaPage(locale, "matrix")} cta="result_unlock">{T.open}</CTA>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <ShareButton
                type="matrix"
                locale={locale}
                url={`/share/matrix?arcana=${core.slug}&l=${locale}${name.trim() ? `&name=${encodeURIComponent(name.trim())}` : ""}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
