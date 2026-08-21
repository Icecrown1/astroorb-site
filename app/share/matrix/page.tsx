import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { ARCANA } from "@/lib/arcana";
import { SITE_NAME } from "@/lib/site";
import { ctaPage, localePath, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Props = { searchParams: { arcana?: string; name?: string; l?: string } };

const clean = (x?: string) => (x || "").replace(/[<>"'`\\]/g, "").trim().slice(0, 20);

function load(sp: Props["searchParams"]) {
  const locale: Locale = sp.l === "en" ? "en" : "ru";
  const a = ARCANA.find((x) => x.slug === sp.arcana);
  if (!a) return null;
  return { locale, a, name: clean(sp.name) };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const d = load(searchParams);
  if (!d) return { robots: { index: false } };
  const { locale, a, name } = d;
  const en = locale === "en";
  const title = en
    ? `${name ? `${name}: ` : ""}Destiny arcana — ${a.n}. ${a.en.name}`
    : `${name ? `${name}: ` : ""}Аркан судьбы — ${a.n}. ${a.ru}`;
  const og = `/api/og?t=matrix&arcana=${a.slug}&l=${locale}${name ? `&name=${encodeURIComponent(name)}` : ""}`;
  return {
    title,
    description: en ? a.en.keyword : a.keyword,
    robots: { index: false, follow: true },
    alternates: { canonical: localePath(locale, `/matrix/${a.slug}`) },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description: en ? a.en.keyword : a.keyword,
      url: `/share/matrix?arcana=${a.slug}&l=${locale}`,
      siteName: SITE_NAME,
      type: "website",
      locale: en ? "en_US" : "ru_RU",
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [og] },
  };
}

export default function ShareMatrixPage({ searchParams }: Props) {
  const d = load(searchParams);
  if (!d) notFound();
  const { locale, a, name } = d;
  const en = locale === "en";

  return (
    <main className="mx-auto max-w-2xl px-4 py-20">
      <div className="shell">
        <div className="core p-8 text-center md:p-12">
          <p className="eyebrow">{name ? (en ? `${name} — Matrix of Destiny` : `${name} — матрица судьбы`) : en ? "Matrix of Destiny" : "Матрица судьбы"}</p>
          <p className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-stellar font-display text-4xl text-stellar">
            {a.n}
          </p>
          <h1 className="mt-4 font-display text-2xl md:text-3xl">{en ? a.en.name : a.ru}</h1>
          <p className="mt-2 text-iris">{en ? a.en.keyword : a.keyword}</p>
          <p className="mt-5 text-left text-[15px] leading-relaxed text-muted">{en ? a.en.plus : a.plus}</p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <CTA page={ctaPage(locale, "share_matrix")} cta="open">
              {en ? "Get my full Matrix reading" : "Полный разбор матрицы"}
            </CTA>
            <Link
              href={localePath(locale, `/matrix/${a.slug}`)}
              className="text-sm text-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
            >
              {en ? `More about arcana ${a.n} — ${a.en.name}` : `Подробнее об аркане ${a.n} — ${a.ru}`}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
