"use client";

import Link from "next/link";
import { useState } from "react";
import { deepLink } from "@/lib/site";
import { trackCta } from "@/lib/track";

const LINKS = [
  { href: "/natal-chart", label: "Натальная карта" },
  { href: "/matrix", label: "Матрица судьбы" },
  { href: "/compatibility", label: "Совместимость" },
  { href: "/horoscope", label: "Гороскопы" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/about", label: "О проекте" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-5">
        <nav className="flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-hairline bg-void/70 px-5 py-2.5 backdrop-blur-xl">
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
                className="rounded-full px-3 py-1.5 text-[13px] text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={deepLink("nav", "open")}
              onClick={() => trackCta("nav", "open")}
              className="hidden rounded-full bg-iris px-4 py-1.5 text-[13px] font-semibold text-void transition-transform duration-200 ease-out-strong active:scale-[0.97] sm:block whitespace-nowrap"
            >
              Открыть в Telegram
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
          <a
            href={deepLink("nav", "mobile_menu")}
            onClick={() => trackCta("nav", "mobile_menu")}
            className={`mt-8 inline-flex w-max items-center gap-3 rounded-full bg-iris px-6 py-3 font-semibold text-void transition-[opacity,transform] duration-500 ease-out-strong ${
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: open ? "460ms" : "0ms" }}
          >
            Открыть в Telegram ↗
          </a>
        </div>
      </div>
    </>
  );
}
