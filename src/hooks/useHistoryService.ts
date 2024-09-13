import { useEffect, useState } from 'react';

import { LSHistoryName } from '@/constants/constants';
import type { IFormGraphHistory } from '@/types/historyServiceTypes';
import { type IFormParams, type IHistoryRequest, type IReturnType } from '@/types/historyServiceTypes';
import { replaceVariables } from '@/utils/replaceVariables';

const useHistoryService = (): IReturnType => {
  const [requests, setRequests] = useState<IHistoryRequest[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const allhistory = JSON.parse(window.localStorage.getItem(LSHistoryName) || '[]') || [];
    return allhistory;
  });

  useEffect(() => {
    window.localStorage.setItem(LSHistoryName, JSON.stringify(requests));
  }, [requests]);

  const setHistoryRest = (form: IFormParams, method: string): void => {
    const url = window.location.href;
    const hrefHistory = `/GET/history_${requests.length}`;

    const request: IHistoryRequest = {
      id: String(requests.length),
      href: url,
      hrefHistory: hrefHistory,
      endpoint: form.endpoint,
      replacedEndpoint: replaceVariables(form?.endpoint as string, form.variables),
      method,
      data: new Date(),
      variables: form.variables,
      headers: form.headers,
      body: form.body,
    };
    setRequests((prev) => [request, ...prev]);
  };

  const setHistoryGraph = (form: IFormGraphHistory): void => {
    const url = window.location.href;
    const hrefHistory = `/GRAPHQL/history_${requests.length}`;

    const request: IHistoryRequest = {
      id: String(requests.length),
      href: url,
      hrefHistory: hrefHistory,
      endpoint: form.endpoint,
      replacedEndpoint: replaceVariables(form?.endpoint as string, form.variables),
      method: 'GraphQL',
      data: new Date(),
      variables: form.variables,
      headers: form.headers,
      query: form.query,
      sdl: form.sdl || '',
    };
    setRequests((prev) => [request, ...prev]);
  };

  return { setHistoryRest, setHistoryGraph, getHistory: requests };
};

export default useHistoryService;
