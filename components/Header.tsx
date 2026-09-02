'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WHATSAPP_BASE } from '@/lib/constants';
import { NavMenu, type NavSecondaryItem } from '@/components/NavMenu';

// Primary nav: 5 items principales en la barra horizontal.
// Orden pensado por relevancia para un visitante B2B:
//  1. Servicios (qué ofrecen)
//  2. Casos   (prueba de trabajo)
//  3. Quiénes somos (credibilidad)
//  4. Inteligencia (contenido)
//  5. Menú "Más" (dropdown con el resto)
const navItems: { href: string; label: string }[] = [
  { href: '/servicios', label: 'Servicios' },
  { href: '/casos-de-estudio', label: 'Casos' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/inteligencia-politica', label: 'Inteligencia' },
];

const secondaryItems: NavSecondaryItem[] = [
  {
    href: '/articulos-linkedin',
    label: 'Artículos en LinkedIn',
    description: 'Análisis publicados en LinkedIn.',
  },
  {
    href: '/contacto',
    label: 'Contacto',
    description: 'Canales y formulario institucional.',
  },
  {
    href: '/mapa-del-sitio',
    label: 'Mapa del sitio',
    description: 'Vista completa del sitio.',
  },
  {
    href: '/politica-de-privacidad',
    label: 'Política de privacidad',
  },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
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
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/5 bg-navy-950/80 backdrop-blur-md'
            : 'bg-navy-950',
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
                      className={cn(
                        'group relative inline-flex h-16 items-center px-4 text-sm font-medium transition-colors duration-150',
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
                          'pointer-events-none absolute inset-x-4 bottom-3 h-px origin-center scale-x-0 bg-gold transition-transform duration-200 ease-out',
                          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
                          active && 'scale-x-100',
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
              <li className="ml-1">
                <NavMenu label="Más" items={secondaryItems} />
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 bg-gold px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-sm transition-all duration-150 hover:bg-gold/90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 lg:inline-flex"
              aria-label="Conversemos por WhatsApp"
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
              className="rounded p-1 text-white lg:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="mobile-menu"
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

      {/* Spacer para compensar el header fixed */}
      <div aria-hidden="true" style={{ minHeight: 'calc(4rem + env(safe-area-inset-top))' }} />

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
        id="mobile-menu"
        aria-label="Navegación móvil"
        className={cn(
          'fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] origin-top overflow-y-auto border-b border-white/5 bg-navy-950 transition-transform duration-200 ease-out lg:hidden',
          open ? 'translate-y-0' : '-translate-y-2 opacity-0 pointer-events-none',
        )}
      >
        <div className="mx-auto max-w-content px-5 py-6">
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

          {/* Más — acordeón */}
          <div className="mt-2 border-t border-white/5 pt-2">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-controls="mobile-more"
              className="flex w-full items-center justify-between rounded px-3 py-3 text-base font-medium text-navy-100 hover:bg-white/5 hover:text-white"
            >
              Más
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={cn(
                  'transition-transform duration-200',
                  moreOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            {moreOpen && (
              <ul id="mobile-more" className="flex flex-col gap-1 pb-2">
                {secondaryItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex flex-col rounded px-3 py-2.5 text-sm transition-colors',
                          active
                            ? 'bg-white/5 text-white'
                            : 'text-navy-100 hover:bg-white/5 hover:text-white',
                        )}
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.description && (
                          <span className="mt-0.5 text-xs leading-relaxed text-navy-100/70">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* CTA WhatsApp */}
          <div className="mt-4 border-t border-white/5 pt-4">
            <a
              href={WHATSAPP_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gold px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-950 transition-all duration-150 hover:bg-gold/90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              aria-label="Conversemos por WhatsApp"
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