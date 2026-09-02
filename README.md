# Temptum

Sitio institucional de **Temptum** — consultoría estratégica especializada en *corporate & government affairs* en Colombia.

**Stack:** Next.js 16 (App Router) · TypeScript estricto · Tailwind v3 · MDX (gray-matter + next-mdx-remote) · Resend.

**Estado (sept 2026):** ship-ready. Lighthouse 100/100/100/100 desktop y mobile a11y/BP/SEO en las 9 páginas. WCAG 2.1 AA sin violaciones (axe-core).

---

## Contenido del repo

```
.
├── app/                          # Páginas (App Router)
│   ├── api/
│   │   └── contact/              # POST /api/contact (envío con Resend)
│   ├── articulos-linkedin/
│   ├── casos-de-estudio/
│   │   └── [slug]/               # Ruta dinámica por MDX
│   ├── contacto/
│   ├── inteligencia-politica/
│   ├── mapa-del-sitio/
│   ├── politica-de-privacidad/
│   ├── quienes-somos/
│   ├── servicios/
│   ├── layout.tsx                # Layout raíz: Header, Footer, JSON-LD
│   ├── page.tsx                  # Home + JSON-LD Person
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/                   # Building blocks
│   ├── ArticuloLinkedInCard.tsx
│   ├── Button.tsx                # Primario
│   ├── Card.tsx                  # Primario
│   ├── CasesPreview.tsx          # Preview de 3 casos en home
│   ├── ContactForm.tsx           # Zod + aria-live + spinner
│   ├── CopyButton.tsx            # Clipboard + feedback + aria-live
│   ├── CredibilityStrip.tsx      # Stats inline
│   ├── Equipo.tsx                # Bloque del equipo en home
│   ├── Footer.tsx                # h2 landmarks (DIRECCIÓN, NAVEGACIÓN, CONTACTO)
│   ├── Header.tsx                # Mobile drawer focus trap, NavMenu keyboard
│   ├── Hero.tsx                  # Home hero
│   ├── IntelligenceCenter.tsx    # Bloque de acceso a informes
│   ├── Manifesto.tsx             # "No reemplazamos la decisión"
│   ├── NavMenu.tsx               # W3C ARIA APG menu pattern
│   ├── PageHero.tsx              # Hero reutilizable (dark | light)
│   ├── Reveal.tsx                # IntersectionObserver fade+slide
│   └── Services.tsx              # Cards de servicios con reveal stagger
│
├── hooks/
│   └── useFocusTrap.ts           # Trapeo de Tab + Escape (reutilizable)
│
├── content/
│   └── casos/                    # Casos de estudio en MDX
│
├── lib/
│   ├── constants.ts              # WHATSAPP_BASE, WHATSAPP_SERVICIOS, etc.
│   ├── content.ts                # Lector de MDX con gray-matter
│   ├── dates.ts                  # formatDate en español
│   ├── linkedin.ts               # Loader de /articulos-linkedin
│   └── utils.ts                  # cn() helper
│
├── public/                       # Imágenes estáticas + logo
├── deploy/                       # systemd unit + Caddyfile snippet
│
├── tailwind.config.ts            # Paleta: navy-950/800/600/100, gold, ice
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── package.json
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
pnpm dev        # dev server en http://localhost:3000
pnpm build      # build de producción (NEXT_PUBLIC_SITE_URL se bakea)
pnpm start      # server de producción (requiere pnpm build previo)
pnpm typecheck  # tsc --noEmit (sin emisión, solo type-check)
```

