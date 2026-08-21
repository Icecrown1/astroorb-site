import Script from "next/script";

/**
 * Подключение аналитики. Управляется переменными окружения:
 *   NEXT_PUBLIC_YM_ID — номер счётчика Яндекс.Метрики (например 99123456)
 *   NEXT_PUBLIC_GA_ID — Measurement ID GA4 (например G-XXXXXXXXXX)
 * Если переменная не задана — соответствующий скрипт не вставляется вовсе.
 */
export default function Analytics() {
  const ym = process.env.NEXT_PUBLIC_YM_ID;
  const ga = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {ym && (
        <>
          <Script id="ym-init" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],
              k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${Number(ym)}, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });`}
          </Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${Number(ym)}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
      {ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}');`}
          </Script>
        </>
      )}
    </>
  );
}
