"use client";

import { useEffect, useRef, useState } from "react";
import { DECK, type DeckCard } from "@/lib/tarotDeck";
import { DAILY, cleanNick } from "@/lib/tarotDaily";
import { SITE_URL, miniAppLink } from "@/lib/site";
import { trackCta, trackGoal } from "@/lib/track";

/**
 * «Карта дня» — себе или другу.
 * Сценарий для Threads («вы мне +, я вам карту дня»): ник → карта → «Копировать текст» / «Картинка» → «Следующая».
 * Колода тянется без повторов (остаток хранится в localStorage), пока не закончатся все 78 карт.
 */

const DECK_KEY = "astro_card_deck_v1";
const COUNT_KEY = "astro_card_count_v1";

type Draw = { card: DeckCard; variant: number };

function rand(n: number): number {
  try {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0] % n;
  } catch {
    return Math.floor(Math.random() * n);
  }
}

function nextCardId(): string {
  let rest: string[] = [];
  try {
    rest = JSON.parse(localStorage.getItem(DECK_KEY) || "[]");
  } catch {
    /* приватный режим — тянем без памяти */
  }
  rest = rest.filter((id) => DECK.some((c) => c.id === id));
  if (!rest.length) rest = DECK.map((c) => c.id);
  const id = rest.splice(rand(rest.length), 1)[0];
  try {
    localStorage.setItem(DECK_KEY, JSON.stringify(rest));
  } catch {
    /* noop */
  }
  return id;
}

function cardLink(d: Draw, nick: string): string {
  const q = new URLSearchParams();
  if (nick) q.set("for", nick);
  if (d.variant) q.set("v", String(d.variant));
  const qs = q.toString();
  return `${SITE_URL}/karta/${d.card.id}${qs ? `?${qs}` : ""}`;
}

function buildText(d: Draw, nick: string, withLink: boolean): string {
  const head = nick ? `@${nick}, ваша карта дня — ${d.card.nameRu}` : `Карта дня — ${d.card.nameRu}`;
  const parts = [head, DAILY[d.card.id][d.variant]];
  if (withLink) parts.push(`Подробнее о карте: ${cardLink(d, nick).replace(/^https?:\/\//, "")}`);
  return parts.join("\n\n");
}

