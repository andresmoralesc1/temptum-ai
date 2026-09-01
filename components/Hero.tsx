import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/Button';
import { WHATSAPP_CONTACTO } from '@/lib/constants';

const WHATSAPP_HREF = WHATSAPP_CONTACTO;

export function Hero() {
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
            Consultoría estratégica · Bogotá
          </p>

          <h1 className="mt-8 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-[64px]">
            La decisión estratégica,{' '}
            <span className="text-gold">antes que el ruido</span>.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100">
            El primer centro especializado en Colombia en{' '}
            <strong className="font-medium text-white">
              corporate &amp; government affairs
            </strong>
            . Nexo de influencia, rigor técnico y mitigación de riesgos para el
            sector privado y las instituciones. Trabajamos con quienes toman las
            decisiones que importan.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/servicios" className="group">
              Conozca nuestra metodología
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
              className="inline-flex items-center justify-center gap-2 rounded border border-white/20 px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-white transition-colors hover:border-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
              Hablemos por WhatsApp
            </a>
          </div>

          {/* Foto editorial + caption — solo desktop, debajo de los CTAs */}
          <figure className="mt-12 hidden border-l-2 border-gold pl-6 lg:block">
            <Image
              src="/images/equipo/equipo-reunion.jpg"
              alt="Sesión de trabajo con clientes y aliados"
              width={680}
              height={453}
              priority
              sizes="(min-width: 1024px) 580px, 100vw"
              className="aspect-[3/2] w-full max-w-2xl object-cover"
            />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-navy-100">
              Sesión de trabajo con aliados · Workshops y consultoría
            </figcaption>
          </figure>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
              Quiénes nos consultan
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">
              Organizaciones que defienden decisiones complejas.
            </h2>

            <dl className="mt-10 divide-y divide-white/10">
              <div className="grid grid-cols-2 gap-6 py-5 first:pt-0">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-100">
                    Sectores
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-white">
                    Energía, infraestructura, financiero, tecnología, salud.
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-100">
                    Cobertura
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-white">
                    Colombia y región andina.
                  </dd>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 py-5">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-100">
                    Líneas de servicio
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-bold leading-none text-white">
                    04
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-100">
                    Análisis público
                  </dt>
                  <dd className="mt-2 text-base font-medium leading-snug text-white">
                    Anual
                    <br />+ trimestral
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs leading-relaxed text-navy-100">
                Cada encargo es liderado por un socio responsable y ejecutado
                por equipos pequeños, con entregables concretos y trazables.
              </p>
            </div>
          </div>

          {/* Foto editorial — mobile only */}
          <figure className="mt-10 border-l-2 border-gold pl-4 lg:hidden">
            <Image
              src="/images/equipo/equipo-reunion.jpg"
              alt="Sesión de trabajo con clientes y aliados"
              width={680}
              height={453}
              priority
              sizes="100vw"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-navy-100">
              Workshops y consultoría con aliados
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