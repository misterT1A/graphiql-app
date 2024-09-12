import { LSHistoryName } from '@/constants/constants';
import type { IHistoryID, IHistoryRequest } from '@/types/historyServiceTypes';
import { instanceOfHistory } from '@/types/historyServiceTypes';
import type { IInitParams } from '@/types/restFullTypes';
import type { FormGraphDataType } from '@/types/types';

import parseBody from './parseBody';

const getHistoryFromLS = (): IHistoryRequest[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const allhistory = JSON.parse(window.localStorage.getItem(LSHistoryName) || '[]') || [];
  return allhistory;
};

const geHistoryInitParamsRest = (initParams: IInitParams | IHistoryID | undefined): IInitParams | undefined => {
  const hasHistory = instanceOfHistory(initParams || {});
  let historyParams: IInitParams | undefined = undefined;
  if (hasHistory) {
    const historyItem = getHistoryFromLS()?.find((item) => item.id === (initParams as IHistoryID).id);
    historyParams = {
      endpoint: historyItem?.endpoint || '',
      headers: historyItem?.headers || {},
      variables: historyItem?.variables || {},
      method: historyItem?.method || '',
      body: parseBody(historyItem?.body || { type: 'json', value: '' }) || {},
    };
    setTimeout(() => window.history.pushState(null, '', historyItem?.href), 50);

    return historyParams;
  }

  return initParams as IInitParams;
};

const geHistoryInitParamsGraph = (
  initParams: FormGraphDataType | IHistoryID | undefined,
): FormGraphDataType | undefined => {
  const hasHistory = instanceOfHistory(initParams || {});
  let historyParams: FormGraphDataType | undefined = undefined;
  if (hasHistory) {
    const historyItem = getHistoryFromLS()?.find((item) => item.id === (initParams as IHistoryID).id);
    historyParams = {
      endpoint: historyItem?.endpoint || '',
      headers: historyItem?.headers || {},
      variables: historyItem?.variables || {},
      sdl: historyItem?.sdl || '',
      query: historyItem?.query || '',
      schema: historyItem?.schema || {},
    };
    setTimeout(() => window.history.pushState(null, '', historyItem?.href), 50);

    return historyParams;
  }

  return initParams as FormGraphDataType;
};

const removeQuotesBody = (value: string): string => {
  return value?.replace(/"({{.*?}})":/g, '$1:');
};

export { geHistoryInitParamsRest, geHistoryInitParamsGraph, removeQuotesBody };
