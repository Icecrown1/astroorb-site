import { NextRequest, NextResponse } from "next/server";

/**
 * Прокси к лид-магниту приложения: браузер ходит на свой домен (без CORS),
 * сервер сайта пересылает запрос в AstroOrbChat. Адрес приложения — HOROSCOPE_API_URL.
 */
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const api = process.env.HOROSCOPE_API_URL;
  if (!api) {
    return NextResponse.json(
      { ok: false, error: "Сервис расчёта временно недоступен. Попробуйте позже или откройте Astro Orb в Telegram." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  // Санитизация источника: только наш префикс
  const rawSource = typeof body.source === "string" ? body.source : "";
  const source = /^website_[a-z0-9_-]{1,40}$/i.test(rawSource) ? rawSource : "website";

  try {
    const upstream = await fetch(`${api.replace(/\/$/, "")}/api/lead/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        gender: body.gender,
        birthDate: body.birthDate,
        birthTime: body.birthTime || undefined,
        birthPlace: body.birthPlace,
        email: body.email || undefined,
        source,
      }),
      // Месячный разбор пишет GPT — даём запас времени
      signal: AbortSignal.timeout(90_000),
      cache: "no-store",
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Расчёт занял слишком много времени. Попробуйте ещё раз — или откройте Astro Orb в Telegram." },
      { status: 504 },
    );
  }
}
