# Astro Orb — сайт (SEO → Telegram Mini App)

Конверсионный сайт по ТЗ v1.0: собирает органический трафик и переводит его в Mini App
через deep-links `t.me/<bot>?start=web_{page}_{cta}` со сквозной атрибуцией.

## Запуск на Replit

1. Создайте Repl → **Import from ZIP** (или перетащите распакованную папку).
2. Replit подхватит `.replit` автоматически. Нажмите **Run** — выполнится `npm run dev`
   (зависимости Replit ставит сам; если нет — выполните `npm install` в Shell).
3. В **Secrets** (или `.env`) задайте:
   - `NEXT_PUBLIC_BOT_USERNAME` — username бота без `@` (по умолчанию `AstroOrbBot`)
   - `NEXT_PUBLIC_SITE_URL` — канонический домен (для sitemap/canonical/OG)
   - `HOROSCOPE_API_URL` — (опционально) URL бэкенда AstroOrbChat для AI-гороскопов знаков
4. Продакшен: `npm run build && npm run start` (в `.replit` уже прописано для Deployments).

## Что внутри

| Раздел | Страницы |
|---|---|
| Главная `/` | Hero c анимированным колесом, демо разбора, шаги, фичи, доверие, сравнение, FAQ |
| `/natal-chart` | Калькулятор натальной карты в браузере (astronomy-engine: Солнце, Луна, 8 планет, асцендент) + SEO-текст + FAQ |
| `/matrix` + 22 стр. арканов | Калькулятор матрицы судьбы (редукция даты) + pSEO-страницы `/matrix/{arcana}` |
| `/compatibility` + 78 пар | Калькулятор пар + pSEO `/compatibility/{znak}-{znak}` с канонизацией слага (301-redirect обратного порядка) |
| `/horoscope` + 12 знаков | ISR (revalidate 86400), дата в title, «завтра» на странице |
| `/solar-return` | Продажа Premium |
| `/pricing` | Зеркалит `SUBSCRIPTION_PRICES` бэкенда: Standard 199/159/99, Premium 399/359/179 |
| `/about` | E-E-A-T: технология, методология, честность оплаты |

ТехSEO: `sitemap.xml` и `robots.txt` (авто), canonical на каждой странице, JSON-LD
(`WebApplication`, `FAQPage`, `BreadcrumbList`), один H1 на страницу, хлебные крошки,
шрифты self-hosted через `next/font` (`display: swap`), 404.

## Сквозная атрибуция

Все CTA идут через `lib/site.ts → deepLink(page, cta)` → `?start=web_{page}_{cta}`
(нормализация под лимит Telegram 64 симв.). На стороне Mini App расширьте существующий
парсер `start` (сейчас обрабатывает `lead_xxx`) префиксом `web_` и пишите источник
в таблицу `leads` — тогда атрибуция доедет до регистрации и оплаты.

## Точки интеграции с бэкендом Astro Orb

1. **Гороскопы**: страницы знаков сами берут AI-гороскоп с бэкенда — задайте `HOROSCOPE_API_URL` (адрес приложения AstroOrbChat, у которого есть `GET /api/public/sign-horoscope/:sign`). Без переменной или при недоступности бэкенда работает встроенный композер (`lib/horoscope.ts`).
   ISR раз в сутки). Замените на fetch к вашему GPT-5-пайплайну
   (`server/lib/prompts/horoscope*.md`) — интерфейс `DayHoroscope` уже готов.
2. **Натальный калькулятор**: считает в браузере (astronomy-engine, без запросов к серверу —
   агрессивнее любого кэша). Полные интерпретации и дома остаются в Mini App
   (Swiss Ephemeris, `server/natal_chart_api.py`) — это и есть конверсионная «недосказанность».
3. **Лид-магнит**: страницы готовы к подключению `/lead`-эндпоинта — добавьте форму
   и дергайте существующий публичный роут.

## Дальше по ТЗ (не в этом MVP)

- Блог (`/blog`) и EN-локаль (`/en/...`, hreflang) — этапы 2–3.
- OG-картинки результатов (@vercel/og) для вирусного шеринга.
- Яндекс.Метрика + GA4: вставьте счётчики в `app/layout.tsx`.
- Реальные отзывы: блок сознательно не публикуется до их появления (ТЗ §9.3).
