import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { CredibilityStrip } from '@/components/CredibilityStrip';
import { Methodology } from '@/components/Methodology';
import { Services } from '@/components/Services';
import { Manifesto } from '@/components/Manifesto';
import { Equipo } from '@/components/Equipo';
import { CasesPreview } from '@/components/CasesPreview';
import { IntelligenceCenter } from '@/components/IntelligenceCenter';
import { SITE_URL } from '@/lib/site';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  return {
    description: t('metadata.description'),
    alternates: {
      canonical: locale === 'es' ? '/' : `/${locale}`,
      languages: {
        'es-CO': '/',
        'es-419': '/',
        es: '/',
        en: '/en',
        'en-US': '/en',
      },
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      url: locale === 'es' ? SITE_URL : `${SITE_URL}/en`,
    },
    twitter: {
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#founder`,
    name: 'Silvia Juliana Parra Cañas',
    jobTitle: t.raw('founderJobTitle') as string,
    worksFor: { '@id': `${SITE_URL}#organization` },
    url: locale === 'es' ? `${SITE_URL}/quienes-somos` : `${SITE_URL}/en/about`,
    sameAs: ['https://www.linkedin.com/in/silviajulianaparra/'],
    knowsAbout: t.raw('founderKnowsAbout') as string[],
  };

  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Methodology />
      <Services />
      <Manifesto />
      <Equipo />
      <CasesPreview />
      <IntelligenceCenter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
