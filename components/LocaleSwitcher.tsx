'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Common.localeSwitcher');
  const [isPending, startTransition] = useTransition();

  function switchTo(next: 'es' | 'en') {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full border border-navy-100 bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur-sm sm:bottom-6 sm:right-6"
      role="group"
      aria-label={t('label')}
    >
      <Globe
        size={14}
        strokeWidth={1.5}
        className="ml-1 text-navy-600"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={() => switchTo('es')}
        disabled={isPending}
        aria-current={locale === 'es' ? 'true' : undefined}
        aria-label={t('spanish')}
        className={cn(
          'rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2',
          locale === 'es'
            ? 'bg-navy-950 text-white'
            : 'text-navy-600 hover:bg-navy-100 hover:text-navy-950',
        )}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => switchTo('en')}
        disabled={isPending}
        aria-current={locale === 'en' ? 'true' : undefined}
        aria-label={t('english')}
        className={cn(
          'rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2',
          locale === 'en'
            ? 'bg-navy-950 text-white'
            : 'text-navy-600 hover:bg-navy-100 hover:text-navy-950',
        )}
      >
        EN
      </button>
    </div>
  );
}
