import { Search, ClipboardList, MessageSquare, FileCheck2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const steps = [
  {
    n: '01',
    icon: Search,
    title: 'Diagnóstico',
    body: 'Mapeamos el contexto regulatorio, político y reputacional. Identificamos los actores, los riesgos y las decisiones en juego.',
    days: '5 a 10 días hábiles',
  },
  {
    n: '02',
    icon: ClipboardList,
    title: 'Plan de trabajo',
    body: 'Diseñamos un plan con alcance, entregables, plazos y un único socio responsable. Lo validamos con usted antes de ejecutar.',
    days: '3 a 5 días hábiles',
  },
  {
    n: '03',
    icon: MessageSquare,
    title: 'Ejecución con interlocución',
    body: 'Equipos de tres a cinco personas, con reuniones periódicas de avance y ajuste. Usted habla siempre con el mismo interlocutor.',
    days: 'Variable, según encargo',
  },
  {
    n: '04',
    icon: FileCheck2,
    title: 'Entrega y seguimiento',
    body: 'Entregables documentados, con metodología y fuentes trazables. Sesión de cierre con recomendaciones de seguimiento.',
    days: 'Cierre + 30 días',
  },
];

export function Methodology() {
  return (
    <section className="bg-white py-16 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
            Cómo trabajamos
          </p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
              Cuatro pasos,
              <br />
              <span className="text-navy-600">una sola metodología.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
              Cada encargo sigue la misma secuencia. Lo que cambia es el
              alcance y el equipo, no el rigor del proceso.
            </p>
          </div>
        </header>

        <ol className="mt-4 divide-y divide-navy-100">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal
                as="li"
                key={step.n}
                delay={i * 80}
                className="group transition-all duration-200 hover:-translate-y-0.5 hover:bg-ice hover:shadow-sm"
              >
                <div className="grid items-start gap-6 px-4 py-10 lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-12">
                  <div className="font-display text-4xl font-bold leading-none text-navy-600 transition-colors duration-200 group-hover:text-gold lg:col-span-2 lg:text-6xl">
                    {step.n}
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
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
                      {step.body}
                    </p>
                  </div>

                  <div className="lg:col-span-2 lg:pt-2">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                      Duración
                    </p>
                    <p className="mt-2 text-sm leading-snug text-navy-950">
                      {step.days}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
