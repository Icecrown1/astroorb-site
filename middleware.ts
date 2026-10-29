import { NextRequest, NextResponse } from "next/server";

/**
 * 1) Возврат на выбранную локаль: если пользователь ранее явно переключился на EN
 *    (cookie ставит переключатель в шапке), главная уводит на /en.
 *    Автоопределения по Accept-Language нет сознательно: поисковые боты ходят
 *    с английскими заголовками, и авторедирект корня — риск для индексации RU-версии.
 *
 * 2) /karta-dnya — личный инструмент владельца (раздача карт дня в Threads).
 *    Вход один раз по ссылке /karta-dnya?key=<ключ>: ключ кладётся в httpOnly-cookie
 *    на 400 дней, адрес очищается от ключа. Без cookie страница отвечает 404, будто её нет.
 *    В коде хранится только SHA-256 ключа — сам ключ в репозиторий не попадает.
 */
const KARTA_KEY_SHA256 = "e1cd2c79a6ce4f5e3d453385b69e9f608220ec57018280b6135f2453bd548b6d";
const KARTA_COOKIE = "astro_karta_key";

async function sha256hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function guardKarta(req: NextRequest): Promise<NextResponse> {
  const fromQuery = req.nextUrl.searchParams.get("key");
  if (fromQuery && (await sha256hex(fromQuery)) === KARTA_KEY_SHA256) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("key");
    const res = NextResponse.redirect(url);
    res.cookies.set(KARTA_COOKIE, fromQuery, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/karta-dnya",
      maxAge: 60 * 60 * 24 * 400,
    });
    return res;
  }

  const fromCookie = req.cookies.get(KARTA_COOKIE)?.value;
  if (fromCookie && (await sha256hex(fromCookie)) === KARTA_KEY_SHA256) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Несуществующий маршрут → стандартная страница 404 сайта
  return NextResponse.rewrite(new URL("/__private-404", req.url));
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/karta-dnya")) return guardKarta(req);

  if (req.cookies.get("astro_lang")?.value === "en") {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/", "/karta-dnya", "/karta-dnya/:path*"] };
