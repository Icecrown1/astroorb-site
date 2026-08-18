import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import PricingCards from "@/components/PricingCards";

export const metadata: Metadata = {
  title: "Тарифы Astro Orb — подписка от 99 ₽ в месяц",
  description:
    "Тарифы AI-астролога Astro Orb: Free — натальная карта бесплатно, Standard от 99 ₽/мес, Premium от 179 ₽/мес с соляром. Чеки 54-ФЗ, отмена в один клик.",
  alternates: { canonical: "/pricing" },
};

const FAQ_ITEMS = [
  { q: "Что такое звёзды и как они тратятся?", a: "Звёзды — внутренняя валюта для функций: вопрос Oracle — 0.5 звезды, гороскоп дня — 1, недельный — 5, месячный — 15, совместимость — 20, соляр — 15 (только Premium). Пакет звёзд обновляется 1-го числа каждого месяца." },
  { q: "Как отменить подписку?", a: "В настройках Mini App, в один клик. Никаких писем в поддержку и удерживающих экранов. Оплаченный период доработает до конца." },
  { q: "Какие способы оплаты доступны?", a: "Банковская карта через ЮKassa (с чеком по 54-ФЗ), криптовалюта TON и Telegram Stars. Автопродление — по желанию, галочкой при оплате." },
  { q: "Чем Premium отличается от Standard?", a: "Premium даёт 550 звёзд в месяц вместо 250 и открывает соляр — прогноз на личный год по точному моменту возвращения Солнца. Остальные функции доступны в обоих тарифах." },
  { q: "Есть ли возврат?", a: "Да, в течение 24 часов после оплаты — без объяснения причин. Напишите в поддержку прямо в боте." },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/pricing", label: "Тарифы" }]} />

      <section className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="max-w-3xl font-display text-3xl leading-[1.15] md:text-5xl">
          Тарифы: <span className="grad-text">честные и без мелкого шрифта</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Натальная карта — бесплатно навсегда. Подписка открывает полные разборы и пакет звёзд на функции.
        </p>
        <PricingCards />
        <p className="mt-8 text-center text-xs text-muted">
          Оплата: карта (ЮKassa, чек 54-ФЗ) · TON · Telegram Stars. Отмена в один клик. Возврат 24 часа.
        </p>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </>
  );
}
