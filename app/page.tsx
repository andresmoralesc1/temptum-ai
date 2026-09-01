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
    </>
  );
}