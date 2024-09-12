'use client';

import { useTranslations } from 'next-intl';
import { useState, type ReactElement } from 'react';

import { useHistoryService } from '@/hooks';
import getRestfullData from '@/services/getRestfullData';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { IErrorObj, IFormParams, IInitParams } from '@/types/restFullTypes';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesSybmitRest } from '@/utils/replaceVariables';

import ResponseLoader from '../../ui/ResponseLoader/ResponseLoader';
import FormRest from '../formRest/formRest';

const RestFullClient = ({ initParams }: { initParams?: IInitParams | IHistoryID }): ReactElement => {
  const { geHistoryInitParams } = useHistoryService();
  const t = useTranslations('RestClient');
  const [state, setState] = useState<Response | undefined | IErrorObj>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const formParams = geHistoryInitParams(initParams);
  // let historyParams: IInitParams | undefined = undefined;
  // const hasHistory = instanceOfHistory(initParams || {});
  // if (hasHistory) {
  //   const historyItem = getHistory.find((item) => item.id === (initParams as IHistoryID).id);
  //   historyParams = {
  //     endpoint: historyItem?.endpoint || '',
  //     headers: historyItem?.headers || {},
  //     variables: historyItem?.variables || {},
  //     method: historyItem?.method || '',
  //     body: parseBody(historyItem?.body || { type: 'json', value: '' }) || {},
  //   };
  //   window.history.pushState(null, '', historyItem.);
  // }

  const sumbiteHandler = async (form: IFormParams): Promise<void> => {
    const replacedParams = replaceVariablesSybmitRest(form);
    setIsLoading(true);
    const resp = await getRestfullData(replacedParams);
    setIsLoading(false);
    setState(resp);
  };

  return (
    <>
      <h1 className="text-center">{t('Title')}</h1>
      <FormRest inputData={formParams} getData={sumbiteHandler} />
      {isLoading && <ResponseLoader />}
      {!isLoading && state && <ResponseView response={state as object} />}
    </>
  );
};

export default RestFullClient;
