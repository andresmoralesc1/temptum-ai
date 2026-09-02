'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const menuId = useId();

  const isActive = items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/'),
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Click-outside + Escape: cierra el menú.
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
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Navegación por teclado según W3C ARIA Authoring Practices
  // (https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).
  function focusItem(index: number) {
    const clamped = (index + items.length) % items.length;
    const el = itemRefs.current[clamped];
    el?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
      // Tras la apertura, el efecto siguiente enfoca el primer item.
      queueMicrotask(() => focusItem(0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      queueMicrotask(() => focusItem(items.length - 1));
    }
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = itemRefs.current.findIndex(
      (el) => el === document.activeElement,
    );
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusItem(currentIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusItem(currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        focusItem(items.length - 1);
        break;
      case 'Tab':
        // Cierra el menú al tabular fuera; el foco sigue su curso normal.
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? menuId : undefined}
        className={cn(
          'inline-flex h-16 items-center gap-1 px-4 text-sm font-medium transition-colors duration-150',
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

      {/*
        Panel del menú.
        - El contenedor relativo envuelve botón + panel para que el área de
          detección de hover (mousedown outside) sea continua. Sin gap visible.
        - Caret: cuadrado 8x8 rotado 45° con bordes y fondo del panel.
        - animate-in fade-in + slide-in-from-top-2 (Tailwind v4 data-attribute).
        - aria-hidden en el caret decorativo.
        - role="menu" con aria-labelledby apuntando al trigger.
        - onKeyDown en el contenedor maneja ↑↓ Home End Tab.
      */}
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full z-50 min-w-[260px] origin-top-right rounded-md border border-white/10 bg-navy-950/95 pt-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <span
            aria-hidden="true"
            className="absolute -top-1 right-6 h-2 w-2 rotate-45 border-l border-t border-white/10 bg-navy-950/95"
          />
          <ul className="rounded-md py-1">
            {items.map((item, i) => {
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
                    ref={(el: HTMLElement | null) => {
                      itemRefs.current[i] = el;
                    }}
                    href={item.href}
                    role="menuitem"
                    tabIndex={-1}
                    onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        // El link se activa con Enter por defecto; dejamos que
                        // el navegador lo maneje. Space se ignora para no
                        // desplazar la página al hacer scroll.
                        if (e.key === ' ') e.preventDefault();
                      }
                    }}
                    {...externalProps}
                    className={cn(
                      'block rounded-sm px-5 py-3 outline-none transition-colors duration-150',
                      'focus:bg-white/10 focus:text-white',
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
