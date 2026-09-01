import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto max-w-content px-5 pt-16 lg:px-20">
        <div className="flex items-center gap-3 border-b border-navy-800 pb-10">
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
      <div className="mx-auto grid max-w-content gap-12 px-5 py-12 md:grid-cols-3 lg:px-20">
        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-white">
            Dirección
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            Bogotá, D.C.
            <br />
            Colombia
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-white">
            Contacto
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            <a
              href="mailto:info@temptum.io"
              className="hover:text-white transition-colors"
            >
              info@temptum.io
            </a>
            <br />
            <a
              href="tel:+573022388618"
              className="hover:text-white transition-colors"
            >
              +57 302 238 8618
            </a>
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-white">
            Legal
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/mapa-del-sitio" className="hover:text-white transition-colors">
                Mapa del Sitio
              </Link>
            </li>
            <li>
              <Link
                href="/politica-de-privacidad"
                className="hover:text-white transition-colors"
              >
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-800">
        <p className="mx-auto max-w-content px-5 py-6 text-xs text-gray-500 lg:px-20">
          © {year} Temptum. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}