import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes, Next.js internals, static files
    // - Sitemap and robots.txt
    '/((?!api|_next|_vercel|.*\\..*|sitemap\\.xml|robots\\.txt).*)'
  ]
};