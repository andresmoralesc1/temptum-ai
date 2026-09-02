import { Calendar, ArrowUpRight } from 'lucide-react';
import type { ArticuloLinkedIn } from '@/lib/linkedin';
import { formatDate } from '@/lib/dates';

function LinkedInIcon({ size = 14 }: { size?: number }) {
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

type Props = {
  articulo: ArticuloLinkedIn;
};

export function ArticuloLinkedInCard({ articulo }: Props) {
  return (
    <li className="flex flex-col">
      <a
        href={articulo.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col border-t-2 border-navy-950 bg-white p-8 transition-colors duration-200 hover:border-gold"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
            <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
            <time dateTime={articulo.date}>{formatDate(articulo.date)}</time>
          </div>
          <span
            aria-label="Publicado en LinkedIn"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform duration-200 group-hover:scale-110"
          >
            <LinkedInIcon size={14} />
          </span>
        </div>
        <h2 className="mt-4 font-display text-xl font-bold leading-tight text-navy-950 transition-colors duration-200 group-hover:text-navy-600 lg:text-2xl">
          {articulo.title}
        </h2>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
          {articulo.resumen}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-600">
            {articulo.author}
          </span>
          <span
            aria-hidden="true"
            className="text-navy-600 transition-transform duration-200 group-hover:translate-x-1"
          >
            <ArrowUpRight size={18} strokeWidth={2} />
          </span>
        </div>
      </a>
    </li>
  );
}
