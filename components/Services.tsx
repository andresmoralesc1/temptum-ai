import Link from 'next/link';
import { Building2, ShieldAlert, Gavel, Leaf, ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: 'relaciones-institucionales',
    number: '01',
    icon: Building2,
    title: 'Relaciones Institucionales',
    summary:
      'Construcción y gestión de vínculos estratégicos con actores públicos y privados clave.',
  },
  {
    id: 'gestion-riesgos',
    number: '02',
    icon: ShieldAlert,
    title: 'Gestión de Riesgos y Crisis',
    summary:
      'Identificación temprana, mitigación y manejo de escenarios de alto impacto reputacional u operativo.',
  },
  {
    id: 'asuntos-regulatorios',
    number: '03',
    icon: Gavel,
    title: 'Asuntos Regulatorios y Legislativos',
    summary:
      'Monitoreo, análisis e incidencia técnica en procesos normativos y legislativos.',
  },
  {
    id: 'comunicaciones-asg',
    number: '04',
    icon: Leaf,
    title: 'Comunicaciones ASG y Sostenibilidad',
    summary:
      'Estrategias de comunicación alineadas a estándares ambientales, sociales y de gobernanza.',
  },
];

export function Services() {
  return (
    <section className="bg-ice py-16 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
            Servicios
          </p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
              Cuatro líneas de trabajo,
              <br />
              <span className="text-navy-600">una sola metodología.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
              Acompañamos a nuestros clientes en la construcción de posiciones
              institucionales robustas, sustentadas en análisis técnico y en el
              conocimiento profundo del entorno regulatorio y político
              colombiano.
            </p>
          </div>
        </header>

        <ol className="mt-4 divide-y divide-navy-100">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li
                key={service.id}
                className="group transition-colors duration-200 hover:bg-white"
              >
                <Link
                  href={`/servicios#${service.id}`}
                  className="grid items-start gap-6 px-4 py-10 lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-12"
                >
                  <div className="font-display text-4xl font-bold leading-none text-navy-600 transition-colors duration-200 group-hover:text-gold lg:col-span-2 lg:text-6xl">
                    {service.number}
                  </div>

                  <div className="lg:col-span-1 lg:pt-2">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-navy-600"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="lg:col-span-7">
                    <h3 className="font-display text-2xl font-bold text-navy-950 lg:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
                      {service.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 transition-colors duration-200 group-hover:text-navy-950 lg:col-span-2 lg:pt-2">
                    Ver detalle
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}