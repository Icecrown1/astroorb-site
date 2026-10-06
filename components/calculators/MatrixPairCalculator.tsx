"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CTA from "@/components/CTA";
import { arcanaByNumber } from "@/lib/arcana";
import { ctaPage, localePath, type Locale } from "@/lib/i18n";
import { PAIR_CENTER, PAIR_ZONES, pairCore, personalCore, type PairCore } from "@/lib/matrixPair";

const INPUT =
  "mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3 text-ink outline-none transition-colors duration-200 focus:border-iris/60";

const T = {
  ru: {
    you: "Ваша дата рождения",
    partner: "Дата рождения партнёра",
    calc: "Рассчитать совместимость",
    errDates: "Укажите обе даты рождения.",
    errYear: "Проверьте даты: год от 1900 до 2100.",
    yourCenter: "Ваш центр",
    partnerCenter: "Центр партнёра",
    pairCenter: "Центр пары",
    centerTitle: "Центр пары",
    zones: "Арканы пяти зон вашей пары",
    lockedTitle: "Полный разбор пары",
    locked:
      "Для каждой зоны — как ваша пара живёт в плюсе и где ломается в минусе, конкретными ситуациями из быта, денег и ссор, плюс три шага на месяц. Разбор пишется по вашим датам в AstroOrbi.",
    open: "Открыть разбор пары",
  },
  en: {
    you: "Your date of birth",
    partner: "Partner's date of birth",
    calc: "Calculate compatibility",
    errDates: "Please enter both dates of birth.",
    errYear: "Check the dates: the year must be 1900–2100.",
    yourCenter: "Your center",
    partnerCenter: "Partner's center",
    pairCenter: "Couple center",
    centerTitle: "Couple center",
    zones: "The arcana of your couple's five zones",
    lockedTitle: "Full couple reading",
    locked:
      "For each zone: how your couple works at its best and where it breaks down at its worst, in concrete situations about home, money and arguments — plus three steps for the month. Written for your dates in AstroOrbi.",
    open: "Open the couple reading",
  },
} as const;

type Result = { me: PairCore; partner: PairCore; pair: PairCore };

/** Калькулятор совместимости по матрице судьбы: две даты → центры и зоны матрицы пары. */
export default function MatrixPairCalculator({ locale = "ru" }: { locale?: Locale }) {
  const en = locale === "en";
  const t = T[en ? "en" : "ru"];
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!res || !resultRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [res]);

  const name = (n: number) => {
    const a = arcanaByNumber(n);
    return en ? a.en.name : a.ru;
  };
  const href = (n: number) => localePath(locale, `/matrix/${arcanaByNumber(n).slug}`);

  function calc() {
    setError("");
    setRes(null);
    if (!d1 || !d2) {
      setError(t.errDates);
      return;
    }
    const me = personalCore(d1);
    const partner = personalCore(d2);
    if (!me || !partner) {
      setError(t.errYear);
      return;
    }
    setRes({ me, partner, pair: pairCore(me, partner) });
  }

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.you}</span>
            <input type="date" value={d1} min="1900-01-01" onChange={(e) => setD1(e.target.value)} className={INPUT} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{t.partner}</span>
            <input type="date" value={d2} min="1900-01-01" onChange={(e) => setD2(e.target.value)} className={INPUT} />
          </label>
          <button
            onClick={calc}
            className="rounded-full bg-iris px-6 py-3.5 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98]"
          >
            {t.calc}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-stellar">{error}</p>}

        {res && (
          <div ref={resultRef} className="mt-10 scroll-mt-24 border-t border-hairline pt-10" aria-live="polite">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t.yourCenter, n: res.me.e, accent: false },
                { label: t.partnerCenter, n: res.partner.e, accent: false },
                { label: t.pairCenter, n: res.pair.e, accent: true },
              ].map((x) => (
                <div
                  key={x.label}
                  className={`rounded-2xl border p-4 text-center ${x.accent ? "border-iris/50 bg-iris/10" : "border-hairline bg-void/60"}`}
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted md:text-[11px]">{x.label}</p>
                  <p className={`mt-2 font-display text-3xl ${x.accent ? "grad-text" : ""}`}>{x.n}</p>
                  <p className="mt-1 text-xs text-muted md:text-sm">{name(x.n)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-iris/30 bg-surface p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                {t.centerTitle} {res.pair.e} · {name(res.pair.e)}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">{en ? PAIR_CENTER[res.pair.e].en : PAIR_CENTER[res.pair.e].ru}</p>
              <Link href={href(res.pair.e)} className="mt-4 inline-block text-sm text-iris hover:underline">
                {en ? `Meaning of ${name(res.pair.e)}` : `Значение аркана «${name(res.pair.e)}»`} →
              </Link>
            </div>

            <h3 className="mt-8 font-display text-lg">{t.zones}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PAIR_ZONES.map((z) => {
                const ar = z.pick(res.pair);
                return (
                  <div key={z.id} className="rounded-2xl border border-hairline bg-void/60 p-4">
                    <p className="font-medium">{en ? z.title.en : z.title.ru}</p>
                    <ul className="mt-2 space-y-1">
                      {ar.map((n, i) => (
                        <li key={i} className="text-sm text-muted">
                          <Link href={href(n)} className="text-ink hover:text-iris">
                            {n} · {name(n)}
                          </Link>{" "}
                          — {en ? z.roles[i].en : z.roles[i].ru}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-iris/30 bg-surface">
              <div className="select-none space-y-2 px-6 pt-6 opacity-60 blur-[5px]" aria-hidden>
                <p className="text-sm text-muted">＋ {en ? "At its best" : "В плюсе"}: ████████ ██████ ████ ███████ █████ ██████████.</p>
                <p className="text-sm text-muted">－ {en ? "At its worst" : "В минусе"}: ██████ ████████ █████ ███ ███████ ████.</p>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <p className="font-display text-lg">{t.lockedTitle}</p>
                <p className="max-w-md text-sm text-muted">{t.locked}</p>
                <CTA page={ctaPage(locale, "matrix_pair")} cta="result_unlock">
                  {t.open}
                </CTA>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
