import type { Metadata } from "next";
import CardOfDayTool from "@/components/CardOfDayTool";

/**
 * Личный рабочий инструмент: раздача карт дня в Threads.
 * Доступ закрыт в middleware.ts (вход по ссылке с ключом, дальше — cookie). Для всех остальных — 404.
 * Рендер динамический, чтобы страница не кэшировалась нигде по пути.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Карта дня — раздача",
  robots: { index: false, follow: false, nocache: true },
};

const STEPS = [
  "Вставьте ник из комментария (можно с @) и нажмите «Вытянуть карту».",
  "«Копировать текст» — в ответ на комментарий. Или «Картинка» — карточка с ником, она ведёт на бесплатный расклад Таро.",
  "«Следующий человек» — поле очистится, можно вставлять новый ник.",
];

export default function KartaDnyaPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-16 pt-28">
      <section className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Личный инструмент</p>
        <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          Карта дня — <span className="grad-text">раздача</span>
        </h1>
      </section>

      <div className="mt-6">
        <CardOfDayTool />
      </div>

      <ol className="mx-auto mt-8 max-w-xl list-decimal space-y-2 pl-5 text-sm text-ink-soft">
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </main>
  );
}
