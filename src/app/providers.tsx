'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, type ReactNode } from 'react';

import { useRouterIntl } from '@/navigation';

const Providers = ({ children }: { children: React.ReactNode }): ReactNode => {
  const router = useRouterIntl();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <NextUIProvider navigate={router.push}>
      {mounted ? (
        <NextThemesProvider attribute="class" defaultTheme="light">
          {children}
        </NextThemesProvider>
      ) : (
        children
      )}
    </NextUIProvider>
  );
};

export default Providers;
