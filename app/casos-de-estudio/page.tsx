import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { getAllCasos } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Casos de Estudio',
  description:
    'Análisis y opinión de nuestro equipo sobre asuntos corporativos, regulatorios y de comunicaciones estratégicas.',
};

export default function CasosDeEstudioPage() {
  const casos = getAllCasos();

  return (
    <div className="bg-ice py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <p className="text-xs font-medium uppercase tracking-widest text-navy-600">
          Casos de Estudio
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-navy-950 md:text-5xl">
          Análisis y opinión
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
          Reflexiones de nuestro equipo sobre temas de comunicaciones
          estratégicas, cumplimiento normativo, gestión de crisis y el impacto
          de la inteligencia artificial en la disciplina.
        </p>

        <ul className="mt-16 space-y-8">
          {casos.map((caso) => {
            const [year, month, day] = caso.date.split('-');
            const fecha = new Date(
              Number(year),
              Number(month) - 1,
              Number(day),
            ).toLocaleDateString('es-CO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
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
    </div>
  );
}
