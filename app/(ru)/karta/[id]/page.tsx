import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import KartaMessage, { KartaMessageView } from "@/components/KartaMessage";
import TrialCTA from "@/components/TrialCTA";
import { DECK, SUIT_RU, cardById } from "@/lib/tarotDeck";
import { DAILY } from "@/lib/tarotDaily";

export const dynamicParams = false;

export function generateStaticParams() {
  return DECK.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const card = cardById(params.id);
  if (!card) return {};
  const title = `Карта дня — ${card.nameRu}`;
  const description = DAILY[card.id][0];
  return {
    title,
    description,
    // Личные страницы для ответов в соцсетях: не индексируем, но ссылки передают вес
    robots: { index: false, follow: true },
    alternates: { canonical: `/karta/${card.id}` },
    openGraph: {
      url: `/karta/${card.id}`,
      siteName: "AstroOrbi",
      type: "website",
      locale: "ru_RU",
      title,
      description,
      images: [{ url: `/tarot-og/${card.id}.jpg`, width: 1200, height: 630, alt: `Карта Таро «${card.nameRu}»` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`/tarot-og/${card.id}.jpg`] },
  };
}

export default function KartaPage({ params }: { params: { id: string } }) {
  const card = cardById(params.id);
  if (!card) notFound();
  const variants = DAILY[card.id];

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-28">
      <section className="flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/tarot/${card.id}.webp`}
          alt={`Карта Таро «${card.nameRu}»`}
          width={512}
          height={768}
          className="card-flip w-44 rounded-2xl border border-stellar/40 shadow-[0_0_60px_-12px_rgba(142,123,255,0.6)] sm:w-56"
        />
        <p className="mt-6 text-xs text-muted">
          {SUIT_RU[card.suit]} · {card.kw}
        </p>

        <div className="mt-4 w-full">
          <Suspense fallback={<KartaMessageView name={card.nameRu} variants={variants} />}>
            <KartaMessage name={card.nameRu} variants={variants} />
          </Suspense>
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-iris/30 bg-iris/[0.06] p-6 text-center sm:p-10">
        <h2 className="font-display text-2xl">Хотите больше, чем карта дня?</h2>
        <p className="mx-auto mt-4 max-w-lg text-ink-soft">
          Задайте картам свой вопрос в AstroOrbi — о работе, отношениях или решении. Первый расклад с подробной
          трактовкой бесплатный, прямо в Telegram.
        </p>
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <TrialCTA page="karta" cta="card_page">
            Получить бесплатный расклад
          </TrialCTA>
          <Link
            href="/tarot-free"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.04] px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-iris/40"
          >
            Как устроен бесплатный расклад
          </Link>
        </div>
      </section>

      <p className="mt-10 text-center text-sm text-ink-soft">
        <Link href="/blog/karta-dnya-taro-onlajn" className="text-iris hover:underline">
          Как читать карту дня и вести дневник
        </Link>
      </p>
      <p className="mt-8 text-center text-xs text-ink-soft/60">
        Таро — повод для размышления, а не предсказание. Сервис носит информационно-развлекательный характер.
      </p>
    </main>
  );
}