> **Pre-commit checklist:** `pnpm typecheck` debe pasar limpio. Si agregas componentes, verificar manualmente con Lighthouse + axe-core (ver [Auditorías](#auditorías-y-métricas)).

---

## Deploy

Configuración activa en `temptum.andresmorales.com.co`.

- **systemd**: `deploy/temptum-ai.service` → puerto `:3008`
- **Caddy**: `deploy/Caddyfile-snippet.txt` (TLS vía ACME + cache + security headers)
- **DNS**: Namecheap, registro A en `andresmorales.com.co`

### Deploy routine (rebuild + restart)

```bash
# 1. Build con URL correcta (NEXT_PUBLIC_* se bakea)
cd /home/telchar/temptum-ai
NEXT_PUBLIC_SITE_URL=https://temptum.andresmorales.com.co pnpm build

# 2. Reiniciar systemd
sudo systemctl restart temptum-ai

# 3. Verificar
sleep 3
curl -sI https://temptum.andresmorales.com.co/ | head -1   # → HTTP/2 200
```

### Setup inicial (solo la primera vez)

```bash
# 1. systemd unit
sudo cp deploy/temptum-ai.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now temptum-ai

# 2. Caddy vhost
sudo tee -a /etc/caddy/Caddyfile < deploy/Caddyfile-snippet.txt
sudo systemctl reload caddy

# 3. DNS
# Agregar registro A para temptum.andresmorales.com.co en Namecheap
# apuntando a la IP del VPS (propagación puede tomar hasta 48h)
```

> Si despliegas bajo otro host (ej. `temptum.io`), repite los 3 pasos con el nuevo hostname y rebuildea con el `NEXT_PUBLIC_SITE_URL` correcto.

### Rollback

```bash
# Revertir al commit anterior
git checkout HEAD~1 -- .
pnpm build && sudo systemctl restart temptum-ai
```

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

### Brand assets

| Token | Hex | Uso |
|---|---|---|
| `navy-950` | `#0A1930` | Fondo principal, texto invertido |
| `navy-800` | `#12294D` | Hover sobre navy-600, borders oscuros |
| `navy-600` | `#1D3A66` | CTAs primarios, números, headlines secundarios |
| `navy-100` | `#E7EDF5` | Solo para texto invertido (nunca sobre fondo claro) |
| `gold`    | `#B08D57` | Acento, hover sobre negro, segunda línea de headlines |
| `ice`     | `#F5F7FA` | Fondo claro de secciones |
| `gray-700` | (Tailwind) | Texto body sobre fondos claros |
| `gray-500` | (Tailwind) | Labels pequeñas, metadatos |

**Tipografía:**
- `font-display` (Archivo): titulares, h1-h4
- `font-sans` (Inter): body, UI

**Logo:** `public/logo-temptum.png` (fondo claro) y `public/logo-temptum-white.png` (sobre navy).
`public/logo-temptum-darkbg.png` para variantes sobre fondos oscuros con acento.

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

## Troubleshooting

**`pnpm build` falla con "Invalid next.config.mjs options"**
Verificar que `formats: ['image/avif', 'image/webp']` y `deviceSizes: [...]` están dentro de `images:`, no a nivel raíz.

**`/contacto` no envía correos**
- `RESEND_API_KEY` configurado en `.env.local`
- `CONTACT_FROM_EMAIL` debe estar verificado en el dashboard de Resend (dominio o single sender)
- `CONTACT_TO_EMAIL` debe ser un buzón válido (en dev puedes poner el tuyo)
- Revisar logs: `journalctl -u temptum-ai -n 50`

**Cambiar `NEXT_PUBLIC_SITE_URL` no se refleja**
Es una variable `NEXT_PUBLIC_*` → se bakea en el bundle al hacer build. Re-buildea después de cambiar.

**Las imágenes no cargan después de agregar a `/public/`**
Verificar que la URL empieza con `/` y que el archivo está en `public/` (no en `app/`). El caché de Next puede tener la imagen anterior: `rm -rf .next/cache/images` y rebuild.

**Lighthouse reporta 0 en mobile**
Si Lighthouse no detecta tráfico, simula red 4G en Chrome DevTools o usa `--throttling-method=simulate` en el comando de Lighthouse.

**Keyboard nav rota en NavMenu**
El componente usa `useId` de React 18+ para `id`s únicos. Si lo refactorizas, mantén el `useId` y los `itemRefs` por índice.

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
