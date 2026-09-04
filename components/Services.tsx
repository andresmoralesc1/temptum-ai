import { Building2, ShieldAlert, Gavel, Leaf, ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/Reveal';

const itemsConfig = [
  { key: 'institutionalRelations', n: '01', icon: Building2 },
  { key: 'riskAndCrisis', n: '02', icon: ShieldAlert },
  { key: 'regulatory', n: '03', icon: Gavel },
  { key: 'esg', n: '04', icon: Leaf },
] as const;

export async function Services() {
  const t = await getTranslations('Services');
  // Pull the matching service ids from ServicesPage (locale-specific) so
  // the home anchor links land on the right section in /servicios.
  const tPage = await getTranslations('ServicesPage');
  const serviceIds = tPage.raw('items') as Array<{ id: string; title: string }>;
  // Map by title (titles are unique within the page) so we don't depend
  // on array order.
  const titles = itemsConfig.map((c) => t(`items.${c.key}.title`));
  const idByTitle = new Map(serviceIds.map((s) => [s.title, s.id]));

  const accent = t('headlineAccent');
  const parts = t('headline').split(accent);

  return (
    <section className="bg-ice py-16 lg:py-32">
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
          {itemsConfig.map((service, i) => {
            const Icon = service.icon;
            const title = titles[i];
            const id = idByTitle.get(title) ?? '';
            return (
              <Reveal
                as="li"
                key={service.key}
                delay={i * 80}
                className="group transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <Link
                  href={`/servicios#${id}`}
                  className="grid items-start gap-6 px-4 py-10 lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-12"
                >
                  <div className="font-display text-4xl font-bold leading-none text-navy-600 transition-colors duration-200 group-hover:text-gold lg:col-span-2 lg:text-6xl">
                    {service.n}
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
                      {title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
                      {t(`items.${service.key}.summary`)}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600 transition-colors group-hover:text-gold lg:col-span-2 lg:pt-2">
                    {t('cta')}
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
