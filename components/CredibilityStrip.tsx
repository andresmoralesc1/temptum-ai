import { Briefcase, Layers, FileText, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';

const icons = [Briefcase, Layers, FileText, MapPin];
const keys = ['sectors', 'disciplines', 'publicAnalysis', 'coverage'] as const;

export async function CredibilityStrip() {
  const t = await getTranslations('CredibilityStrip');

  return (
    <section className="border-y border-navy-100 bg-white">
      <div className="mx-auto max-w-content px-5 py-10 lg:px-20 lg:py-12">
        <ul className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                as="li"
                key={key}
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
                    {t(`items.${key}.label`)}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-navy-950">
                    {t(`items.${key}.value`)}
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
