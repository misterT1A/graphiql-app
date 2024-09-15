'use client';

import { Avatar, Link } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';
import Tooltip from '@/ui/Tooltip/Tooltip';

const Home = (): ReactElement => {
  const { user } = useAuth();
  const t = useTranslations('Home');

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-center">
          {user ? t('welcomeUsername', { username: user.displayName }) : t('welcome')}
        </h1>
        <div className="flex gap-5 justify-center">
          {user ? (
            <>
              <Link href="/GET">{t('buttons.restFullClient')}</Link>
              <Link href="/GRAPHQL">{t('buttons.graphiQlClient')}</Link>
              <Link href="/history">{t('buttons.history')}</Link>
            </>
          ) : (
            <>
              <Link href="/sign-in">{t('buttons.signIn')}</Link>
              <Link href="/sign-up">{t('buttons.signUp')}</Link>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <p className="px-2 min-[440px]:px-4 text-base text-justify">{t('appInfo')}</p>
          <p className="px-2 min-[440px]:px-4 text-base text-justify">{t('courseInfo')}</p>
        </div>
        <h2 className="text-3xl text-center mb-2">{t('developers')}</h2>
        <div className="flex gap-[20px] justify-center">
          <Tooltip
            showArrow={true}
            color="success"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">{t('team.developer1.name')}</div>
                <div className="text-tiny max-w-80">{t('team.developer1.description')}</div>
              </div>
            }
          >
            <Avatar
              isBordered
              radius="full"
              src="/images/avatar1.jpg"
              className="w-20 h-20 min-[440px]:w-28 min-[440px]:h-28 md:w-40 md:h-40"
            />
          </Tooltip>
          <Tooltip
            showArrow={true}
            color="success"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">{t('team.developer2.name')}</div>
                <div className="text-tiny max-w-80">{t('team.developer2.description')}</div>
              </div>
            }
          >
            <Avatar
              isBordered
              radius="full"
              src="/images/avatar2.jpg"
              className="w-20 h-20 min-[440px]:w-28 min-[440px]:h-28 md:w-40 md:h-40"
            />
          </Tooltip>
          <Tooltip
            showArrow={true}
            color="success"
            content={
              <div className="px-1 py-2">
                <div className="text-small font-bold">{t('team.developer3.name')}</div>
                <div className="text-tiny max-w-80">{t('team.developer3.description')}</div>
              </div>
            }
          >
            <Avatar
              isBordered
              radius="full"
              src="/images/avatar3.jpg"
              className="w-20 h-20 min-[440px]:w-28 min-[440px]:h-28 md:w-40 md:h-40"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Home;
