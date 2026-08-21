import { NextRequest, NextResponse } from "next/server";

/**
 * Возврат на выбранную локаль: если пользователь ранее явно переключился на EN
 * (cookie ставит переключатель в шапке), главная уводит на /en.
 * Автоопределения по Accept-Language нет сознательно: поисковые боты ходят
 * с английскими заголовками, и авторедирект корня — риск для индексации RU-версии.
 */
export function middleware(req: NextRequest) {
  if (req.cookies.get("astro_lang")?.value === "en") {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
