import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Info } from 'lucide-react';
import { getAllCasoSlugs, getCasoBySlug } from '@/lib/content';
import { formatDate } from '@/lib/dates';
import { SITE_URL } from '@/lib/site';
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllCasoSlugs().map((slug) => ({ locale, slug })),
  );
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const caso = getCasoBySlug(slug);
  if (!caso) return {};
  const t = await getTranslations({ locale, namespace: 'CaseDetailPage' });
  const tCase = await getTranslations({
    locale,
    namespace: `CaseDetailPage.cases.${slug}`,
  });
  const title = tCase('title') || caso.title;
  const resumen = tCase('resumen') || caso.resumen;
  const esUrl = `/casos-de-estudio/${caso.slug}`;
  const enUrl = `/en/casos-de-estudio/${caso.slug}`;
  const canonical = locale === 'es' ? esUrl : enUrl;

  return {
    title,
    description: resumen,
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
      type: 'article',
      title,
      description: resumen,
      url: `${SITE_URL}${canonical}`,
      publishedTime: caso.date,
      authors: [caso.author],
    },
    twitter: {
      title,
      description: resumen,
    },
  };
}

export default async function CasoDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const caso = getCasoBySlug(slug);
  if (!caso) notFound();

  const t = await getTranslations({ locale, namespace: 'CaseDetailPage' });
  const tCase = await getTranslations({
    locale,
    namespace: `CaseDetailPage.cases.${slug}`,
  });
  const title = tCase('title') || caso.title;
  const resumen = tCase('resumen') || caso.resumen;

  const fecha = formatDate(caso.date);
  const articlePath = locale === 'es'
    ? `/casos-de-estudio/${caso.slug}`
    : `/en/casos-de-estudio/${caso.slug}`;
  const articleUrl = `${SITE_URL}${articlePath}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: title,
    description: resumen,
    datePublished: caso.date,
    dateModified: caso.date,
    inLanguage: locale === 'es' ? 'es-CO' : 'en-US',
    author: {
      '@type': 'Person',
      name: caso.author,
      worksFor: { '@id': `${SITE_URL}#organization` },
    },
    publisher: { '@id': `${SITE_URL}#organization` },
    isPartOf: { '@id': `${SITE_URL}#website` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('breadcrumbs.home'),
        item: locale === 'es' ? `${SITE_URL}/` : `${SITE_URL}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('breadcrumbs.list'),
        item: locale === 'es'
          ? `${SITE_URL}/casos-de-estudio`
          : `${SITE_URL}/en/casos-de-estudio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: articleUrl,
      },
    ],
  };

  return (
    <article className="bg-ice py-16 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-0">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-navy-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy-950">
                {t('breadcrumbs.home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/casos-de-estudio" className="hover:text-navy-950">
                {t('breadcrumbs.list')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-navy-950" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <Link
          href="/casos-de-estudio"
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-navy-600 hover:text-navy-800"
        >
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
          {t('backToList')}
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
            <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
            <time dateTime={caso.date}>{fecha}</time>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-950 md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-navy-600">
            {t('byAuthor', { author: caso.author })}
          </p>
        </header>

        {locale === 'en' && (
          <aside
            role="note"
            className="mt-10 flex items-start gap-3 border-l-2 border-gold bg-white px-5 py-4 text-sm leading-relaxed text-navy-950"
          >
            <Info
              size={18}
              strokeWidth={1.5}
              className="mt-0.5 flex-shrink-0 text-gold"
              aria-hidden="true"
            />
            <p>{t('spanishOnlyBanner')}</p>
          </aside>
        )}

        <div className="prose-temptum mt-12 space-y-6 text-base leading-relaxed text-gray-700 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy-950 [&_h2]:border-b [&_h2]:border-navy-100 [&_h2]:pb-3 [&_strong]:text-navy-950 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_p]:my-4">
          <MDXRemote source={caso.body} />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </div>
    </article>
  );
}
