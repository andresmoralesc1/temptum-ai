import Image from 'next/image';
import { Button } from '@/components/Button';

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Edificio institucional en Bogotá"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-950/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex h-full max-w-content flex-col justify-center px-5 lg:px-20">
        <p className="text-xs font-medium uppercase tracking-widest text-navy-100">
          Consultoría Estratégica · Bogotá, Colombia
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[56px]">
          Consultoría Estratégica en Asuntos Corporativos y Gubernamentales
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
          Nexo de influencia, rigor técnico y mitigación de riesgos para el sector
          privado y las instituciones en Colombia.
        </p>
        <div className="mt-10">
          <Button href="/servicios">Descubra Nuestra Metodología</Button>
        </div>
      </div>
    </section>
  );
}