import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Equipo() {
  return (
    <section className="bg-ice py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
            Liderazgo
          </p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
              Una socia fundadora,
              <br />
              <span className="text-navy-600">con trayectoria pública.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
              Temptum es dirigida por profesionales con experiencia en
              periodismo, comunicación corporativa y asuntos públicos. Cada
              encargo se lidera de principio a fin.
            </p>
          </div>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <blockquote className="border-l-2 border-gold pl-6">
              <p className="font-display text-xl font-medium leading-snug text-navy-950 lg:text-2xl">
                <span className="text-gold" aria-hidden="true">
                  &ldquo;
                </span>
                La cercanía con el cliente y la profundidad técnica son las dos
                cosas que no se pueden comprometer.
                <span className="text-gold" aria-hidden="true">
                  &rdquo;
                </span>
              </p>
              <footer className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                Silvia Juliana Parra Cañas · CEO &amp; socia fundadora
              </footer>
            </blockquote>

            <p className="mt-10 text-base leading-relaxed text-gray-700">
              Más de una década construyendo estrategias de comunicación,
              manejando crisis de alto perfil y fortaleciendo el posicionamiento
              de marcas nacionales e internacionales en Colombia y la región
              andina.
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-navy-100 pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  Formación
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-navy-950">
                  Magíster en Periodismo, Universidad del Rosario.
                  Comunicadora Social y Periodista, Universidad Jorge Tadeo
                  Lozano.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  Trayectoria
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-navy-950">
                  Edelman, Millenium Group, SPR Group &amp; Marco de
                  Comunicaciones. Antes, periodista de investigación en
                  Publicaciones Semana y Revista Dinero.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  Docencia
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-navy-950">
                  Cátedra en Relaciones Públicas, Communication Strategy y
                  Marketing y Comunicación Política en Universidad del Rosario
                  y Universidad Jorge Tadeo Lozano.
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                  LinkedIn
                </dt>
                <dd className="mt-3 text-sm leading-relaxed">
                  <a
                    href="https://www.linkedin.com/in/silviajulianaparra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-600 underline decoration-navy-100 underline-offset-4 hover:text-navy-950 hover:decoration-navy-600"
                  >
                    linkedin.com/in/silviajulianaparra
                  </a>
                </dd>
              </div>
            </dl>

            <Link
              href="/quienes-somos"
              className="mt-10 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
            >
              Conozca a Temptum
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <figure className="lg:col-span-5">
            <div className="border-l-2 border-gold pl-6">
              <Image
                src="/images/equipo/silvia-juliana.jpg"
                alt="Silvia Juliana Parra Cañas, CEO y socia fundadora de Temptum"
                width={720}
                height={900}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="aspect-[4/5] w-full object-cover"
                priority
              />
            </div>
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
              Silvia Juliana Parra Cañas · CEO &amp; socia fundadora
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}