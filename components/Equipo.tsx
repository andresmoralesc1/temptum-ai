import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Reveal } from '@/components/Reveal';

export async function Equipo() {
  const t = await getTranslations('Equipo');
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

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal as="div" className="lg:col-span-7">
            <blockquote className="border-l-2 border-gold pl-6">
              <p className="font-display text-xl font-medium leading-snug text-navy-950 lg:text-2xl">
                <span className="text-gold" aria-hidden="true">
                  &ldquo;
                </span>
                {t('quote')}
                <span className="text-gold" aria-hidden="true">
                  &rdquo;
                </span>
              </p>
              <footer className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                {t('quoteFooter')}
              </footer>
            </blockquote>

            <p className="mt-10 text-base leading-relaxed text-gray-700">
              {t('body')}
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-navy-100 pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  {t('labels.formation')}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-navy-950">
                  {t('formationValue')}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  {t('labels.trajectory')}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-navy-950">
                  {t('trajectoryValue')}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  {t('labels.teaching')}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-navy-950">
                  {t('teachingValue')}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  {t('labels.linkedin')}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed">
                  <a
                    href="https://www.linkedin.com/in/silviajulianaparra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-600 underline decoration-navy-100 underline-offset-4 hover:text-navy-950 hover:decoration-navy-600"
                  >
                    {t('linkedinValue')}
                  </a>
                </dd>
              </div>
            </dl>

            <Link
              href="/quienes-somos"
              className="mt-10 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
            >
              {t('cta')}
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <Reveal as="figure" delay={120} className="lg:col-span-5">
            <div className="border-l-2 border-gold pl-6">
              <Image
                src="/images/equipo/juliana-becerra.webp"
                alt={t('quoteFooter')}
                width={800}
                height={800}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="aspect-square w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
              {t('quoteFooter')}
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
