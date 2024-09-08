import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  const t = useTranslations('NotFound');

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <p className="text-4xl text-center">404</p>
        <p className="text-xl">{t('message')}</p>
      </div>
    </div>
  );
}
