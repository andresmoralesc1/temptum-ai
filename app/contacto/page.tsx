import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Póngase en contacto con el equipo de Temptum. Bogotá, Colombia.',
};

export default function ContactoPage() {
  return (
    <div className="bg-ice py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <p className="text-xs font-medium uppercase tracking-widest text-navy-600">
          Contacto
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-navy-950 md:text-5xl">
          Iniciemos una conversación
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
          Cuéntenos brevemente el contexto de su organización y el desafío que
          enfrenta. Le responderemos en un plazo de dos días hábiles.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <aside className="space-y-8 lg:col-span-4">
            <div>
              <div className="flex items-center gap-3 text-navy-600">
                <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                  Correo
                </h2>
              </div>
              <a
                href="mailto:info@temptum.io"
                className="mt-3 block text-base text-navy-950 hover:underline"
              >
                info@temptum.io
              </a>
            </div>
            <div>
              <div className="flex items-center gap-3 text-navy-600">
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                  Teléfono
                </h2>
              </div>
              <a
                href="tel:+573022388618"
                className="mt-3 block text-base text-navy-950 hover:underline"
              >
                +57 302 238 8618
              </a>
            </div>
            <div>
              <div className="flex items-center gap-3 text-navy-600">
                <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                  Sede
                </h2>
              </div>
              <p className="mt-3 text-base text-navy-950">
                Bogotá, D.C.
                <br />
                Colombia
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}