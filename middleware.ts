import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(sl|en)/:path*', '/((?!_next|_vercel|.*\\..*|sitemap\\.xml|robots\\.txt).*)']
  // Temporarily disabled Croatian (hr) locale: '/(sl|hr|en)/:path*'
};