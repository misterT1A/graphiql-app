// import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LSHistoryName } from '@/constants/constants';
// import { usePathnameIntl } from '@/navigation';
import {
  // instanceOfHistory,
  type IFormParams,
  // type IHistoryID,
  type IHistoryRequest,
  type IReturnType,
} from '@/types/historyServiceTypes';
// import type { IInitParams } from '@/types/restFullTypes';
// import { buildURLRest } from '@/utils/encryptHelpers';
import { InputsArrayToObject } from '@/utils/InputsArrayToObject';
// import parseBody from '@/utils/parseBody';
import { replaceVariables } from '@/utils/replaceVariables';

const useHistoryService = (): IReturnType => {
  // const path = usePathname();
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

  const setHistory = (form: IFormParams, method: string): void => {
    // const isBodyJson = form.body.type === 'json';
    // const url = buildURLRest(
    //   {
    //     startUrl: `${window.location.origin}/${path.split('/')[1]}`,
    //     ...form,
    //     bodyJSON: isBodyJson ? form.body.value : '',
    //     bodyText: isBodyJson ? '' : form.body.value,
    //   },
    //   !isBodyJson,
    // );
    const url = window.location.href;
    const hrefHistory = `/GET/history_${requests.length}`;

    const request: IHistoryRequest = {
      id: String(requests.length),
      href: url,
      hrefHistory: hrefHistory,
      endpoint: form.endpoint,
      replacedEndpoint: replaceVariables(form?.endpoint as string, form?.variables),
      method,
      data: new Date(),
      variables: form.variables,
      headers: InputsArrayToObject(form.headers),
      body: form.body,
    };
    setRequests((prev) => [request, ...prev]);
  };

  // const geHistoryInitParams = (initParams: IInitParams | IHistoryID | undefined): IInitParams | undefined => {
  //   console.log('get');
  //   const hasHistory = instanceOfHistory(initParams || {});
  //   let historyParams: IInitParams | undefined = undefined;
  //   if (hasHistory) {
  //     const historyItem = requests.find((item) => item.id === (initParams as IHistoryID).id);
  //     historyParams = {
  //       endpoint: historyItem?.endpoint || '',
  //       headers: historyItem?.headers || {},
  //       variables: historyItem?.variables || {},
  //       method: historyItem?.method || '',
  //       body: parseBody(historyItem?.body || { type: 'json', value: '' }) || {},
  //     };
  //     setTimeout(() => window.history.pushState(null, '', historyItem?.href), 50);

  //     return historyParams;
  //   }
  //   return initParams as IInitParams;
  // };

  return { setHistory, getHistory: requests };
};

export default useHistoryService;
