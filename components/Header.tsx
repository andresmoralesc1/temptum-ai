'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WHATSAPP_BASE } from '@/lib/constants';
import { useFocusTrap } from '@/hooks/useFocusTrap';

// Primary nav: 4 items principales en la barra horizontal.
// Orden pensado por relevancia para un visitante B2B:
//  1. Servicios    (qué ofrecen)
//  2. Casos        (prueba de trabajo)
//  3. Quiénes somos (credibilidad)
//  4. Contacto     (conversión)
// Inteligencia política y política de privacidad viven en el footer.
const navItems: { href: string; label: string }[] = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/casos-de-estudio', label: 'Casos' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);

  // Focus trap inside the mobile drawer while it is open.
  useFocusTrap(mobileNavRef, open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          // border-b siempre presente: evita CLS al hidratar y detectar scroll.
          // La diferencia visual entre scrolled/no-scrolled viene del backdrop-blur y bg opacity.
          'fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-navy-950 transition-[backdrop-filter,background-color] duration-300',
          scrolled && 'bg-navy-950/80 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex min-h-16 max-w-content items-center justify-between px-5 pt-[env(safe-area-inset-top)] lg:px-20">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Temptum — Inicio"
          >
            <Image
              src="/logo-temptum-white.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-9 w-9"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              Temptum
            </span>
          </Link>

          <nav className="hidden lg:block" aria-label="Navegación principal">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/');
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        // h-12 (48px) da aire vertical; px-4 mantiene el ancho
                        // cómodo sin saturar el header.
                        'group relative inline-flex h-12 items-center rounded-sm px-4 text-sm font-medium transition-colors duration-150',
                        'focus:outline-none focus-visible:text-white',
                        active
                          ? 'text-white'
                          : 'text-navy-100 hover:text-white',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          // Indicador dorado centrado verticalmente respecto al texto.
                          'pointer-events-none absolute inset-x-4 bottom-2 h-px origin-center scale-x-0 bg-gold transition-transform duration-200 ease-out',
                          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
                          active && 'scale-x-100',
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              // min-h-11 = 44px (WCAG target size). py-2.5 (10px) + 14px text = ~34px
              className="hidden items-center gap-2 bg-gold px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-sm transition-all duration-150 hover:bg-gold/90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 lg:inline-flex min-h-11"
              aria-label="Hablemos por WhatsApp"
            >
              <MessageCircle
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />
              Hablemos
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              // min-h-11 min-w-11 = 44x44px (WCAG 2.5.5 target size)
              className="flex min-h-11 min-w-11 items-center justify-center rounded p-1 text-white lg:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
            >
              {open ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer para compensar el header fixed. Incluye 1px del border-b siempre presente. */}
      <div aria-hidden="true" style={{ minHeight: 'calc(4rem + 1px + env(safe-area-inset-top))' }} />

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <nav
        ref={mobileNavRef}
        id="mobile-menu"
        aria-label="Navegación móvil"
        className={cn(
          // h-[calc(100vh-...)] fuerza altura exacta para que mt-auto funcione
          // y el CTA quede pegado al fondo del drawer, no al medio.
          'fixed inset-x-0 top-[calc(4rem+1px+env(safe-area-inset-top))] z-40 flex h-[calc(100vh-4rem-1px-env(safe-area-inset-top))] max-h-[calc(100vh-4rem-1px)] origin-top flex-col overflow-y-auto border-b border-white/5 bg-navy-950 transition-transform duration-200 ease-out lg:hidden',
          open ? 'translate-y-0' : 'pointer-events-none -translate-y-2 opacity-0',
        )}
      >
        <div className="mx-auto flex w-full max-w-content flex-1 flex-col px-5 py-6">
          {/* Primary items */}
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded px-3 py-3 text-base font-medium transition-colors',
                      active
                        ? 'bg-white/5 text-white'
                        : 'text-navy-100 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-1.5 w-1.5 rounded-full bg-gold transition-opacity',
                        active ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA WhatsApp — empujado al final del drawer con mt-auto */}
          <div className="mt-auto border-t border-white/5 pt-6">
            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gold px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-950 transition-all duration-150 hover:bg-gold/90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              aria-label="Hablemos por WhatsApp"
            >
              <MessageCircle
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />
              Hablemos por WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}