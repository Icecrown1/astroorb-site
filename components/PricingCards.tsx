"use client";

import { useState } from "react";
import { PRICING } from "@/lib/site";
import CTA from "@/components/CTA";
import { ctaPage, type Locale } from "@/lib/i18n";

type Period = "m1" | "m6" | "m12";

const PERIOD_LABEL: Record<Period, string> = {
  m1: "Месяц",
  m6: "Полгода",
  m12: "Год",
};

const PERIOD_NOTE: Record<Period, string> = {
  m1: "оплата помесячно",
  m6: "при оплате за 6 месяцев",
  m12: "при оплате за год",
};

export default function PricingCards({ locale = "ru" }: { locale?: Locale }) {
  const [period, setPeriod] = useState<Period>("m12");
  const en = locale === "en";
  const L: Record<Period, string> = en ? { m1: "Monthly", m6: "6 months", m12: "Yearly" } : PERIOD_LABEL;
  const N: Record<Period, string> = en ? { m1: "billed monthly", m6: "billed every 6 months", m12: "billed yearly" } : PERIOD_NOTE;
  const T = en
    ? { forever: "forever", mo: "/mo", freeItems: ["Birth chart with the wheel", "Short planet descriptions"], lockedFree: ["Full interpretations", "Horoscopes, compatibility, matrix", "Solar Return"], startFree: "Start free", allFree: "Everything in Free", stars: "stars per month", fullAi: "Full AI interpretations", stdSet: "Horoscopes, compatibility, matrix, Oracle", solar: "Solar Return", chooseStd: "Choose Standard", allStd: "Everything in Standard", solarYear: "Solar Return — personal year forecast", oraclePrio: "Priority Oracle answers", choosePrem: "Choose Premium", na: " — not available on this plan" }
    : { forever: "навсегда", mo: "/мес", freeItems: ["Натальная карта с колесом", "Краткие описания планет"], lockedFree: ["Полные интерпретации", "Гороскопы, совместимость, матрица", "Соляр"], startFree: "{T.startFree}", allFree: "Всё из Free", stars: "звёзд в месяц", fullAi: "Полные AI-интерпретации", stdSet: "Гороскопы, совместимость, матрица, Oracle", solar: "Соляр", chooseStd: "{T.chooseStd}", allStd: "Всё из Standard", solarYear: "Соляр — прогноз на личный год", oraclePrio: "Приоритетные ответы Oracle", choosePrem: "{T.choosePrem}", na: " — недоступно в этом тарифе" };

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-hairline bg-surface p-1">
          {(Object.keys(L) as Period[]).map((p) => (
            <button
              key={p}
              aria-pressed={period === p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-5 py-2 text-sm transition-colors duration-200 ${
                period === p ? "bg-iris font-semibold text-void" : "text-muted hover:text-ink"
              }`}
            >
              {L[p]}
              {p === "m12" && <span className="ml-1.5 text-[11px] opacity-80">−50%+</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* FREE */}
        <div className="shell">
          <div className="core flex h-full flex-col p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Free</p>
            <p className="mt-3 font-display text-3xl">0 ₽</p>
            <p className="mt-1 text-sm text-muted">{T.forever}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              <Li ok na={T.na}>{T.freeItems[0]}</Li>
              <Li ok na={T.na}>{T.freeItems[1]}</Li>
              <Li na={T.na}>{T.lockedFree[0]}</Li>
              <Li na={T.na}>{T.lockedFree[1]}</Li>
              <Li na={T.na}>{T.lockedFree[2]}</Li>
            </ul>
            <div className="mt-7">
              <CTA page={ctaPage(locale, "pricing")} cta="free" ghost className="w-full justify-center">
                {T.startFree}
              </CTA>
            </div>
          </div>
        </div>

        {/* STANDARD */}
        <div className="shell">
          <div className="core flex h-full flex-col p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Standard</p>
            <p className="mt-3 font-display text-3xl">
              {PRICING.standard[period]} ₽<span className="text-base text-muted">{T.mo}</span>
            </p>
            <p className="mt-1 text-sm text-muted">{N[period]}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              <Li ok na={T.na}>{T.allFree}</Li>
              <Li ok na={T.na}>{PRICING.standard.orbs} {T.stars}</Li>
              <Li ok na={T.na}>{T.fullAi}</Li>
              <Li ok na={T.na}>{T.stdSet}</Li>
              <Li na={T.na}>{T.solar}</Li>
            </ul>
            <div className="mt-7">
              <CTA page={ctaPage(locale, "pricing")} cta="standard" className="w-full justify-center">
                {T.chooseStd}
              </CTA>
            </div>
          </div>
        </div>

        {/* PREMIUM */}
        <div className="rounded-shell border border-iris/50 bg-iris/[0.06] p-1.5">
          <div className="core flex h-full flex-col p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] grad-text">Premium</p>
            <p className="mt-3 font-display text-3xl">
              {PRICING.premium[period]} ₽<span className="text-base text-muted">{T.mo}</span>
            </p>
            <p className="mt-1 text-sm text-muted">{N[period]}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              <Li ok na={T.na}>{T.allStd}</Li>
              <Li ok na={T.na}>{PRICING.premium.orbs} {T.stars}</Li>
              <Li ok na={T.na}>{T.solarYear}</Li>
              <Li ok na={T.na}>{T.oraclePrio}</Li>
            </ul>
            <div className="mt-7">
              <CTA page={ctaPage(locale, "pricing")} cta="premium" className="w-full justify-center">
                {T.choosePrem}
              </CTA>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Li({ children, ok = false, na = " — недоступно в этом тарифе" }: { children: React.ReactNode; ok?: boolean; na?: string }) {
  return (
    <li className={`flex gap-2.5 ${ok ? "" : "text-muted/60 line-through decoration-hairline"}`}>
      <span aria-hidden="true" className={ok ? "text-stellar" : "text-muted/40"}>{ok ? "✦" : "—"}</span>
      {children}
      {!ok && <span className="sr-only">{na}</span>}
    </li>
  );
}
