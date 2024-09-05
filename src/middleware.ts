import { type NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from 'next-firebase-auth-edge';
import createMiddleware from 'next-intl/middleware';

import cookieConfig from '@/firebase/cookieConfig.json';
import firebaseConfig from '@/firebase/firebaseConfig.json';
import serviceAccountKey from '@/firebase/serviceAccountKey.json';

import { defaultLocale, locales } from './i18n';

const publicPages = ['/', '/sign-up', '/sign-in'];
const privatePages = ['/'];

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
    apiKey: firebaseConfig.apiKey,
    cookieSignatureKeys: cookieConfig.cookieSignatureKeys,
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 60 * 60,
    },
    serviceAccount: {
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_email,
      privateKey: serviceAccountKey.private_key,
    },
    checkRevoked: true,
    cookieName: cookieConfig.cookieName,
    debug: true,
    handleValidToken: async () => {
      if (!isPagesMatch(request.nextUrl.pathname, privatePages)) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return intlMiddleware(request);
    },
    handleInvalidToken: async () => {
      if (!isPagesMatch(request.nextUrl.pathname, publicPages)) {
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
  matcher: ['/((?!_next).*)'],
};
