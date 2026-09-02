import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { CopyButton } from '@/components/CopyButton';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Póngase en contacto con el equipo de Temptum. Bogotá, Colombia.',
  alternates: {
    canonical: '/contacto',
  },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        kicker="Contacto"
        headline={
          <>
            Iniciemos
            <br />
            <span className="text-gold">una conversación.</span>
          </>
        }
        subhead="Cuéntenos brevemente el contexto de su organización y el desafío que enfrenta. Le responderemos en un plazo de dos días hábiles."
      />

      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="space-y-8 lg:col-span-4">
              <div>
                <div className="flex items-center gap-3 text-navy-600">
                  <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                    Correo
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="mailto:info@temptum.io"
                    className="text-base text-navy-950 hover:underline"
                  >
                    info@temptum.io
                  </a>
                  <CopyButton value="info@temptum.io" label="Correo" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 text-navy-600">
                  <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                  <h2 className="font-display text-xs font-semibold uppercase tracking-widest">
                    Teléfono
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="tel:+573022388618"
                    className="text-base text-navy-950 hover:underline"
                  >
                    +57 302 238 8618
                  </a>
                  <CopyButton value="+573022388618" label="Teléfono" />
                </div>
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
      </section>
    </>
  );
}