import type { Metadata } from 'next';
import { FileText, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inteligencia y Política Pública',
  description:
    'Análisis de coyuntura económica y política, y monitoreo legislativo sectorial producido por el equipo de Temptum.',
};

const documents = [
  {
    title: 'Análisis de Coyuntura Económica y Política 2025',
    summary:
      'Panorama macroeconómico, escenarios legislativos y riesgos sectoriales para la toma de decisiones corporativas en Colombia. Incluye proyecciones fiscales, dinámica legislativa del Congreso y prioridades regulatorias por sector.',
    periodicidad: 'Anual',
  },
  {
    title: 'Monitoreo Legislativo Sectorial',
    summary:
      'Seguimiento trimestral de proyectos de ley, decretos regulatorios y agendas de comisiones relevantes para el sector empresarial. Incluye matriz de priorización y resúmenes ejecutivos por iniciativa.',
    periodicidad: 'Trimestral',
  },
];

export default function InteligenciaPoliticaPage() {
  return (
    <div className="bg-navy-100 py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <p className="text-xs font-medium uppercase tracking-widest text-navy-600">
          Centro de Inteligencia
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-navy-950 md:text-5xl">
          Inteligencia y Política Pública
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
          Documentos producidos por nuestro equipo para clientes y aliados. El
          acceso a los informes completos está reservado a suscriptores
          institucionales.
        </p>

        <div className="mt-16 space-y-8">
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
                <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-navy-600">
                  <Lock size={14} strokeWidth={2} aria-hidden="true" />
                  Acceso para suscriptores institucionales
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 border-l-2 border-gold bg-white p-8">
          <h2 className="font-display text-lg font-semibold text-navy-950">
            Suscripción institucional
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-700">
            Para acceder a los informes completos y a nuestro servicio de
            alertas regulatorias personalizadas, contáctenos en{' '}
            <a
              href="mailto:inteligencia@temptum.io"
              className="text-navy-600 underline-offset-4 hover:underline"
            >
              inteligencia@temptum.io
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}