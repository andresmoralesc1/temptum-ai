'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('ContactForm');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);

  // Tras éxito o error, desplaza la vista al mensaje de estado.
  useEffect(() => {
    if ((status === 'success' || status === 'error') && statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || t('errorFallback'));
      }

      form.reset();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : t('errorFallback'));
    }
  }

  const inputCls =
    'block w-full border border-navy-100 bg-white px-4 py-3 text-base text-navy-950 placeholder:text-gray-500 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="nombre" className="block text-xs font-medium uppercase tracking-widest text-navy-600">
          {t('fields.name')}
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          autoComplete="name"
          className={`${inputCls} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="organizacion" className="block text-xs font-medium uppercase tracking-widest text-navy-600">
          {t('fields.organization')}
        </label>
        <input
          id="organizacion"
          name="organizacion"
          type="text"
          autoComplete="organization"
          className={`${inputCls} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-navy-600">
          {t('fields.email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={`${inputCls} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-xs font-medium uppercase tracking-widest text-navy-600">
          {t('fields.message')}
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          className={`${inputCls} mt-2 resize-none`}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-gray-500">{t('privacy')}</p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 bg-navy-600 px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-white transition-colors duration-150 hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-navy-100 disabled:text-navy-600"
        >
          {status === 'submitting' && (
            <Loader2
              size={16}
              strokeWidth={2}
              className="animate-spin"
              aria-hidden="true"
            />
          )}
          {status === 'submitting' ? t('submitting') : t('submit')}
        </button>
      </div>

      {/*
        Región aria-live persistente (vacía en idle) para que el screen reader
        anuncie el cambio cuando aparezca un mensaje. role="status" implica
        aria-live="polite"; role="alert" implica aria-live="assertive".
      */}
      <div ref={statusRef} aria-live="polite" className="sr-only">
        {status === 'success' && t('successAria')}
        {status === 'error' && (errorMessage || t('errorAria'))}
      </div>

      {status === 'success' && (
        <p
          role="status"
          className="border border-navy-600 bg-navy-100 px-4 py-3 text-sm text-navy-950"
        >
          {t('successVisible')}
        </p>
      )}

      {status === 'error' && (
        <p
          role="alert"
          className="border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage || t('errorFallback')}
        </p>
      )}
    </form>
  );
}
