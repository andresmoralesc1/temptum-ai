import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next, _vercel (internal Next.js / Vercel paths)
  // - metadata routes that Next serves as static files
  //   (`/icon`, `/apple-icon`, `/opengraph-image`, etc.) — these have
  //   no extension in their pathname so the catch-all `.*\\..*` rule
  //   does not match them, and the i18n middleware otherwise rewrites
  //   them to `/es/icon` which 404s.
  // - anything else with a file extension (e.g. .png, .ico, .xml)
  matcher: [
    '/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|manifest|sitemap|robots|.*\\..*).*)',
  ],
};
