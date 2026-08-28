# n8n — Auto-publicar artículos de LinkedIn en Temptum

Workflow para que cuando Silvia publique en LinkedIn, aparezca automáticamente
en `/articulos-linkedin` sin tener que crear el `.md` a mano.

## Arquitectura

```
[LinkedIn post] → [n8n Webhook] → [Function node: armar .md] → [SSH/Exec: git commit + rebuild] → [Sitio]
```

O más simple (recomendado para empezar):

```
[LinkedIn post] → [n8n Webhook] → [Telegram/Email approval] → [SSH: escribir .md + git push + restart]
```

## Prerrequisitos en el VPS

1. **n8n** corriendo (Docker o nativo). Sugerencia: `docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n`
2. **SSH key** dedicada para n8n, agregada al `authorized_keys` de `telchar` en `andresmorales.com.co` (sin passphrase, restringida a un comando específico).
3. **Webhook expuesto** detrás de Caddy con TLS (mismo patrón que el snippet de `deploy/Caddyfile-snippet.txt`).

## Nodos del workflow

### 1. Webhook (POST)
- Path: `/webhook/linkedin-new`
- Authentication: `Header Auth` con `X-N8N-TOKEN`
- Payload esperado:
  ```json
  {
    "title": "Cómo la IA redefine las campañas en Latam",
    "date": "2024-11-12",
    "author": "Silvia Juliana Parra Cañas",
    "resumen": "Reflexión sobre el uso de IA en campañas políticas…",
    "linkedinUrl": "https://www.linkedin.com/posts/silviajulianaparra_ia-…"
  }
  ```

### 2. Function — generar slug y body
```js
const slug = $json.title
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')
  .slice(0, 60);

const body = `---\n` +
  `title: '${$json.title.replace(/'/g, "''")}'\n` +
  `slug: '${slug}'\n` +
  `date: '${$json.date}'\n` +
  `author: '${$json.author}'\n` +
  `resumen: '${$json.resumen.replace(/'/g, "''")}'\n` +
  `linkedinUrl: '${$json.linkedinUrl}'\n` +
  `---\n\n` +
  `Artículo publicado originalmente en LinkedIn. [Leer aquí](${$json.linkedinUrl}).\n`;

return { slug, body };
```

### 3. Write Binary File / SSH
- Conectar vía **SSH** al VPS.
- Escribir `/home/telchar/temptum-ai/content/linkedin/{slug}.md` con el `body` del paso anterior.
- Verificar que no exista (si existe, no sobrescribir — enviar alerta).

### 4. Execute Command
```bash
cd /home/telchar/temptum-ai && \
  git add content/linkedin/ && \
  git -c user.name="n8n-bot" -c user.email="n8n@temptum.io" \
    commit -m "linkedin: nuevo artículo ${slug}" && \
  git push origin main && \
  /usr/bin/systemctl --no-ask-password restart temptum-ai
```

(El `restart` fuerza rebuild; alternativamente, deja que el watcher de Next lo detecte — más simple, sin restart.)

### 5. Respond to Webhook
```json
{ "ok": true, "slug": "{{$json.slug}}" }
```

## Trigger desde LinkedIn

LinkedIn no permite webhooks directos. Opciones:

| Opción | Esfuerzo | Recomendación |
|---|---|---|
| **Buffer / Hootsuite** que en cada post publique también a un webhook | Bajo | ⭐ Mejor para empezar |
| **Zapier** intermedio: LinkedIn → Webhook → n8n | Bajo | Alternativa |
| **Extensión de navegador** que Silvia dispara manualmente al terminar de publicar | Muy bajo | Buena como MVP |
| **API oficial de LinkedIn** | Alto, requiere revisión | Solo si crece mucho |

## Extensión Chrome (MVP recomendado)

1. Silvia instala "Webhooks by Sander aka Selenium" o una custom de 30 líneas.
2. Al hacer click después de publicar, envía al webhook de n8n con `title`, `date`, `linkedinUrl` (la URL activa en la barra del navegador).
3. El workflow genera `resumen` automáticamente con un nodo **OpenAI** opcional (lee los primeros 200 chars del post si la API lo permite, o lo deja vacío para que Silvia lo complete).

## Seguridad

- Webhook protegido con `X-N8N-TOKEN` rotable.
- SSH restringido en `~/.ssh/authorized_keys`:
  ```
  command="/home/telchar/bin/publish-linkedin-article.sh",no-port-forwarding,no-X11-forwarding ssh-ed25519 AAAA… n8n-bot
  ```
- `publish-linkedin-article.sh` valida que el archivo caiga dentro de `content/linkedin/` y rechaza path traversal.

## Costos

- n8n self-hosted: **gratis**.
- OpenAI (si usas para resumen): ~$0.001 por artículo.
- VPS: ya tienes, sin costo adicional.
