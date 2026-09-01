'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NavSecondaryItem = {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};

type Props = {
  label: string;
  items: NavSecondaryItem[];
};

export function NavMenu({ label, items }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/'),
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'group inline-flex h-16 items-center gap-1 px-4 text-sm font-medium transition-colors duration-150',
          'focus:outline-none focus-visible:text-white',
          isActive || open ? 'text-white' : 'text-navy-100 hover:text-white',
        )}
      >
        {label}
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={cn(
            'transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-2 min-w-[260px] origin-top-right border border-white/10 bg-navy-950/95 backdrop-blur-md shadow-2xl"
        >
          <ul className="py-2">
            {items.map((item) => {
              const active = pathname === item.href;
              const Tag = item.external ? 'a' : Link;
              const externalProps = item.external
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {};
              return (
                <li key={item.href}>
                  <Tag
                    href={item.href}
                    role="menuitem"
                    {...externalProps}
                    className={cn(
                      'group block px-5 py-3 transition-colors duration-150',
                      'hover:bg-white/5',
                      active ? 'text-white' : 'text-navy-100 hover:text-white',
                    )}
                  >
                    <span className="block text-sm font-medium">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-1 block text-xs leading-relaxed text-navy-100/80">
                        {item.description}
                      </span>
                    )}
                  </Tag>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}