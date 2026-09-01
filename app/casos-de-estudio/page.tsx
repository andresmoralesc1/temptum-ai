import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { getAllCasos } from '@/lib/content';
import { formatDate } from '@/lib/dates';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Casos de Estudio',
  description:
    'Análisis y opinión de nuestro equipo sobre asuntos corporativos, regulatorios y de comunicaciones estratégicas.',
};

export default function CasosDeEstudioPage() {
  const casos = getAllCasos();

  return (
    <>
      <PageHero
        kicker="Análisis y opinión"
        headline={
          <>
            Lo que estamos
            <br />
            <span className="text-gold">leyendo.</span>
          </>
        }
        subhead="Reflexiones de nuestro equipo sobre temas de comunicaciones estratégicas, cumplimiento normativo, gestión de crisis y el impacto de la inteligencia artificial en la disciplina."
      />

      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <ul className="space-y-8">
            {casos.map((caso) => {
              const fecha = formatDate(caso.date);
              return (
                <li
                  key={caso.slug}
                  className="border border-navy-100 bg-white p-8 transition-colors duration-150 hover:border-navy-600"
                >
                  <Link
                    href={`/casos-de-estudio/${caso.slug}`}
                    className="block"
                  >
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                      <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
                      <time dateTime={caso.date}>{fecha}</time>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-bold text-navy-950">
                      {caso.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-700">
                      {caso.resumen}
                    </p>
                    <p className="mt-6 text-[11px] font-medium uppercase tracking-widest text-navy-600">
                      Por {caso.author}
                    </p>
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
