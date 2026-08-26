import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description:
    'Temptum es una firma colombiana de consultoría estratégica en asuntos corporativo y gubernamentales, con sede en Bogotá.',
};

export default function QuienesSomosPage() {
  return (
    <div className="bg-ice py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <p className="text-xs font-medium uppercase tracking-widest text-navy-600">
          Quiénes Somos
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-navy-950 md:text-5xl">
          Una firma independiente al servicio de la decisión estratégica
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-base leading-relaxed text-gray-700">
            <p>
              Temptum es una firma colombiana de consultoría estratégica en asuntos
              corporativos y gubernamentales. Acompañamos a organizaciones del sector
              privado y a instituciones en la construcción de posiciones técnicas,
              regulatorias y reputacionales sólidas, sustentadas en un conocimiento
              riguroso del entorno político, legislativo y económico del país.
            </p>
            <p>
              Trabajamos bajo un enfoque colaborativo. Nuestro equipo combina
              experiencia en el sector público, el sector privado y la academia, e
              integra perfiles de las ciencias políticas, el derecho, la economía y la
              comunicación estratégica. Aplicamos metodologías de análisis de riesgos,
              monitoreo regulatorio y mapeo de actores para traducir contextos
              complejos en decisiones defendibles.
            </p>
            <p>
              Operamos bajo estándares estrictos de confidencialidad, independencia y
              cumplimiento. Cada encargo es liderado por un socio responsable y
              ejecutado por equipos pequeños, con entregables concretos y trazables.
            </p>
          </div>

          <aside className="border border-navy-100 bg-white p-8">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-navy-950">
              En cifras
            </h2>
            <dl className="mt-6 space-y-6 text-sm">
              <div>
                <dt className="uppercase tracking-widest text-gray-500">Sede</dt>
                <dd className="mt-1 text-base text-navy-950">Bogotá, Colombia</dd>
              </div>
              <div>
                <dt className="uppercase tracking-widest text-gray-500">Sectores</dt>
                <dd className="mt-1 text-base text-navy-950">
                  Energía, infraestructura, financiero, tecnología, salud
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-widest text-gray-500">
                  Cobertura
                </dt>
                <dd className="mt-1 text-base text-navy-950">
                  Colombia y región andina
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}