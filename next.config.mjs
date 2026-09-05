import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200],
  },
  experimental: {
    // Inline critical CSS to eliminate render-blocking request
    // (saves ~150 ms on LCP per PageSpeed Insights).
    // Replaces the legacy `optimizeCss` flag (which required `critters`).
    // Next 16 reads `browserslist` from package.json automatically and
    // uses MODERN_BROWSERSLIST_TARGET if absent — no `legacyBrowsers`
    // override is needed.
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
