import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { CredibilityStrip } from '@/components/CredibilityStrip';
import { Services } from '@/components/Services';
import { Manifesto } from '@/components/Manifesto';
import { Equipo } from '@/components/Equipo';
import { CasesPreview } from '@/components/CasesPreview';
import { IntelligenceCenter } from '@/components/IntelligenceCenter';

export const metadata: Metadata = {
  description:
    'Nexo de influencia, rigor técnico y mitigación de riesgos para el sector privado y las instituciones en Colombia.',
  alternates: { canonical: '/' },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://temptum.andresmorales.com.co';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Silvia Juliana Parra Cañas',
  jobTitle: 'CEO y socia fundadora',
  worksFor: {
    '@type': 'Organization',
    name: 'Temptum',
    url: SITE_URL,
  },
  url: `${SITE_URL}/quienes-somos`,
  sameAs: [
    'https://www.linkedin.com/in/silviajulianaparra/',
  ],
  knowsAbout: [
    'Relaciones públicas',
    'Periodismo',
    'Gestión de crisis',
    'Asuntos públicos',
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Services />
      <Manifesto />
      <Equipo />
      <CasesPreview />
      <IntelligenceCenter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd),
        }}
      />
    </>
  );
}