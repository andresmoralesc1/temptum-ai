import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { getAllCasos } from '@/lib/content';
import { formatDate } from '@/lib/dates';
import { SITE_URL } from '@/lib/site';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { PageHero } from '@/components/PageHero';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CaseStudiesPage' });
  const esUrl = '/casos-de-estudio';
  const enUrl = '/en/casos-de-estudio';
  const canonical = locale === 'es' ? esUrl : enUrl;
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical,
      languages: {
        'es-CO': esUrl,
        'es-419': esUrl,
        es: esUrl,
        en: enUrl,
        'en-US': enUrl,
      },
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      url: `${SITE_URL}${canonical}`,
    },
    twitter: {
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
    },
  };
}

export default async function CasosDeEstudioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'CaseStudiesPage' });
  const tCase = await getTranslations({ locale, namespace: 'CaseDetailPage.cases' });
  const casos = getAllCasos();

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
            {t('headline').split(t('headlineAccent'))[0]}
            <span className="text-gold">{t('headlineAccent')}</span>
            {t('headline').split(t('headlineAccent'))[1]}
          </>
        }
        subhead={t('subhead')}
      />

      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <ul className="space-y-8">
            {casos.map((caso) => {
              const fecha = formatDate(caso.date);
              let title = caso.title;
              let resumen = caso.resumen;
              try {
                title = tCase(`${caso.slug}.title`) || caso.title;
                resumen = tCase(`${caso.slug}.resumen`) || caso.resumen;
              } catch {
                // fallback to original if translation missing
              }
              return (
                <li
                  key={caso.slug}
                  className="group border border-navy-100 bg-white transition-colors duration-200 hover:border-navy-600"
                >
                  <Link
                    href={`/casos-de-estudio/${caso.slug}`}
                    className="grid items-start gap-6 p-8 lg:grid-cols-12 lg:gap-8"
                  >
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                        <Calendar
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <time dateTime={caso.date}>{fecha}</time>
                      </div>
                      <p className="mt-4 text-[11px] font-medium uppercase tracking-widest text-navy-600">
                        {t('by', { author: caso.author })}
                      </p>
                    </div>
                    <div className="lg:col-span-8">
                      <h2 className="font-display text-2xl font-bold text-navy-950 transition-colors duration-200 group-hover:text-navy-600 lg:text-3xl">
                        {title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
                        {resumen}
                      </p>
                    </div>
                    <div className="flex items-center justify-end text-navy-600 transition-transform duration-200 group-hover:translate-x-1 lg:col-span-1 lg:pt-2">
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
