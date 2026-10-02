// Пинг IndexNow всеми URL из sitemap: отдельно в Яндекс и в Bing.
// Запуск после деплоя (Republish), чтобы sitemap уже был новым:
//   node scripts/indexnow.mjs
const KEY = "21a64c8f89be8f66647fa26ec2189784";
const HOST = "astroorbi.com";

const ENDPOINTS = [
  { name: "Яндекс", url: "https://yandex.com/indexnow" },
  { name: "Bing", url: "https://www.bing.com/indexnow" },
];

const res = await fetch(`https://${HOST}/sitemap.xml`);
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.includes(HOST));
console.log(`sitemap URLs: ${urls.length}`);

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: urls.slice(0, 10000),
});

for (const ep of ENDPOINTS) {
  try {
    const r = await fetch(ep.url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });
    const text = r.status === 200 || r.status === 202 ? "" : await r.text();
    let verdict;
    if (r.status === 200 || r.status === 202) verdict = "OK — адреса приняты";
    else if (r.status === 403 && text.includes("SiteVerificationNotCompleted"))
      verdict = "ключ ещё проверяется (первый запуск) — повторите через несколько часов";
    else if (r.status === 429) verdict = "слишком часто — повторите завтра";
    else verdict = `ошибка: ${text.slice(0, 200)}`;
    console.log(`${ep.name}: ${r.status} ${verdict}`);
  } catch (e) {
    console.log(`${ep.name}: не удалось отправить (${e.message})`);
  }
}
