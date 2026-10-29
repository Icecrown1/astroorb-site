"use client";

import { useSearchParams } from "next/navigation";
import { cleanNick } from "@/lib/nick";

/**
 * Персональная часть страницы карты: «@ник, это ваша карта дня» и выбранный вариант послания.
 * Параметры приходят в ссылке из инструмента «Карта дня»: ?for=<ник>&v=<0..2>.
 */
export function KartaMessageView({
  name,
  variants,
  nick = "",
  v = 0,
}: {
  name: string;
  variants: [string, string, string];
  nick?: string;
  v?: number;
}) {
  const others = variants.filter((_, i) => i !== v);
  return (
    <>
      <p className="text-[11px] uppercase tracking-[0.2em] text-stellar">
        {nick ? (
          <>
            <span className="normal-case tracking-normal text-iris">@{nick}</span>, это ваша карта дня
          </>
        ) : (
          "Карта дня"
        )}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{name}</h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink">{variants[v]}</p>

      <div className="mx-auto mt-10 max-w-xl text-left">
        <h2 className="text-xs uppercase tracking-[0.18em] text-muted">Ещё два взгляда на эту карту</h2>
        <ul className="mt-3 space-y-3">
          {others.map((t) => (
            <li key={t} className="rounded-2xl border border-hairline bg-white/[0.03] p-4 text-[15px] leading-relaxed text-ink-soft">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function KartaMessage(props: { name: string; variants: [string, string, string] }) {
  const sp = useSearchParams();
  const nick = cleanNick(sp.get("for"));
  const vRaw = Number(sp.get("v"));
  const v = Number.isInteger(vRaw) && vRaw >= 0 && vRaw <= 2 ? vRaw : 0;
  return <KartaMessageView {...props} nick={nick} v={v} />;
}