/* ---------- Картинка 1080×1350 для ответа в Threads ---------- */

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function renderImage(d: Draw, nick: string): Promise<Blob> {
  const W = 1080;
  const H = 1350;
  const display = '"Unbounded Variable", system-ui, sans-serif';
  const body = '"Manrope Variable", system-ui, sans-serif';
  try {
    await Promise.all([
      document.fonts.load(`600 60px "Unbounded Variable"`),
      document.fonts.load(`500 40px "Manrope Variable"`),
    ]);
  } catch {
    /* шрифты не критичны */
  }

  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = `/tarot/${d.card.id}.webp`;
  });

  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // Фон: глубокий космос + мягкое свечение
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#0B0D14");
  g.addColorStop(1, "#171331");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 520, 40, W / 2, 520, 620);
  glow.addColorStop(0, "rgba(142,123,255,0.28)");
  glow.addColorStop(1, "rgba(142,123,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  // Звёзды — детерминированно от id карты
  let seed = d.card.id.split("").reduce((s, ch) => (s * 31 + ch.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let k = 0; k < 90; k++) {
    ctx.fillStyle = `rgba(233,236,248,${0.15 + rnd() * 0.5})`;
    ctx.beginPath();
    ctx.arc(rnd() * W, rnd() * H, rnd() * 1.8 + 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Текст послания — считаем заранее, чтобы подогнать размер карты
  ctx.font = `500 38px ${body}`;
  const lines = wrap(ctx, DAILY[d.card.id][d.variant], 880);
  const lineH = 54;
  const textH = lines.length * lineH;

  // Шапка
  ctx.textAlign = "center";
  ctx.fillStyle = "#EFC26B";
  ctx.font = `600 30px ${body}`;
  ctx.fillText("К А Р Т А   Д Н Я", W / 2, 92);
  let y = 92;
  if (nick) {
    ctx.fillStyle = "#8E7BFF";
    ctx.font = `600 40px ${body}`;
    ctx.fillText(`для @${nick}`, W / 2, 148);
    y = 148;
  }

  // Карта
  const footer = 70;
  const nameBlock = 96;
  const avail = H - (y + 40) - (nameBlock + textH + 40) - footer;
  const ch = Math.min(720, Math.max(420, avail));
  const cw = Math.round((ch * img.width) / img.height);
  const cx = (W - cw) / 2;
  const cy = y + 40;
  ctx.save();
  ctx.shadowColor = "rgba(142,123,255,0.55)";
  ctx.shadowBlur = 60;
  roundRect(ctx, cx, cy, cw, ch, 22);
  ctx.fillStyle = "#12151F";
  ctx.fill();
  ctx.restore();
  ctx.save();
  roundRect(ctx, cx, cy, cw, ch, 22);
  ctx.clip();
  ctx.drawImage(img, cx, cy, cw, ch);
  ctx.restore();
  ctx.strokeStyle = "rgba(239,194,107,0.55)";
  ctx.lineWidth = 2;
  roundRect(ctx, cx, cy, cw, ch, 22);
  ctx.stroke();

  // Название
  let ty = cy + ch + 78;
  ctx.fillStyle = "#E9ECF8";
  let fs = 54;
  ctx.font = `600 ${fs}px ${display}`;
  while (ctx.measureText(d.card.nameRu).width > 940 && fs > 36) {
    fs -= 2;
    ctx.font = `600 ${fs}px ${display}`;
  }
  ctx.fillText(d.card.nameRu, W / 2, ty);

  // Послание
  ty += 66;
  ctx.fillStyle = "rgba(233,236,248,0.86)";
  ctx.font = `500 38px ${body}`;
  for (const l of lines) {
    ctx.fillText(l, W / 2, ty);
    ty += lineH;
  }

  // Подвал
  ctx.fillStyle = "rgba(141,147,168,0.9)";
  ctx.font = `500 28px ${body}`;
  ctx.fillText("Своя карта дня — astroorbi.com/karta-dnya", W / 2, H - 40);

  return await new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("toBlob"))), "image/png"));
}

