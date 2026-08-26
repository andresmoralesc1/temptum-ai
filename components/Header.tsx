'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/quienes-somos', label: 'Quiénes Somos' },
  { href: '/servicios', label: 'Servicios Especializados' },
  { href: '/inteligencia-politica', label: 'Inteligencia y Política Pública' },
  { href: '/casos-de-estudio', label: 'Casos de Estudio' },
  { href: '/contacto', label: 'Contacto' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-950">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 lg:px-20">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-widest text-white"
          aria-label="Temptum — Inicio"
        >
          TEMPTUM
        </Link>

        <nav className="hidden lg:block" aria-label="Navegación principal">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-[13px] font-medium uppercase tracking-widest transition-colors duration-150',
                      active ? 'text-white' : 'text-navy-100 hover:text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-white lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navegación móvil"
          className="border-t border-navy-800 bg-navy-950 lg:hidden"
        >
          <ul className="flex flex-col px-5 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[13px] font-medium uppercase tracking-widest text-navy-100 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}