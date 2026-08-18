"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { arcanaByNumber, calcMatrix, type MatrixResult } from "@/lib/arcana";
import CTA from "@/components/CTA";

export default function MatrixCalculator() {
  const [date, setDate] = useState("1995-06-15");
  const resultRef = useRef<HTMLDivElement | null>(null);
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
      setError("Укажите дату рождения.");
      return;
    }
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d || y < 1900 || y > 2100) {
      setError("Проверьте дату: год от 1900 до 2100.");
      return;
    }
    setResult(calcMatrix(d, m, y));
  }

  const day = result ? arcanaByNumber(result.day) : null;
  const core = result ? arcanaByNumber(result.core) : null;

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="block flex-1">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Дата рождения</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            />
          </label>
          <button
            onClick={build}
            className="rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98]"
          >
            Рассчитать матрицу
          </button>
        </div>
        {error && <p className="mt-4 text-sm text-stellar">{error}</p>}

        {result && day && core && (
          <div ref={resultRef} className="mt-10 scroll-mt-24 border-t border-hairline pt-10" key={date}>
            {/* Открытые энергии: личный аркан и аркан судьбы */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card-flip rounded-2xl border border-iris/30 bg-void/60 p-6" style={{ animationDelay: "0ms" }}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Личный аркан · энергия {result.day}</p>
                <p className="mt-2 font-display text-2xl">
                  {result.day}. {day.ru}
                </p>
                <p className="mt-1 text-sm text-stellar">{day.keyword}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{day.plus}</p>
                <Link href={`/matrix/${day.slug}`} className="mt-4 inline-block text-sm text-iris hover:underline">
                  Полное значение аркана «{day.ru}» →
                </Link>
              </div>
              <div className="card-flip rounded-2xl border border-stellar/30 bg-void/60 p-6" style={{ animationDelay: "140ms" }}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Аркан судьбы · энергия {result.core}</p>
                <p className="mt-2 font-display text-2xl">
                  {result.core}. {core.ru}
                </p>
                <p className="mt-1 text-sm text-stellar">{core.keyword}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{core.task}</p>
                <Link href={`/matrix/${core.slug}`} className="mt-4 inline-block text-sm text-iris hover:underline">
                  Полное значение аркана «{core.ru}» →
                </Link>
              </div>
            </div>

            {/* Залоченные позиции матрицы → конверсия */}
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-hairline">
              <div className="grid select-none gap-4 p-6 blur-[7px] sm:grid-cols-3" aria-hidden>
                {[
                  { t: "Энергия рода", n: result.month },
                  { t: "Кармический хвост", n: result.year },
                  { t: "Зона комфорта и денег", n: result.comfort },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-hairline p-4">
                    <p className="text-xs text-muted">{x.t}</p>
                    <p className="mt-1 font-display text-xl">
                      {x.n}. {arcanaByNumber(x.n).ru}
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/55 p-6 text-center">
                <p className="max-w-md text-sm text-ink">
                  Ещё 3 позиции рассчитаны: род, карма, деньги. Полный разбор всех энергий вашей матрицы — в Astro Orb
                </p>
                <CTA page="matrix" cta="result_unlock">Открыть все энергии</CTA>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
