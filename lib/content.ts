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

const CONTENT_DIR = path.join(process.cwd(), 'content', 'casos');

function readCasoFile(filename: string): Caso {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as CasoFrontmatter), body: content };
}

export function getAllCasos(): Caso[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  const casos = files.map((file) => readCasoFile(file));
  return casos.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCasoBySlug(slug: string): Caso | undefined {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  const match = files.find((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const { data } = matter(fs.readFileSync(filePath, 'utf8'));
    return (data as CasoFrontmatter).slug === slug;
  });
  return match ? readCasoFile(match) : undefined;
}

export function getAllCasoSlugs(): string[] {
  return getAllCasos().map((c) => c.slug);
}
