# Temptum

Sitio institucional de **Temptum** — consultoría estratégica especializada en *corporate & government affairs* en Colombia.

**Stack:** Next.js 16 (App Router) · TypeScript estricto · Tailwind v3 · MDX (gray-matter + next-mdx-remote) · Resend.

**Estado (sept 2026):** ship-ready. Lighthouse 100/100/100/100 desktop y mobile a11y/BP/SEO en las 9 páginas. WCAG 2.1 AA sin violaciones (axe-core).

---

## Contenido del repo

```
app/              páginas, rutas API, layout, sitemap, robots
  api/            endpoint POST /api/contact (envío con Resend)
  casos-de-estudio/[slug]/   ruta dinámica por MDX
  articulos-linkedin/
  contacto/
  inteligencia-politica/
  layout.tsx      layout raíz: Header, Footer, JSON-LD Organization + WebSite
  mapa-del-sitio/
  page.tsx        home + JSON-LD Person (Silvia Juliana)
  politica-de-privacidad/
  quienes-somos/
  servicios/
  sitemap.ts
  robots.ts

components/       building blocks
  Header.tsx              mobile drawer con focus trap, NavMenu keyboard nav
  Footer.tsx              h2 landmarks (DIRECCIÓN, NAVEGACIÓN, CONTACTO)
  Hero.tsx                home
  PageHero.tsx            hero reutilizable (variants: dark | light)
  Services.tsx            cards de servicios con reveal stagger
  CasesPreview.tsx        preview de 3 casos en home
  IntelligenceCenter.tsx  bloque de acceso a informes
  Equipo.tsx              bloque del equipo en home
  CredibilityStrip.tsx    stats inline
  Manifesto.tsx           sección "No reemplazamos la decisión"
  NavMenu.tsx             dropdown "Más" con W3C ARIA APG menu pattern
  ContactForm.tsx         formulario con Zod, aria-live, spinner
  CopyButton.tsx          copia al clipboard + feedback visual + aria-live
  Reveal.tsx              IntersectionObserver fade+slide-in, respeta reduced-motion
  ArticuloLinkedInCard.tsx
  Button.tsx, Card.tsx    primitivos

hooks/
  useFocusTrap.ts         trapeo de Tab focus + Escape (reutilizable)

content/
  casos/                  casos de estudio en MDX (gray-matter)

lib/
  content.ts              lector de MDX con frontmatter
  dates.ts                formatDate en español
  linkedin.ts             loader de /articulos-linkedin
  constants.ts            WHATSAPP_BASE, WHATSAPP_SERVICIOS, WHATSAPP_QUIENES, etc.
  utils.ts                cn() helper

public/                   imágenes estáticas + logo
deploy/                   systemd unit + Caddyfile snippet

tailwind.config.ts        paleta: navy-950/800/600/100, gold, ice
postcss.config.mjs
```

---

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
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # base para sitemap/robots — se BAKEA en build
```

**`NEXT_PUBLIC_SITE_URL` se bakea en el bundle** — cambiarlo requiere rebuild. Para dev usar `http://localhost:3000`.

---

## Scripts

```bash
pnpm dev        # dev server
pnpm build      # producción
pnpm start      # server producción
pnpm typecheck  # tsc --noEmit
```

---

## Deploy

Configuración activa en `temptum.andresmorales.com.co`.

- **systemd**: `deploy/temptum-ai.service` → puerto `:3008`
- **Caddy**: `deploy/Caddyfile-snippet.txt` (TLS vía ACME + cache + security headers)
- **DNS**: Namecheap, registro A en `andresmorales.com.co`

```bash
# 1. Build con URL correcta (NEXT_PUBLIC_* se bakea)
NEXT_PUBLIC_SITE_URL=https://temptum.andresmorales.com.co pnpm build

# 2. Reiniciar systemd
sudo systemctl restart temptum-ai

# 3. Verificar
curl -sI https://temptum.andresmorales.com.co/
```

> Si despliegas bajo otro host (ej. `temptum.io`), agrega registro A en Namecheap, actualiza el vhost de Caddy y rebuildea con el `NEXT_PUBLIC_SITE_URL` correcto.

---

## Contenido editable

### Casos de estudio (MDX)

`content/casos/*.mdx` con frontmatter:

```mdx
---
title: 'Título del caso'
slug: 'slug-del-caso'
date: '2023-09-11'
author: 'Silvia Juliana Parra Cañas'
resumen: 'Resumen de una o dos frases.'
---

Contenido en MDX...
```

El listado en `/casos-de-estudio` se genera automáticamente a partir de estos archivos.

### Datos hardcoded

- `lib/constants.ts`: URLs de WhatsApp (con mensajes prearmados por sección)
- `lib/content.ts`: casos
- `lib/linkedin.ts`: artículos de LinkedIn

---

## Convenciones del código

### Naming

- **Componentes**: PascalCase, en `components/`
- **Hooks**: `use*`, en `hooks/`
- **Pages**: kebab-case en URL (`/casos-de-estudio/[slug]`), PascalCase en nombre de archivo
- **Utilidades**: camelCase, en `lib/`

### TypeScript

