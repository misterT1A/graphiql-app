import { useEffect, useState } from 'react';

import { LSHistoryName } from '@/constants/constants';
import { usePathnameIntl } from '@/navigation';
import type { IFormParams, IReturnType, request } from '@/types/historyServiceTypes';
import { buildURL } from '@/utils/encryptHelpers';

const useHistoryService = (): IReturnType => {
  const path = usePathnameIntl();

  const [requests, setRequests] = useState<request[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    return JSON.parse(window.localStorage.getItem(LSHistoryName) || '[]') || [];
  });

  useEffect(() => {
    window.localStorage.setItem(LSHistoryName, JSON.stringify(requests));
  }, [requests]);

  const setHistory = (form: IFormParams, method: string): void => {
    const isBodyJson = form.body.type === 'json';
    const url = buildURL(
      {
        startUrl: path,
        ...form,
        bodyJSON: isBodyJson ? form.body.value : '',
        bodyText: isBodyJson ? '' : form.body.value,
      },
      !isBodyJson,
    );
    const request = { href: url, endpoint: form.endpoint, name: method, data: new Date() };
    setRequests((prev) => [request, ...prev]);
  };

  return { setHistory, getHistory: requests };
};

export default useHistoryService;
