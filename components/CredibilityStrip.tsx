import { Briefcase, Layers, FileText, MapPin } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const stats = [
  {
    icon: Briefcase,
    label: 'Sectores',
    value: 'Energía · Infra · Financiero · Tecnología · Salud',
  },
  {
    icon: Layers,
    label: 'Disciplinas',
    value: 'Relaciones públicas, riesgos, regulatorio, ASG.',
  },
  {
    icon: FileText,
    label: 'Análisis público',
    value: 'Coyuntura económica, política y monitoreo legislativo.',
  },
  {
    icon: MapPin,
    label: 'Cobertura',
    value: 'Bogotá, D.C. · Región andina.',
  },
];

export function CredibilityStrip() {
  return (
    <section className="border-y border-navy-100 bg-white">
      <div className="mx-auto max-w-content px-5 py-10 lg:px-20 lg:py-12">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal
                as="li"
                key={stat.label}
                delay={i * 70}
                className="flex items-start gap-4 lg:border-r lg:border-navy-100 lg:px-2 lg:first:pl-0 lg:last:border-r-0"
              >
                <span
                  className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center border border-navy-100 text-navy-600"
                  aria-hidden="true"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-navy-950">
                    {stat.value}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}