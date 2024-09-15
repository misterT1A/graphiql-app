'use client';

import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/firebase/auth';
import { LinkIntl, useRouterIntl } from '@/navigation';

const AuthenticationButtons = (): ReactElement => {
  const { user, setIsSignOut } = useAuth();
  const t = useTranslations('Auth');
  const router = useRouterIntl();

  const handleSignOut = async (): Promise<void> => {
    setIsSignOut(true);
    await signOut();
    toast.success(t('signedOut'));
    router.replace('/');
    router.refresh();
  };

  return (
    <>
      {user ? (
        <Button color="primary" variant="flat" onPress={handleSignOut}>
          {t('buttons.signOut')}
        </Button>
      ) : (
        <div className="flex gap-4">
          <Button as={LinkIntl} color="primary" href="/sign-in" variant="flat">
            {t('buttons.signIn')}
          </Button>
          <Button as={LinkIntl} color="primary" href="/sign-up" variant="flat">
            {t('buttons.signUp')}
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthenticationButtons;
