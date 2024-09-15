import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import type { ReactElement } from 'react';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { locales, type Locale } from '@/i18n';
import { getUserFromCookie } from '@/utils/getUserFromCookie';

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
  const user = await getUserFromCookie();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages} user={user}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="max-w-[1000px] w-full mx-auto p-[10px] flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
