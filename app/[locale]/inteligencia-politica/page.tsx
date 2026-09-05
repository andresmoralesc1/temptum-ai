import type { Metadata } from 'next';
import { FileText, Lock, CheckCircle2 } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/PageHero';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IntelligencePage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical:
        locale === 'es' ? '/inteligencia-politica' : `/${locale}/inteligencia-politica`,
      languages: {
        'x-default': '/',
        'es-CO': '/inteligencia-politica',
        'es-419': '/inteligencia-politica',
        es: '/inteligencia-politica',
        en: '/en/inteligencia-politica',
        'en-US': '/en/inteligencia-politica',
      },
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      url:
        locale === 'es'
          ? `${SITE_URL}/inteligencia-politica`
          : `${SITE_URL}/en/inteligencia-politica`,
    },
    twitter: {
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
    },
  };
}

type ProductItem = { title: string; summary: string; periodicity: string };
type ForceItem = { title: string; body: string };

export default async function InteligenciaPoliticaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'IntelligencePage' });

  const heroAccent = t('headlineAccent');
  const heroParts = t('headline').split(heroAccent);

  const sampleItems = t.raw('sample.items') as string[];
  const forces = t.raw('muestra.forces') as ForceItem[];
  const products = t.raw('products.items') as ProductItem[];

  const subscriptionMailto = `mailto:${t('products.subscription.email')}?subject=${encodeURIComponent(t('products.subscription.emailSubject'))}`;
  const productAccessMailto = `mailto:${t('products.subscription.email')}?subject=${encodeURIComponent(t('products.subscription.emailSubject'))} — Intelligence`;

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
      />

      {/* MUESTRA PÚBLICA */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
                {t('sample.kicker')}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl">
                {t('sample.headline')}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700">
                {t('sample.body')}
              </p>
              <a
                href="#muestra"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
              >
                {t('sample.ctaLabel')}
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {sampleItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-navy-100 pb-4 text-base text-navy-950"
                  >
                    <CheckCircle2
                      size={20}
                      strokeWidth={1.5}
                      className="mt-0.5 flex-shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MUESTRA COMPLETA */}
      <section
        id="muestra"
        className="bg-ice py-16 lg:py-24"
        aria-labelledby="muestra-titulo"
      >
        <div className="mx-auto max-w-3xl px-5 lg:px-0">
          <div className="border-l-2 border-gold bg-white p-8 shadow-sm lg:p-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
              {t('muestra.tag')}
            </p>
            <h2
              id="muestra-titulo"
              className="mt-3 font-display text-2xl font-bold leading-tight text-navy-950 lg:text-3xl"
            >
              {t('muestra.title')}
            </h2>

            <div className="mt-10 space-y-8 text-base leading-relaxed text-gray-700">
              {forces.map((f) => (
                <div key={f.title}>
                  <h3 className="font-display text-lg font-semibold text-navy-950">
                    {f.title}
                  </h3>
                  <p className="mt-3">{f.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-navy-100 pt-6 text-xs text-gray-500">
              {t('muestra.disclaimer')}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS Y ACCESO */}
      <section className="bg-navy-100 py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="space-y-8">
            {products.map((doc) => (
              <article
                key={doc.title}
                className="grid gap-6 border border-navy-100 bg-white p-8 md:grid-cols-12"
              >
                <div className="md:col-span-2">
                  <FileText
                    size={36}
                    strokeWidth={1.5}
                    className="text-navy-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="md:col-span-10">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500">
                    {doc.periodicity}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-navy-950">
                    {doc.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {doc.summary}
                  </p>
                  <a
                    href={productAccessMailto}
                    className="mt-6 inline-flex items-center gap-2 border-b-2 border-navy-600 pb-0.5 text-xs font-semibold uppercase tracking-widest text-navy-950 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Lock size={14} strokeWidth={2} aria-hidden="true" />
                    {t('products.accessCta')}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-l-2 border-gold bg-white p-8 lg:mt-16">
            <h2 className="font-display text-lg font-semibold text-navy-950">
              {t('products.subscription.title')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {t('products.subscription.body')}{' '}
              <a
                href={subscriptionMailto}
                className="font-semibold text-navy-950 underline underline-offset-4 hover:text-gold hover:decoration-gold"
              >
                {t('products.subscription.email')}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
