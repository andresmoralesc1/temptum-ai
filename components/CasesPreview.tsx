import Link from 'next/link';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { getAllCasos } from '@/lib/content';
import { formatDate } from '@/lib/dates';
import { Reveal } from '@/components/Reveal';

export function CasesPreview() {
  const casos = getAllCasos().slice(0, 3);

  return (
    <section className="bg-ice py-16 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <header className="flex flex-col items-start justify-between gap-6 border-b border-navy-100 pb-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
              Análisis y opinión
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
              Análisis de nuestro equipo.
            </h2>
          </div>
          <Link
            href="/casos-de-estudio"
            className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
          >
            Todos los casos
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </header>

        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {casos.map((caso, idx) => (
            <Reveal
              as="li"
              key={caso.slug}
              delay={idx * 100}
              className={`flex flex-col ${
                idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <Link
                href={`/casos-de-estudio/${caso.slug}`}
                className="group flex h-full flex-col border-t-2 border-navy-950 pt-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:shadow-sm"
              >
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                  <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
                  <time dateTime={caso.date}>{formatDate(caso.date)}</time>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold leading-tight text-navy-950 transition-colors duration-200 group-hover:text-navy-600 lg:text-2xl">
                  {caso.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
                  {caso.resumen}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    {caso.author}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-navy-600 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}