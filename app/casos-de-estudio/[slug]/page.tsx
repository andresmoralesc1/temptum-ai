import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getAllCasoSlugs, getCasoBySlug } from '@/lib/content';
import { formatDate } from '@/lib/dates';

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

  return (
    <article className="bg-ice py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-0">
        <Link
          href="/casos-de-estudio"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-navy-600 hover:text-navy-800"
        >
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
          Todos los casos
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
      </div>
    </article>
  );
}
