import { NextResponse } from "next/server";
import { parseSignedRequest, readSignedRequest } from "@/lib/metaSignedRequest";

/**
 * Meta → «Deauthorize / Uninstall callback URL»: пользователь отключил приложение AstroOrbi в Threads.
 * Интеграция подключена только к нашему аккаунту, поэтому достаточно зафиксировать событие в логах
 * (Replit → Deployments → Logs): после него токен доступа недействителен, интеграцию нужно подключить заново.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const signed = await readSignedRequest(req);
  if (!signed) return NextResponse.json({ ok: false, error: "signed_request is required" }, { status: 400 });

  const parsed = parseSignedRequest(signed, process.env.THREADS_APP_SECRET);
  if (!parsed.ok) {
    console.warn(`[threads] deauthorize rejected: ${parsed.error}`);
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  console.log(
    `[threads] deauthorize: user_id=${parsed.payload.user_id ?? "?"} verified=${parsed.verified}` +
      (parsed.verified ? "" : " (THREADS_APP_SECRET не задан — подпись не проверена)"),
  );
  return NextResponse.json({ ok: true });
}
