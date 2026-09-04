import type { ReactNode } from 'react';
// Root layout is a passthrough. The real layout lives in app/[locale]/layout.tsx
// because all pages are localized under [locale] (default 'es', no prefix).
// The middleware in middleware.ts handles the locale routing.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

export const metadata = {};
