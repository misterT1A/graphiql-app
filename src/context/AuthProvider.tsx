'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

import { AUTH_COOKIE_NAME } from '@/constants/constants';
import { useRouterIntl } from '@/navigation';

import { AuthContext, type User } from './AuthContext';

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ user, children }) => {
  const t = useTranslations('Auth');
  const [cookies] = useCookies([AUTH_COOKIE_NAME]);
  const [authToken, setAuthToken] = useState<string | undefined>(cookies.AuthToken);
  const [isSignOut, setIsSignOut] = useState<boolean>(false);
  const router = useRouterIntl();

  useEffect(() => {
    if (cookies.AuthToken === authToken) {
      return;
    }

    if (!cookies.AuthToken) {
      if (isSignOut) {
        setIsSignOut(false);
      } else {
        toast.error(t('sessionExpired'));
      }
    }

    setAuthToken(cookies.AuthToken);
    router.refresh();
  }, [t, cookies, authToken, router, isSignOut]);

  return <AuthContext.Provider value={{ user, isSignOut, setIsSignOut }}>{children}</AuthContext.Provider>;
};
