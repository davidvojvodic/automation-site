import createIntlMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware({
  ...routing,
  // Disable automatic locale detection based on Accept-Language header
  localeDetection: false
});

export async function middleware(request: NextRequest) {
  // First, run the intl middleware
  const intlResponse = intlMiddleware(request);

  // Then, handle Supabase auth
  let response = intlResponse || NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;

  // Helper to extract and validate locale
  const getValidLocale = (pathname: string): string => {
    const pathParts = pathname.split('/');
    const locale = pathParts[1];
    return ['en', 'sl'].includes(locale) ? locale : 'en';
  };

  // Protect /team routes (except /team/login)
  if (
    pathname.includes('/team') &&
    !pathname.includes('/team/login') &&
    !session
  ) {
    const redirectUrl = request.nextUrl.clone();
    const locale = getValidLocale(pathname);
    redirectUrl.pathname = `/${locale}/team/login`;
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to /team/knowledge if already logged in and trying to access /team/login
  if (pathname.includes('/team/login') && session) {
    const redirectUrl = request.nextUrl.clone();
    const locale = getValidLocale(pathname);
    redirectUrl.pathname = `/${locale}/team/knowledge`;
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes, Next.js internals, static files
    // - Sitemap and robots.txt
    '/((?!api|_next|_vercel|.*\\..*|sitemap\\.xml|robots\\.txt).*)'
  ]
};