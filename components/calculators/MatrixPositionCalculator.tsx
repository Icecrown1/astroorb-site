"use client";

import Link from "next/link";
import { useState } from "react";
import CTA from "@/components/CTA";
import { personalCore } from "@/lib/matrixPair";

const INPUT =
  "mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60";

type ArcanaLite = { n: number; slug: string; ru: string };

/**
 * Мини-калькулятор для страниц «аркан в денежном канале / в кармическом хвосте»:
 * дата рождения → три числа позиции со ссылками на страницы этих арканов.
 * Имена арканов приходят пропсом — длинные тексты не попадают в клиентский бандл.
 */
export default function MatrixPositionCalculator({
  mode,
  current,
  arcana,
  available,
}: {
  mode: "money" | "tail";
  /** Аркан текущей страницы — подсвечивается, если совпал */
  current: number;
  arcana: ArcanaLite[];
  /** Арканы, для которых в этой позиции есть страница */
  available: number[];
}) {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [nums, setNums] = useState<number[] | null>(null);

  const byN = (n: number) => arcana.find((a) => a.n === n)!;
  const sub = mode === "money" ? "money-channel" : "karmic-tail";
  const labels =
    mode === "money"
      ? ["Точка входа в деньги", "Материальная задача (год рождения)", "Денежный угол родового квадрата"]
      : ["Первое число — что тянется из прошлого", "Второе число — как проявляется сейчас", "Третье число — главный урок"];

  function calc() {
    setError("");
    setNums(null);
    if (!date) {
      setError("Укажите дату рождения.");
      return;
    }
    const core = personalCore(date);
    if (!core) {
      setError("Проверьте дату: год от 1900 до 2100.");
      return;
    }
    setNums(mode === "money" ? [core.moneyEntry, core.c, core.rodBR] : [core.tailG, core.tailR, core.tailS]);
  }

  return (
    <div className="shell">
      <div className="core p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="block flex-1">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Дата рождения</span>
            <input type="date" value={date} min="1900-01-01" onChange={(e) => setDate(e.target.value)} className={INPUT} />
          </label>
          <button
            onClick={calc}
            className="rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98]"
          >
            {mode === "money" ? "Рассчитать денежный канал" : "Рассчитать кармический хвост"}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-stellar">{error}</p>}

        {nums && (
          <div className="mt-6" aria-live="polite">
            {mode === "tail" && (
              <p className="font-display text-2xl">
                Ваш кармический хвост: <span className="grad-text">{nums.join(" — ")}</span>
              </p>
            )}
            <ul className="mt-4 space-y-2">
              {nums.map((n, i) => {
                const a = byN(n);
                const hit = n === current;
                return (
                  <li
                    key={i}
                    className={`flex flex-wrap items-baseline justify-between gap-2 rounded-xl border px-4 py-3 ${
                      hit ? "border-iris/50 bg-iris/10" : "border-hairline bg-void/60"
                    }`}
                  >
                    <span className="text-sm text-muted">{labels[i]}</span>
                    {available.includes(n) ? (
                      <Link href={`/matrix/${a.slug}/${sub}`} className="font-medium text-iris hover:underline">
                        {n} · {a.ru} →
                      </Link>
                    ) : (
                      <Link href={`/matrix/${a.slug}`} className="font-medium text-iris hover:underline">
                        {n} · {a.ru} →
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            {nums.includes(current) && (
              <p className="mt-3 text-sm text-stellar">
                Аркан {current} есть в вашем {mode === "money" ? "денежном канале" : "кармическом хвосте"} — эта страница про
                вас.
              </p>
            )}
            <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-hairline bg-surface p-5 sm:flex-row sm:items-center">
              <p className="text-sm text-muted sm:flex-1">
                {mode === "money"
                  ? "В AstroOrbi — разбор всех трёх чисел канала вместе: как они складываются в ваш способ зарабатывать и что делать в этом месяце."
                  : "В AstroOrbi — разбор всей связки хвоста: как три числа работают вместе и с чего начать проработку."}
              </p>
              <CTA page={mode === "money" ? "matrix_money" : "matrix_tail"} cta="position_calc">
                Открыть разбор
              </CTA>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
