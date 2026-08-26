import type { MetadataRoute } from 'next';
import { getAllCasoSlugs } from '@/lib/content';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://temptum.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    '',
    '/quienes-somos',
    '/servicios',
    '/inteligencia-politica',
    '/casos-de-estudio',
    '/contacto',
    '/politica-de-privacidad',
    '/mapa-del-sitio',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const casoRoutes = getAllCasoSlugs().map((slug) => ({
    url: `${BASE_URL}/casos-de-estudio/${slug}`,
    lastModified,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...casoRoutes];
}
