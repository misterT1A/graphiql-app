'use client';

import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import { useRouterIntl } from '@/navigation';

const Error = (): ReactElement => {
  const router = useRouterIntl();
  const t = useTranslations('Error');

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 mt-4">
        <p className="text-xl">{t('message')}</p>
        <Button onClick={() => router.push('/')}>{t('button')}</Button>
      </div>
    </div>
  );
};

export default Error;
