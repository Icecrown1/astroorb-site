"use client";

import { useState } from "react";
import Link from "next/link";
import { SIGNS } from "@/lib/zodiac";
import { calcCompat, canonicalPair, type CompatResult } from "@/lib/compat";
import CTA from "@/components/CTA";

export default function CompatCalculator() {
  const [a, setA] = useState("leo");
  const [b, setB] = useState("libra");
  const [result, setResult] = useState<CompatResult | null>(null);

  function build() {
    setResult(calcCompat(a, b));
  }

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Первый знак</span>
            <select
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            >
              {SIGNS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.symbol} {s.ru}
                </option>
              ))}
            </select>
          </label>
          <div className="hidden items-end pb-3 font-display text-xl text-stellar sm:flex">+</div>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Второй знак</span>
            <select
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            >
              {SIGNS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.symbol} {s.ru}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          onClick={build}
          className="mt-6 w-full rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98] sm:w-auto"
        >
          Проверить совместимость
        </button>

        {result && (
          <div className="mt-10 border-t border-hairline pt-10" key={`${a}-${b}`}>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="card-flip flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-iris/40 bg-void/60">
                <span className="font-display text-3xl grad-text">{result.score}%</span>
              </div>
              <div>
                <p className="font-display text-xl">
                  {result.a.symbol} {result.a.ru} + {result.b.symbol} {result.b.ru}: {result.headline}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{result.paragraph}</p>
                <Link
                  href={`/compatibility/${canonicalPair(a, b)}`}
                  className="mt-3 inline-block text-sm text-iris hover:underline"
                >
                  Подробная страница пары →
                </Link>
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-hairline">
              <div className="select-none space-y-2 p-6 blur-[7px]" aria-hidden>
                <p className="text-sm text-muted">Любовь и страсть: как {result.a.ru} и {result.b.ru} проявляют чувства…</p>
                <p className="text-sm text-muted">Деньги и быт: кто в паре отвечает за стабильность…</p>
                <p className="text-sm text-muted">Кризисные точки: три ситуации, в которых пара рискует…</p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/55 p-6 text-center">
                <p className="max-w-md text-sm text-ink">
                  Это общий расчёт по знакам. Точная синастрия по двум полным натальным картам — в Astro Orb
                </p>
                <CTA page="compatibility" cta="result_unlock">Разбор по вашим картам</CTA>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
