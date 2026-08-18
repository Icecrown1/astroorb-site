export interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ({ items, title = "Частые вопросы" }: { items: FaqItem[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      <div className="mt-8 space-y-3">
        {items.map((i) => (
          <details
            key={i.q}
            className="group rounded-2xl border border-hairline bg-surface px-5 py-4 open:bg-raised"
          >
            <summary className="cursor-pointer list-none text-[15px] font-medium text-ink marker:content-none">
              <span className="mr-3 inline-block text-iris transition-transform duration-300 ease-out-strong group-open:rotate-45">
                +
              </span>
              {i.q}
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-muted">{i.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
