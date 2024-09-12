'use client';

import { Link, Listbox, ListboxItem } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ReactElement } from 'react';

import { useHistoryService } from '@/hooks';
import type { IHistoryRequest } from '@/types/historyServiceTypes';

const HistoryView = (): ReactElement => {
  const t = useTranslations('History');
  const { getHistory } = useHistoryService();
  const [history, setHistory] = useState<IHistoryRequest[]>([]);

  useEffect(() => {
    setHistory(getHistory);
  }, [getHistory]);

  if (!history.length)
    return (
      <div className="flex flex-col items-center gap-[30px] ">
        <h1>{t('NoRequests')}</h1>
        <div className="flex gap-[20px] text-lg">
          <Link href={'/restfull-client'}>{t('RestClient')}</Link>
          <Link href={'/graphiql-client'}>{t('GraphiQLClient')}</Link>
        </div>
      </div>
    );

  return (
    <div className="w-full min-w-[300px] max-w-[700px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox aria-label="Actions" className="min-w-[300px]  max-h-[800px] overflow-y-auto">
        {history.map((request) => (
          <ListboxItem textValue={request.method} key={+new Date(request.data)} href={request.hrefHistory}>
            <div className="flex flex-col gap-[10px] sm:flex-row gap-[20px]">
              <p className="min-w-[60px]">{request.method}</p>
              <p>{new Date(request.data).toLocaleString()}</p>
              <p>{request.endpoint}</p>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};
export default HistoryView;
