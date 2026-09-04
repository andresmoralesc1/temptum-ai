import type { MetadataRoute } from 'next';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getAllCasos } from '@/lib/content';
import { SITE_URL } from '@/lib/site';

type Route = {
  path: string;
  sourceFile: string;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

const STATIC_ROUTES: Route[] = [
  { path: '', sourceFile: 'app/page.tsx', changeFrequency: 'weekly', priority: 1 },
  { path: '/quienes-somos', sourceFile: 'app/quienes-somos/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/servicios', sourceFile: 'app/servicios/page.tsx', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/inteligencia-politica', sourceFile: 'app/inteligencia-politica/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/casos-de-estudio', sourceFile: 'app/casos-de-estudio/page.tsx', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contacto', sourceFile: 'app/contacto/page.tsx', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/politica-de-privacidad', sourceFile: 'app/politica-de-privacidad/page.tsx', changeFrequency: 'yearly', priority: 0.3 },
];

async function getMtime(relativePath: string): Promise<Date> {
  try {
    const stat = await fs.stat(path.join(process.cwd(), relativePath));
    return stat.mtime;
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = await Promise.all(
    STATIC_ROUTES.map(async (route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: await getMtime(route.sourceFile),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );

  const casoEntries = getAllCasos().map((caso) => ({
    url: `${SITE_URL}/casos-de-estudio/${caso.slug}`,
    lastModified: new Date(caso.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...casoEntries];
}
