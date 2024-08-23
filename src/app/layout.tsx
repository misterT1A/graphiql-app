import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactElement } from 'react';

import Header from '@/components/Header/Header';

import './globals.css';

import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'App',
  description: 'next app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Providers>
          <>
            <Header />
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
