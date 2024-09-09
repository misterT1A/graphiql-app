'use client';

import { Link } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';

const Home = (): ReactElement => {
  const { user } = useAuth();
  const t = useTranslations('Home');

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl">{user ? t('welcomeUsername', { username: user.displayName }) : t('welcome')}</h1>
        <div className="flex gap-4">
          {user ? (
            <>
              <Link href="/restfull-client">{t('buttons.restFullClient')}</Link>
              <Link href="/graphiql-client">{t('buttons.graphiQlClient')}</Link>
              <Link href="/history">{t('buttons.history')}</Link>
            </>
          ) : (
            <>
              <Link href="/sign-in">{t('buttons.signIn')}</Link>
              <Link href="/sign-up">{t('buttons.signUp')}</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
