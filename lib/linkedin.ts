import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type ArticuloLinkedInFrontmatter = {
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD
  author: string;
  resumen: string;
  linkedinUrl: string;
};

export type ArticuloLinkedIn = ArticuloLinkedInFrontmatter & {
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'linkedin');

function readArticuloFile(filename: string): ArticuloLinkedIn {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { ...(data as ArticuloLinkedInFrontmatter), body: content };
}

export function getAllArticulosLinkedIn(): ArticuloLinkedIn[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const articulos = files.map((file) => readArticuloFile(file));
  return articulos.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticuloLinkedInBySlug(
  slug: string,
): ArticuloLinkedIn | undefined {
  if (!fs.existsSync(CONTENT_DIR)) return undefined;
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const match = files.find((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const { data } = matter(fs.readFileSync(filePath, 'utf8'));
    return (data as ArticuloLinkedInFrontmatter).slug === slug;
  });
  return match ? readArticuloFile(match) : undefined;
}

export function getAllArticuloLinkedInSlugs(): string[] {
  return getAllArticulosLinkedIn().map((a) => a.slug);
}
