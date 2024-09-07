import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LSHistoryName } from '@/constants/constants';
import type { Client, IFormParams, IReturnType, request } from '@/types/historyServiceTypes';
import { buildURL } from '@/utils/encryptHelpers';

const setToLS = (data: string): void => {
  window.localStorage.setItem(LSHistoryName, data);
};

const useHistoryService = (): IReturnType => {
  const path = usePathname();
  const startUrl = path.split('/').slice(0, 3).join('/');
  const [requests, setRequests] = useState<request[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    return JSON.parse(window.localStorage.getItem(LSHistoryName) || '') || [];
  });

  useEffect(() => {
    setToLS(JSON.stringify(requests));
  }, [requests]);

  const setRequest = (form: IFormParams, name: Client): void => {
    const isBodyJson = form.body.type === 'json';
    const url = buildURL(
      {
        startUrl,
        ...form,
        bodyJSON: isBodyJson ? form.body.value : '',
        bodyText: isBodyJson ? '' : form.body.value,
      },
      !isBodyJson,
    );
    const request = { href: window.location.host + url, name, data: new Date(), variables: form.variables };
    setRequests((prev) => [...prev, request]);
  };
  return { setRequest };
};

export default useHistoryService;
