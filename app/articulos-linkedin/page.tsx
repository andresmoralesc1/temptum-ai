import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllArticulosLinkedIn } from '@/lib/linkedin';
import { ArticuloLinkedInCard } from '@/components/ArticuloLinkedInCard';
import { PageHero } from '@/components/PageHero';

function LinkedInIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: 'Artículos en LinkedIn',
  description:
    'Análisis y opinión publicados por nuestro equipo en LinkedIn sobre asuntos corporativos, regulatorios y de comunicaciones estratégicas.',
};

export default function ArticulosLinkedInPage() {
  const articulos = getAllArticulosLinkedIn();

  return (
    <>
      <PageHero
        kicker="LinkedIn"
        headline={
          <>
            Lo que estamos
            <br />
            <span className="text-gold">publicando.</span>
          </>
        }
        subhead="Reflexiones de nuestro equipo en LinkedIn sobre temas de comunicaciones estratégicas, cumplimiento normativo, gestión de crisis y el impacto de la inteligencia artificial en la disciplina."
      />

      <section className="bg-ice py-24 lg:py-32">
        <div className="mx-auto max-w-content px-5 lg:px-20">
          <div className="mb-12 flex items-center justify-between border-b border-navy-100 pb-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-navy-600">
              {articulos.length}{' '}
              {articulos.length === 1 ? 'artículo' : 'artículos'} publicados
            </p>
            <Link
              href="https://www.linkedin.com/in/silviajulianaparra/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-widest text-navy-600 hover:text-navy-950"
            >
              Seguir en LinkedIn
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {articulos.length === 0 ? (
            <div className="flex flex-col items-center gap-4 border border-dashed border-navy-200 bg-white p-16 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-[#0A66C2]">
                <LinkedInIcon size={24} />
              </span>
              <p className="font-display text-lg font-semibold text-navy-950">
                Aún no hay artículos publicados.
              </p>
              <p className="max-w-md text-sm text-gray-600">
                Cuando publiquemos análisis en LinkedIn aparecerán listados
                aquí.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {articulos.map((articulo) => (
                <ArticuloLinkedInCard key={articulo.slug} articulo={articulo} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
