// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api, /trpc)
  // - Next.js internals (/_next, /_vercel)
  // - Static files containing a dot (e.g. favicon.ico, images)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};