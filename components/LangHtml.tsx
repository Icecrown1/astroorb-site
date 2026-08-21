"use client";

import { useEffect } from "react";

/** Ставит атрибут lang на <html> для страниц вне корневой локали. */
export default function LangHtml({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "ru";
    };
  }, [lang]);
  return null;
}
