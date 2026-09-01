import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://temptum.andresmorales.com.co';

const SITE_DESCRIPTION =
  'Nexo de influencia, rigor técnico y mitigación de riesgos para el sector privado y las instituciones en Colombia.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Temptum | Consultoría Estratégica',
    template: '%s | Temptum',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'Temptum',
  authors: [{ name: 'Temptum' }],
  generator: 'Next.js',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    siteName: 'Temptum',
    title: 'Temptum | Consultoría Estratégica',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temptum | Consultoría Estratégica',
    description: SITE_DESCRIPTION,
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Temptum',
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero.jpg`,
  description: SITE_DESCRIPTION,
  email: 'info@temptum.io',
  telephone: '+57-302-238-8618',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bogotá',
    addressCountry: 'CO',
  },
  areaServed: { '@type': 'Country', name: 'Colombia' },
  knowsAbout: [
    'Asuntos regulatorios',
    'Relaciones institucionales',
    'Gestión de riesgos',
    'Comunicaciones ASG',
    'Inteligencia política',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Temptum',
  url: SITE_URL,
  inLanguage: 'es-CO',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${archivo.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenido-principal"
          className="sr-only-focusable absolute left-2 top-2 z-[100] bg-navy-950 px-4 py-2 text-sm font-medium uppercase tracking-widest text-white focus:not-sr-only"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido-principal" className="flex-1">
          {children}
        </main>
        <Footer />
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
      </body>
    </html>
  );
}
