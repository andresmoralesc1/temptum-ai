import type { Metadata } from 'next';
import { FileText, Lock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Inteligencia y Política Pública',
  description:
    'Análisis de coyuntura económica y política, y monitoreo legislativo sectorial producido por el equipo de Temptum.',
  alternates: {
    canonical: '/inteligencia-politica',
  },
};

const documents = [
  {
    title: 'Análisis de Coyuntura Económica y Política 2025',
    summary:
      'Panorama macroeconómico, agenda legislativa del Congreso y prioridades regulatorias por sector, con escenarios de impacto para la toma de decisiones corporativas en Colombia.',
    periodicidad: 'Anual',
  },
  {
    title: 'Monitoreo Legislativo Sectorial',
    summary:
      'Seguimiento trimestral de proyectos de ley, decretos y agendas de comisiones, con matriz de priorización y resúmenes ejecutivos por iniciativa.',
    periodicidad: 'Trimestral',
  },
];

export default function InteligenciaPoliticaPage() {
  return (
    <>
      <PageHero
        kicker="Centro de Inteligencia"
        headline={
          <>
            Información estratégica,
            <br />
            <span className="text-gold">antes que la necesite.</span>
          </>
        }
        subhead="Análisis de coyuntura y monitoreo legislativo producidos por nuestro equipo para clientes y aliados. Los informes completos se distribuyen bajo suscripción institucional."
      />

      <section className="bg-navy-100 py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="space-y-8">
            {documents.map((doc) => (
              <article
                key={doc.title}
                className="grid gap-6 border border-navy-100 bg-white p-8 md:grid-cols-12"
              >
                <div className="md:col-span-2">
                  <FileText
                    size={36}
                    strokeWidth={1.5}
                    className="text-navy-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="md:col-span-10">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500">
                    {doc.periodicidad}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-navy-950">
                    {doc.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-gray-700">
                    {doc.summary}
                  </p>
                  <a
                    href="mailto:info@temptum.io?subject=Suscripci%C3%B3n%20institucional%20%E2%80%94%20Inteligencia%20Temptum"
                    className="mt-6 inline-flex items-center gap-2 border-b-2 border-navy-600 pb-0.5 text-xs font-semibold uppercase tracking-widest text-navy-950 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Lock size={14} strokeWidth={2} aria-hidden="true" />
                    Solicite acceso
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-l-2 border-gold bg-white p-8 lg:mt-16">
            <h2 className="font-display text-lg font-semibold text-navy-950">
              Suscripción institucional
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Para acceder a los informes completos y a nuestro servicio de
              alertas regulatorias personalizadas, contáctenos en{' '}
              <a
                href="mailto:info@temptum.io?subject=Suscripci%C3%B3n%20institucional"
                className="font-semibold text-navy-950 underline underline-offset-4 hover:text-gold hover:decoration-gold"
              >
                info@temptum.io
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}