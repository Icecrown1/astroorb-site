import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { confirmationCode, parseSignedRequest, readSignedRequest } from "@/lib/metaSignedRequest";

/**
 * Meta → «Data Deletion Request URL»: запрос на удаление данных пользователя, полученных через Threads.
 * Отвечаем по формату Meta: { url, confirmation_code }. url — страница статуса с кодом запроса.
 * Запрос пишется в логи (Replit → Deployments → Logs) с пометкой [threads] — по ней удаляем данные
 * у сервиса, который ведёт аккаунт, в течение 30 дней (как обещано в политике).
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const signed = await readSignedRequest(req);
  if (!signed) return NextResponse.json({ error: "signed_request is required" }, { status: 400 });

  const parsed = parseSignedRequest(signed, process.env.THREADS_APP_SECRET);
  if (!parsed.ok) {
    console.warn(`[threads] data deletion rejected: ${parsed.error}`);
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const code = confirmationCode();
  console.log(
    `[threads] DATA DELETION REQUEST code=${code} user_id=${parsed.payload.user_id ?? "?"} verified=${parsed.verified} at=${new Date().toISOString()}`,
  );
  return NextResponse.json({ url: `${SITE_URL}/en/data-deletion?code=${code}`, confirmation_code: code });
}
