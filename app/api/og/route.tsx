import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { SIGNS } from "@/lib/zodiac";
import { ARCANA } from "@/lib/arcana";
import { calcCompat, canonicalPair, parsePair } from "@/lib/compat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Персональные OG-картинки для share-ссылок. Только валидированные параметры. */

const fontDir = path.join(process.cwd(), "assets", "fonts");
const fontRegular = fs.readFileSync(path.join(fontDir, "DejaVuSans.ttf"));
const fontBold = fs.readFileSync(path.join(fontDir, "DejaVuSans-Bold.ttf"));

const cleanName = (raw: string | null): string => {
  if (!raw) return "";
  return raw.replace(/[<>"'`\\]/g, "").trim().slice(0, 20);
};

const BG = "#0B0D14";
const INK = "#E9ECF8";
const MUTED = "#8D93A8";
const IRIS = "#8E7BFF";
const GOLD = "#EFC26B";

function Shell({ children, footer }: { children: React.ReactNode; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(circle at 70% 30%, #171B2B 0%, ${BG} 60%)`,
        color: INK,
        fontFamily: "DejaVu",
        padding: 60,
      }}
    >
      {children}
      <div style={{ position: "absolute", bottom: 44, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 34, height: 4, background: `linear-gradient(90deg, ${IRIS}, ${GOLD})`, borderRadius: 2 }} />
        <div style={{ fontSize: 26, color: MUTED }}>{footer}</div>
      </div>
    </div>
  );
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const t = q.get("t");
  const l = q.get("l") === "en" ? "en" : "ru";
  const en = l === "en";
  const footer = en ? "Astro Orb · astroorbi.com/en" : "Astro Orb · astroorbi.com";
  const opts = {
    width: 1200,
    height: 630,
    fonts: [
      { name: "DejaVu", data: fontRegular, weight: 400 as const },
      { name: "DejaVu", data: fontBold, weight: 700 as const },
    ],
  };

  if (t === "compat") {
    const parsed = parsePair(q.get("pair") || "");
    if (!parsed) return new Response("Bad pair", { status: 400 });
    const r = calcCompat(parsed[0], parsed[1], l);
    if (!r) return new Response("Bad pair", { status: 400 });
    const nameA = cleanName(q.get("a")) || (en ? r.a.en.name : r.a.ru);
    const nameB = cleanName(q.get("b")) || (en ? r.b.en.name : r.b.ru);
    return new ImageResponse(
      (
        <Shell footer={footer}>
          <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 44, color: MUTED }}>
            <span>{r.a.symbol}</span>
            <span style={{ color: INK, fontWeight: 700 }}>{nameA}</span>
            <span style={{ color: GOLD }}>+</span>
            <span style={{ color: INK, fontWeight: 700 }}>{nameB}</span>
            <span>{r.b.symbol}</span>
          </div>
          <div style={{ display: "flex", fontSize: 190, fontWeight: 700, lineHeight: 1, marginTop: 8, color: IRIS }}>
            {r.score}%
          </div>
          <div style={{ display: "flex", fontSize: 34, color: INK, marginTop: 6, textAlign: "center" }}>{r.headline}</div>
          <div style={{ display: "flex", fontSize: 26, color: MUTED, marginTop: 18 }}>
            {en ? "Check your match — free" : "Проверьте свою пару — бесплатно"}
          </div>
        </Shell>
      ),
      opts,
    );
  }

  if (t === "matrix") {
    const a = ARCANA.find((x) => x.slug === q.get("arcana"));
    if (!a) return new Response("Bad arcana", { status: 400 });
    const name = cleanName(q.get("name"));
    const title = en ? a.en.name : a.ru;
    const kw = en ? a.en.keyword : a.keyword;
    return new ImageResponse(
      (
        <Shell footer={footer}>
          <div style={{ display: "flex", fontSize: 30, color: MUTED }}>
            {name
              ? en
                ? `${name} — Matrix of Destiny`
                : `${name} — матрица судьбы`
              : en
                ? "Matrix of Destiny"
                : "Матрица судьбы"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 120,
                height: 120,
                borderRadius: 999,
                border: `3px solid ${GOLD}`,
                fontSize: 60,
                fontWeight: 700,
                color: GOLD,
              }}
            >
              {a.n}
            </div>
            <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>{title}</div>
          </div>
          <div style={{ display: "flex", fontSize: 36, color: IRIS, marginTop: 10 }}>{kw}</div>
          <div style={{ display: "flex", fontSize: 26, color: MUTED, marginTop: 20 }}>
            {en ? "What's your arcana? Calculate free" : "Какой аркан у вас? Рассчитайте бесплатно"}
          </div>
        </Shell>
      ),
      opts,
    );
  }

  if (t === "natal") {
    const bySlug = (s: string | null) => SIGNS.find((x) => x.slug === s) || null;
    const sun = bySlug(q.get("sun"));
    const moon = bySlug(q.get("moon"));
    const asc = bySlug(q.get("asc"));
    if (!sun || !moon) return new Response("Bad signs", { status: 400 });
    const nm = (s: (typeof SIGNS)[number]) => (en ? s.en.name : s.ru);
    const row = (label: string, s: (typeof SIGNS)[number] | null, accent: string) =>
      s && (
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44 }}>
          <span style={{ color: MUTED, fontSize: 30, width: 300, display: "flex" }}>{label}</span>
          <span style={{ color: accent }}>{s.symbol}</span>
          <span style={{ fontWeight: 700 }}>{nm(s)}</span>
        </div>
      );
    return new ImageResponse(
      (
        <Shell footer={footer}>
          <div style={{ display: "flex", fontSize: 30, color: MUTED, marginBottom: 24 }}>
            {en ? "My birth chart" : "Моя натальная карта"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {row(en ? "Sun — core self" : "Солнце — ядро", sun, GOLD)}
            {row(en ? "Moon — emotions" : "Луна — эмоции", moon, INK)}
            {row(en ? "Ascendant" : "Асцендент", asc, IRIS)}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: MUTED, marginTop: 30 }}>
            {en ? "Build yours free — 2 minutes" : "Постройте свою бесплатно — 2 минуты"}
          </div>
        </Shell>
      ),
      opts,
    );
  }

  return new Response("Unknown type", { status: 400 });
}
