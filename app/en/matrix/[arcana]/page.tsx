import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { ARCANA, arcanaBySlug } from "@/lib/arcana";
import { pageOg } from "@/lib/site";

export function generateStaticParams() {
  return ARCANA.map((a) => ({ arcana: a.slug }));
}

export function generateMetadata({ params }: { params: { arcana: string } }): Metadata {
  const a = arcanaBySlug(params.arcana);
  if (!a) return {};
  return {
    title: `Arcana ${a.n} "${a.en.name}" in the Destiny Matrix — Meaning`,
    description: `Arcana ${a.n} (${a.en.name}) in the Destiny Matrix: ${a.en.keyword}. The plus and minus expression, the energy's task and how to turn it into a resource.`,
    alternates: { canonical: `/en/matrix/${a.slug}`, languages: { ru: `/matrix/${a.slug}`, en: `/en/matrix/${a.slug}`, "x-default": `/matrix/${a.slug}` } },
    openGraph: pageOg(`/en/matrix/${a.slug}`, "en"),
  };
}

export default function EnArcanaPage({ params }: { params: { arcana: string } }) {
  const a = arcanaBySlug(params.arcana);
  if (!a) notFound();

  const prev = ARCANA[(a.n - 2 + 22) % 22];
  const next = ARCANA[a.n % 22];

  const faq = [
    { q: `What does arcana ${a.n} mean in the personal position?`, a: `The personal arcana "${a.en.name}" describes character and style of action: ${a.en.keyword}. In plus it's a resource; in minus, a repeating scenario worth becoming aware of.` },
    { q: `Is "${a.en.name}" a good or a bad arcana?`, a: "There are no bad arcana in the matrix: every energy has a plus and a minus expression. The task is to notice the minus and consciously shift the energy into plus." },
    { q: "Where can I see the full layout?", a: "The complete matrix with all positions (family line, karma, money, purpose by ages) is built in Astro Orb in a minute from your birth date." },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/en", label: "Home" },
          { href: "/en/matrix", label: "Destiny matrix" },
          { href: `/en/matrix/${a.slug}`, label: `Arcana ${a.n}. ${a.en.name}` },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">Energy {a.n} of 22</p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Arcana {a.n}. <span className="grad-text">{a.en.name}</span>
        </h1>
        <p className="mt-4 text-lg text-stellar">{a.en.keyword}</p>

        <div className="mt-10 space-y-4">
          <div className="rounded-2xl border border-iris/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">In plus</p>
            <p className="mt-2 text-[15px] leading-relaxed">{a.en.plus}</p>
          </div>
          <div className="rounded-2xl border border-hairline bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">In minus</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.en.minus}</p>
          </div>
          <div className="rounded-2xl border border-stellar/30 bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">The energy's task</p>
            <p className="mt-2 text-[15px] leading-relaxed">{a.en.task}</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">
            "{a.en.name}" can stand in different positions of the matrix — personal, family, karmic
            or financial — and reads differently in each. Find out where exactly this energy sits in
            your chart and how it works right now in the full layout.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <CTA page={`en_matrix_${a.slug}`} cta="unlock">My full layout</CTA>
            <Link href="/en/matrix" className="text-sm text-iris hover:underline">
              ← Matrix calculator
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <span className="text-muted">Adjacent arcana:</span>
          <Link href={`/en/matrix/${prev.slug}`} className="text-iris hover:underline">
            {prev.n}. {prev.en.name}
          </Link>
          <Link href={`/en/matrix/${next.slug}`} className="text-iris hover:underline">
            {next.n}. {next.en.name}
          </Link>
        </div>
      </section>

      <FAQ items={faq} title="FAQ" />
    </>
  );
}
