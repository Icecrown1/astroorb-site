"use client";

import { useState } from "react";
import { PRICING } from "@/lib/site";
import CTA from "@/components/CTA";

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

export default function PricingCards() {
  const [period, setPeriod] = useState<Period>("m12");

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-hairline bg-surface p-1">
          {(Object.keys(PERIOD_LABEL) as Period[]).map((p) => (
            <button
              key={p}
              aria-pressed={period === p}
              onClick={() => setPeriod(p)}
              className={`rounded-full px-5 py-2 text-sm transition-colors duration-200 ${
                period === p ? "bg-iris font-semibold text-void" : "text-muted hover:text-ink"
              }`}
            >
              {PERIOD_LABEL[p]}
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
            <p className="mt-1 text-sm text-muted">навсегда</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              <Li ok>Натальная карта с колесом</Li>
              <Li ok>Краткие описания планет</Li>
              <Li>Полные интерпретации</Li>
              <Li>Гороскопы, совместимость, матрица</Li>
              <Li>Соляр</Li>
            </ul>
            <div className="mt-7">
              <CTA page="pricing" cta="free" ghost className="w-full justify-center">
                Начать бесплатно
              </CTA>
            </div>
          </div>
        </div>

        {/* STANDARD */}
        <div className="shell">
          <div className="core flex h-full flex-col p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Standard</p>
            <p className="mt-3 font-display text-3xl">
              {PRICING.standard[period]} ₽<span className="text-base text-muted">/мес</span>
            </p>
            <p className="mt-1 text-sm text-muted">{PERIOD_NOTE[period]}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              <Li ok>Всё из Free</Li>
              <Li ok>{PRICING.standard.orbs} звёзд в месяц</Li>
              <Li ok>Полные AI-интерпретации</Li>
              <Li ok>Гороскопы, совместимость, матрица, Oracle</Li>
              <Li>Соляр</Li>
            </ul>
            <div className="mt-7">
              <CTA page="pricing" cta="standard" className="w-full justify-center">
                Выбрать Standard
              </CTA>
            </div>
          </div>
        </div>

        {/* PREMIUM */}
        <div className="rounded-shell border border-iris/50 bg-iris/[0.06] p-1.5">
          <div className="core flex h-full flex-col p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] grad-text">Premium</p>
            <p className="mt-3 font-display text-3xl">
              {PRICING.premium[period]} ₽<span className="text-base text-muted">/мес</span>
            </p>
            <p className="mt-1 text-sm text-muted">{PERIOD_NOTE[period]}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              <Li ok>Всё из Standard</Li>
              <Li ok>{PRICING.premium.orbs} звёзд в месяц</Li>
              <Li ok>Соляр — прогноз на личный год</Li>
              <Li ok>Приоритетные ответы Oracle</Li>
            </ul>
            <div className="mt-7">
              <CTA page="pricing" cta="premium" className="w-full justify-center">
                Выбрать Premium
              </CTA>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Li({ children, ok = false }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <li className={`flex gap-2.5 ${ok ? "" : "text-muted/60 line-through decoration-hairline"}`}>
      <span aria-hidden="true" className={ok ? "text-stellar" : "text-muted/40"}>{ok ? "✦" : "—"}</span>
      {children}
      {!ok && <span className="sr-only"> — недоступно в этом тарифе</span>}
    </li>
  );
}
