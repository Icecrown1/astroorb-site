"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Гарантированный скролл к началу страницы при смене маршрута.
 * App Router в связке с fixed-элементами иногда «приземляет» переход
 * внизу новой страницы — этот компонент снимает проблему на любых устройствах.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    // Якорные переходы внутри страницы (#faq) не трогаем
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
