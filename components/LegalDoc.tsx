import type { ReactNode } from "react";

/** Оформление юридических страниц (политика, удаление данных): спокойная типографика без анимаций. */

export function LegalShell({ title, updated, children }: { title: ReactNode; updated: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-8">
      <h1 className="font-display text-3xl leading-[1.15] md:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">{updated}</p>
      <div className="mt-10 space-y-10">{children}</div>
    </section>
  );
}

export function LegalSection({ id, title, children }: { id?: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-xl md:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-iris">{children}</ul>;
}

export function LegalNote({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-hairline bg-surface p-5 text-[15px] leading-relaxed text-muted">{children}</div>;
}

export const LEGAL = {
  operatorRu: "самозанятый (плательщик налога на профессиональный доход) Садаев Алексей Сергеевич, ИНН 026819831820",
  operatorEn: "Aleksei Sergeevich Sadaev, self-employed (Russian professional income tax regime), Taxpayer ID (INN) 026819831820",
  email: "alekseysadaev1@gmail.com",
  updatedRu: "Редакция от 12 ноября 2026 г.",
  updatedEn: "Last updated: November 12, 2026",
} as const;
