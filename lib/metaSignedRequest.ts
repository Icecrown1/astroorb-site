import { createHmac, randomBytes, timingSafeEqual } from "crypto";

/**
 * Разбор signed_request, который Meta присылает на колбэки отключения приложения и удаления данных.
 * Формат: base64url(подпись) "." base64url(JSON). Подпись — HMAC-SHA256 от закодированного JSON на секрете приложения.
 * Секрет — переменная окружения THREADS_APP_SECRET (Replit → Secrets). Без неё подпись не проверяется.
 */

export type SignedPayload = { user_id?: string; algorithm?: string; issued_at?: number; expires?: number };

function b64urlDecode(s: string): Buffer {
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

export function parseSignedRequest(
  signed: string,
  secret: string | undefined,
): { ok: true; payload: SignedPayload; verified: boolean } | { ok: false; error: string } {
  const dot = signed.indexOf(".");
  if (dot <= 0) return { ok: false, error: "malformed" };
  const encSig = signed.slice(0, dot);
  const encPayload = signed.slice(dot + 1);

  let payload: SignedPayload;
  try {
    payload = JSON.parse(b64urlDecode(encPayload).toString("utf8"));
  } catch {
    return { ok: false, error: "bad_payload" };
  }

  if (!secret) return { ok: true, payload, verified: false };

  if (payload.algorithm && payload.algorithm.toUpperCase() !== "HMAC-SHA256") return { ok: false, error: "bad_algorithm" };
  const expected = createHmac("sha256", secret).update(encPayload).digest();
  const got = b64urlDecode(encSig);
  if (got.length !== expected.length || !timingSafeEqual(got, expected)) return { ok: false, error: "bad_signature" };
  return { ok: true, payload, verified: true };
}

/** signed_request приходит формой (application/x-www-form-urlencoded); на всякий случай принимаем и JSON. */
export async function readSignedRequest(req: Request): Promise<string | null> {
  const type = req.headers.get("content-type") || "";
  try {
    if (type.includes("application/json")) {
      const body = await req.json();
      return typeof body?.signed_request === "string" ? body.signed_request : null;
    }
    const form = await req.formData();
    const v = form.get("signed_request");
    return typeof v === "string" ? v : null;
  } catch {
    return null;
  }
}

/** Код подтверждения запроса на удаление: 12 символов A–Z0–9. */
export function confirmationCode(): string {
  const abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(randomBytes(12), (b) => abc[b % abc.length]).join("");
}

export function cleanCode(raw: string | null | undefined): string {
  return String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 32);
}
