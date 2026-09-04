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
            Decisiones defendibles,{' '}
            <span className="text-gold">antes que el ruido</span>.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-navy-100">
            El primer centro especializado en Colombia en{' '}
            <strong className="font-medium text-white">
              corporate &amp; government affairs
            </strong>
            . Acompañamos a empresas reguladas, equipos legales y de cumplimiento
            en escenarios donde la decisión tiene que sostenerse ante un
            regulador, un juez o la opinión pública.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/servicios" className="group w-full active:scale-[0.98] sm:w-auto">
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
              className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-6 py-3 text-[13px] font-semibold uppercase tracking-widest text-navy-950 shadow-sm transition-all duration-150 hover:bg-gold/90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 sm:w-auto"
            >
              <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
              Conversemos por WhatsApp
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
              sizes="(min-width: 1024px) 580px, 0px"
              className="aspect-[3/2] w-full max-w-2xl object-cover"
            />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/80">
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

            <ul className="mt-10 divide-y divide-white/10" role="list">
              <li className="grid grid-cols-2 gap-6 py-5 first:pt-0">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    Sectores
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    Energía, infraestructura, financiero, salud y tecnología
                    regulada.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    Cobertura
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    Colombia y región andina.
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-2 gap-6 py-5">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    Líneas de servicio
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold leading-none text-white">
                    04
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
                    Análisis público
                  </p>
                  <p className="mt-2 text-base font-medium leading-snug text-white">
                    Anual
                    <br />+ trimestral
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="text-xs leading-relaxed text-navy-100">
                Cada encargo es liderado por un socio responsable y ejecutado
                por equipos de tres a cinco personas, con entregables
                documentados y trazables.
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
              sizes="(max-width: 1023px) 100vw, 0px"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/80">
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