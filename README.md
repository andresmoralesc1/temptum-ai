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
NEXT_PUBLIC_SITE_URL=https://temptum.io  # base para sitemap/robots — se BAKEA en build
```

## Build de producción

```bash
pnpm build
pnpm start
```

## Deploy en VPS (andresmorales.com.co)

Configuración activa en `temptum.andresmorales.com.co` (deploy interino).

- **systemd**: `deploy/temptum-ai.service` → puerto `:3008`
- **Caddyfile**: `deploy/Caddyfile-snippet.txt` (TLS vía ACME + cache + security headers)
- **DNS**: Namecheap, registro A en `andresmorales.com.co`

Pasos de deploy:

```bash
# 1. Construir con la URL correcta (NEXT_PUBLIC_* se bakea)
NEXT_PUBLIC_SITE_URL=https://temptum.andresmorales.com.co pnpm build

# 2. Copiar systemd unit y arrancar
sudo cp deploy/temptum-ai.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now temptum-ai

# 3. Agregar vhost a Caddy y recargar
sudo tee -a /etc/caddy/Caddyfile < deploy/Caddyfile-snippet.txt
sudo systemctl reload caddy
```

> ⚠️ Si despliegas bajo otro host (ej. `temptum.io`), agrega un registro A en Namecheap,
> actualiza el vhost de Caddy y rebuildea con el `NEXT_PUBLIC_SITE_URL` correcto.

## Contenido

Los casos de estudio viven en `content/casos/*.mdx` con frontmatter (`title`, `slug`, `date`, `author`, `resumen`). El listado en `/casos-de-estudio` se genera a partir de estos archivos.

## Estructura

```
app/             páginas y rutas API
components/      Header, Footer, Hero, Services, IntelligenceCenter, ContactForm, Button, Card
content/         casos de estudio en MDX
deploy/          systemd unit + Caddyfile snippet para producción
lib/             content.ts (lector de MDX con gray-matter)
public/          imágenes estáticas
```