import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archivo, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { SITE_URL } from '@/lib/site';
import '../globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['Arial', 'system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
  preload: true,
  fallback: ['Arial', 'system-ui', 'sans-serif'],
  adjustFontFallback: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Site' });
  const tMeta = await getTranslations({ locale, namespace: 'Site.meta' });

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    if (l === 'es') {
      languages['es-CO'] = '/';
      languages['es-419'] = '/';
      languages['es'] = '/';
    } else {
      languages['en'] = `/${l}`;
      languages['en-US'] = `/${l}`;
    }
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: tMeta('defaultTitle'),
      template: tMeta('titleTemplate'),
    },
    description: t('description'),
    applicationName: 'Temptum',
    authors: [{ name: 'Temptum' }],
    generator: 'Next.js',
    keywords: t.raw('keywords') as string[],
    alternates: {
      canonical: locale === 'es' ? '/' : `/${locale}`,
      languages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      url: locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`,
      siteName: 'Temptum',
      title: tMeta('defaultTitle'),
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: tMeta('defaultTitle'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: 'Temptum',
  alternateName: 'Temptum — Corporate & Government Affairs',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-temptum.png`,
  description:
    'An independent firm specialized in corporate & government affairs in Colombia. We support regulated companies, in-house legal and compliance teams in scenarios where the decision must hold up before a regulator, a judge, or public opinion.',
  email: 'info@temptum.io',
  telephone: '+57-302-238-8618',
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bogotá',
    addressRegion: 'Bogotá, D.C.',
    addressCountry: 'CO',
  },
  areaServed: { '@type': 'Country', name: 'Colombia' },
  knowsAbout: [
    'Regulatory affairs',
    'Government relations',
    'Risk and crisis management',
    'ESG communications',
    'Political intelligence',
    'Public affairs',
    'Corporate communications',
  ],
  founder: {
    '@type': 'Person',
    name: 'Silvia Juliana Parra Cañas',
    jobTitle: 'CEO and Founding Partner',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@temptum.io',
    telephone: '+57-302-238-8618',
    areaServed: 'CO',
    availableLanguage: ['Spanish', 'English'],
  },
  priceRange: '$$$$',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  name: 'Temptum',
  alternateName: 'Temptum — Corporate & Government Affairs',
  url: SITE_URL,
  inLanguage: ['es-CO', 'en-US'],
  publisher: { '@id': `${SITE_URL}#organization` },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Common' });

  return (
    <html
      lang={locale === 'es' ? 'es-CO' : 'en-US'}
      className={`${archivo.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a
            href="#contenido-principal"
            className="sr-only-focusable absolute left-2 top-2 z-[100] bg-navy-950 px-4 py-2 text-sm font-medium uppercase tracking-widest text-white focus:not-sr-only"
          >
            {t('skipToContent')}
          </a>
          <Header />
          <main id="contenido-principal" className="flex-1">
            {children}
          </main>
          <Footer />
          <LocaleSwitcher />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteJsonLd),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
