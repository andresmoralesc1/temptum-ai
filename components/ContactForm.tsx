'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
        throw new Error(payload.error || 'No fue posible enviar el mensaje.');
      }

      form.reset();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Error inesperado.');
    }
  }

  const inputCls =
    'block w-full border border-navy-100 bg-white px-4 py-3 text-base text-navy-950 placeholder:text-gray-500 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="nombre" className="block text-xs font-medium uppercase tracking-widest text-navy-600">
          Nombre completo
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
          Organización
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
          Correo electrónico
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
          Mensaje
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
        <p className="text-xs text-gray-500">
          Sus datos solo se utilizan para responder a esta solicitud.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center bg-navy-600 px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-white transition-colors duration-150 hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-navy-100 disabled:text-navy-600"
        >
          {status === 'submitting' ? 'Enviando…' : 'Enviar Mensaje'}
        </button>
      </div>

      {status === 'success' && (
        <p
          role="status"
          className="border border-navy-600 bg-navy-100 px-4 py-3 text-sm text-navy-950"
        >
          Recibimos su mensaje. Le responderemos en un plazo de dos días hábiles.
        </p>
      )}

      {status === 'error' && (
        <p
          role="alert"
          className="border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}