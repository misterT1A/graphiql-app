import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { getTokens } from 'next-firebase-auth-edge';
import { getMessages } from 'next-intl/server';
import type { ReactElement } from 'react';

import Header from '@/components/Header/Header';
import { AuthProvider } from '@/context/AuthProvider';
import { toUser } from '@/context/toUser';
import cookieConfig from '@/firebase/cookieConfig.json';
import firebaseConfig from '@/firebase/firebaseConfig.json';
import serviceAccountKey from '@/firebase/serviceAccountKey.json';
import { type Locale } from '@/i18n';

import Providers from '../providers';

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
    apiKey: firebaseConfig.apiKey,
    cookieName: cookieConfig.cookieName,
    cookieSignatureKeys: cookieConfig.cookieSignatureKeys,
    serviceAccount: {
      projectId: serviceAccountKey.project_id,
      clientEmail: serviceAccountKey.client_email,
      privateKey: serviceAccountKey.private_key,
    },
  });

  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          <AuthProvider user={user}>
            <Header />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
