import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getAllCasoSlugs, getCasoBySlug } from '@/lib/content';
import { formatDate } from '@/lib/dates';
import { SITE_URL } from '@/lib/site';

export async function generateStaticParams() {
  return getAllCasoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCasoBySlug(slug);
  if (!caso) return {};
  return {
    title: caso.title,
    description: caso.resumen,
    alternates: {
      canonical: `/casos-de-estudio/${caso.slug}`,
    },
    openGraph: {
      type: 'article',
      title: caso.title,
      description: caso.resumen,
      url: `${SITE_URL}/casos-de-estudio/${caso.slug}`,
      publishedTime: caso.date,
      authors: [caso.author],
    },
    twitter: {
      title: caso.title,
      description: caso.resumen,
    },
  };
}

export default async function CasoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caso = getCasoBySlug(slug);
  if (!caso) notFound();

  const fecha = formatDate(caso.date);
  const articleUrl = `${SITE_URL}/casos-de-estudio/${caso.slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    headline: caso.title,
    description: caso.resumen,
    datePublished: caso.date,
    dateModified: caso.date,
    inLanguage: 'es-CO',
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
        name: 'Inicio',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Análisis y opinión',
        item: `${SITE_URL}/casos-de-estudio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: caso.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <article className="bg-ice py-16 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-0">
        {/* Breadcrumb visible */}
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-navy-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy-950">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/casos-de-estudio" className="hover:text-navy-950">
                Análisis y opinión
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-navy-950" aria-current="page">
              {caso.title}
            </li>
          </ol>
        </nav>

        <Link
          href="/casos-de-estudio"
          className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-navy-600 hover:text-navy-800"
        >
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
          Todos los análisis
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
            <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
            <time dateTime={caso.date}>{fecha}</time>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-950 md:text-5xl">
            {caso.title}
          </h1>
          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-navy-600">
            Por {caso.author}
          </p>
        </header>

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
