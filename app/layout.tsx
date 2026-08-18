import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";
// Self-hosted шрифты (Fontsource, variable, cyrillic+latin) — без запросов к Google Fonts
import "@fontsource-variable/unbounded/wght.css";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Натальная карта с точностью NASA — AI-астролог Astro Orb в Telegram",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Персональный AI-астролог в Telegram: натальная карта по Swiss Ephemeris, матрица судьбы, совместимость и гороскопы. Бесплатный расчёт за 2 минуты, без установки приложения.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Telegram",
  description:
    "AI-астролог в Telegram: натальная карта (Swiss Ephemeris), матрица судьбы, совместимость, гороскопы, соляр.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "RUB",
    lowPrice: "0",
    highPrice: "399",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
        <div className="starfield" aria-hidden />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
