"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SIGNS } from "@/lib/zodiac";
import { calcCompat, canonicalPair, type CompatResult } from "@/lib/compat";
import CTA from "@/components/CTA";
import ShareButton from "@/components/ShareButton";
import { ctaPage, localePath, type Locale } from "@/lib/i18n";

export default function CompatCalculator({ locale = "ru" }: { locale?: Locale }) {
  const [a, setA] = useState("leo");
  const [b, setB] = useState("libra");
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [result, setResult] = useState<CompatResult | null>(null);

  useEffect(() => {
    if (!result || !resultRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [result]);

  const T = locale === "en"
    ? { first: "First sign", second: "Second sign", check: "Check compatibility", pair: "Detailed pair page →", teaser1: (x: string, y: string) => `Love & passion: how ${x} and ${y} express feelings…`, teaser2: "Money & everyday life: who anchors stability in the pair…", teaser3: "Crisis points: three situations where the pair is at risk…", locked: "This is a general sign-based estimate. The precise synastry from two full birth charts is in Astro Orb", open: "Reading from your charts" }
    : { first: "Первый знак", second: "Второй знак", check: "Проверить совместимость", pair: "{T.pair}", teaser1: (x: string, y: string) => `Любовь и страсть: как ${x} и ${y} проявляют чувства…`, teaser2: "Деньги и быт: кто в паре отвечает за стабильность…", teaser3: "Кризисные точки: три ситуации, в которых пара рискует…", locked: "{T.locked}", open: "Разбор по вашим картам" };
  const sN = (x: { ru: string; en: { name: string } }) => (locale === "en" ? x.en.name : x.ru);

  function build() {
    setResult(calcCompat(a, b, locale));
  }

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{T.first}</span>
            <select
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            >
              {SIGNS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.symbol} {locale === "en" ? s.en.name : s.ru}
                </option>
              ))}
            </select>
          </label>
          <div className="hidden items-end pb-3 font-display text-xl text-stellar sm:flex">+</div>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{T.second}</span>
            <select
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            >
              {SIGNS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.symbol} {locale === "en" ? s.en.name : s.ru}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              {locale === "en" ? "Your name (optional)" : "Ваше имя (необязательно)"}
            </span>
            <input
              type="text"
              value={nameA}
              maxLength={20}
              onChange={(e) => setNameA(e.target.value)}
              placeholder={locale === "en" ? "Anna" : "Аня"}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              {locale === "en" ? "Partner's name (optional)" : "Имя партнёра (необязательно)"}
            </span>
            <input
              type="text"
              value={nameB}
              maxLength={20}
              onChange={(e) => setNameB(e.target.value)}
              placeholder={locale === "en" ? "Dan" : "Дима"}
              className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
            />
          </label>
        </div>

        <button
          onClick={build}
          className="mt-6 w-full rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98] sm:w-auto"
        >
          {T.check}
        </button>

        {result && (
          <div ref={resultRef} className="mt-10 scroll-mt-24 border-t border-hairline pt-10" key={`${a}-${b}`}>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="card-flip flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-iris/40 bg-void/60">
                <span className="font-display text-3xl grad-text">{result.score}%</span>
              </div>
              <div>
                <p className="font-display text-xl">
                  {result.a.symbol} {sN(result.a)} + {result.b.symbol} {sN(result.b)}: {result.headline}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{result.paragraph}</p>
                <Link
                  href={localePath(locale, `/compatibility/${canonicalPair(a, b)}`)}
                  className="mt-3 inline-block text-sm text-iris hover:underline"
                >
                  {T.pair}
                </Link>
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-2xl border border-hairline">
              <div className="select-none space-y-2 p-6 blur-[7px]" aria-hidden>
                <p className="text-sm text-muted">{T.teaser1(sN(result.a), sN(result.b))}</p>
                <p className="text-sm text-muted">{T.teaser2}</p>
                <p className="text-sm text-muted">{T.teaser3}</p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/55 p-6 text-center">
                <p className="max-w-md text-sm text-ink">
                  {T.locked}
                </p>
                <CTA page={ctaPage(locale, "compatibility")} cta="result_unlock">{T.open}</CTA>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <ShareButton
                type="compat"
                locale={locale}
                url={`/share/compat?pair=${canonicalPair(a, b)}&l=${locale}${nameA.trim() ? `&a=${encodeURIComponent(nameA.trim())}` : ""}${nameB.trim() ? `&b=${encodeURIComponent(nameB.trim())}` : ""}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
