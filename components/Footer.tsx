import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-navy-100">
      {/* Top brand block */}
      <div className="mx-auto max-w-content px-5 pt-12 lg:px-20 lg:pt-16">
        <div className="flex items-center gap-3 border-b border-navy-800 pb-8 lg:pb-10">
          <Image
            src="/logo-temptum-white.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <div>
            <p className="font-display text-base font-semibold tracking-tight text-white">
              Temptum
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-navy-100">
              Corporate &amp; Government Affairs
            </p>
          </div>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid max-w-content gap-10 px-5 py-10 md:grid-cols-3 md:gap-12 md:py-12 lg:px-20">
        {/* Dirección */}
        <div>
          <h2 className="font-display text-sm uppercase tracking-widest text-white">
            Dirección
          </h2>
          <div className="mt-4 space-y-2 text-sm leading-relaxed">
            <p className="flex items-start gap-2">
              <MapPin
                size={16}
                strokeWidth={1.5}
                className="mt-0.5 flex-shrink-0 text-gold"
                aria-hidden="true"
              />
              <span>
                Bogotá, D.C.
                <br />
                Colombia
              </span>
            </p>
            <p className="text-navy-100/80">
              Cobertura nacional y región andina.
            </p>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h2 className="font-display text-sm uppercase tracking-widest text-white">
            Navegación
          </h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <Link
                href="/servicios"
                // min-h-11 (44px) cumple WCAG 2.5.5 en touch.
                className="-mx-2 inline-flex min-h-11 items-center rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                href="/casos-de-estudio"
                className="-mx-2 inline-flex min-h-11 items-center rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                Casos
              </Link>
            </li>
            <li>
              <Link
                href="/quienes-somos"
                className="-mx-2 inline-flex min-h-11 items-center rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                Quiénes somos
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="-mx-2 inline-flex min-h-11 items-center rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href="/inteligencia-politica"
                className="-mx-2 inline-flex min-h-11 items-center rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                Inteligencia política
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h2 className="font-display text-sm uppercase tracking-widest text-white">
            Contacto
          </h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a
                href="mailto:info@temptum.io"
                className="-mx-2 inline-flex min-h-11 items-center gap-2 rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                <Mail
                  size={16}
                  strokeWidth={1.5}
                  className="flex-shrink-0 text-gold"
                  aria-hidden="true"
                />
                info@temptum.io
              </a>
            </li>
            <li>
              <a
                href="tel:+573022388618"
                className="-mx-2 inline-flex min-h-11 items-center gap-2 rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                <Phone
                  size={16}
                  strokeWidth={1.5}
                  className="flex-shrink-0 text-gold"
                  aria-hidden="true"
                />
                +57 302 238 8618
              </a>
            </li>
            <li>
              <Link
                href="/politica-de-privacidad"
                className="-mx-2 inline-flex min-h-11 items-center rounded px-2 py-2.5 hover:text-white transition-colors"
              >
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <p className="mx-auto max-w-content px-5 py-5 text-xs text-navy-100 lg:px-20">
          © {year} Temptum. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
