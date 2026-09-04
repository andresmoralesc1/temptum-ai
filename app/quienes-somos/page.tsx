import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { WHATSAPP_QUIENES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description:
    'Temptum es una firma independiente de corporate & government affairs en Bogotá. Conozca a nuestra CEO, nuestra trayectoria y cómo conformamos equipos para cada encargo.',
  alternates: { canonical: '/quienes-somos' },
};

const WHATSAPP_HREF = WHATSAPP_QUIENES;

const trayectoria = [
  {
    period: '2023 — Actualidad',
    role: 'CEO',
    org: 'Temptum Hub',
    detail:
      'Centro especializado en Colombia en corporate & government affairs: comunicaciones estratégicas, direccionamiento digital, infraestructura web y explotación de datos para inteligencia de negocios.',
  },
  {
    period: '2019 — 2023',
    role: 'Cofundadora',
    org: 'VIM La Agencia',
    detail:
      'Expansión a medios digitales y servicios de comunicación basados en tecnología: estrategia en redes sociales y desarrollo de plataformas.',
  },
  {
    period: '2015 — 2019',
    role: 'Directora de cuenta',
    org: 'SPR Group & Marco de Comunicaciones',
    detail:
      'Manejo de crisis, asuntos públicos y de gobierno, y relaciones públicas para clientes en escenarios de alto impacto.',
  },
  {
    period: '2015',
    role: 'Líder de cuentas',
    org: 'Medios Milenium',
    detail:
      'Comunicación interna, externa y relaciones públicas para cuentas corporativas regionales en Latinoamérica.',
  },
  {
    period: '2013 — 2014',
    role: 'Consultora de comunicaciones',
    org: 'Edelman Colombia',
    detail:
      'Diseño y ejecución de campañas estratégicas para marcas nacionales e internacionales en una de las firmas de PR más importantes del mundo.',
  },
  {
    period: '2011 — 2013',
    role: 'Periodista de investigación',
    org: 'Publicaciones Semana · Revista Dinero',
    detail:
      'Reportería en los sectores económico y empresarial; redacción de géneros periodísticos e investigación para edición impresa y digital.',
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      <PageHero
        kicker="Quiénes Somos"
        headline={
          <>
            El primer centro especializado en Colombia en{' '}
            <span className="text-gold">
              corporate &amp; government affairs
            </span>
            .
          </>
        }
        subhead="Temptum es una firma independiente con sede en Bogotá. Acompañamos a organizaciones del sector privado e instituciones en la construcción de posiciones defendibles — sustentadas en análisis técnico, conocimiento regulatorio y lectura política del entorno."
        stats={[
          { label: 'Sede', value: 'Bogotá' },
          { label: 'Cobertura', value: 'Colombia · Región andina' },
          {
            label: 'Sectores',
            value: 'Energía, infra, financiero, tecnología, salud',
          },
          { label: 'Fundada', value: '2023' },
        ]}
      />

      {/* SOBRE TEMPTUM */}
      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
              Sobre Temptum
            </p>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
                Una práctica fundada en
                <br />
                <span className="text-navy-600">rigor, no en urgencia.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
                Combinamos experiencia en comunicación corporativa, periodismo
                de investigación y asuntos públicos para servir a organizaciones
                que toman decisiones que importan. Cada encargo se ejecuta con
                equipos de tres a cinco personas, entregables documentados y un
                socio responsable desde el primer diagnóstico.
              </p>
            </div>
          </header>

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-gray-700">
              <p>
                Temptum reúne cuatro líneas de trabajo — relaciones
                institucionales, gestión de riesgos y crisis, asuntos
                regulatorios y legislativos, y comunicaciones ASG — bajo una
                sola metodología: traducir contextos complejos en decisiones
                defendibles.
              </p>
              <p>
                Nuestro equipo combina perfiles de ciencias políticas, derecho,
                economía y comunicación estratégica, con experiencia directa en
                el sector público, el sector privado y la academia. Aplicamos
                metodologías de análisis de riesgos, monitoreo regulatorio y
                mapeo de actores para producir inteligencia accionable — no
                diagnósticos genéricos.
              </p>
              <p>
                Operamos bajo estándares estrictos de confidencialidad,
                independencia y cumplimiento. No sustituimos al cliente: lo
                acompañamos con rigor técnico y criterio estratégico para que
                cada decisión sea defendible ante sus audiencias, sus
                reguladores y la opinión pública.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <figure className="border-l-2 border-gold pl-6">
                <Image
                  src="/images/equipo/equipo-reunion.jpg"
                  alt="Sesión de consultoría con clientes y aliados"
                  width={1000}
                  height={667}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Sesión de análisis con aliados y clientes
                </figcaption>
              </figure>

              <dl className="mt-10 space-y-6 border-t border-navy-100 pt-6">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    Idiomas
                  </dt>
                  <dd className="mt-2 text-sm text-navy-950">
                    Español · Inglés
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    Modelos de trabajo
                  </dt>
                  <dd className="mt-3 space-y-3 text-sm text-navy-950">
                    <div>
                      <p className="font-semibold text-navy-950">
                        Por proyecto
                      </p>
                      <p className="text-gray-700">
                        Alcance, entregables y plazo definidos. Para mandatos
                        con inicio y cierre claros.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-950">
                        Retainer mensual
                      </p>
                      <p className="text-gray-700">
                        Disponibilidad permanente del equipo. Para
                        organizaciones con asuntos regulatorios o
                        institucionales recurrentes.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-950">
                        Asesoría estratégica
                      </p>
                      <p className="text-gray-700">
                        Acompañamiento al CEO, al directorio o al equipo legal
                        en decisiones de alto impacto.
                      </p>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                    Cobertura operativa
                  </dt>
                  <dd className="mt-2 text-sm text-navy-950">
                    Bogotá · Medellín · Cali · Quito · Lima
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* LIDERAZGO — SILVIA JULIANA */}
      <section className="bg-navy-100 py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <header className="grid gap-8 border-b border-navy-100 pb-12 lg:grid-cols-12 lg:gap-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600 lg:col-span-4">
              Liderazgo
            </p>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
                Silvia Juliana Parra Cañas
              </h2>
              <p className="mt-3 text-base font-medium uppercase tracking-[0.18em] text-navy-600">
                CEO &amp; socia fundadora
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
                Magíster en Periodismo por la Universidad del Rosario y
                comunicadora social y periodista de la Universidad Jorge Tadeo
                Lozano. Más de una década construyendo estrategias de
                comunicación, manejando crisis de alto perfil y fortaleciendo el
                posicionamiento de marcas nacionales e internacionales en
                Colombia y la región.
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
                  La cercanía con el cliente y la profundidad técnica son las
                  dos cosas que no se pueden comprometer.
                  <span className="text-gold" aria-hidden="true">
                    &rdquo;
                  </span>
                </p>
              </blockquote>

              <h3 className="mt-12 font-display text-lg font-bold uppercase tracking-[0.18em] text-navy-600">
                Trayectoria profesional
              </h3>
              <ol className="mt-6 space-y-8 border-l border-navy-100 pl-6">
                {trayectoria.map((item) => (
                  <li key={item.org} className="relative">
                    <span
                      className="absolute -left-[27px] top-1.5 inline-block h-2 w-2 bg-gold"
                      aria-hidden="true"
                    />
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
                      {item.period}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-navy-950">
                      {item.role}
                      <span className="text-navy-600"> · {item.org}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="lg:col-span-5 space-y-8">
              <figure className="border-l-2 border-gold pl-6">
                <Image
                  src="/images/equipo/silvia-juliana.png"
                  alt="Silvia Juliana Parra Cañas, CEO y socia fundadora de Temptum"
                  width={800}
                  height={800}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-square w-full object-cover"
                  priority
                />
              </figure>

              <div className="border-t border-navy-100 pt-8">
                <h3 className="font-display text-lg font-bold uppercase tracking-[0.18em] text-navy-600">
                  Formación
                </h3>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-navy-950">
                  <li>
                    <strong className="block text-navy-950">
                      Magíster en Periodismo
                    </strong>
                    Universidad del Rosario · 2012 – 2014
                  </li>
                  <li>
                    <strong className="block text-navy-950">
                      Comunicadora Social y Periodista
                    </strong>
                    Fundación Universidad de Bogotá Jorge Tadeo Lozano ·
                    2007 – 2010
                  </li>
                </ul>
              </div>

              <div className="border-t border-navy-100 pt-8">
                <h3 className="font-display text-lg font-bold uppercase tracking-[0.18em] text-navy-600">
                  Docencia
                </h3>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-navy-950">
                  <li>
                    <strong className="block text-navy-950">
                      Universidad del Rosario
                    </strong>
                    Cátedra <em>Storytelling</em> — Maestría en Comunicación
                    Política Digital.
                  </li>
                  <li>
                    <strong className="block text-navy-950">
                      Universidad Jorge Tadeo Lozano
                    </strong>
                    Cátedras de <em>Relaciones Públicas</em>,{' '}
                    <em>Communication Strategy for Organizations</em> y{' '}
                    <em>Marketing y Comunicación Política</em> (pregrado y
                    maestría).
                  </li>
                </ul>
              </div>

              <div className="border-t border-navy-100 pt-8">
                <a
                  href="https://www.linkedin.com/in/silviajulianaparra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
                >
                  LinkedIn
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ALIADOS Y SECTORES */}
      <section className="bg-white py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
                Aliados y sectores
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl">
                Un ecosistema amplio,
                <br />
                <span className="text-navy-600">
                  articulado para cada encargo.
                </span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-700">
                Temptum trabaja con una red estable de aliados sectoriales,
                académicos y consultivos en Colombia y la región andina. Para
                cada proyecto convocamos a los perfiles que el contexto exige:
                abogados, economistas, científicos políticos, comunicadores
                estratégicos y especialistas técnicos.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                Esta red no reemplaza al equipo permanente: lo complementa. La
                coordinación, el criterio editorial y la interlocución con el
                cliente permanecen en casa.
              </p>
            </div>

            <figure className="border-l-2 border-gold pl-6 lg:col-span-7">
              <Image
                src="/images/equipo/equipo-acuerdo.jpg"
                alt="Equipo interdisciplinario de aliados y colaboradores"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 800px, 100vw"
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="mt-3 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                Red de aliados sectoriales y académicos
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS */}
      <section className="bg-navy-950 py-24 text-white lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <header className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-12 lg:gap-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold lg:col-span-4">
              Cómo trabajamos
            </p>
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Tres compromisos
                <br />
                <span className="text-gold">innegociables.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-100">
                Cada encargo se ejecuta bajo los mismos tres principios. No son
                eslóganes: son la base operativa de la firma.
              </p>
            </div>
          </header>

          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              {
                n: '01',
                title: 'Confidencialidad estricta',
                body:
                  'Manejo de información sensible bajo protocolos formales de acceso, archivo y destrucción. No usamos el nombre del cliente como activo de mercadeo.',
              },
              {
                n: '02',
                title: 'Independencia de criterio',
                body:
                  'No recibimos compensación de terceros por resultados regulatorios o de política pública. Recomendamos lo que es defendible, no lo que conviene al proveedor.',
              },
              {
                n: '03',
                title: 'Cumplimiento verificable',
                body:
                  'Cada entregable es trazable, cada metodología documentada, cada equipo de trabajo identificado por escrito. La auditoría del trabajo propio es parte del servicio.',
              },
            ].map((p) => (
              <article key={p.n}>
                <p
                  className="font-display text-5xl font-bold leading-none text-gold"
                  aria-hidden="true"
                >
                  {p.n}
                </p>
                <h3 className="mt-6 font-display text-xl font-bold text-white lg:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-navy-100">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ice py-16 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
                ¿Conversamos?
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 md:text-4xl lg:text-5xl">
                Cuéntenos el contexto.
                <br />
                <span className="text-navy-600">
                  Le respondemos en un plazo de dos días hábiles.
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
                Atendemos cada conversación de manera directa, sin formularios
                genéricos. Si su organización enfrenta un escenario complejo,
                conversemos por correo o WhatsApp.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-navy-600 px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-white transition-colors hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                Conversemos
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy-600 px-6 py-3 text-[13px] font-medium uppercase tracking-widest text-navy-600 transition-colors hover:bg-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
              >
                WhatsApp directo
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}