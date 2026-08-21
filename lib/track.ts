"use client";

/**
 * Отправка события конверсии (клик по CTA → переход в Mini App)
 * в Яндекс.Метрику и GA4. Счётчики подключаются через env:
 * NEXT_PUBLIC_YM_ID и NEXT_PUBLIC_GA_ID — без них молча ничего не делает.
 */
export function trackCta(page: string, cta: string) {
  const label = `${page}_${cta}`;
  try {
    const ymId = process.env.NEXT_PUBLIC_YM_ID;
    const w = window as any;
    if (ymId && typeof w.ym === "function") {
      w.ym(Number(ymId), "reachGoal", "cta_click", { page, cta, label });
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", "cta_click", { page, cta, label });
    }
  } catch {
    /* аналитика не должна ломать переход */
  }
}

/** Произвольная цель (например lead_submit) в обе системы. */
export function trackGoal(goal: string, params?: Record<string, unknown>) {
  try {
    const ymId = process.env.NEXT_PUBLIC_YM_ID;
    const w = window as any;
    if (ymId && typeof w.ym === "function") w.ym(Number(ymId), "reachGoal", goal, params);
    if (typeof w.gtag === "function") w.gtag("event", goal, params);
  } catch {
    /* noop */
  }
}
