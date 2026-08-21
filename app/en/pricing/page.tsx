import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingCards from "@/components/PricingCards";
import FAQ from "@/components/FAQ";
import { pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing: Free Birth Chart, Plans from 99 ₽/mo",
  description:
    "Free — birth chart at no cost; Standard from 99 ₽/mo; Premium from 179 ₽/mo with Solar Return. Pay by card, TON or Telegram Stars. One-click cancellation.",
  alternates: { canonical: "/en/pricing", languages: { ru: "/pricing", en: "/en/pricing", "x-default": "/pricing" } },
  openGraph: pageOg("/en/pricing", "en"),
};

const FAQ_ITEMS = [
  { q: "Can I pay from outside Russia?", a: "Yes — via TON cryptocurrency or Telegram Stars, both available worldwide right inside Telegram. Card payments are currently processed in rubles." },
  { q: "What are 'stars'?", a: "The internal currency of Astro Orb features: full readings, Oracle questions and forecasts each cost a few stars. Subscriptions refill your balance monthly; unused stars roll over while the subscription is active." },
  { q: "How do I cancel?", a: "In one click inside the Mini App — no emails, no support tickets. Paid time keeps working until the period ends." },
  { q: "Is there a free tier?", a: "Yes, forever: the birth chart with the wheel and short planet descriptions. Subscriptions add full AI readings and premium tools." },
];

export default function EnPricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/pricing", label: "Pricing" }]} />
      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Simple pricing — <span className="grad-text">start free</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          The chart is free forever. Subscriptions unlock full AI readings. Prices are in rubles
          (≈ 90 ₽ per $1); pay worldwide with TON or Telegram Stars.
        </p>
        <PricingCards locale="en" />
      </section>
      <FAQ items={FAQ_ITEMS} title="FAQ" />
    </>
  );
}
