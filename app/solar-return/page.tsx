import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Соляр — гороскоп на год от дня рождения",
  description:
    "Что такое соляр (Solar Return) и как построить карту солнечного возвращения: прогноз на личный год по точному астрономическому моменту. Расчёт в Astro Orb Premium.",
  alternates: { canonical: "/solar-return" },
};

const FAQ_ITEMS = [
  { q: "Что такое соляр простыми словами?", a: "Это карта момента, когда Солнце возвращается в ту же точку зодиака, где было при вашем рождении. Она описывает темы и события личного года — от дня рождения до дня рождения." },
  { q: "Почему важен точный момент, а не просто дата?", a: "Солнце возвращается в натальную позицию с точностью до минут, и этот момент каждый год смещается — иногда на день раньше или позже дня рождения. От момента зависит асцендент соляра, а значит вся сетка домов и акценты года." },
  { q: "Влияет ли место встречи дня рождения на соляр?", a: "Да, дома соляра строятся по месту, где вы находитесь в момент солнечного возвращения. Astro Orb считает карту по вашему актуальному местоположению и кэширует расчёт на год." },
  { q: "Почему соляр — только в Premium?", a: "Это самый ресурсоёмкий расчёт и самый объёмный разбор: полная годовая карта с интерпретацией всех домов. В Premium он включён вместе с 550 звёздами в месяц." },
];

export default function SolarReturnPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/solar-return", label: "Соляр" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8">
        <p className="eyebrow">Premium-функция</p>
        <h1 className="mt-5 font-display text-3xl leading-[1.15] md:text-5xl">
          Соляр: <span className="grad-text">гороскоп на ваш личный год</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Раз в год Солнце возвращается в точку, где оно было в момент вашего рождения — с точностью
          до угловой секунды. Карта этого момента называется соляром и читается как прогноз на год вперёд.
        </p>

        <Reveal>
          <div className="mt-12 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              В отличие от общих годовых гороскопов, соляр персонален трижды: он строится от вашей натальной
              позиции Солнца, на точный астрономический момент возвращения и по месту, где вы находитесь
              в этот момент. Поэтому у двух людей одного знака соляры совершенно разные.
            </p>
            <p>
              Как читается карта года: асцендент соляра задаёт главную сцену — где развернутся события;
              положение Солнца по домам показывает фокус самореализации; скопления планет отмечают сферы,
              которые «включатся» именно в этом году. Сравнение соляра с натальной картой показывает, какие
              врождённые темы год активирует.
            </p>
            <p>
              Astro Orb вычисляет момент солнечного возвращения астрономически точно (Swiss Ephemeris),
              строит карту года и генерирует полную интерпретацию: сферы фокуса, месяцы-акценты, риски
              и ресурсы. Разбор доступен в тарифе Premium — вместе с{" "}
              <Link href="/natal-chart" className="text-iris hover:underline">натальной картой</Link>,{" "}
              <Link href="/compatibility" className="text-iris hover:underline">совместимостью</Link> и{" "}
              <Link href="/matrix" className="text-iris hover:underline">матрицей судьбы</Link>.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl border border-iris/40 bg-iris/[0.06] p-6">
            <p className="text-sm sm:flex-1 text-ink">
              Соляр входит в Premium — от 179 ₽/мес при оплате за год.{" "}
              <Link href="/pricing" className="text-iris hover:underline">Сравнить тарифы</Link>
            </p>
            <CTA page="solar-return" cta="premium">Построить соляр</CTA>
          </div>
        </Reveal>
      </section>

      <FAQ items={FAQ_ITEMS} />
    </>
  );
}
