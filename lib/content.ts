import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type CasoFrontmatter = {
  title: string;
  slug: string;
  date: string;
  author: string;
  resumen: string;
};

export type Caso = CasoFrontmatter & {
  body: string;
};

export type SupportedLocale = 'es' | 'en';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'casos');

// The Spanish .mdx is the canonical one (no locale suffix). English variants
// are stored as `{slug}.en.mdx` and read only when the active locale is 'en'.
// getAllCasoSlugs reads only the base files so the slug list is identical
// across locales.
function readCasoFile(filename: string): Caso {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as CasoFrontmatter), body: content };
}

function baseFileForSlug(slug: string): string {
  return `${slug}.mdx`;
}

function localizedFileForSlug(slug: string, locale: SupportedLocale): string {
  return locale === 'en' ? `${slug}.en.mdx` : `${slug}.mdx`;
}

export function getAllCasos(): Caso[] {
  // Only the base (Spanish) files. Slugs are the same across locales.
  const files = fs.readdirSync(CONTENT_DIR).filter(
    (f) => f.endsWith('.mdx') && !f.endsWith('.en.mdx'),
  );
  const casos = files.map((file) => readCasoFile(file));
  return casos.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCasoBySlug(
  slug: string,
  locale: SupportedLocale = 'es',
): Caso | undefined {
  const localizedPath = path.join(CONTENT_DIR, localizedFileForSlug(slug, locale));
  if (fs.existsSync(localizedPath)) {
    return readCasoFile(localizedFileForSlug(slug, locale));
  }
  // English file missing → fall back to the Spanish base file.
  const basePath = path.join(CONTENT_DIR, baseFileForSlug(slug));
  if (fs.existsSync(basePath)) {
    return readCasoFile(baseFileForSlug(slug));
  }
  return undefined;
}

export function getAllCasoSlugs(): string[] {
  return getAllCasos().map((c) => c.slug);
}
