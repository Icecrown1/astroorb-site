import Link from "next/link";
import CTA from "@/components/CTA";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-2xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-display text-6xl grad-text">404</p>
      <h1 className="mt-4 font-display text-2xl">Эта страница ушла в ретроград</h1>
      <p className="mt-3 text-muted">
        Такого адреса нет. Зато есть натальная карта, матрица судьбы и гороскопы.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <CTA page="404" cta="open">Открыть Astro Orb</CTA>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-hairline px-6 py-3 text-sm text-ink hover:border-iris/40"
        >
          На главную
        </Link>
      </div>
    </section>
  );
}
