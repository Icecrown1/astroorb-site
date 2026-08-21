"use client";

import { useState } from "react";
import { UI, type Locale } from "@/lib/i18n";
import { trackGoal } from "@/lib/track";

/** Кнопка шаринга результата: системное меню на мобильных, копирование ссылки на десктопе. */
export default function ShareButton({ url, type, locale }: { url: string; type: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const t = UI[locale].share;

  async function share() {
    const absolute = `${window.location.origin}${url}`;
    trackGoal("share_click", { type, locale });
    try {
      if (navigator.share) {
        await navigator.share({ url: absolute });
        return;
      }
    } catch {
      /* пользователь закрыл меню — не ошибка */
      return;
    }
    try {
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(locale === "en" ? "Copy the link:" : "Скопируйте ссылку:", absolute);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-hairline bg-raised px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-iris/50"
      >
        <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2" />
        </svg>
        {t.button}
      </button>
      <span aria-live="polite" className={`text-xs text-stellar transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}>
        {t.copied}
      </span>
    </div>
  );
}
