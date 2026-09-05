import type { MetadataRoute } from 'next';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getAllCasos } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

type Route = {
  es: string;
  en: string;
  sourceFile: string;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

const STATIC_ROUTES: Route[] = [
  { es: '', en: '', sourceFile: 'page.tsx', changeFrequency: 'weekly', priority: 1 },
  { es: '/quienes-somos', en: '/quienes-somos', sourceFile: 'quienes-somos/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { es: '/servicios', en: '/servicios', sourceFile: 'servicios/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { es: '/inteligencia-politica', en: '/inteligencia-politica', sourceFile: 'inteligencia-politica/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
  { es: '/casos-de-estudio', en: '/casos-de-estudio', sourceFile: 'casos-de-estudio/page.tsx', changeFrequency: 'weekly', priority: 0.8 },
  { es: '/contacto', en: '/contacto', sourceFile: 'contacto/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
  { es: '/politica-de-privacidad', en: '/politica-de-privacidad', sourceFile: 'politica-de-privacidad/page.tsx', changeFrequency: 'yearly', priority: 0.3 },
];

async function getMtime(relativePath: string): Promise<Date> {
  try {
    const stat = await fs.stat(path.join(process.cwd(), 'app', '[locale]', relativePath));
    return stat.mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    const lastModified = await getMtime(route.sourceFile);
    const esUrl = `${SITE_URL}${route.es}`;
    const enUrl = `${SITE_URL}/en${route.en}`;

    entries.push({
      url: esUrl,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'x-default': esUrl,
          'es-CO': esUrl,
          'es-419': esUrl,
          es: esUrl,
          en: enUrl,
          'en-US': enUrl,
        },
      },
    });

    entries.push({
      url: enUrl,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'x-default': esUrl,
          'es-CO': esUrl,
          'es-419': esUrl,
          es: esUrl,
          en: enUrl,
          'en-US': enUrl,
        },
      },
    });
  }

  for (const caso of getAllCasos()) {
    const esUrl = `${SITE_URL}/casos-de-estudio/${caso.slug}`;
    const enUrl = `${SITE_URL}/en/casos-de-estudio/${caso.slug}`;

    entries.push({
      url: esUrl,
      lastModified: new Date(caso.date),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          'x-default': esUrl,
          'es-CO': esUrl,
          'es-419': esUrl,
          es: esUrl,
          en: enUrl,
          'en-US': enUrl,
        },
      },
    });

    entries.push({
      url: enUrl,
      lastModified: new Date(caso.date),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: {
        languages: {
          'x-default': esUrl,
          'es-CO': esUrl,
          'es-419': esUrl,
          es: esUrl,
          en: enUrl,
          'en-US': enUrl,
        },
      },
    });
  }

  return entries;
}
