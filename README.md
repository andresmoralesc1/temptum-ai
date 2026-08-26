# Temptum

Sitio institucional de Temptum — consultoría estratégica en asuntos corporativos y gubernamentales.

Next.js 16 (App Router) + TypeScript estricto + Tailwind v3 + Resend.

## Desarrollo local

```bash
pnpm install
cp .env.local.example .env.local   # completar RESEND_API_KEY y correos
pnpm dev                           # http://localhost:3000
```

Variables de entorno (`.env.local`):

```
RESEND_API_KEY=                    # reenvía los mensajes de /contacto
CONTACT_TO_EMAIL=info@temptum.io   # destinatario
CONTACT_FROM_EMAIL=no-reply@temptum.io   # remitente (debe estar verificado en Resend)
NEXT_PUBLIC_SITE_URL=https://temptum.io  # base para sitemap/robots
```

## Build de producción

```bash
pnpm build
pnpm start
```

## Contenido

Los casos de estudio viven en `content/casos/*.mdx` con frontmatter (`title`, `slug`, `date`, `author`, `resumen`). El listado en `/casos-de-estudio` se genera a partir de estos archivos.

## Deploy

Vercel detecta Next.js sin configuración. Conectar el repo desde el panel de Vercel, agregar las variables de entorno en Project Settings, y desplegar. No requiere cambios adicionales al código.

## Estructura

```
app/         páginas y rutas API
components/  Header, Footer, Hero, Services, IntelligenceCenter, ContactForm, Button, Card
content/     casos de estudio en MDX
lib/         content.ts (lector de MDX con gray-matter)
public/      imágenes estáticas
```
