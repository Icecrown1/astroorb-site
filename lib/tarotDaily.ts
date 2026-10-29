import { DAILY_A } from "./tarotDailyA";
import { DAILY_B } from "./tarotDailyB";

/** Послания «карты дня»: 3 варианта (по 2 предложения) на каждую из 78 карт. */
export const DAILY: Record<string, [string, string, string]> = { ...DAILY_A, ...DAILY_B };

// cleanNick вынесен в lib/nick.ts, чтобы страница карты не тянула тексты в клиентский бандл
export { cleanNick } from "./nick";
