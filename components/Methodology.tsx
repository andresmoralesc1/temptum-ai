import { Search, ClipboardList, MessageSquare, FileCheck2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';

const stepsConfig = [
  { key: 'diagnosis', n: '01', icon: Search },
  { key: 'plan', n: '02', icon: ClipboardList },
  { key: 'execution', n: '03', icon: MessageSquare },
  { key: 'delivery', n: '04', icon: FileCheck2 },
] as const;

export async function Methodology() {
  const t = await getTranslations('Methodology');
  const accent = t('headlineAccent');
  const parts = t('headline').split(accent);

  return (
    <section className="bg-white py-16 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
            {t('kicker')}
          </p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
              {parts[0]}
              <br />
              <span className="text-navy-600">{accent}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
              {t('intro')}
            </p>
          </div>
        </header>

        <ol className="mt-4 divide-y divide-navy-100">
          {stepsConfig.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal
                as="li"
                key={step.key}
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
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
                      {t(`steps.${step.key}.body`)}
                    </p>
                  </div>

                  <div className="lg:col-span-2 lg:pt-2">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                      {t('durationLabel')}
                    </p>
                    <p className="mt-2 text-sm leading-snug text-navy-950">
                      {t(`steps.${step.key}.days`)}
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
