import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LEGAL, LegalList, LegalNote, LegalSection, LegalShell } from "@/components/LegalDoc";
import { cleanCode } from "@/lib/metaSignedRequest";
import { BOT_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Deletion",
  description:
    "How to delete your data from AstroOrbi: data received through Threads, your Telegram Mini App account, and website data.",
  alternates: { canonical: "/en/data-deletion", languages: { ru: "/data-deletion", en: "/en/data-deletion", "x-default": "/data-deletion" } },
};

const A = "text-iris underline decoration-iris/40 underline-offset-4 hover:decoration-iris";

export default function EnDataDeletionPage({ searchParams }: { searchParams: { code?: string } }) {
  const code = cleanCode(searchParams?.code);
  const mail = <a className={A} href={`mailto:${LEGAL.email}?subject=${encodeURIComponent("Data deletion")}`}>{LEGAL.email}</a>;
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/data-deletion", label: "Data Deletion" }]} />
      <LegalShell title="Data Deletion" updated={LEGAL.updatedEn}>
        {code && (
          <div className="rounded-2xl border border-iris/40 bg-iris/10 p-5" role="status">
            <p className="text-xs uppercase tracking-[0.18em] text-stellar">Request status</p>
            <p className="mt-2 font-display text-xl">Request #{code} received</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              We will delete the data we received through Threads within 30 days of your request. If you have
              questions, email {mail} and include your request number.
            </p>
          </div>
        )}

        <LegalNote>
          Deletion is free. We process requests within 30 days. What we store and why is described in our{" "}
          <Link className={A} href="/en/privacy">Privacy Policy</Link>.
        </LegalNote>

        <LegalSection id="threads" title="Data from Threads">
          <LegalList>
            <li>
              <strong className="text-ink">You commented on our posts or mentioned AstroOrbi.</strong> Email {mail} with
              your Threads username. We will delete the comments and replies we stored. We do not store “card of the
              day” links with your username: the username exists only in the link itself.
            </li>
            <li>
              <strong className="text-ink">You deleted your comment on Threads.</strong> After that, it no longer
              reaches us through the Threads API. We delete any copy stored earlier within 90 days at the latest, or
              sooner if you ask.
            </li>
            <li>
              <strong className="text-ink">You connected the AstroOrbi app to your Threads account.</strong> Remove it in
              your Threads settings, in the section for app and website permissions. Meta will notify us, and we will
              delete the data received through that connection.
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection id="app" title="Your AstroOrbi Mini App account">
          <p>
            Message our bot <a className={A} href={`https://t.me/${BOT_USERNAME}`}>@{BOT_USERNAME}</a> in the “Support”
            section: “Please delete my data”. Or email {mail} with your Telegram username or ID.
          </p>
          <p>
            We will delete your account, birth data, and request and answer history. We keep payment and receipt
            records for as long as the law requires.
          </p>
        </LegalSection>

        <LegalSection id="site" title="Website data">
          <LegalList>
            <li>
              <strong className="text-ink">Free horoscope form.</strong> Email {mail} from the address you entered in the
              form, or tell us the name and birth date you entered.
            </li>
            <li>
              <strong className="text-ink">Analytics cookies.</strong> Delete cookies in your browser settings. You can
              opt out with the Yandex Metrica and Google Analytics opt-out tools.
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection id="contacts" title="Contact">
          <p>
            {LEGAL.operatorEn}. Email: {mail}. Русская версия:{" "}
            <Link className={A} href="/data-deletion">astroorbi.com/data-deletion</Link>.
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
}
