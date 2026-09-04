import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="text-xs uppercase tracking-widest text-navy-600"
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((c, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                {c.href && !isLast ? (
                  <Link href={c.href} className="hover:text-navy-950">
                    {c.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-navy-950' : ''}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {c.label}
                  </span>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
