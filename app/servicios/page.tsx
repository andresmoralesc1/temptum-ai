import type { Metadata } from 'next';
import { Building2, ShieldAlert, Gavel, Leaf } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { WHATSAPP_SERVICIOS } from '@/lib/constants';

const WHATSAPP_HREF = WHATSAPP_SERVICIOS;

export const metadata: Metadata = {
  title: 'Servicios Especializados',
  description:
    'Relaciones institucionales, gestión de riesgos y crisis, asuntos regulatorios y legislativos, y comunicaciones ASG y sostenibilidad.',
};

const servicios = [
  {
    id: 'relaciones-institucionales',
    icon: Building2,
    title: 'Relaciones Institucionales',
    summary:
      'Construcción y gestión de vínculos estratégicos con actores públicos y privados clave.',
    body: [
      'Mapeo y caracterización de actores públicos, gremiales y de la sociedad civil relevantes para la operación del cliente.',
      'Diseño e implementación de estrategias de acercamiento institucional de largo plazo, no transaccionales.',
      'Acompañamiento en escenarios de relacionamiento de alta sensibilidad, incluyendo audiencias públicas, comités sectoriales y procesos legislativos.',
      'Monitoreo permanente de agendas públicas, posiciones de los actores y movimientos del entorno.',
    ],
  },
  {
    id: 'gestion-riesgos',
    icon: ShieldAlert,
    title: 'Gestión de Riesgos y Crisis',
    summary:
      'Identificación temprana, mitigación y manejo de escenarios de alto impacto reputacional u operativo.',
    body: [
      'Diagnóstico de vulnerabilidades reputacionales, regulatorias y operativas, con priorización cuantitativa.',
      'Diseño de manuales de crisis, protocolos de escalamiento y matrices de respuesta por escenario.',
      'Coordinación de mesas de crisis, vocería y respuesta institucional en escenarios activos.',
      'Acompañamiento posterior a la crisis: evaluación de impacto, ajustes organizacionales y reconstrucción de confianza.',
    ],
  },
  {
    id: 'asuntos-regulatorios',
    icon: Gavel,
    title: 'Asuntos Regulatorios y Legislativos',
    summary:
      'Monitoreo, análisis e incidencia técnica en procesos normativos y legislativos.',
    body: [
      'Monitoreo legislativo y regulatorio permanente, con alertas tempranas y resúmenes ejecutivos.',
      'Análisis técnico-jurídico de proyectos de ley, decretos, resoluciones y consultas públicas, con identificación de impactos para el cliente.',
      'Elaboración de documentos técnicos, posicionamientos y propuestas regulatorias, en articulación con asesores jurídicos del cliente.',
      'Acompañamiento en audiencias públicas, foros legislativos y mesas técnicas sectoriales.',
    ],
  },
  {
    id: 'comunicaciones-asg',
    icon: Leaf,
    title: 'Comunicaciones ASG y Sostenibilidad',
    summary:
      'Estrategias de comunicación alineadas a estándares ambientales, sociales y de gobernanza.',
    body: [
      'Diagnóstico de brechas en la narrativa institucional frente a estándares ASG y marcos de reporte vigentes.',
      'Diseño de la arquitectura de comunicación de sostenibilidad, articulada con los hitos de reporte y la estrategia corporativa.',
      'Construcción de mensajes clave para públicos financieros, regulators, comunidades y colaboradores.',
      'Acompañamiento en la interlocución con inversionistas, calificadores y grupos de interés.',
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        kicker="Servicios especializados"
        headline={
          <>
            Cuatro líneas de trabajo,
            <br />
            <span className="text-gold">una sola metodología.</span>
          </>
        }
        subhead="Nuestros servicios se articulan bajo una metodología común de análisis, interlocución y ejecución. Cada línea puede contratarse de forma independiente o como parte de un encargo integrado."
        ctas={[
          {
            label: 'Hablemos por WhatsApp',
            href: WHATSAPP_HREF,
            variant: 'outline',
            external: true,
          },
        ]}
      />

      <section className="bg-ice py-24 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <nav
            aria-label="Índice de servicios"
            className="border-y border-navy-100 bg-white"
          >
            <ul className="flex flex-wrap divide-x divide-navy-100">
              {servicios.map((s) => (
                <li key={s.id} className="flex-1">
                  <a
                    href={`#${s.id}`}
                    className="block px-5 py-4 text-[13px] font-medium uppercase tracking-widest text-navy-950 hover:bg-navy-100"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-16 space-y-20">
            {servicios.map((s) => {
              const Icon = s.icon;
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className="grid gap-8 border-t border-navy-100 pt-10 lg:grid-cols-12"
                >
                  <div className="lg:col-span-4">
                    <Icon
                      size={36}
                      strokeWidth={1.5}
                      className="text-navy-600"
                      aria-hidden="true"
                    />
                    <h2 className="mt-6 font-display text-2xl font-bold text-navy-950">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {s.summary}
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <ul className="space-y-4 text-base leading-relaxed text-gray-700">
                      {s.body.map((line, idx) => (
                        <li key={idx} className="flex gap-4">
                          <span
                            className="mt-2 h-1 w-4 flex-shrink-0 bg-gold"
                            aria-hidden="true"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}