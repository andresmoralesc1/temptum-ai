'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/inteligencia-politica', label: 'Inteligencia' },
  { href: '/casos-de-estudio', label: 'Casos' },
  { href: '/articulos-linkedin', label: 'LinkedIn' },
  { href: '/contacto', label: 'Contacto' },
];

const WHATSAPP_HREF =
  'https://wa.me/573022388618?text=' +
  encodeURIComponent('Hola Temptum, me gustaría agendar una conversación.');

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/5 bg-navy-950/80 backdrop-blur-md'
            : 'bg-navy-950',
        )}
      >
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 lg:px-20">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Temptum — Inicio"
          >
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              Temptum
            </span>
            <span
              className="hidden h-3 w-px bg-gold/60 md:block"
              aria-hidden="true"
            />
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-navy-100 md:block">
              Consultoría
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
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:bg-[#1ebd5b] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
              WhatsApp
            </a>
          </div>

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
      </header>

      {/* Spacer para compensar el header fixed */}
      <div aria-hidden="true" className="h-16" />

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
          'fixed inset-x-0 top-16 z-40 origin-top border-b border-white/5 bg-navy-950 transition-transform duration-200 ease-out lg:hidden',
          open ? 'translate-y-0' : '-translate-y-2 opacity-0 pointer-events-none',
        )}
      >
        <ul className="mx-auto flex max-w-content flex-col gap-1 px-5 py-6">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + '/');
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
          <li className="mt-4 border-t border-white/5 pt-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-base font-medium text-white"
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              Escríbenos por WhatsApp
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}