export default function CardOfDayTool() {
  const [nickRaw, setNickRaw] = useState("");
  const [withLink, setWithLink] = useState(true);
  const [draw, setDraw] = useState<Draw | null>(null);
  const [flip, setFlip] = useState(0);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const nick = cleanNick(nickRaw);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(COUNT_KEY) || "{}");
      const today = new Date().toISOString().slice(0, 10);
      if (raw.day === today) setCount(raw.n || 0);
    } catch {
      /* noop */
    }
  }, []);

  function bumpCount() {
    const today = new Date().toISOString().slice(0, 10);
    setCount((n) => {
      const v = n + 1;
      try {
        localStorage.setItem(COUNT_KEY, JSON.stringify({ day: today, n: v }));
      } catch {
        /* noop */
      }
      return v;
    });
  }

  function pull() {
    const id = nextCardId();
    const card = DECK.find((c) => c.id === id)!;
    setDraw({ card, variant: rand(3) });
    setFlip((f) => f + 1);
    setStatus("");
    bumpCount();
    trackGoal("card_of_day_draw", { card: id });
  }

  function next() {
    setNickRaw("");
    setDraw(null);
    setStatus("");
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function otherText() {
    if (!draw) return;
    setDraw({ ...draw, variant: (draw.variant + 1) % 3 });
    setStatus("");
  }

  async function copyText() {
    if (!draw) return;
    const text = buildText(draw, nick, withLink);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Текст скопирован — вставьте его в ответ");
    } catch {
      setStatus("Не получилось скопировать — выделите текст ниже вручную");
    }
  }

  async function shareImage() {
    if (!draw) return;
    setBusy(true);
    setStatus("");
    try {
      const blob = await renderImage(draw, nick);
      const file = new File([blob], `karta-dnya-${draw.card.id}.png`, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        await nav.share({ files: [file] });
        setStatus("Готово — картинку можно сохранить или сразу отправить");
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        setStatus("Картинка скачана");
      }
    } catch (e: unknown) {
      if ((e as { name?: string })?.name !== "AbortError") setStatus("Не получилось сделать картинку — попробуйте ещё раз");
    } finally {
      setBusy(false);
    }
  }

  const BTN =
    "min-h-[48px] rounded-2xl border border-hairline bg-white/[0.04] px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-iris/40 active:scale-[0.98] disabled:opacity-50";

  return (
    <div className="shell">
      <div className="core p-5 md:p-8">
        {!draw ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              pull();
            }}
          >
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-muted">Для кого карта</span>
              <input
                ref={inputRef}
                value={nickRaw}
                onChange={(e) => setNickRaw(e.target.value)}
                placeholder="@ник — или оставьте пустым, если для себя"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                inputMode="text"
                className="mt-2 w-full rounded-xl border border-hairline bg-void px-4 py-3.5 text-ink outline-none transition-colors duration-200 focus:border-iris/60"
              />
            </label>
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-iris px-6 py-4 font-semibold text-void transition-[transform,box-shadow] duration-300 ease-out-strong hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98]"
            >
              Вытянуть карту
            </button>
            {count > 0 && <p className="mt-3 text-center text-xs text-muted">Сегодня вытянуто карт: {count}</p>}
          </form>
        ) : (
          <div>
            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-stellar">
                Карта дня{nick ? <span className="normal-case tracking-normal text-iris"> · для @{nick}</span> : null}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={flip}
                src={`/tarot/${draw.card.id}.webp`}
                alt={draw.card.nameRu}
                width={512}
                height={768}
                className="card-flip mt-4 w-40 rounded-xl border border-stellar/40 shadow-[0_0_48px_-12px_rgba(142,123,255,0.6)] sm:w-48"
              />
              <h2 className="mt-5 font-display text-2xl">{draw.card.nameRu}</h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/90">{DAILY[draw.card.id][draw.variant]}</p>
              <button type="button" onClick={otherText} className="mt-2 text-xs text-iris hover:underline">
                Другой вариант текста ({draw.variant + 1}/3)
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button type="button" onClick={copyText} className={BTN}>
                Копировать текст
              </button>
              <button type="button" onClick={shareImage} disabled={busy} className={BTN}>
                {busy ? "Готовим…" : "Картинка"}
              </button>
              <button
                type="button"
                onClick={next}
                className="col-span-2 min-h-[48px] rounded-full bg-iris px-6 font-semibold text-void transition-transform duration-200 active:scale-[0.98]"
              >
                Следующий человек →
              </button>
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={withLink}
                onChange={(e) => setWithLink(e.target.checked)}
                className="h-4 w-4 accent-iris"
              />
              Добавлять в текст ссылку на карту
            </label>

            {status && (
              <p className="mt-3 text-sm text-stellar" aria-live="polite">
                {status}
              </p>
            )}

            <details className="mt-4 rounded-xl border border-hairline bg-void/60 px-4 py-3">
              <summary className="cursor-pointer text-xs text-muted">Текст, который скопируется</summary>
              <pre className="mt-2 whitespace-pre-wrap font-body text-sm text-ink/90">{buildText(draw, nick, withLink)}</pre>
            </details>

            <p className="mt-4 text-center text-xs text-muted">
              <button type="button" onClick={pull} className="text-iris hover:underline">
                Перетянуть карту
              </button>
              {" · "}
              <a
                href={miniAppLink("trial")}
                onClick={() => trackCta("karta_dnya", "tool_trial")}
                className="text-iris hover:underline"
              >
                Бесплатный расклад на свой вопрос ↗
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
