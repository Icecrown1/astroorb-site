/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Короткий адрес с картинок «Карта дня» (Threads) → лид-магнит «Бесплатный расклад Таро»; UTM — для учёта в Метрике
      {
        source: "/taro",
        destination: "/tarot-free?utm_source=threads&utm_medium=card_image&utm_campaign=karta_dnya",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
