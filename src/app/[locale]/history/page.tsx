'use client';

import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import HistoryView from '@/components/HistoryView/HistoryView';

const HistoryPage = (): ReactElement => {
  const t = useTranslations('History');
  return (
    <section className="flex flex-col items-center gap-[20px]">
      <h1 className="text-center text-lg">{t('heading')}</h1>
      <HistoryView />
    </section>
  );
};

export default HistoryPage;
