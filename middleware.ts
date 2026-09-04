import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next, _vercel (internal Next.js / Vercel paths)
  // - anything with a file extension (e.g. .png, .ico, .xml)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
