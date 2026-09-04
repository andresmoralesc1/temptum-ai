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
    'Centro especializado en Colombia en corporate & government affairs. Acompañamos a empresas reguladas, equipos legales y de cumplimiento en escenarios donde la decisión tiene que sostenerse ante un regulador, un juez o la opinión pública.',
  alternates: { canonical: '/' },
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://temptum.andresmorales.com.co'
).replace(/\/$/, '');

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#founder`,
  name: 'Silvia Juliana Parra Cañas',
  jobTitle: 'CEO y socia fundadora',
  worksFor: {
    '@id': `${SITE_URL}#organization`,
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