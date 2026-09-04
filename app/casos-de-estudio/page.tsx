import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { getAllCasos } from '@/lib/content';
import { formatDate } from '@/lib/dates';
import { SITE_URL } from '@/lib/site';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Análisis y opinión',
  description:
    'Análisis y opinión de nuestro equipo sobre comunicaciones estratégicas, gestión de crisis, cumplimiento normativo y el impacto de la inteligencia artificial en la disciplina.',
  alternates: {
    canonical: '/casos-de-estudio',
  },
  openGraph: {
    title: 'Análisis y opinión | Temptum',
    description:
      'Reflexiones firmadas por nuestro equipo sobre comunicaciones estratégicas, gestión de crisis y cumplimiento normativo. Análisis editoriales, no estudios de cliente.',
    url: `${SITE_URL}/casos-de-estudio`,
  },
  twitter: {
    title: 'Análisis y opinión | Temptum',
    description:
      'Reflexiones firmadas por nuestro equipo sobre comunicaciones estratégicas, gestión de crisis y cumplimiento normativo.',
  },
};

export default function CasosDeEstudioPage() {
  const casos = getAllCasos();

  return (
    <>
      <PageHero
        kicker="Análisis y opinión"
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Análisis y opinión' }]}
        headline={
          <>
            Lo que estamos
            <br />
            <span className="text-gold">leyendo y pensando.</span>
          </>
        }
        subhead="Reflexiones firmadas por nuestro equipo sobre comunicaciones estratégicas, gestión de crisis, cumplimiento normativo y el impacto de la inteligencia artificial en la disciplina. No son estudios de cliente: son análisis editoriales."
      />

      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <ul className="space-y-8">
            {casos.map((caso) => {
              const fecha = formatDate(caso.date);
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
                        Por {caso.author}
                      </p>
                    </div>
                    <div className="lg:col-span-8">
                      <h2 className="font-display text-2xl font-bold text-navy-950 transition-colors duration-200 group-hover:text-navy-600 lg:text-3xl">
                        {caso.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-700">
                        {caso.resumen}
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
