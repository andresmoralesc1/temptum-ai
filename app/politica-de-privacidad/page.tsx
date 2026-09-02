import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad y tratamiento de datos personales de Temptum.',
  alternates: {
    canonical: '/politica-de-privacidad',
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <PageHero
        variant="light"
        kicker="Legal"
        headline="Política de Privacidad"
      />

      <section className="bg-ice pb-24 pt-12 lg:pb-32 lg:pt-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-0">
          <div className="space-y-8 text-base leading-relaxed text-gray-700">
            <section>
              <h2 className="font-display text-xl font-semibold text-navy-950">
                1. Responsable del tratamiento
              </h2>
              <p className="mt-3">
                Temptum, con sede en Bogotá D.C., Colombia, es responsable del
                tratamiento de los datos personales recolectados a través de
                este sitio web.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy-950">
                2. Datos recolectados
              </h2>
              <p className="mt-3">
                Recolectamos únicamente los datos que usted nos proporciona
                voluntariamente mediante el formulario de contacto: nombre,
                organización, correo electrónico y mensaje. No realizamos
                transferencias internacionales de sus datos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy-950">
                3. Finalidad
              </h2>
              <p className="mt-3">
                Los datos recolectados se utilizan exclusivamente para responder
                a su solicitud de contacto y, en caso de ser aceptado por
                usted, enviarle información sobre nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy-950">
                4. Derechos del titular
              </h2>
              <p className="mt-3">
                Usted tiene derecho a conocer, actualizar, rectificar y
                suprimir sus datos personales, así como a revocar la
                autorización otorgada. Para ejercer estos derechos, escríbanos
                a{' '}
                <a
                  href="mailto:info@temptum.io"
                  className="text-navy-600 underline underline-offset-4 hover:text-navy-950"
                >
                  info@temptum.io
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-navy-950">
                5. Conservación
              </h2>
              <p className="mt-3">
                Los datos personales serán conservados mientras se mantenga la
                relación comercial o hasta que el titular solicite su
                supresión.
              </p>
            </section>

            <p className="text-sm text-gray-500">Última actualización: 2026.</p>
          </div>
        </div>
      </section>
    </>
  );
}