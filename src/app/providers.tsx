'use client';

import { NextUIProvider } from '@nextui-org/react';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, type ReactNode } from 'react';

import type { Locale } from '@/i18n';
import { useRouterIntl } from '@/navigation';

type ProviderProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
};

const Providers = ({ children, locale, messages }: ProviderProps): ReactNode => {
  const router = useRouterIntl();
  const [mounted, setMounted] = useState(false);
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  useEffect(() => setMounted(true), []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <NextUIProvider navigate={router.push}>
        {mounted ? (
          <NextThemesProvider attribute="class" defaultTheme="light">
            {children}
          </NextThemesProvider>
        ) : (
          children
        )}
      </NextUIProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
