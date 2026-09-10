"use client";

import { miniAppLink } from "@/lib/site";
import { trackCta } from "@/lib/track";

/** CTA лид-магнита: ведёт сразу в мини-апп на пробный расклад (startapp=trial) */
export default function TrialCTA({
  cta,
  children,
  ghost = false,
  className = "",
}: {
  cta: string;
  children: React.ReactNode;
  ghost?: boolean;
  className?: string;
}) {
  const href = miniAppLink("trial");
  const onClick = () => trackCta("tarot-free", cta);

  if (ghost) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`group inline-flex items-center gap-3 rounded-full border border-hairline bg-white/[0.04] px-6 py-3 text-sm font-medium text-ink transition-[transform,background-color,border-color] duration-300 ease-out-strong hover:border-iris/40 hover:bg-white/[0.07] active:scale-[0.98] ${className}`}
      >
        {children}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 ease-out-strong group-hover:translate-x-1">
          ↗
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full bg-iris px-6 py-3 text-sm font-semibold text-void transition-[transform,box-shadow,background-color] duration-300 ease-out-strong hover:bg-[#a294ff] hover:shadow-[0_8px_40px_-8px_rgba(142,123,255,0.55)] active:scale-[0.98] ${className}`}
    >
      {children}
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-void/15 transition-transform duration-300 ease-out-strong group-hover:-translate-y-px group-hover:translate-x-1">
        ↗
      </span>
    </a>
  );
}
