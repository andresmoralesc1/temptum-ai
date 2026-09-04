import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { PageHero } from '@/components/PageHero';
import { WHATSAPP_QUIENES } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: locale === 'es' ? '/quienes-somos' : `/${locale}/quienes-somos`,
      languages: {
        'es-CO': '/quienes-somos',
        'es-419': '/quienes-somos',
        es: '/quienes-somos',
        en: '/en/quienes-somos',
        'en-US': '/en/quienes-somos',
      },
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      url:
        locale === 'es'
          ? `${SITE_URL}/quienes-somos`
          : `${SITE_URL}/en/quienes-somos`,
    },
    twitter: {
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
    },
  };
}

const WHATSAPP_HREF = WHATSAPP_QUIENES;

type StatItem = { label: string; value: string };
type TrayectoriaItem = { period: string; role: string; org: string; detail: string };
type CommitmentItem = { n: string; title: string; body: string };

export default async function QuienesSomosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  const heroAccent = t('headlineAccent');
  const heroParts = t('headline').split(heroAccent);

  const heroStats: StatItem[] = [
    { label: t('stats.office.label'), value: t('stats.office.value') },
    { label: t('stats.coverage.label'), value: t('stats.coverage.value') },
    { label: t('stats.sectors.label'), value: t('stats.sectors.value') },
    { label: t('stats.founded.label'), value: t('stats.founded.value') },
  ];

  const aboutAccent = t('about.headlineAccent');
  const aboutParts = t('about.headline').split(aboutAccent);

  const aboutParagraphs = t.raw('aboutParagraphs') as string[];
  const trayectoria = t.raw('trajectory') as TrayectoriaItem[];
  const commitments = t.raw('commitments.items') as CommitmentItem[];

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
            <span className="text-gold">{heroAccent}</span>
            {heroParts[1] ?? ''}
          </>
        }
        subhead={t('subhead')}
        stats={heroStats}
      />

      {/* ABOUT TEMPTUM */}
      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
              {t('about.kicker')}
            </p>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
                {aboutParts[0]}
                <br />
                <span className="text-navy-600">{aboutAccent}</span>
                {aboutParts[1] ?? ''}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
                {t('about.body')}
              </p>
            </div>
          </header>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-gray-700">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <aside className="lg:col-span-5">
              <figure className="border-l-2 border-gold pl-6">
                <Image
                  src="/images/equipo/equipo-reunion.jpg"
                  alt={
                    locale === 'es'
                      ? 'Sesión de consultoría con clientes y aliados'
                      : 'Consulting session with clients and partners'
                  }
                  width={1000}
                  height={667}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  {t('sessionCaption')}
                </figcaption>
              </figure>

              <dl className="mt-10 space-y-6 border-t border-navy-100 pt-6">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    {t('languagesLabel')}
                  </dt>
                  <dd className="mt-2 text-sm text-navy-950">{t('languages')}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    {t('engagementModels.title')}
                  </dt>
                  <dd className="mt-3 space-y-3 text-sm text-navy-950">
                    <div>
                      <p className="font-semibold text-navy-950">
                        {t('engagementModels.byProject.title')}
                      </p>
                      <p className="text-gray-700">
                        {t('engagementModels.byProject.body')}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-950">
                        {t('engagementModels.retainer.title')}
                      </p>
                      <p className="text-gray-700">
                        {t('engagementModels.retainer.body')}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-950">
                        {t('engagementModels.advisory.title')}
                      </p>
                      <p className="text-gray-700">
                        {t('engagementModels.advisory.body')}
                      </p>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    {t('coverageLabel')}
                  </dt>
                  <dd className="mt-2 text-sm text-navy-950">
                    {t('operationalCoverage')}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* LIDERAZGO — SILVIA JULIANA */}
      <section className="bg-navy-100 py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
              {t('leadership.kicker')}
            </p>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
                {t('leadership.name')}
              </h2>
              <p className="mt-3 text-base font-medium uppercase tracking-[0.18em] text-navy-600">
                {t('leadership.role')}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
                {t('leadership.intro')}
              </p>
            </div>
          </header>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <blockquote className="border-l-2 border-gold pl-6">
                <p className="font-display text-xl font-medium leading-snug text-navy-950 lg:text-2xl">
                  <span className="text-gold" aria-hidden="true">
                    &ldquo;
                  </span>
                  {t('leadership.quote')}
                  <span className="text-gold" aria-hidden="true">
                    &rdquo;
                  </span>
                </p>
              </blockquote>

              <h3 className="mt-12 font-display text-lg font-bold uppercase tracking-[0.18em] text-navy-600">
                {t('leadership.trajectoryTitle')}
              </h3>
              <ol className="mt-6 space-y-8 border-l border-navy-100 pl-6">
                {trayectoria.map((item) => (
                  <li key={item.org} className="relative">
                    <span
                      className="absolute -left-[27px] top-1.5 inline-block h-2 w-2 bg-gold"
                      aria-hidden="true"
                    />
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                      {item.period}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-navy-950">
                      {item.role}
                      <span className="text-navy-600"> · {item.org}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="lg:col-span-5 space-y-8">
              <figure className="border-l-2 border-gold pl-6">
                <Image
                  src="/images/equipo/silvia-juliana.png"
                  alt={t('leadership.name')}
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-square w-full object-cover"
                  priority
                />
              </figure>

              <div className="border-t border-navy-100 pt-8">
                <h3 className="font-display text-lg font-bold uppercase tracking-[0.18em] text-navy-600">
                  {t('leadership.formationTitle')}
                </h3>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-navy-950">
                  <li>
                    <strong className="block text-navy-950">
                      {t('leadership.formation.master.title')}
                    </strong>
                    {t('leadership.formation.master.school')}
                  </li>
                  <li>
                    <strong className="block text-navy-950">
                      {t('leadership.formation.bachelor.title')}
                    </strong>
                    {t('leadership.formation.bachelor.school')}
                  </li>
                </ul>
              </div>

              <div className="border-t border-navy-100 pt-8">
                <h3 className="font-display text-lg font-bold uppercase tracking-[0.18em] text-navy-600">
                  {t('leadership.teachingTitle')}
                </h3>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-navy-950">
                  <li>
                    <strong className="block text-navy-950">
                      {t('leadership.teaching.rosario.title')}
                    </strong>
                    {t('leadership.teaching.rosario.body')}
                  </li>
                  <li>
                    <strong className="block text-navy-950">
                      {t('leadership.teaching.tadeo.title')}
                    </strong>
                    {t('leadership.teaching.tadeo.body')}
                  </li>
                </ul>
              </div>

              <div className="border-t border-navy-100 pt-8">
                <a
                  href="https://www.linkedin.com/in/silviajulianaparra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
                >
                  {t('leadership.linkedinCta')}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ALIADOS Y SECTORES */}
      <section className="bg-white py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
                {t('allies.kicker')}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl">
                {t('allies.headline').split(t('allies.headlineAccent'))[0]}
                <br />
                <span className="text-navy-600">
                  {t('allies.headlineAccent')}
                </span>
                {t('allies.headline').split(t('allies.headlineAccent'))[1] ?? ''}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700">
                {t('allies.body1')}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                {t('allies.body2')}
              </p>
            </div>

            <figure className="border-l-2 border-gold pl-6 lg:col-span-7">
              <Image
                src="/images/equipo/equipo-acuerdo.jpg"
                alt={
                  locale === 'es'
                    ? 'Equipo interdisciplinario de aliados y colaboradores'
                    : 'Interdisciplinary team of partners and collaborators'
                }
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 800px, 100vw"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                {t('allies.caption')}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="bg-navy-950 py-24 text-white lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <header className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-12 lg:gap-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold lg:col-span-4">
              {t('commitments.kicker')}
            </p>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {t('commitments.headline').split(t('commitments.headlineAccent'))[0]}
                <br />
                <span className="text-gold">
                  {t('commitments.headlineAccent')}
                </span>
                {t('commitments.headline').split(t('commitments.headlineAccent'))[1] ?? ''}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-100">
                {t('commitments.intro')}
              </p>
            </div>
          </header>

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {commitments.map((p) => (
              <article key={p.n}>
                <p
                  className="font-display text-5xl font-bold leading-none text-gold"
                  aria-hidden="true"
                >
                  {p.n}
                </p>
                <h3 className="mt-6 font-display text-xl font-bold text-white lg:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-navy-100">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
                {t('cta.kicker')}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
                {t('cta.headline').split(t('cta.headlineAccent'))[0]}
                <br />
                <span className="text-navy-600">
                  {t('cta.headlineAccent')}
                </span>
                {t('cta.headline').split(t('cta.headlineAccent'))[1] ?? ''}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
                {t('cta.body')}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-navy-600 px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-white transition-colors hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                {t('cta.primary')}
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy-600 px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-navy-600 transition-colors hover:bg-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                {t('cta.secondary')}
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
