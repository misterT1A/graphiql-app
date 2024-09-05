'use client';

import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';
import { LinkIntl, useRouterIntl } from '@/navigation';

export const AuthenticationButtons = (): ReactElement => {
  const { user } = useAuth();
  const t = useTranslations('Auth.buttons');
  const router = useRouterIntl();

  const signOut = async (): Promise<void> => {
    await fetch('/api/logout');
    router.refresh();
  };

  return (
    <>
      {user ? (
        <Button color="primary" variant="flat" onPress={signOut}>
          {t('signOut')}
        </Button>
      ) : (
        <div className="flex gap-4">
          <Button as={LinkIntl} color="primary" href="/sign-in" variant="flat">
            {t('signIn')}
          </Button>
          <Button as={LinkIntl} color="primary" href="/sign-up" variant="flat">
            {t('signUp')}
          </Button>
        </div>
      )}
    </>
  );
};
