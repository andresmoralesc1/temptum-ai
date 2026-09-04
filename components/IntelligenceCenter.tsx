import { FileText, Lock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const documents = [
  {
    title: 'Análisis de Coyuntura Económica y Política 2025',
    summary:
      'Panorama macroeconómico, agenda legislativa del Congreso y prioridades regulatorias por sector, con escenarios de impacto para la toma de decisiones corporativas en Colombia.',
    cta: 'Solicite acceso',
    href: '/contacto',
    periodicity: 'Anual',
  },
  {
    title: 'Monitoreo Legislativo Sectorial',
    summary:
      'Seguimiento trimestral de proyectos de ley, decretos y agendas de comisiones, con matriz de priorización y resúmenes ejecutivos por iniciativa.',
    cta: 'Solicite acceso',
    href: '/contacto',
    periodicity: 'Trimestral',
  },
];

export function IntelligenceCenter() {
  return (
    <section className="relative isolate overflow-hidden border-y border-navy-100 bg-navy-100 py-16 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 w-1/3 bg-gradient-to-r from-navy-600/10 to-transparent"
      />

      <div className="mx-auto max-w-content px-5 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
              Centro de Inteligencia
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl">
              Información estratégica,
              <br />
              antes que la necesite.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-700">
              Análisis de coyuntura y monitoreo legislativo producidos por
              nuestro equipo. Distribución bajo suscripción institucional:
              conversemos para evaluar si el alcance aplica a su organización.
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
            >
              Solicite una conversación
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>

          <ul className="space-y-6 lg:col-span-8 lg:space-y-8">
            {documents.map((doc, idx) => (
              <li key={doc.title}>
                <Link
                  href={doc.href}
                  className="group flex flex-col gap-6 border-l-2 border-navy-100 bg-white p-8 transition-all duration-200 hover:border-gold hover:shadow-md md:flex-row md:items-start"
                >
                  <div className="flex flex-shrink-0 items-start gap-4 md:w-48 md:flex-col md:items-center md:gap-3 md:text-center">
                    <span
                      className="font-display text-2xl font-bold text-navy-600 transition-colors duration-200 group-hover:text-gold lg:text-3xl"
                      aria-hidden="true"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center bg-navy-100 text-navy-600">
                      <FileText size={20} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                      {doc.periodicity}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold leading-tight text-navy-950 transition-colors duration-200 group-hover:text-navy-600 lg:text-2xl">
                      {doc.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                      {doc.summary}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4">
                      <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                        <Lock size={12} strokeWidth={2} aria-hidden="true" />
                        Suscriptores institucionales
                      </span>
                      <span className="inline-flex items-center gap-1 text-[13px] font-medium uppercase tracking-widest text-navy-600 transition-transform duration-200 group-hover:translate-x-1">
                        {doc.cta}
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}