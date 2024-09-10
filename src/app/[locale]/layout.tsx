import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { getTokens } from 'next-firebase-auth-edge';
import { getMessages } from 'next-intl/server';
import type { ReactElement } from 'react';

import Header from '@/components/Header/Header';
import { toUser } from '@/context/toUser';
import { locales, type Locale } from '@/i18n';

import Providers from '../providers';

export function generateStaticParams(): {
  locale: Locale;
}[] {
  return locales.map((locale) => ({ locale }));
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'App',
  description: 'next app',
};

const RootLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>): Promise<ReactElement> => {
  const messages = await getMessages({ locale });

  const tokens = await getTokens(cookies(), {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    cookieName: process.env.COOKIE_NAME || 'AuthToken',
    cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEYS || ''],
    serviceAccount: {
      projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID || '',
      clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL || '',
      privateKey: (process.env.SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
  });

  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages} user={user}>
          <Header />
          <main className="max-w-[1000px] w-full mx-auto p-[10px]">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
