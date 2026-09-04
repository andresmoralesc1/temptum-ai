import type { Metadata } from 'next';
import { FileText, Lock, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Inteligencia y Política Pública',
  description:
    'Análisis de coyuntura económica y política, y monitoreo legislativo sectorial producido por el equipo de Temptum. Muestra pública disponible.',
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

      {/* MUESTRA PÚBLICA */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
                Muestra pública
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl">
                Qué contiene un informe.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700">
                Antes de evaluar la suscripción, este resumen le permite
                conocer la profundidad, el formato y el ángulo editorial
                de nuestros productos. La muestra se publica con datos
                ilustrativos; las ediciones para suscriptores se producen
                con información primaria.
              </p>
              <a
                href="#muestra"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
              >
                Lea la muestra
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {[
                  'Panorama ejecutivo: 5 a 8 páginas con hallazgos y escenarios.',
                  'Matriz de proyectos de ley con priorización por sector e impacto.',
                  'Resúmenes ejecutivos por iniciativa, con análisis técnico-jurídico.',
                  'Alertas regulatorias personalizadas para suscriptores.',
                  'Reuniones triméstrales de actualización con el equipo de Temptum.',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-navy-100 pb-4 text-base text-navy-950"
                  >
                    <CheckCircle2
                      size={20}
                      strokeWidth={1.5}
                      className="mt-0.5 flex-shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MUESTRA COMPLETA */}
      <section
        id="muestra"
        className="bg-ice py-16 lg:py-24"
        aria-labelledby="muestra-titulo"
      >
        <div className="mx-auto max-w-3xl px-5 lg:px-0">
          <div className="border-l-2 border-gold bg-white p-8 shadow-sm lg:p-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
              Muestra · Análisis de Coyuntura 2025
            </p>
            <h2
              id="muestra-titulo"
              className="mt-3 font-display text-2xl font-bold leading-tight text-navy-950 lg:text-3xl"
            >
              Tres fuerzas que reconfiguran la decisión corporativa en Colombia.
            </h2>

            <div className="mt-10 space-y-8 text-base leading-relaxed text-gray-700">
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-950">
                  1. La transición fiscal acota el margen regulatorio
                </h3>
                <p className="mt-3">
                  El cierre del ciclo de ingresos extraordinarios redefine las
                  prioridades del gasto y de la tributación sectorial. Sectores
                  extractivos, financieros y de servicios públicos enfrentan
                  escenarios de ajuste que requerirán interlocución técnica con
                  Minhacienda y los Ministerios sectoriales. Las empresas con
                  presencia en cadenas reguladas deben anticipar el impacto en
                  tarifas, cargas y esquemas de fiscalización.
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-navy-950">
                  2. La agenda legislativa se concentra en energía y seguridad
                </h3>
                <p className="mt-3">
                  Veintitrés proyectos de ley en trámite afectan directamente a
                  sectores regulados. La matriz de priorización — disponible
                  para suscriptores — asigna nivel de impacto y probabilidad de
                  aprobación por iniciativa, y propone ventanas de interlocución
                  por Comisión y ponente.
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-navy-950">
                  3. La justicia constitucional redefine el contorno del riesgo
                </h3>
                <p className="mt-3">
                  Las recientes decisiones de la Corte Constitucional sobre
                  tributos, derechos colectivos y servicios públicos alteran el
                  margen de maniobra de reguladores y administrados. El informe
                  completo incluye un análisis por sector con implicaciones
                  operativas.
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-navy-100 pt-6 text-xs text-gray-500">
              Los datos y casos de esta muestra son ilustrativos. Las
              ediciones para suscriptores se producen con información primaria
              y entrevistas a fuentes calificadas.
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS Y ACCESO */}
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
              alertas regulatorias personalizadas, conversemos en{' '}
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
