import { getTranslations } from 'next-intl/server';
import { Reveal } from '@/components/Reveal';

export async function Manifesto() {
  const t = await getTranslations('Manifesto');

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/2 -z-10 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-navy-600/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 -z-10 h-px w-32 bg-gold"
      />
      <div
        aria-hidden="true"
        className="absolute right-32 bottom-0 -z-10 h-px w-64 bg-gold/60"
      />

      <div className="mx-auto max-w-content px-5 lg:px-20">
        <Reveal as="div">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
            {t('kicker')}
          </p>
          <blockquote className="mt-10 max-w-5xl">
            <p className="font-display text-3xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[56px]">
              <span className="text-gold" aria-hidden="true">
                &ldquo;
              </span>
              {t('quote')}
              <span className="text-gold" aria-hidden="true">
                &rdquo;
              </span>
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-3 lg:gap-16">
          <Reveal as="p" delay={120} className="font-display text-xl leading-snug text-white lg:text-2xl">
            {t('lead')}
          </Reveal>
          <Reveal as="p" delay={200} className="text-base leading-relaxed text-navy-100">
            {t('body1')}
          </Reveal>
          <Reveal as="p" delay={280} className="text-base leading-relaxed text-navy-100">
            {t('body2')}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
