import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical:
        locale === 'es' ? '/politica-de-privacidad' : `/${locale}/politica-de-privacidad`,
      languages: {
        'es-CO': '/politica-de-privacidad',
        'es-419': '/politica-de-privacidad',
        es: '/politica-de-privacidad',
        en: '/en/politica-de-privacidad',
        'en-US': '/en/politica-de-privacidad',
      },
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      url:
        locale === 'es'
          ? `${SITE_URL}/politica-de-privacidad`
          : `${SITE_URL}/en/politica-de-privacidad`,
    },
    twitter: {
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
    },
  };
}

type Section = { title: string; body: string; email?: string };

export default async function PoliticaPrivacidadPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });

  const sections = t.raw('sections') as Section[];

  return (
    <>
      <PageHero
        variant="light"
        kicker={t('kicker')}
        breadcrumbs={[
          { label: t('breadcrumbs.home'), href: '/' },
          { label: t('breadcrumbs.current') },
        ]}
        headline={t('headline')}
      />

      <section className="bg-ice pb-24 pt-12 lg:pb-32 lg:pt-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-0">
          <div className="space-y-8 text-base leading-relaxed text-gray-700">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-xl font-semibold text-navy-950">
                  {s.title}
                </h2>
                <p className="mt-3">
                  {s.email ? (
                    <>
                      {s.body.split(s.email)[0]}
                      <a
                        href={`mailto:${s.email}`}
                        className="text-navy-600 underline underline-offset-4 hover:text-navy-950"
                      >
                        {s.email}
                      </a>
                      {s.body.split(s.email)[1] ?? ''}
                    </>
                  ) : (
                    s.body
                  )}
                </p>
              </section>
            ))}

            <p className="text-sm text-gray-500">{t('lastUpdated')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
