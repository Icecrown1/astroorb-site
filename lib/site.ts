export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://astroorb.app";

export const BOT_USERNAME =
  process.env.NEXT_PUBLIC_BOT_USERNAME ?? "AstroOrbBot";

export const SITE_NAME = "Astro Orb";

/**
 * Сквозная атрибуция (ТЗ §2): каждый deep-link формируется как
 * t.me/<bot>?start=web_{page_slug}_{cta_id} — источник доезжает до оплаты.
 * Параметр start у Telegram ограничен 64 символами [A-Za-z0-9_-].
 */
export function deepLink(pageSlug: string, ctaId: string): string {
  const start = `web_${pageSlug}_${ctaId}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 64);
  return `https://t.me/${BOT_USERNAME}?start=${start}`;
}

/** Тарифы — зеркалят SUBSCRIPTION_PRICES бэкенда (не менять в одностороннем порядке). */
export const PRICING = {
  standard: { m1: 199, m6: 159, m12: 99, orbs: 250 },
  premium: { m1: 399, m6: 359, m12: 179, orbs: 550 },
} as const;
