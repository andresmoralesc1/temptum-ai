import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  // 'swap' muestra fallback mientras carga, luego cambia a Archivo.
  // adjustFontFallback:true genera @font-face con size-adjust/override
  // para que la fallback (Arial) ocupe el mismo espacio que Archivo,
  // evitando CLS cuando ocurre el swap.
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

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://temptum.andresmorales.com.co'
).replace(/\/$/, '');

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
  '@id': `${SITE_URL}#organization`,
  name: 'Temptum',
  alternateName: 'Temptum Consultoría Estratégica',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-temptum.png`,
  description: SITE_DESCRIPTION,
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
    'Asuntos regulatorios',
    'Relaciones institucionales',
    'Gestión de riesgos',
    'Comunicaciones ASG',
    'Inteligencia política',
    'Asuntos públicos',
    'Comunicación corporativa',
  ],
  founder: {
    '@type': 'Person',
    name: 'Silvia Juliana Parra Cañas',
    jobTitle: 'CEO y socia fundadora',
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
  alternateName: 'Temptum Consultoría Estratégica',
  url: SITE_URL,
  inLanguage: 'es-CO',
  publisher: { '@id': `${SITE_URL}#organization` },
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
