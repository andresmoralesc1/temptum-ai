# Temptum — Bilingual institutional site

B2B consultancy site. Bilingual (ES default, EN under `/en/`). Built with
Next.js 16 (App Router), `next-intl@4`, TypeScript, Tailwind, MDX content.

## Stack

- Next.js 16 App Router with `app/[locale]/*`
- `next-intl@4.14.2` for i18n, default `es` (no prefix), `en` at `/en/`
- TypeScript strict, Tailwind, lucide-react icons
- MDX case studies in `content/casos/*.mdx` (with `.en.mdx` siblings)
- Sitemap + hreflang alternates generated from `app/sitemap.ts`
- Systemd deployment on VPS + Vercel one-click deploy

## Local development

```bash
pnpm install
pnpm dev
# http://localhost:3000  (Spanish)
# http://localhost:3000/en  (English)
```

## Build

```bash
pnpm build
```

All routes are statically generated. Output: 22 URLs (11 routes × 2 locales).

## Deploy to Vercel

1. Import this repo at https://vercel.com/new.
2. Framework auto-detected: Next.js. No environment variables required.
3. Click **Deploy**. First build takes ~2 minutes.
4. Add custom domain `temptum.io` in **Settings → Domains**.
5. Configure the `A` record (or nameservers) at GoDaddy per Vercel's
   instructions. TLS is provisioned automatically by Vercel.

## i18n conventions

- All user-facing strings live in `messages/es.json` and `messages/en.json`.
  Use `useTranslations('Namespace')` in client components or
  `getTranslations('Namespace')` in server components.
- Dates use `formatDate(dateStr, locale)` from `lib/dates.ts`. Pass
  `'es-CO'` for Spanish output, `'en-US'` for English.
- Cross-namespace references are not allowed by next-intl. When a home
  section needs translated content from another namespace (e.g. case
  titles in `CasesPreview`), call `getTranslations` separately.
- Case study bodies are MDX. To translate a case, create
  `content/casos/{slug}.en.mdx` next to the base file. `lib/content.ts`
  picks the right one based on the active locale.

## File layout

```
app/
  [locale]/         # All routes live under the locale segment
    page.tsx        # Home
    casos-de-estudio/[slug]/page.tsx
    contacto/, inteligencia-politica/, politica-de-privacidad/,
    quienes-somos/, servicios/
  layout.tsx        # Root HTML
  sitemap.ts        # Sitemap with hreflang alternates
  robots.ts
components/         # Reusable UI (Header, Footer, FlagIcon, etc.)
content/casos/      # MDX case studies (es + en)
i18n/
  routing.ts        # Locales + pathnames
  request.ts        # next-intl server config
messages/
  es.json, en.json  # Translation dictionaries
middleware.ts       # next-intl middleware
```

## License

Proprietary. © Temptum.
