/** Ник из Threads/Instagram: без @, только допустимые символы, до 30 знаков. */
export function cleanNick(raw: string | null | undefined): string {
  return String(raw || "")
    .trim()
    .replace(/^@+/, "")
    .replace(/[^A-Za-z0-9._]/g, "")
    .slice(0, 30);
}
