import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "@/components/Analytics";
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
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "ru_RU",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Astro Orb — AI-астролог в Telegram" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  description:
    "Персональный AI-астролог в Telegram: натальная карта по Swiss Ephemeris, матрица судьбы, совместимость и гороскопы. Бесплатный расчёт за 2 минуты, без установки приложения.",
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

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "ru-RU",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og.png` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <div className="starfield" aria-hidden />
        <Analytics />
        <ScrollToTop />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
