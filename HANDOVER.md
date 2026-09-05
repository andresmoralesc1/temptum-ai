# Temptum — Handover técnico

Documento de cierre del proyecto de sitio institucional de **Temptum** (temptum.ai / temptum.io): migración de WordPress a Next.js 16, trabajo de SEO, traducción bilingüe ES/EN, y deploy a Vercel.

**Fechas:** agosto–septiembre 2026.
**Stack final:** Next.js 16 (App Router) · TypeScript estricto · Tailwind · `next-intl@4.14.2` · MDX (gray-matter) · lucide-react · Vercel.
**Repositorio:** https://github.com/andresmoralesc1/temptum-ai
**Producción actual:** https://temptum.io (Vercel).

---

## 1. Punto de partida (agosto 2026)

Antes de empezar, **temptum.io** existía como un sitio WordPress alojado en un hosting compartido de `trouble-free.net` (LiteSpeed). Problemas estructurales que motivaron la migración:

- Sin control fino de SEO técnico (canonical, hreflang, structured data).
- Sin internacionalización limpia: el sitio era monolingüe español; el público angloparlante de la consultoría navegaba con Google Translate.
- Velocidad y Core Web Vitals en territorio mediocre: TTFB alto por hosting compartido, CSS no minificado, fuentes externas bloqueando render.
- Sin pipeline de deploy reproducible: cambios por FTP al hosting.
- Sin cobertura de accesibilidad (WCAG AA) verificada.
- Sin trazabilidad de contenido: cambios al copy sin historial.

---

## 2. Arquitectura final

```
app/
  [locale]/                        # Segmento dinámico: 'es' o 'en'
    page.tsx                       # Home
    casos-de-estudio/
      [slug]/page.tsx              # Detalle de caso (MDX)
      page.tsx                     # Lista de casos
    contacto/page.tsx
    inteligencia-politica/page.tsx
    politica-de-privacidad/page.tsx
    quienes-somos/page.tsx
    servicios/page.tsx
    layout.tsx                     # Layout con <html lang>, header, footer
  layout.tsx                       # Root HTML
  sitemap.ts                       # 22 URLs con hreflang 5 alternates
  robots.ts                        # Permite todo, apunta a sitemap
  apple-icon.tsx, icon.tsx         # Favicons dinámicos
  opengraph-image.tsx              # OG image 1200x630
  manifest.ts                      # PWA manifest
  api/contact/                     # POST endpoint (Resend)

components/                        # 12 componentes de UI
content/casos/
  *.mdx                            # 4 casos en español
  *.en.mdx                         # 4 casos en inglés (traducción editorial)

i18n/
  routing.ts                       # Locales + pathnames
  request.ts                       # next-intl server config

messages/
  es.json                          # 359+ keys, ES-CO
  en.json                          # 359+ keys, en-US

middleware.ts                      # next-intl middleware
vercel.json                        # Build + headers de seguridad
```

**22 URLs estáticas totales** = 11 rutas × 2 locales (7 estáticas + 4 casos dinámicos).

---

## 3. Migración de WordPress a Next.js

### 3.1 Contenido migrado

| Origen (WordPress) | Destino (Next.js) |
|---|---|
| Home | `app/[locale]/page.tsx` |
| 6 páginas internas | `app/[locale]/{quienes-somos,servicios,inteligencia-politica,contacto,politica-de-privacidad}/page.tsx` |
| 4 casos de estudio | `app/[locale]/casos-de-estudio/[slug]/page.tsx` + MDX en `content/casos/` |
| Lista de casos | `app/[locale]/casos-de-estudio/page.tsx` |
| Artículos LinkedIn | `app/[locale]/articulos-linkedin/page.tsx` (auto-publish vía n8n) |
| Formulario de contacto | `app/[locale]/contacto/page.tsx` + `app/api/contact/` (Resend) |

### 3.2 Decisiones técnicas

