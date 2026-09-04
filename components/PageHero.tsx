import Link from 'next/link';
import type { ReactNode } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';

type Variant = 'dark' | 'light';

type Stat = {
  label: string;
  value: string;
};

type Cta = {
  label: string;
  href: string;
  variant?: 'primary' | 'outline';
  external?: boolean;
};

type Crumb = { label: string; href?: string };

type Props = {
  kicker: string;
  headline: ReactNode;
  subhead?: ReactNode;
  stats?: Stat[];
  ctas?: Cta[];
  variant?: Variant;
  breadcrumbs?: Crumb[];
};

const gridBg = {
  backgroundImage:
    'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
  backgroundSize: '64px 64px',
  maskImage:
    'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
  WebkitMaskImage:
    'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
};

const baseClasses = 'relative isolate overflow-hidden';
const variantClasses: Record<Variant, string> = {
  dark: 'bg-navy-950 text-white',
  light: 'bg-ice text-navy-950',
};

const kickerClasses: Record<Variant, string> = {
  dark: 'text-navy-100',
  light: 'text-navy-600',
};

const subheadClasses: Record<Variant, string> = {
  dark: 'text-navy-100',
  light: 'text-gray-700',
};

const ctaPrimaryClasses: Record<Variant, string> = {
  dark: 'bg-navy-600 text-white hover:bg-navy-800 focus-visible:ring-white',
  light: 'bg-navy-600 text-white hover:bg-navy-800 focus-visible:ring-navy-600',
};

const ctaOutlineClasses: Record<Variant, string> = {
  dark: 'border border-white/20 text-white hover:border-white hover:bg-white/5 focus-visible:ring-white focus-visible:ring-offset-navy-950',
  light: 'border border-navy-600 text-navy-600 hover:bg-navy-100 focus-visible:ring-navy-600',
};

const statBorderClasses: Record<Variant, string> = {
  dark: 'border-white/10',
  light: 'border-navy-100',
};

const statLabelClasses: Record<Variant, string> = {
  dark: 'text-navy-100',
  light: 'text-navy-600',
};

const statsGridCols: Record<1 | 2 | 3 | 4, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function PageHero({
  kicker,
  headline,
  subhead,
  stats,
  ctas,
  variant = 'dark',
  breadcrumbs,
}: Props) {
  return (
    <section className={`${baseClasses} ${variantClasses[variant]}`}>
      {variant === 'dark' && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.05]"
            style={gridBg}
          />
          <div
            aria-hidden="true"
            className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-navy-600/30 blur-3xl"
          />
        </>
      )}

      <div className="mx-auto max-w-content px-5 pb-24 pt-32 lg:px-20 lg:pb-32 lg:pt-40">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-8">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <p
          className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] ${kickerClasses[variant]}`}
        >
          <span
            className={`inline-block h-px w-8 ${
              variant === 'dark' ? 'bg-gold' : 'bg-navy-600'
            }`}
            aria-hidden="true"
          />
          {kicker}
        </p>

        <h1
          className={`mt-8 max-w-4xl font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-[64px] ${
            variant === 'dark' ? 'text-white' : 'text-navy-950'
          }`}
        >
          {headline}
        </h1>

        {subhead && (
          <p
            className={`mt-8 max-w-2xl text-lg leading-relaxed ${subheadClasses[variant]}`}
          >
            {subhead}
          </p>
        )}

        {ctas && ctas.length > 0 && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            {ctas.map((cta) => {
              const isPrimary = cta.variant !== 'outline';
              const cls = isPrimary
                ? `inline-flex items-center justify-center px-6 py-3 text-[13px] font-medium uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${ctaPrimaryClasses[variant]}`
                : `inline-flex items-center justify-center px-6 py-3 text-[13px] font-medium uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${ctaOutlineClasses[variant]}`;
              if (cta.external) {
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {cta.label}
                  </a>
                );
              }
              return (
                <Link key={cta.label} href={cta.href} className={cls}>
                  {cta.label}
                </Link>
              );
            })}
          </div>
        )}

        {stats && stats.length > 0 && (
          <div
            className={`mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-10 ${statsGridCols[(Math.min(stats.length, 4) as 1 | 2 | 3 | 4)]} ${
              variant === 'dark' ? 'border-white/10' : 'border-navy-100'
            }`}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className={`text-[11px] font-medium uppercase tracking-[0.18em] ${statLabelClasses[variant]}`}
                >
                  {s.label}
                </p>
                <p
                  className={`mt-3 font-display text-xl font-bold ${
                    variant === 'dark' ? 'text-white' : 'text-navy-950'
                  }`}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {variant === 'dark' && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      )}
    </section>
  );
}