- `strict: true`
- `pnpm typecheck` debe pasar antes de commit
- `forwardRef` cuando se necesita exponer el ref

### Estilos

- Tailwind utilities
- `cn()` helper para merge condicional (`lib/utils.ts`)
- Paleta de colores **solo desde `tailwind.config.ts`**: `navy-{950,800,600,100}`, `gold`, `ice`, `gray-{...}`
- Iconos: `lucide-react`
- Animaciones: `framer-motion` no se usa; ver `Reveal.tsx` y utilities `transition-*` / `animate-*` de Tailwind

### Accesibilidad

- **Skip link** a `#contenido-principal` en layout raíz
- Cada página debe tener exactamente un `<h1>`
- Landmarks `<header>`, `<main>`, `<footer>` siempre presentes
- **Estados de foco visibles** vía `:focus-visible` en `globals.css`
- **Reduced motion**: respetar `prefers-reduced-motion` (ver `globals.css`)
- **Live regions** (`aria-live`) para feedback asincrónico (form, copy button)
- **Keyboard nav completa** en NavMenu (W3C ARIA APG pattern) y mobile drawer (focus trap con Escape)

---

## Auditorías y métricas

### Lighthouse

```bash
# Chrome path es específico del entorno local. Ajustar CHROME_PATH
# a la ruta del binario chrome-for-testing (o chromium del sistema).
CHROME_PATH="$(ls -d /home/*/.cache/ms-playwright/chromium-*/chrome-linux*/chrome 2>/dev/null | head -1)" \
  npx lighthouse https://temptum.andresmorales.com.co/ \
    --preset=desktop \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=json --output=html \
    --output-path=./lh-home \
    --quiet \
    --chrome-flags="--headless=new --no-sandbox --disable-dev-shm-usage"
```

Sustituir `--preset=desktop` por nada para mobile (default Lighthouse = mobile).

### axe-core (WCAG 2.1 AA)

Sin CI todavía. Para correr manualmente, ver `tests/axe-check.mjs` (script suelto, no en suite).

### Resultados actuales (sept 2026)

| Métrica | Resultado |
|---|---|
| Lighthouse desktop, 9 páginas | 100/100/100/100 en todas |
| Lighthouse mobile a11y/BP/SEO | 100/100/100 en todas |
| axe-core WCAG 2.1 AA | 0 violations en 9 páginas |
| LCP desktop | 0.5–0.6 s |
| CLS | 0 en todas |

---

## Decisiones de arquitectura

### Por qué Next.js App Router

- SSG/ISR para todas las páginas de contenido (carga rápida, SEO)
- Server Components por defecto (menos JS al cliente)
- Rutas API para `/api/contact` (envío con Resend)

### Por qué Tailwind v3 (no v4)

- Estabilidad del ecosistema al momento de iniciar el proyecto
- Configuración explícita de `theme.extend.colors` para tokens de marca

### Por qué MDX para casos

- El equipo puede escribir en markdown sin tocar React
- Permite embeber componentes si es necesario (gráficos, callouts)

### Por qué Resend (no SMTP directo)

- DX simple, una variable de entorno
- Free tier generoso
- Tracking de entregas y bounces out-of-the-box

---

## Pendientes para próximos sprints

1. **Testimonios de clientes** (1-2 quotes con permiso, en home o /quienes-somos)
2. **/inteligencia-politica**: agregar resumen ejecutivo PDF público, o cambiar framing a "Próximamente"
3. **Casos largos**: vista de lectura con TOC (el caso "El beso de la muerte" tiene ~3000 palabras en una sola URL)
4. **CTAs header mobile drawer**: versión corta "WhatsApp" cuando hay poco ancho
5. **CI**: GitHub Actions corriendo Lighthouse + axe en cada PR
6. **Tests**: unit tests para componentes interactivos (ContactForm, CopyButton, NavMenu)
7. **Dominio definitivo**: migrar de `temptum.andresmorales.com.co` a `temptum.io` cuando se decida

---

## Historial reciente de cambios

Ver `git log` para detalles. Los sprints recientes cubrieron:

- **Mobile UX audit + fixes** (touch targets, safe-area, hero CTAs full-width)
- **Lighthouse optimization** (a11y 85→100, perf 84→95, contrast fixes, canonical URLs)
- **P1 micro-interactions** (smooth scroll, focus rings, NavMenu bridge, ContactForm feedback)
- **P2 micro-interactions** (NavMenu keyboard nav W3C ARIA APG, active:scale CTAs, card lift)
- **P3 micro-interactions** (mobile drawer focus trap, prefers-reduced-motion guards, reveal-on-scroll stagger)
- **Copy + a11y fixes** (JSON-LD Organization/Person, CopyButton, content consistency, link underlines)
- **100/100/100/100 desktop sweep** en las 9 páginas

---

## Contacto del proyecto

- **CEO**: Silvia Juliana Parra Cañas
- **Web**: https://temptum.andresmorales.com.co
- **LinkedIn**: https://www.linkedin.com/in/silviajulianaparra/
- **Email institucional**: info@temptum.io
- **WhatsApp**: +57 302 238 8618
