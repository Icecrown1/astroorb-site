import type { Metadata } from "next";
import Image from "next/image";
import { pageOg } from "@/lib/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import TrialCTA from "@/components/TrialCTA";

export const metadata: Metadata = {
  title: "Free Tarot Reading Online — Ask Your Question",
  description:
    "Your first Tarot reading — free: ask one question and get three cards with a detailed AI interpretation right inside Telegram. No payment, no card, no sign-up.",
  alternates: { canonical: "/en/tarot-free", languages: { ru: "/tarot-free", en: "/en/tarot-free", "x-default": "/tarot-free" } },
  openGraph: pageOg("/en/tarot-free"),
};

const FAQ_ITEMS = [
  { q: "Is it really free?", a: "Yes. One trial for new users — no payment, no bank card, no mandatory subscription. If you like it, you decide later whether you want full access." },
  { q: "What do I need to get a reading?", a: "Just Telegram and one question about your situation. No birth date or personal data is required for the trial reading." },
  { q: "What does the result look like?", a: "Three cards with positions, a detailed interpretation of each, the bigger picture and concrete advice. The result is saved — you can come back and reread it." },
  { q: "Who writes the interpretation?", a: "An AI trained on classic card meanings. Tarot is food for thought, not fortune-telling: a reading helps you see your situation from a new angle." },
];

const STEPS = [
  { n: "1", t: "Open the app", d: "The button below opens Telegram — nothing to install." },
  { n: "2", t: "Ask one question", d: "About work, relationships, a decision — in your own words, 10+ characters." },
  { n: "3", t: "Get your reading", d: "Three cards and a detailed interpretation — in about a minute." },
];

const DEMO_CARDS = [
  { img: "/tarot-demo/the-star.webp", name: "The Star", pos: "Heart of the matter" },
  { img: "/tarot-demo/two-of-cups.webp", name: "Two of Cups", pos: "What helps" },
  { img: "/tarot-demo/sun.webp", name: "The Sun", pos: "Where it leads" },
];

export default function TarotFreePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-10">
      <Breadcrumbs items={[{ label: "Home", href: "/en" }, { label: "Free Tarot Reading", href: "/en/tarot-free" }]} />

      {/* Hero */}
      <Reveal>
        <section className="mt-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Free trial</p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Your first Tarot reading — <span className="grad-text">free</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-ink-soft">
            Ask one question about your situation and get a short reading with an
            interpretation — right inside Telegram, in a minute. No payment, no
            bank card, no forms.
          </p>
          <div className="mt-8 flex justify-center">
            <TrialCTA cta="hero">Get my free reading</TrialCTA>
          </div>
          <p className="mt-3 text-xs text-ink-soft/70">
            One trial for new users · no birth data required
          </p>
        </section>
      </Reveal>

      {/* Шаги */}
      <Reveal>
        <section className="mt-16 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-hairline bg-white/[0.03] p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-iris/15 font-display text-iris">{s.n}</span>
              <h3 className="mt-3 font-medium">{s.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* Пример результата */}
      <Reveal>
        <section className="mt-16">
          <h2 className="text-center font-display text-2xl sm:text-3xl">What the result looks like</h2>
          <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-hairline bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm text-ink-soft">Question:</p>
            <p className="mt-1 font-display text-lg">“What should I pay attention to when changing jobs?”</p>

            <div className="mt-6 flex justify-center gap-3 sm:gap-5">
              {DEMO_CARDS.map((c) => (
                <figure key={c.name} className="w-24 text-center sm:w-28">
                  <Image
                    src={c.img}
                    alt={`Tarot card ${c.name}`}
                    width={512}
                    height={768}
                    className="rounded-xl border border-gold/40"
                  />
                  <figcaption className="mt-2 text-[11px] leading-tight text-ink-soft">
                    <span className="block text-gold/90">{c.pos}</span>
                    {c.name}
                  </figcaption>
                </figure>
              ))}
            </div>

            <blockquote className="mt-6 rounded-2xl border border-iris/25 bg-iris/[0.07] p-4 text-sm leading-relaxed text-ink-soft">
              “The Star at the heart of the matter says the change comes from growth,
              not despair — the hardest part is behind you. The Two of Cups hints
              that allies will be decisive: one honest conversation will give you
              more than ten job applications…”
            </blockquote>
            <p className="mt-3 text-right text-xs text-ink-soft/60">— a fragment of the actual reading format</p>
          </div>
        </section>
      </Reveal>

      {/* Семь направлений + CTA */}
      <Reveal>
        <section className="mt-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl">Tarot is one of seven sections</h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            AstroOrbi also includes the natal chart, Matrix of Destiny, compatibility,
            horoscopes, solar return and the Oracle for free-form questions. Start
            with the free reading — explore the rest inside.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <TrialCTA cta="bottom">Get my free reading</TrialCTA>
            <TrialCTA cta="bottom-ghost" ghost>
              Open in Telegram
            </TrialCTA>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <FAQ items={FAQ_ITEMS} title="FAQ" />
        </section>
      </Reveal>

      <p className="mt-12 text-center text-xs text-ink-soft/60">
        Tarot is food for thought. Interpretations are AI-made. The service is for
        informational and entertainment purposes and does not replace professional
        advice.
      </p>
    </main>
  );
}
