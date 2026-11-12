import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LEGAL, LegalList, LegalNote, LegalSection, LegalShell } from "@/components/LegalDoc";
import { BOT_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data the astroorbi.com website, the AstroOrbi Telegram Mini App and our Threads integration collect, how we use it, who we share it with, and how to delete it.",
  alternates: { canonical: "/en/privacy", languages: { ru: "/privacy", en: "/en/privacy", "x-default": "/privacy" } },
};

const A = "text-iris underline decoration-iris/40 underline-offset-4 hover:decoration-iris";

export default function EnPrivacyPage() {
  const mail = <a className={A} href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>;
  return (
    <>
      <Breadcrumbs items={[{ href: "/en", label: "Home" }, { href: "/en/privacy", label: "Privacy Policy" }]} />
      <LegalShell title="Privacy Policy" updated={LEGAL.updatedEn}>
        <LegalNote>
          In short: we collect only what we need for calculations, replies and payments. We do not sell your data or
          share it for advertising. You can have your data deleted at any time —{" "}
          <Link className={A} href="/en/data-deletion">here is how</Link>.
        </LegalNote>

        <LegalSection id="operator" title="1. Who we are">
          <p>
            The data controller is {LEGAL.operatorEn} (“we”, “us”). Contact: {mail}, or the “Support” section of our
            Telegram bot <a className={A} href={`https://t.me/${BOT_USERNAME}`}>@{BOT_USERNAME}</a>.
          </p>
          <p>This policy covers all AstroOrbi services:</p>
          <LegalList>
            <li>the website astroorbi.com;</li>
            <li>the AstroOrbi Mini App and bot in Telegram;</li>
            <li>our Threads integration, which we use to run the official AstroOrbi Threads account.</li>
          </LegalList>
        </LegalSection>

        <LegalSection id="app" title="2. Data in the AstroOrbi Mini App">
          <LegalList>
            <li>
              <strong className="text-ink">Telegram data</strong>: user ID, name, username and interface language. Telegram
              passes this to us when you open the app.
            </li>
            <li>
              <strong className="text-ink">Birth data you enter</strong>: date, time and place of birth, and gender. We use
              it to build your birth chart, destiny matrix and forecasts.
            </li>
            <li>
              <strong className="text-ink">Your requests and the answers you receive</strong>: Oracle questions, tarot
              readings and interpretations. They are saved in your history so you can come back to them.
            </li>
            <li>
              <strong className="text-ink">Payments</strong>: amount, status, payment method and payment ID. We never
              receive bank card details — YooKassa processes them. For Telegram Stars payments we receive the Telegram
              payment ID. For GRAM payments we receive the wallet address and the transaction ID.
            </li>
            <li>
              <strong className="text-ink">Referrals</strong>: who invited whom, so we can credit bonuses.
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection id="site" title="3. Data on astroorbi.com">
          <LegalList>
            <li>
              <strong className="text-ink">Free horoscope form</strong>: name, gender, date, time and place of birth, and
              optionally an email address. We send it to the AstroOrbi server to calculate your horoscope.
            </li>
            <li>
              <strong className="text-ink">Analytics</strong>: Yandex Metrica (including Session Replay) and Google
              Analytics. They use cookies and collect technical data: IP address, device and browser type, pages viewed
              and on-page actions. We look at this data in aggregate to improve the site. You can disable cookies in
              your browser settings.
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection id="threads" title="4. Threads integration">
          <p>
            To run the official AstroOrbi account on Threads, we use Meta’s Threads API. The integration is connected
            only to our own account. We do not ask anyone to log in with Threads, and we do not get access to other
            people’s accounts.
          </p>
          <p className="text-ink">What we receive through the Threads API:</p>
          <LegalList>
            <li>
              <strong className="text-ink">Data about our account</strong>: ID, username, display name, profile picture,
              bio, and our posts.
            </li>
            <li>
              <strong className="text-ink">Insights</strong>: views, likes, replies, reposts and quotes for our posts,
              follower count, and aggregated follower demographics. Insights come in aggregate and do not identify
              individual people.
            </li>
            <li>
              <strong className="text-ink">Replies to our posts and mentions of our account</strong>: reply ID, the
              author’s username, the reply text and media, the time it was posted, and its link. This is public content
              that the author chose to post in reply to us.
            </li>
            <li>
              <strong className="text-ink">Public posts matching keywords</strong> about astrology and tarot — only if
              keyword search is enabled.
            </li>
          </LegalList>
          <p>
            Through Threads we never receive passwords, private messages, email addresses, phone numbers, or content
            from private accounts.
          </p>
          <p className="text-ink">How we use this data:</p>
          <LegalList>
            <li>to publish posts and reply to comments as the AstroOrbi account;</li>
            <li>
              to run giveaways such as the “card of the day”: if you comment on such a post, we use your username to
              address our reply to you and to prepare a link to your card. The link includes your username;
            </li>
            <li>to moderate conversations by hiding spam and abuse;</li>
            <li>to review aggregated insights and see which posts our readers find interesting.</li>
          </LegalList>
          <p>
            A comment’s text may be processed by an automation service or an AI model to help draft a reply. We do not
            use Threads data to train our own models.
          </p>
          <p className="text-ink">What we never do with Threads data:</p>
          <LegalList>
            <li>sell it or share it for advertising;</li>
            <li>build user profiles, or combine Threads data with AstroOrbi Mini App data;</li>
            <li>use it for automated decisions that have legal effects on you.</li>
          </LegalList>
          <p>
            <strong className="text-ink">Retention.</strong> Access tokens for our account are kept in a secure secrets
            store while the integration is connected. We keep comments and replies for no more than 90 days, then
            delete them. Aggregated insights without personal data may be kept longer.
          </p>
          <p>
            <strong className="text-ink">Deletion.</strong> To have data from your comments deleted, email {mail} with
            your Threads username. We will delete it within 30 days. See the{" "}
            <Link className={A} href="/en/data-deletion">data deletion page</Link> for details.
          </p>
        </LegalSection>

        <LegalSection id="purposes" title="5. Why we process data">
          <LegalList>
            <li>to calculate charts and forecasts and prepare interpretations;</li>
            <li>to run your account, subscription and star balance;</li>
            <li>to accept payments and issue receipts as required by Russian law;</li>
            <li>to answer you in support and on social media;</li>
            <li>to see from aggregated statistics how to improve the service.</li>
          </LegalList>
          <p>
            We rely on your consent and on the performance of our service agreement (the offer published in the Mini
            App). Personal data is processed under Russian Federal Law No. 152-FZ “On Personal Data”.
          </p>
        </LegalSection>

        <LegalSection id="processors" title="6. Who we share data with">
          <p>
            We share data only with services that help run AstroOrbi. Each receives only the data it needs for its task.
          </p>
          <LegalList>
            <li><strong className="text-ink">Telegram</strong> — the platform for our Mini App, bot and Stars payments;</li>
            <li><strong className="text-ink">YooKassa (YooMoney LLC)</strong> — card payments and receipts;</li>
            <li><strong className="text-ink">Hosting provider (Replit, USA)</strong> — servers for the app and website;</li>
            <li>
              <strong className="text-ink">AI model provider (OpenAI, USA)</strong> — receives the data needed for the
              text: birth data, gender, and your question;
            </li>
            <li><strong className="text-ink">Yandex and Google</strong> — website analytics;</li>
            <li><strong className="text-ink">Meta Platforms</strong> — the Threads platform where our account runs;</li>
            <li><strong className="text-ink">Social media automation services</strong> — posting and replying on Threads.</li>
          </LegalList>
          <p>
            Some of these services are located outside Russia, so data may be transferred abroad for the same purposes
            described above. We do not sell personal data. We disclose it only when lawfully required by public
            authorities.
          </p>
        </LegalSection>

        <LegalSection id="retention" title="7. How long we keep data">
          <LegalList>
            <li>Mini App account data — while you use the service, or until you ask us to delete it;</li>
            <li>payment and receipt records — as long as the law requires;</li>
            <li>Threads data — as described in section 4;</li>
            <li>analytics data — under Yandex Metrica and Google Analytics rules.</li>
          </LegalList>
        </LegalSection>

        <LegalSection id="rights" title="8. Your rights">
          <p>You can:</p>
          <LegalList>
            <li>find out what data we hold about you and get a copy of it;</li>
            <li>correct inaccurate data;</li>
            <li>have your data deleted and withdraw your consent;</li>
            <li>complain to Roskomnadzor or to the data protection authority in your country.</li>
          </LegalList>
          <p>To use these rights, email {mail}. We reply within 10 business days.</p>
        </LegalSection>

        <LegalSection id="security" title="9. Security">
          <p>
            The website and the app work over HTTPS only. Only the service administrator can access the database and
            access keys. Keys and tokens are kept in a secrets store, not in code.
          </p>
        </LegalSection>

        <LegalSection id="age" title="10. Age">
          <p>
            AstroOrbi is intended for adults. If you learn that a minor has given us their data, contact us and we will
            delete it.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="11. Changes to this policy">
          <p>
            We may update this policy. The new version is published on this page, with the update date at the top. We
            will announce significant changes in our bot.
          </p>
        </LegalSection>

        <LegalSection id="contacts" title="12. Contact">
          <p>
            {LEGAL.operatorEn}. Email: {mail}. Telegram:{" "}
            <a className={A} href={`https://t.me/${BOT_USERNAME}`}>@{BOT_USERNAME}</a>.
          </p>
          <p>
            Русская версия: <Link className={A} href="/privacy">astroorbi.com/privacy</Link>.
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
}
