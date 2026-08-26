import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mapa del Sitio',
  description: 'Listado completo de páginas del sitio web de Temptum.',
};

const secciones = [
  {
    title: 'Inicio',
    links: [{ href: '/', label: 'Home' }],
  },
  {
    title: 'Firma',
    links: [{ href: '/quienes-somos', label: 'Quiénes Somos' }],
  },
  {
    title: 'Servicios',
    links: [
      { href: '/servicios', label: 'Servicios Especializados' },
      { href: '/inteligencia-politica', label: 'Inteligencia y Política Pública' },
    ],
  },
  {
    title: 'Casos',
    links: [{ href: '/casos-de-estudio', label: 'Casos de Estudio' }],
  },
  {
    title: 'Contacto',
    links: [{ href: '/contacto', label: 'Contacto' }],
  },
  {
    title: 'Legal',
    links: [
      { href: '/mapa-del-sitio', label: 'Mapa del Sitio' },
      { href: '/politica-de-privacidad', label: 'Política de Privacidad' },
    ],
  },
];

export default function MapaDelSitioPage() {
  return (
    <div className="bg-ice py-24 lg:py-32">
      <div className="mx-auto max-w-content px-5 lg:px-20">
        <p className="text-xs font-medium uppercase tracking-widest text-navy-600">
          Mapa del Sitio
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-navy-950 md:text-5xl">
          Todas las páginas
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {secciones.map((sec) => (
            <div
              key={sec.title}
              className="border border-navy-100 bg-white p-6"
            >
              <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-navy-600">
                {sec.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {sec.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-navy-950 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}