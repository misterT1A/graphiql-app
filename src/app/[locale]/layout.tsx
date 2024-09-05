import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import type { ReactElement } from 'react';

import Header from '@/components/Header/Header';
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

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          <Header />
          <main className="max-w-[1000px] w-full mx-auto p-[10px]">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
