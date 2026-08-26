import { Building2, ShieldAlert, Gavel, Leaf } from 'lucide-react';
import { Card } from '@/components/Card';

const services = [
  {
    icon: Building2,
    title: 'Relaciones Institucionales',
    description:
      'Construcción y gestión de vínculos estratégicos con actores públicos y privados clave.',
  },
  {
    icon: ShieldAlert,
    title: 'Gestión de Riesgos y Crisis',
    description:
      'Identificación temprana, mitigación y manejo de escenarios de alto impacto reputacional u operativo.',
  },
  {
    icon: Gavel,
    title: 'Asuntos Regulatorios y Legislativos',
    description:
      'Monitoreo, análisis e incidencia técnica en procesos normativos y legislativos.',
  },
  {
    icon: Leaf,
    title: 'Comunicaciones ASG y Sostenibilidad',
    description:
      'Estrategias de comunicación alineadas a estándares ambientales, sociales y de gobernanza.',
  },
];

export function Services() {
  return (
    <section className="bg-ice py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <div className="mb-16 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-navy-600">
            Nuestros Servicios
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy-950 md:text-4xl">
            Cuatro disciplinas, una sola firma
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-700">
            Acompañamos a nuestros clientes en la construcción de posiciones
            institucionales robustas, sustentadas en análisis técnico y en el
            conocimiento profundo del entorno regulatorio y político colombiano.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title}>
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className="text-navy-600"
                  aria-hidden="true"
                />
                <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-widest text-navy-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}