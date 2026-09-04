import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { CopyButton } from '@/components/CopyButton';
import { PageHero } from '@/components/PageHero';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: locale === 'es' ? '/contacto' : `/${locale}/contacto`,
      languages: {
        'es-CO': '/contacto',
        'es-419': '/contacto',
        es: '/contacto',
        en: '/en/contacto',
        'en-US': '/en/contacto',
      },
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      url: locale === 'es' ? `${SITE_URL}/contacto` : `${SITE_URL}/en/contacto`,
    },
    twitter: {
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
    },
  };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

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
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="space-y-8 lg:col-span-4">
              <div>
                <div className="flex items-center gap-3 text-navy-600">
                  <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                    {t('aside.email')}
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="mailto:info@temptum.io"
                    className="text-base text-navy-950 hover:underline"
                  >
                    info@temptum.io
                  </a>
                  <CopyButton value="info@temptum.io" label={t('copyLabels.email')} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 text-navy-600">
                  <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                    {t('aside.phone')}
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="tel:+573022388618"
                    className="text-base text-navy-950 hover:underline"
                  >
                    +57 302 238 8618
                  </a>
                  <CopyButton value="+573022388618" label={t('copyLabels.phone')} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 text-navy-600">
                  <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                    {t('aside.office')}
                  </h2>
                </div>
                <p className="mt-3 text-base text-navy-950">
                  Bogotá, D.C.
                  <br />
                  {t('aside.country')}
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
