// Пинг IndexNow (Яндекс + Bing) всеми URL из sitemap. Запуск после деплоя:
//   node scripts/indexnow.mjs
const KEY = "21a64c8f89be8f66647fa26ec2189784";
const HOST = "astroorbi.com";
const res = await fetch(`https://${HOST}/sitemap.xml`);
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.includes(HOST));
console.log(`sitemap URLs: ${urls.length}`);
const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log("IndexNow:", r.status, r.status === 200 || r.status === 202 ? "OK" : await r.text());
