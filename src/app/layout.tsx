import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/_normalize.scss';
import type { ReactElement } from 'react';

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
