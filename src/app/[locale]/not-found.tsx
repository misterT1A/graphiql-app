import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  const t = useTranslations('NotFound');

  return <div>{t('message')}</div>;
}
