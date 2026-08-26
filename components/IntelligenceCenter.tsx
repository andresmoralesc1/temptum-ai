import { FileText, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';

const documents = [
  {
    title: 'Análisis de Coyuntura Económica y Política 2025',
    summary:
      'Panorama macroeconómico, escenarios legislativos y riesgos sectoriales para la toma de decisiones corporativas en Colombia.',
    cta: 'Descargar Informe',
    href: '/inteligencia-politica',
  },
  {
    title: 'Monitoreo Legislativo Sectorial',
    summary:
      'Seguimiento trimestral de proyectos de ley, decretos regulatorios y agendas de comisiones relevantes para el sector empresarial.',
    cta: 'Ver Más',
    href: '/inteligencia-politica',
  },
];

export function IntelligenceCenter() {
  return (
    <section className="bg-navy-100 py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <div className="mb-16 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-navy-600">
            Centro de Inteligencia
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy-950 md:text-4xl">
            Información estratégica, antes que la necesite
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-700">
            Documentos producidos por nuestro equipo para clientes y aliados.
            Acceso reservado para suscriptores institucionales.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {documents.map((doc) => (
            <article key={doc.title} className="relative">
              <Card className="relative pr-16">
                <span
                  className="absolute right-0 top-0 h-12 w-12 border-l border-b border-navy-100 bg-ice"
                  aria-hidden="true"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                  }}
                />
                <FileText
                  size={28}
                  strokeWidth={1.5}
                  className="text-navy-600"
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-lg font-semibold text-navy-950">
                  {doc.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {doc.summary}
                </p>
                <div className="mt-6">
                  <Button href={doc.href} variant="secondary">
                    {doc.cta}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="ml-2"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}