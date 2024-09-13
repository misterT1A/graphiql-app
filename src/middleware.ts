import { type NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from 'next-firebase-auth-edge';
import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from './i18n';

const privatePages = ['/GET/.*', '/POST/.*', '/PATCH/.*', '/DELETE/.*', '/PUT/.*', '/GRAPHQL/.*', '/history'];
const redirectPages = ['/sign-up', '/sign-in'];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

const isPagesMatch = (pathname: string, pages: string[]): boolean => {
  const pathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${pages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  );
  return pathnameRegex.test(pathname);
};

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEYS || ''],
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 60 * 60,
    },
    serviceAccount: {
      projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID || '',
      clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL || '',
      privateKey: (process.env.SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    checkRevoked: true,
    cookieName: process.env.COOKIE_NAME || 'AuthToken',
    handleValidToken: async () => {
      if (isPagesMatch(request.nextUrl.pathname, redirectPages)) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return intlMiddleware(request);
    },
    handleInvalidToken: async () => {
      if (isPagesMatch(request.nextUrl.pathname, privatePages)) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return intlMiddleware(request);
    },
    handleError: async () => {
      return intlMiddleware(request);
    },
  });
}

export const config = {
  matcher: ['/((?!_next|images|icon.ico).*)'],
};
