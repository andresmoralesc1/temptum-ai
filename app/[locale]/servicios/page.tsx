import type { Metadata } from 'next';
import Image from 'next/image';
import { Building2, ShieldAlert, Gavel, Leaf } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { WHATSAPP_SERVICIOS } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: locale === 'es' ? '/servicios' : `/${locale}/servicios`,
      languages: {
        'es-CO': '/servicios',
        'es-419': '/servicios',
        es: '/servicios',
        en: '/en/servicios',
        'en-US': '/en/servicios',
      },
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      url:
        locale === 'es'
          ? `${SITE_URL}/servicios`
          : `${SITE_URL}/en/servicios`,
    },
    twitter: {
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
    },
  };
}

const WHATSAPP_HREF = WHATSAPP_SERVICIOS;

// Map service id to icon (component-side, not localized).
// The id values from the JSON differ across locales (e.g. "relaciones-institucionales"
// vs "institutional-relations"), so we key the icon map by a stable internal key
// the JSONs share, then resolve id+title+body from the localized entry.
const ICON_BY_ID: Record<string, typeof Building2> = {
  'relaciones-institucionales': Building2,
  'institutional-relations': Building2,
  'gestion-riesgos': ShieldAlert,
  'risk-management': ShieldAlert,
  'asuntos-regulatorios': Gavel,
  'regulatory-affairs': Gavel,
  'comunicaciones-asg': Leaf,
  'esg-communications': Leaf,
};

type ServiceItem = { id: string; title: string; summary: string; body: string[] };

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });

  const heroAccent = t('headlineAccent');
  const heroParts = t('headline').split(heroAccent);

  const ecoAccent = t('ecosystem.headlineAccent');
  const ecoParts = t('ecosystem.headline').split(ecoAccent);

  const items = t.raw('items') as ServiceItem[];

  return (
    <>
      <PageHero
        kicker={t('kicker')}
        breadcrumbs={[
          { label: t('breadcrumbs.home'), href: '/' },
          { label: t('breadcrumbs.current') },
        ]}
        headline={
          <>
            {heroParts[0]}
            <br />
            <span className="text-gold">{heroAccent}</span>
          </>
        }
        subhead={t('subhead')}
        ctas={[
          {
            label: t('ctaWhatsapp'),
            href: WHATSAPP_HREF,
            variant: 'outline',
            external: true,
          },
        ]}
      />

      <section className="bg-white py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <figure className="border-l-2 border-gold pl-6 lg:col-span-7">
              <Image
                src="/images/equipo/equipo-acuerdo.jpg"
                alt={t('ecosystem.alt')}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 800px, 100vw"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                {t('ecosystem.caption')}
              </figcaption>
            </figure>

            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
                {t('ecosystem.kicker')}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl">
                {ecoParts[0]}
                <br />
                <span className="text-navy-600">{ecoAccent}</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700">
                {t('ecosystem.body1')}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                {t('ecosystem.body2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <nav
            aria-label={t('indexAriaLabel')}
            className="border-y border-navy-100 bg-white"
          >
            <ul className="flex flex-wrap divide-x divide-navy-100">
              {items.map((s) => (
                <li key={s.id} className="flex-1">
                  <a
                    href={`#${s.id}`}
                    className="block px-5 py-4 text-[13px] font-medium uppercase tracking-widest text-navy-950 hover:bg-navy-100"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 space-y-20">
            {items.map((s) => {
              const Icon = ICON_BY_ID[s.id] ?? Building2;
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className="grid gap-8 border-t border-navy-100 pt-10 lg:grid-cols-12"
                >
                  <div className="lg:col-span-4">
                    <Icon
                      size={36}
                      strokeWidth={1.5}
                      className="text-navy-600"
                      aria-hidden="true"
                    />
                    <h2 className="mt-6 font-display text-2xl font-bold text-navy-950">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {s.summary}
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <ul className="space-y-4 text-base leading-relaxed text-gray-700">
                      {s.body.map((line, idx) => (
                        <li key={idx} className="flex gap-4">
                          <span
                            className="mt-2 h-1 w-4 flex-shrink-0 bg-gold"
                            aria-hidden="true"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