- **Next.js 16 con App Router.** Rutas estáticas con `generateStaticParams` para los casos. SSG puro en build, sin funciones serverless en runtime excepto `/api/contact`.
- **MDX sobre CMS.** Los casos viven como `.mdx` en `content/casos/` con frontmatter. `lib/content.ts` los lee en build con `gray-matter`. Esto da control total del contenido, sin acoplamiento a un CMS externo, y versiona los textos en Git.
- **TypeScript estricto.** Sin `any` en código de producto. `lib/types.ts` define `Caso`, `CasoFrontmatter`, etc.
- **Tailwind con tokens propios.** Colores en `tailwind.config.ts`: `navy-950 #0A1930`, `navy-800 #12294D`, `navy-600 #1d3a66`, `navy-100 #E7EDF5`, `gold #B08D57`, `ice #f5f7fa`. Tipografías: `font-display Archivo` y `font-sans Inter` (self-hosted con `next/font`).
- **Imágenes locales.** Las fotos del equipo, casos y secciones se sirven desde `public/`. Sin CDN externo, sin dependencia de Pexels. `next.config.mjs` conserva `remotePatterns` para Pexels por si se añaden imágenes externas a futuro.

### 3.3 Pipeline de deploy

**VPS (legado, ahora apagado):** systemd `temptum-ai` corriendo Next.js detrás de Caddy en :3008, accesible en `temptum.andresmorales.com.co`.

