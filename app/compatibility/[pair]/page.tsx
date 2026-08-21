import type { Metadata } from "next";
import { pageOg } from "@/lib/site";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { allPairs, calcCompat, canonicalPair, parsePair, relatedPairs } from "@/lib/compat";
import { ELEMENT_RU, signBySlug } from "@/lib/zodiac";

export function generateStaticParams() {
  return allPairs();
}

export function generateMetadata({ params }: { params: { pair: string } }): Metadata {
  const parsed = parsePair(params.pair);
  if (!parsed) return {};
  const r = calcCompat(parsed[0], parsed[1]);
  if (!r) return {};
  return {
    title: `${r.a.ru} и ${r.b.ru} — совместимость знаков (${r.score}%)`,
    description: `Совместимость ${r.a.ruGen} и ${r.b.ruGen}: ${r.score}% — ${r.headline.toLowerCase()}. Сильные стороны, точки трения, синастрия.`,
    alternates: { canonical: `/compatibility/${params.pair}` },
    openGraph: pageOg(`/compatibility/${params.pair}`),
  };
}

export default function PairPage({ params }: { params: { pair: string } }) {
  const parsed = parsePair(params.pair);
  if (!parsed) notFound();
  const canon = canonicalPair(parsed[0], parsed[1]);
  if (!signBySlug(parsed[0]) || !signBySlug(parsed[1])) notFound();
  if (canon !== params.pair) permanentRedirect(`/compatibility/${canon}`);

  const r = calcCompat(parsed[0], parsed[1]);
  if (!r) notFound();

  const related = relatedPairs(parsed[0], parsed[1]);

  const faq = [
    { q: `${r.a.ru} и ${r.b.ru} — хорошая пара?`, a: `${r.headline}. Базовый показатель по знакам — ${r.score}%. Это сочетание стихий ${ELEMENT_RU[r.a.element]} и ${ELEMENT_RU[r.b.element]}; итог зависит от полных карт обоих партнёров.` },
    { q: "Что даст полная синастрия этой паре?", a: "Наложение двух натальных карт: как связаны ваши Луны (быт и эмоции), Венера и Марс (притяжение), Сатурн (долгосрочность). Синастрия часто меняет вывод, сделанный только по знакам." },
    { q: "Совместимость по знакам не совпадает с моим опытом. Почему?", a: "Солнечный знак — 1 из 10 планет. Асцендент, Луна и личные планеты могут полностью перекрывать сочетание солнечных знаков — именно это видно в разборе по полным картам." },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/compatibility", label: "Совместимость" },
          { href: `/compatibility/${canon}`, label: `${r.a.ru} и ${r.b.ru}` },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <h1 className="font-display text-3xl leading-[1.15] md:text-5xl">
          {r.a.ru} и {r.b.ru}: <span className="grad-text">совместимость {r.score}%</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{r.headline}</p>
        <p className="mt-6 text-[15px] leading-relaxed text-muted">{r.paragraph}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-iris/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Сильные стороны пары</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              {r.strengths.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-stellar">✦</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Точки трения</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {r.frictions.map((s) => (
                <li key={s} className="flex gap-2">
                  <span>◦</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[r.a, r.b].map((s) => (
            <div key={s.slug} className="rounded-2xl border border-hairline bg-surface p-6 text-sm">
              <p className="font-medium">
                {s.symbol} {s.ru} · {s.dates}
              </p>
              <p className="mt-2 text-muted">
                Стихия: {ELEMENT_RU[s.element]} · Управитель: {s.ruler} · Ключевое слово: {s.keyword}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">
            Это разбор по солнечным знакам — первый слой совместимости. Точная картина вашей пары —
            в синастрии по двум полным натальным картам: любовь, деньги, быт и кризисные точки по датам
            рождения обоих партнёров.
          </p>
          <div className="mt-5">
            <CTA page={`compat_${canon}`} cta="unlock">Точный разбор нашей пары</CTA>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm text-muted">Смежные пары:</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {related.map((p) => (
              <Link key={p.pair} href={`/compatibility/${p.pair}`} className="text-iris hover:underline">
                {p.title}
              </Link>
            ))}
            <Link href="/compatibility" className="text-muted hover:text-ink">
              Все пары →
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={faq} />
    </>
  );
}
