"use client";

import { useEffect, useRef, useState } from "react";
import { BOT_USERNAME } from "@/lib/site";
import { trackGoal } from "@/lib/track";

type LeadResult = {
  leadId: string;
  sunSign: string;
  ascendant: string | null;
  monthName: string;
  horoscope: { overview: string; money: string; work: string; love: string; health: string; advice: string };
};

const LOADING_STEPS = [
  "Считаем позиции планет на момент рождения…",
  "Строим натальную карту по Swiss Ephemeris…",
  "Накладываем транзиты месяца на ваши дома…",
  "AI пишет персональный разбор — почти готово…",
];

export default function LeadForm() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"female" | "male">("female");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LeadResult | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 7000);
    return () => clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (!result || !resultRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [result]);

  async function submit() {
    setError(null);
    if (!name.trim() || !birthDate || !birthPlace.trim()) {
      setError("Заполните имя, дату и город рождения.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          gender,
          birthDate,
          birthTime: birthTime || undefined,
          birthPlace: birthPlace.trim(),
          email: email.trim() || undefined,
          source: "website_home",
        }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) throw new Error(data.error || "Не получилось рассчитать. Попробуйте ещё раз.");
      setResult(data.data as LeadResult);
      trackGoal("lead_submit", { has_email: Boolean(email.trim()) });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Что-то пошло не так. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  const botHref = result ? `https://t.me/${BOT_USERNAME}?start=lead_${result.leadId}` : "#";

  return (
    <div className="shell">
      <div className="core p-6 md:p-10">
        {!result && (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Ваше имя">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как вас зовут?"
                  className="w-full rounded-xl border border-hairline bg-raised px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-iris/60"
                />
              </Field>
              <Field label="Пол">
                <div className="flex gap-2">
                  {([["female", "Женский"], ["male", "Мужской"]] as const).map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={gender === v}
                      onClick={() => setGender(v)}
                      className={`flex-1 rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                        gender === v ? "border-iris/60 bg-iris/10 text-ink" : "border-hairline bg-raised text-muted hover:text-ink"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Дата рождения">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full rounded-xl border border-hairline bg-raised px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-iris/60"
                />
              </Field>
              <Field label="Время рождения (необязательно)">
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full rounded-xl border border-hairline bg-raised px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-iris/60"
                />
              </Field>
              <Field label="Город рождения">
                <input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder="Москва"
                  className="w-full rounded-xl border border-hairline bg-raised px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-iris/60"
                />
              </Field>
              <Field label="Почта (необязательно)">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-hairline bg-raised px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-iris/60"
                />
              </Field>
            </div>

            {error && <p className="text-sm text-[#ff9c9c]">{error}</p>}

            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-iris px-6 py-4 text-sm font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-void/30 border-t-void" aria-hidden="true" />
                  {LOADING_STEPS[step]}
                </>
              ) : (
                <>Рассчитать мой месяц ✦</>
              )}
            </button>
            <p className="text-center text-xs text-muted">
              Бесплатно · Разбор появится прямо здесь · Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </div>
        )}

        {result && (
          <div ref={resultRef} className="scroll-mt-24">
            <p className="eyebrow">
              {result.sunSign}
              {result.ascendant ? ` · асцендент ${result.ascendant}` : ""} · {result.monthName}
            </p>
            <h3 className="mt-4 font-display text-xl md:text-2xl">
              {name.trim()}, ваш {result.monthName.toLowerCase()}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed">{result.horoscope.overview}</p>

            <div className="mt-6 rounded-2xl border border-hairline bg-surface p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Деньги</p>
              <p className="mt-2 text-sm leading-relaxed">{result.horoscope.money}</p>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl border border-hairline">
              <div className="select-none space-y-4 p-5 blur-[7px]" aria-hidden="true">
                {[["Карьера", result.horoscope.work], ["Отношения", result.horoscope.love], ["Здоровье", result.horoscope.health], ["Совет месяца", result.horoscope.advice]].map(
                  ([t, x]) => (
                    <div key={t}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{x}</p>
                    </div>
                  ),
                )}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-void/55 p-6 text-center">
                <p className="max-w-sm text-sm text-ink">
                  Карьера, отношения, здоровье и совет месяца — в полном разборе. Он уже сохранён за вами.
                </p>
                <a
                  href={botHref}
                  onClick={() => trackGoal("lead_open_bot", { lead: result.leadId })}
                  className="group inline-flex items-center gap-3 rounded-full bg-iris px-6 py-3.5 text-sm font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98]"
                >
                  Открыть полный разбор
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-void/15 transition-transform duration-300 ease-out-strong group-hover:translate-x-1">↗</span>
                </a>
                <p className="text-xs text-muted">Откроется в Telegram — разбор привязан к этому расчёту</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</span>
      {children}
    </label>
  );
}
