import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';
import { WHATSAPP_CONTACTO } from '@/lib/constants';

const WHATSAPP_HREF = WHATSAPP_CONTACTO;

export async function Hero() {
  const t = await getTranslations('Hero');
  const heroAccent = t('headlineAccent');
  const heroParts = t('headline').split(heroAccent);
  const lede = t('lede', { discipline: t('discipline') });

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      {/* Textura de fondo: grid sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-navy-600/30 blur-3xl"
      />

      <div className="mx-auto grid max-w-content gap-12 px-5 pb-24 pt-32 lg:grid-cols-12 lg:gap-12 lg:px-20 lg:pb-32 lg:pt-40">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-navy-100">
            <span
              className="inline-block h-px w-8 bg-gold"
              aria-hidden="true"
            />
            {t('kicker')}
          </p>

          <h1 className="mt-8 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-[64px]">
            {heroParts[0]}
            <span className="text-gold">{heroAccent}</span>
            {heroParts[1] ?? ''}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100">
            {(() => {
              // The lede contains a placeholder for the discipline name wrapped
              // in <strong>. We split on the discipline to inject the styled span.
              const discipline = t('discipline');
              const parts = lede.split(discipline);
              return (
                <>
                  {parts[0]}
                  <strong className="font-medium text-white">{discipline}</strong>
                  {parts[1] ?? ''}
                </>
              );
            })()}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/servicios" className="group w-full active:scale-[0.98] sm:w-auto">
              {t('ctaMethodology')}
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="ml-2 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-[13px] font-semibold uppercase tracking-widest text-navy-950 shadow-sm transition-all duration-150 hover:bg-gold/90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 sm:w-auto"
            >
              <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
              {t('ctaWhatsapp')}
            </a>
          </div>

          {/* Foto editorial + caption — solo desktop, debajo de los CTAs */}
          <figure className="mt-12 hidden border-l-2 border-gold pl-6 lg:block">
            <Image
              src="/images/equipo/equipo-reunion.jpg"
              alt={t('photoAlt')}
              width={680}
              height={453}
              priority
              sizes="(min-width: 1024px) 580px, 0px"
              className="aspect-[3/2] w-full max-w-2xl object-cover"
            />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/80">
              {t('photoCaption')}
            </figcaption>
          </figure>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              {t('card.kicker')}
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">
              {t('card.headline')}
            </h2>

            <ul className="mt-10 divide-y divide-white/10" role="list">
              <li className="grid grid-cols-2 gap-6 py-5 first:pt-0">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    {t('card.sectors')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    {t('card.sectorsValue')}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    {t('card.coverage')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    {t('card.coverageValue')}
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-2 gap-6 py-5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    {t('card.serviceLines')}
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold leading-none text-white">
                    {t('card.serviceLinesValue')}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    {t('card.publicAnalysis')}
                  </p>
                  <p className="mt-2 text-base font-medium leading-snug text-white">
                    {t('card.publicAnalysisValue')}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs leading-relaxed text-navy-100">
                {t('card.footnote')}
              </p>
            </div>
          </div>

          {/* Foto editorial — mobile only */}
          <figure className="mt-10 border-l-2 border-gold pl-4 lg:hidden">
            <Image
              src="/images/equipo/equipo-reunion.jpg"
              alt={t('photoAlt')}
              width={680}
              height={453}
              priority
              sizes="(max-width: 1023px) 100vw, 0px"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/80">
              {t('photoCaptionMobile')}
            </figcaption>
          </figure>
        </aside>
      </div>

      {/* Bottom border accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
    </section>
  );
}
