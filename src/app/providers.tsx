'use client';

import { NextUIProvider } from '@nextui-org/react';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, type ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import type { User } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthProvider';
import type { Locale } from '@/i18n';
import { useRouterIntl } from '@/navigation';

type ProviderProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
  user: User | null;
};

const Providers = ({ children, locale, messages, user }: ProviderProps): ReactNode => {
  const router = useRouterIntl();
  const [mounted, setMounted] = useState(false);
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  useEffect(() => setMounted(true), []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <AuthProvider user={user}>
        <NextUIProvider navigate={router.push}>
          {mounted ? (
            <NextThemesProvider attribute="class" defaultTheme="light">
              {children}
            </NextThemesProvider>
          ) : (
            children
          )}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </NextUIProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
