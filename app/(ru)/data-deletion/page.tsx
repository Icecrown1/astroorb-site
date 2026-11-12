import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LEGAL, LegalList, LegalNote, LegalSection, LegalShell } from "@/components/LegalDoc";
import { cleanCode } from "@/lib/metaSignedRequest";
import { BOT_USERNAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Удаление данных",
  description:
    "Как удалить свои данные из AstroOrbi: данные, полученные через Threads, аккаунт мини-приложения в Telegram и данные с сайта.",
  alternates: { canonical: "/data-deletion", languages: { ru: "/data-deletion", en: "/en/data-deletion", "x-default": "/data-deletion" } },
};

const A = "text-iris underline decoration-iris/40 underline-offset-4 hover:decoration-iris";

export default function DataDeletionPage({ searchParams }: { searchParams: { code?: string } }) {
  const code = cleanCode(searchParams?.code);
  const mail = <a className={A} href={`mailto:${LEGAL.email}?subject=${encodeURIComponent("Удаление данных")}`}>{LEGAL.email}</a>;
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/data-deletion", label: "Удаление данных" }]} />
      <LegalShell title="Удаление данных" updated={LEGAL.updatedRu}>
        {code && (
          <div className="rounded-2xl border border-iris/40 bg-iris/10 p-5" role="status">
            <p className="text-xs uppercase tracking-[0.18em] text-stellar">Статус запроса</p>
            <p className="mt-2 font-display text-xl">Запрос № {code} принят</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Мы удалим данные, полученные через Threads, в течение 30 дней с момента запроса. Если остались вопросы,
              напишите на {mail} и укажите номер запроса.
            </p>
          </div>
        )}

        <LegalNote>
          Удаление бесплатное. Запросы обрабатываем в течение 30 дней. Что и зачем мы храним, описано в{" "}
          <Link className={A} href="/privacy">политике конфиденциальности</Link>.
        </LegalNote>

        <LegalSection id="threads" title="Данные из Threads">
          <LegalList>
            <li>
              <strong className="text-ink">Вы комментировали наши публикации или упоминали AstroOrbi.</strong> Напишите на{" "}
              {mail} и укажите своё имя пользователя в Threads. Мы удалим сохранённые комментарии и ответы. Ссылки на
              карту дня с вашим ником мы не храним: ник есть только в самой ссылке.
            </li>
            <li>
              <strong className="text-ink">Вы удалили свой комментарий в Threads.</strong> После этого он больше не
              приходит к нам через Threads API. Сохранённую ранее копию мы удалим не позже чем через 90 дней или
              раньше — по вашему запросу.
            </li>
            <li>
              <strong className="text-ink">Вы подключали приложение AstroOrbi к аккаунту Threads.</strong> Отключите его
              в настройках Threads, в разделе разрешений для приложений и сайтов. Meta сообщит нам об этом, и мы
              удалим данные, полученные через это подключение.
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection id="app" title="Аккаунт в мини-приложении AstroOrbi">
          <p>
            Напишите в бот{" "}
            <a className={A} href={`https://t.me/${BOT_USERNAME}`}>@{BOT_USERNAME}</a>, раздел «Поддержка»: «Удалите мои
            данные». Или напишите на {mail} и укажите свой username или ID в Telegram.
          </p>
          <p>
            Мы удалим аккаунт, данные рождения, историю запросов и ответов. Сведения о платежах и чеках храним
            столько, сколько требует закон.
          </p>
        </LegalSection>

        <LegalSection id="site" title="Данные с сайта">
          <LegalList>
            <li>
              <strong className="text-ink">Форма бесплатного гороскопа.</strong> Напишите на {mail} с адреса, который
              указали в форме, или назовите имя и дату рождения из формы.
            </li>
            <li>
              <strong className="text-ink">Cookies аналитики.</strong> Удалите cookies в настройках браузера. Отключить
              сбор данных можно с помощью инструментов отказа Яндекс Метрики и Google Analytics.
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection id="contacts" title="Контакты">
          <p>
            {LEGAL.operatorRu}. E-mail: {mail}. English version:{" "}
            <Link className={A} href="/en/data-deletion">astroorbi.com/en/data-deletion</Link>.
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
}