**Vercel (actual, fuente de verdad):**
- Repo conectado vía GitHub App de Vercel.
- Push a `main` triggerea deploy automático.
- `vercel.json` define `buildCommand: pnpm build`, `installCommand: pnpm install --frozen-lockfile`, y 4 headers de seguridad globales.
- DNS: `temptum.io` delega a `ns1.vercel-dns.com` / `ns2.vercel-dns.com` (cambiado en GoDaddy el 2026-09-04).
- TLS emitido por Vercel (Let's Encrypt vía ACME) automáticamente al añadir el dominio.

---

## 4. Sprints de copy (4 sprints, agosto 2026)

Cuatro sprints de copy antes de tocar SEO técnico. Cada sprint fue un commit atómico, pusheado y desplegado.

### Sprint 1 — `6630b0f` — audiencia explícita + CTAs canónicos
- Reemplazo de claims vagos ("somos expertos en…") por audiencia nombrada: "empresas reguladas, equipos legales y de cumplimiento en Colombia".
- CTAs normalizados a tres verbos canónicos: **Conversemos** (WhatsApp), **Conozca** (cases preview), **Solicite una conversación** (contacto).
- Cada claim con prueba: cifras concretas (años, número de casos), sectores nombrados, sin adjetivos sin sustentar.

### Sprint 2 — `cc4982f` — honest framing
- Quitar superlativos ("el mejor", "líderes en") que invitaban a Google a no tomarlos en serio.
- Reconocer el tamaño real de la firma (consultoría boutique, no Big Four).
- Meta descriptions reescritas: una por ruta, <160 chars, mencionando la acción del usuario.

### Sprint 3 — `d1bb615` — metodología
- Sección `Methodology` con tres pasos concretos (mapeo de stakeholders, simulación regulatoria, acompañamiento ante el ente) en vez de buzzwords de "framework".
- Sección de modelos de trabajo (`Services`): retainer, proyecto,_second_opinion, con precios de referencia y formato de entrega.

### Sprint 4 — `ffedaf0` — per-page metadata + structured data + canonicalization
- `generateMetadata` en cada `page.tsx` con title, description, OG image, alternates.
- JSON-LD bilingüe: `Organization`, `Person` (Silvia Parra), `WebSite` con `SearchAction`, `BreadcrumbList` por ruta.
- `alternates.languages` con hreflang para `es-CO`, `es-419`, `en-US`, `x-default`.

---

## 5. SEO técnico

### 5.1 Sitemap (`app/sitemap.ts`)

Genera 22 URLs (11 rutas × 2 locales). Cada entrada incluye:
- `url` y `lastModified` (mtime real del `page.tsx` o del MDX).
- `changeFrequency`: weekly para home y casos; monthly para páginas de servicio; yearly para legal.
- `priority`: 1.0 para home, 0.8 para páginas principales, 0.7 para contacto e inteligencia-politica, 0.3 para privacidad.
- `alternates.languages` con 5 códigos: `es-CO` (canónico español), `es-419` (LatAm), `en-US`, `x-default`.

### 5.2 Robots (`app/robots.ts`)

```
User-agent: *
Allow: /
Sitemap: https://temptum.io/sitemap.xml
```

### 5.3 Canonical y hreflang

- **Default locale: `es` (sin prefijo).** `/` sirve la versión española. `/en/` sirve la inglesa. Decisión consciente para preservar los backlinks existentes de `/` y consolidar signals de SEO en el dominio raíz para consultas en español.
- `<link rel="canonical">` apunta siempre a la versión del locale actual.
- `<link rel="alternate" hreflang="...">` con 6 variantes por página (`x-default`, `es-CO`, `es-419`, `es`, `en`, `en-US`).
- **x-default** apunta a `/` (no `/en/`), para que Google sirva español a usuarios sin preferencia clara.
- **Importante:** El dominio canónico se construye desde `process.env.NEXT_PUBLIC_SITE_URL`, con fallback `https://www.temptum.io` en `lib/site.ts`. Si esa variable no está configurada en el entorno de deploy (Vercel → Settings → Environment Variables → Production), el build usa el fallback. Verificar tras cada cambio de dominio o de proveedor.

### 5.4 Open Graph y Twitter Cards

- `app/opengraph-image.tsx` genera dinámicamente una imagen 1200×630 con el logo de Temptum sobre el navy-950 institucional.
- OG metadata por página: `title`, `description`, `images`, `locale` (es_CO / en_US), `type: website`.
- Twitter card: `summary_large_image` apuntando a la misma OG image.

### 5.5 Structured data (JSON-LD)

Por ruta:
- **Todas:** `Organization` con logo, address, contactPoint, sameAs.
- **Home:** `WebSite` con `potentialAction: SearchAction` (no usado por Google actualmente, pero no estorba).
- **Quiénes somos:** `Person` para Silvia Parra con `jobTitle`, `worksFor`, `knowsAbout`.
- **Casos:** `Article` con `headline`, `datePublished`, `author`, `publisher`.

Validado con [Schema Markup Validator](https://validator.schema.org/) sin errores.

### 5.6 Performance y Core Web Vitals

- **CLS = 0.** `next/font` con `display: 'swap'` + `fallback` ajustado a las métricas de Archivo/Inter para evitar layout shift (`1016188`).
- **LCP < 1.5s** en mobile (Vercel edge). Imágenes del hero y casos servidas como AVIF/WebP por el loader de Next.
- **Lighthouse 100/100/100/100** en desktop y **95-100** en mobile en las 9 páginas principales (medición pre-deploy a Vercel, host local).
- Headers de seguridad: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

---

## 6. Accesibilidad (WCAG 2.1 AA)

Resultado: **0 violaciones** en `axe-core` sobre las 9 páginas. Sprints dedicados:

- **`929f4fa`** — `100/100/100/100` en Lighthouse desktop accessibility sobre las 9 páginas.
- **`df5f89d`, `7f0e33e`** — header WCAG 2.5.5 (target size 44×44px), `aria-current="page"` en el link activo, `aria-haspopup="dialog"` en el toggle del menú móvil.
- **`78e5229`** — focus trap en el drawer móvil con `useFocusTrap` (lib custom en `hooks/`).
- **`cfce2dd`** — consistencia de copy, underlines en links dentro de párrafos.
- **`e9492b4`** — footer WCAG 2.5.5 (touch targets), iconos de contacto con `aria-hidden="true"`, copy revisado.
- **`df3be3a`** — reveal-on-scroll con `prefers-reduced-motion: reduce` respetado; no se anima si el usuario lo desactiva en el sistema.

Skip-to-content link funcional en `app/layout.tsx`.

---

## 7. Internacionalización (Sprint 5, septiembre 2026)

El sprint más grande del proyecto: convertir el sitio monolingüe en bilingüe ES/EN, con subpath routing y SEO preservado.

### 7.1 Decisión arquitectónica: `es` sin prefijo, `en` bajo `/en/`

- **Por qué `es` sin prefijo:** preserva todos los URLs existentes en Google (`/quienes-somos`, `/casos-de-estudio/[slug]`, etc.). Evita un redirect masivo y la pérdida temporal de rankings mientras Google migra.
- **Por qué `en` con prefijo:** convención estándar para el segundo idioma. Permite que el sitemap, los hreflang y los canonicals funcionen limpios.
- **Librería:** `next-intl@4.14.2` (estable, server components nativos, sin cliente-only).

### 7.2 Infraestructura (commit `e596a2e`)

Archivos clave:

```typescript
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',  // 'es' no lleva prefix
});

// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!routing.locales.includes(locale as any)) notFound();
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
export default createMiddleware(routing);
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] };
```

Y la estructura de rutas pasa de `app/page.tsx` a `app/[locale]/page.tsx` con todos los hijos movidos al segmento.

### 7.3 Diccionario (commits `f0d6e28`, `e596a2e`)

`messages/es.json` y `messages/en.json` con 359+ claves cada uno, sincronizadas. Namespaces:

- `Common` — strings compartidos (copyright, skip-to-content, language picker).
- `Site` — metadata global.
- `Header` — nav, CTAs WhatsApp, mobile menu labels.
- `Footer` — columnas, copy legal.
- `Home.Hero` / `Home.CredibilityStrip` / `Home.Methodology` / `Home.Services` / `Home.Manifesto` / `Home.Equipo` / `Home.CasesPreview` / `Home.IntelligenceCenter` / `Home.ContactForm`
- `AboutPage`, `ServicesPage`, `IntelligencePage`, `PrivacyPage`
- `CaseDetailPage` (con `cases.{slug}.{title,resumen,meta}` para los 4 casos)
- `ContactPage`
- `LocaleSwitcher` (floating bottom-right)

### 7.4 Localización de páginas estáticas (4 commits)

Cada página se localizó en commit individual, con su JSON, su `page.tsx` reescrito, build, deploy y verificación:

| Commit | Página | Notas |
|---|---|---|
| `c52c78f` | `quienes-somos` | `stats` reestructurado a `{label, value}` para alinear con la grid. Añadidos `languagesLabel`, `coverageLabel`. Trae `trajectory[6]` y `commitments[3]`. |
| `f0cba8a` | `servicios` | IDs específicos por locale (`relaciones-institucionales` ES, `institutional-relations` EN) para anchor links. 4 servicios × 4 bullets cada uno. |
| `f76fe9d` | `inteligencia-politica` | `encodeURIComponent` en el subject del `mailto:`. Link de acceso al producto añade " — Intelligence" al subject. |
| `5818d18` | `politica-de-privacidad` | Sección 4 con campo `email` opcional; el componente detecta y parte el body para inyectar `<a href="mailto:...">`. |

### 7.5 Localización de componentes de Home (`f8d1e74`)

9 componentes tocados, todos con `getTranslations` (server) o `useTranslations` (client):
- `Hero` (ahora `async` server component)
- `CredibilityStrip`
- `Methodology`
- `Services` — IDs de anchor via `getTranslations('ServicesPage')` separado
- `Manifesto`
- `Equipo`
- `CasesPreview` — títulos y resúmenes via `getTranslations('CaseDetailPage.cases')` separado (next-intl no permite cross-namespace); `formatDate` ahora locale-aware
- `IntelligenceCenter`
- `ContactForm` (client, `useTranslations`)

`Button.tsx` se hizo locale-aware: cuando recibe `href`, usa `Link` de `@/i18n/routing` en vez de `next/link`. Así un Hero CTA en `/en/` apunta a `/en/servicios`, no a `/servicios`.

`lib/dates.ts formatDate(dateStr, locale='es-CO')` ahora acepta locale para que las fechas se formateen según el idioma actual.

### 7.6 Traducción de casos de estudio (`52f5b7e`)

4 archivos `.en.mdx` creados, ~2000 palabras de traducción editorial manual:
- `beso-muerte-rubiales.en.mdx`
- `compliance-comunicaciones.en.mdx`
- `good-will.en.mdx`
- `ia-socio-silencioso.en.mdx`

Tono: profesional institucional en-US, conservando nombres propios en español donde aplica (Rubiales, Petro) y términos de industria en inglés (stakeholders, compliance, ESG, lobbying, due diligence). Markdown formatting, em-dashes y estructura retórica preservados.

`lib/content.ts` modificado:
- Nuevo tipo `SupportedLocale = 'es' | 'en'`.
- `getCasoBySlug(slug, locale)` lee `{slug}.en.mdx` cuando locale es `en`, fallback a `{slug}.mdx`.
- `getAllCasos` y `getAllCasoSlugs` filtran los `.en.mdx` para que los slugs sean idénticos entre locales.

`app/[locale]/casos-de-estudio/[slug]/page.tsx` pasa `locale` a `getCasoBySlug` y formatea la fecha con `formatDate(caso.date, locale === 'es' ? 'es-CO' : 'en-US')`.

Se eliminó el banner "Spanish only" del detalle de caso en `/en/` (ya no aplica, el cuerpo está traducido).

### 7.7 Switcher de idioma (commits `d5ae863`, `51aa8fc`)

**Decisión final:** banderas en el **footer** solamente (no en el header, por restricción del cliente — buen patrón: el header sigue limpio y el footer es la zona institucional donde el switcher se ve natural).

- `components/FlagIcon.tsx` — SVG inline para CO (amarillo/azul/rojo) y US (13 stripes + blue canton). 24×16 viewBox, `props: code, className`.
- `components/Footer.tsx` — par de `<Link locale="es"/"en" href={pathname}>` con `role="group"`, `aria-label` localizado, `aria-current` en la activa, borde dorado + 100% en activa, borde blanco/20 + 60% en inactiva, hover sube a 100%.
- Convertido a `'use client'` para usar `usePathname` de `next-intl/routing` (necesario para preservar la ruta al cambiar locale).

**Keys i18n:** movidas de `Header` a `Common` (donde el footer las busca) — `languagePickerLabel`, `languageEsLabel`, `languageEnLabel`. Cambio en `51aa8fc`.

El `LocaleSwitcher` flotante del bottom-right (esquina inferior derecha, no relacionado con banderas) sigue presente como acceso alternativo.

---

## 8. Deploy y DNS

### 8.1 Estado del VPS (legado, apagado)

El sitio corría en un VPS con `38.242.194.196` (distinto del hosting WP) bajo systemd `temptum-ai` y Caddy en :3008, accesible en `temptum.andresmorales.com.co`. **Tras verificar que Vercel sirve correctamente `temptum.io`, el servicio systemd se detuvo y deshabilitó** (reversible con `sudo systemctl start temptum-ai && sudo systemctl enable temptum-ai`).

**El subdominio `temptum.andresmorales.com.co` sigue resolviendo** a la IP del VPS viejo. Quien lo visite verá el puerto 3008 cerrado o el cert TLS de Caddy expirar. La limpieza total requiere borrar el `A` o `CNAME` en la zona DNS de `andresmorales.com.co` (gestionado en Namecheap/Cloudflare, fuera del scope de este proyecto).

### 8.2 Vercel (actual)

- **Proyecto:** `temptum-ai` en https://vercel.com/andresmoralesc1/temptum-ai.
- **Framework detection:** Next.js (auto).
- **Build:** `pnpm build` con `pnpm install --frozen-lockfile`.
- **Output:** `.next` (default).
- **Headers de seguridad:** definidos en `vercel.json`, aplicados a todos los paths.
- **Dominio custom:** `temptum.io` (apex) + `www.temptum.io` (redirect 301 a apex).
- **SSL:** emitido por Vercel automáticamente, renovación automática.
- **Región:** default global edge (sin pin en `vercel.json` para plan Free).

### 8.3 Cambio de nameservers en GoDaddy (2026-09-04)

Antes: `vda5000a.trouble-free.net` / `vda5000b.trouble-free.net` (hosting WP).
Después: `ns1.vercel-dns.com` / `ns2.vercel-dns.com` (Vercel).

**El cambio se hizo desde el panel de GoDaddy (no API),** porque el PAT de GoDaddy que se intentó usar devolvió 401 (formato del header incorrecto en el primer intento; el segundo dio 404 porque el dominio tenía privacidad `Domains By Proxy` activa y la zona DNS ya no estaba en GoDaddy — los nameservers viejos apuntaban fuera de GoDaddy). El panel web fue la ruta limpia.

**Lección:** una vez que delegas nameservers, **GoDaddy deja de tener la zona DNS**. Los `A` y `CNAME` que Vercel muestra al añadir el dominio se configuran en los nameservers de Vercel, no en GoDaddy. No hay que tocar la zona DNS de GoDaddy en absoluto.

### 8.4 Flujo de deploy actual

```
git push origin main
   ↓
GitHub webhook a Vercel
   ↓
Vercel: install + build + deploy
   ↓
URL preview: https://temptum-ai-<hash>.vercel.app
   ↓
URL producción: https://temptum.io
```

Si el build falla, Vercel notifica por email y el deploy anterior sigue sirviendo. Rollback: un click en el dashboard, o `vercel rollback` con el CLI.

---

## 9. Resumen de commits (49 totales)

| Rango | Sprint | Trabajo |
|---|---|---|
| `3cfe122` – `8131b9f` | Setup inicial | Home + 6 páginas + 4 casos (en ES solamente) + articulos-linkedin + n8n auto-publish |
| `8bcf5d7` – `796b235` | Brand + assets | Refresh fotos equipo, logo en header/footer, favicons, PWA manifest, refactor de nav |
| `05f7828` – `549e7b1` | Polish | Mobile UX, Lighthouse 100/100, microinteractions P1/P2 |
| `78e5229` – `e9492b4` | a11y | Focus trap, header WCAG 2.5.5, footer touch targets |
| `df3be3a` – `dbe902e` | SEO + a11y | Reveal-on-scroll, JSON-LD Organization/Person, CopyButton contacto |
| `cfce2dd` – `7f0e33e` | Copy + a11y | Consistency, underlines, header polish |
| `1016188` | perf | CLS = 0 con font fallback metrics |
| `07527c4` – `d89fb2f` | Docs + nav | Nav simplificada, README comprehensivo |
| `02580d5` | Docs | Brand assets table + deploy/rollback/troubleshooting en README |
| `fb5bc0f` | SEO | Sitemap con `lastmod` real + dominio canónico |
| `1b02a9d` | SEO + brand | Favicon dinámico, OG image 1200×630, JSON-LD knowledge graph |
| `6630b0f` – `cc4982f` – `d1bb615` | Copy 1-3 | Audience, honest framing, methodology |
| `ffedaf0` | SEO sprint 4 | Per-page metadata, structured data, canonicalization |
| `a82b0cd` | Docs | README actualizado a temptum.io |
| `e596a2e` | i18n | Bilingüe ES/EN con subpath routing (infraestructura) |
| `f0d6e28` | i18n WIP | Extender diccionarios |
| `c52c78f` – `f0cba8a` – `f76fe9d` – `5818d18` | i18n | Localizar 4 páginas estáticas |
| `f8d1e74` | i18n | Localizar 9 componentes de home |
| `52f5b7e` | i18n | Traducción editorial de 4 casos a EN |
| `d5ae863` | i18n | Flag switcher en header y footer |
| `51aa8fc` | i18n refactor | Mover keys de Header a Common |
| `b3ed4d7` | Deploy | vercel.json + README bilingüe |

---

## 10. Lecciones aprendidas

1. **i18n no es traducción, es arquitectura.** Decidir el locale prefix (`as-needed` vs `always`) tiene impacto permanente en SEO. Hacerlo ANTES de tener URLs indexadas ahorra redirects y meses de recuperación de rankings.

2. **next-intl no permite cross-namespace en `t()`.** Si necesitas contenido de otro namespace, llama `getTranslations` aparte. El bug que más tiempo consumió en este sprint fue `t('CasesPreview.CaseDetailPage.cases.X.title')` que falla silenciosamente y requiere un `getTranslations('CaseDetailPage.cases')` separado.

3. **El hosting compartido no es SEO-friendly.** LiteSpeed en `trouble-free.net` tenía TTFB >600ms, fonts externas, y zero control de headers. Migrar a Vercel edge bajó el LCP a <1.5s en mobile y desbloqueó el sitemap y JSON-LD que antes no funcionaban.

4. **Cambiar nameservers es instantáneo en el registry, lento en los caches.** WHOIS权威 refleja el cambio en minutos; Cloudflare 1.1.1.1 puede tardar hasta 1 hora en refrescar. El DoH (DNS over HTTPS) ve la verdad antes que el UDP tradicional.

5. **Las claves i18n deben vivir en el namespace correcto, no en uno "parecido".** El bug del 51aa8fc (labels crudos en el footer) pasó porque dos componentes usaban la misma key pero bindeada a namespaces distintos. La solución limpia fue mover las keys a `Common` (el namespace compartido real).

6. **Los PAT de GoDaddy son traicioneros.** El primer intento dio 401 por header mal formado; el segundo dio 404 porque la zona DNS ya no estaba en GoDaddy (delegada a `trouble-free.net`). El panel web es la ruta más segura para cambios DNS únicos.

---

## 11. Checklist operacional

### Para el día a día

- [ ] `pnpm install` después de clonar.
- [ ] `pnpm dev` para desarrollo local. Visita `http://localhost:3000` (ES) y `http://localhost:3000/en` (EN).
- [ ] `pnpm build` antes de pushear — los errores de tipo y de i18n (MISSING_MESSAGE) solo aparecen en build.
- [ ] `pnpm lint && pnpm typecheck` si están configurados (verificar `package.json`).

### Para añadir un nuevo caso de estudio

1. Crear `content/casos/{slug}.mdx` con frontmatter: `title`, `resumen`, `date`, `category`, `client`, `industry`, `readingTime`, `coverImage`.
2. Si quieres versión EN, crear `content/casos/{slug}.en.mdx` con el mismo frontmatter traducido.
3. Añadir las claves a `messages/es.json` y `messages/en.json` bajo `CaseDetailPage.cases.{slug}.{title,resumen,meta}`.
4. `pnpm build` para confirmar.
5. Commit + push. Vercel redeploy automático.

### Para añadir un nuevo idioma

1. Editar `i18n/routing.ts` y añadir el locale a `locales` y `localePrefix`.
2. Crear `messages/{nuevo}.json` partiendo de `es.json` como base.
3. Traducir manualmente (no usar traducción automática para copy institucional).
4. Si el idioma no debe ser el default, ajustar `defaultLocale`.
5. Actualizar el switcher en `components/Footer.tsx` con el nuevo `FlagIcon`.
6. Actualizar `app/sitemap.ts` para incluir las nuevas entradas con `alternates.languages`.

### Para verificar el deploy

```bash
curl -I https://temptum.io              # 200, TLS válido, server header
curl -I https://temptum.io/en/          # 200
curl -s https://temptum.io/sitemap.xml  # 22 URLs, 5 hreflang alternates
dig NS temptum.io @1.1.1.1              # ns1.vercel-dns.com, ns2.vercel-dns.com
```

### Si el build falla

1. Revisar el log en el dashboard de Vercel.
2. Errores comunes:
   - `MISSING_MESSAGE: 'X.Y'` → falta una clave en `messages/{locale}.json`. Añadir.
   - `usePathname is not supported in Server Components` → falta `'use client'` en el componente.
   - `useTranslations returned a string but the value is not a string` → clave con valor que no es string (objeto o array anidado mal).
3. Rollback desde dashboard o `vercel rollback`.

---

## 12. Contacto y ownership

- **Repositorio:** https://github.com/andresmoralesc1/temptum-ai
- **Branch principal:** `main` (renombrado de `master` durante el proyecto)
- **Owner:** Andrés Morales
- **Cliente:** Temptum (Silvia Parra, founder)
- **Dominio canónico:** https://temptum.io
- **Deploys:** Vercel (Free plan), conectado vía GitHub App
- **Email transaccional:** Resend (configurado en env vars, no commiteado)
- **Analytics:** pendiente (no instalado en este sprint)

---

## 13. Trabajo futuro (no incluido)

1. **Analytics y consent management.** Sugerencia: Plausible o PostHog, con cookie consent banner (PrivacyPage ya tiene la base legal).
2. **Sitemap image extensions.** `<image:image>` por cada caso para aparecer en Google Images.
3. **AMP o RSS.** RSS de `/articulos-linkedin` para suscriptores.
4. **Más casos.** El sistema de MDX acepta N casos sin cambios estructurales.
5. **A/B testing del Hero.** El Hero tiene un copy fuerte, valdría la pena testear variantes.
6. **Schema `FAQPage`** en la página de Servicios. Las 4 preguntas ya están estructuradas en `messages/es.json` como `items[].{title,body}`.
7. **Eliminar el `LocaleSwitcher` flotante** (esquina inferior derecha). Redundante con el footer ahora.
8. **Limpiar `temptum.andresmorales.com.co`.** El subdominio sigue resolviendo al VPS viejo. Si se decide que `temptum.io` es la única URL, hay que borrar el `A` en la zona DNS de `andresmorales.com.co`.
