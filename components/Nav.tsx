"use client";

import Link from "next/link";
import { useState } from "react";
import { deepLink } from "@/lib/site";
import { UI, localePath, ctaPage, type Locale } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { trackCta } from "@/lib/track";

const LINKS_BASE = [
  { href: "/natal-chart", key: "natal" },
  { href: "/matrix", key: "matrix" },
  { href: "/compatibility", key: "compat" },
  { href: "/horoscope", key: "horoscope" },
  { href: "/blog", key: "blog" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
] as const;

export default function Nav({ locale = "ru" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const t = UI[locale];
  const pathname = usePathname() || "/";
  const LINKS = LINKS_BASE.filter((l) => (t.nav as Record<string, string | undefined>)[l.key]).map((l) => ({ href: localePath(locale, l.href), label: (t.nav as Record<string, string>)[l.key] }));
  const counterpart = locale === "en" ? (pathname.replace(/^\/en/, "") || "/") : `/en${pathname === "/" ? "" : pathname}`;
  const switchTo = locale === "en" ? "ru" : "en";
  const setLangCookie = () => { document.cookie = `astro_lang=${switchTo};path=/;max-age=31536000`; };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5">
        <nav className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-hairline bg-void/70 px-5 py-2.5 backdrop-blur-xl">
          <Link
            href="/"
            className="font-display text-sm tracking-wide text-ink"
            onClick={() => setOpen(false)}
          >
            Astro <span className="grad-text">Orb</span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-2.5 py-1.5 text-[13px] text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-ink whitespace-nowrap ${
                  l.href.endsWith("/about") ? "hidden xl:block" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={counterpart}
              onClick={setLangCookie}
              aria-label={switchTo === "en" ? "Switch to English" : "Переключить на русский"}
              className="hidden rounded-full border border-hairline px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-muted transition-colors hover:border-iris/40 hover:text-ink lg:inline-flex"
            >
              {switchTo}
            </Link>
            <a
              href={deepLink(ctaPage(locale, "nav"), "open")}
              onClick={() => trackCta(ctaPage(locale, "nav"), "open")}
              className="hidden rounded-full bg-iris px-4 py-1.5 text-[13px] font-semibold text-void transition-transform duration-200 ease-out-strong active:scale-[0.97] sm:block whitespace-nowrap"
            >
              {t.nav.open}
            </a>
            <button
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] lg:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-ink transition-transform duration-300 ease-out-strong ${
                  open ? "rotate-45" : "-translate-y-[3.5px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-ink transition-transform duration-300 ease-out-strong ${
                  open ? "-rotate-45" : "translate-y-[3.5px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Мобильное меню-оверлей */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-30 bg-void/85 backdrop-blur-2xl transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-1 px-8">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl text-ink transition-[opacity,transform] duration-500 ease-out-strong ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={counterpart}
            onClick={() => { setLangCookie(); setOpen(false); }}
            className={`mt-2 inline-flex w-max items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold uppercase text-ink transition-[opacity,transform] duration-500 ease-out-strong ${
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: open ? "400ms" : "0ms" }}
          >
            {switchTo === "en" ? "🇬🇧 English" : "🇷🇺 Русский"}
          </Link>
          <a
            href={deepLink(ctaPage(locale, "nav"), "mobile_menu")}
            onClick={() => trackCta(ctaPage(locale, "nav"), "mobile_menu")}
            className={`mt-8 inline-flex w-max items-center gap-3 rounded-full bg-iris px-6 py-3 font-semibold text-void transition-[opacity,transform] duration-500 ease-out-strong ${
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: open ? "460ms" : "0ms" }}
          >
            {t.nav.open} ↗
          </a>
        </div>
      </div>
    </>
  );
}
