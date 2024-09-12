'use client';

import { useTranslations } from 'next-intl';
import { useState, type ReactElement } from 'react';

import getRestfullData from '@/services/getRestfullData';
import type { IErrorObj, IFormParams, IInitParams } from '@/types/restFullTypes';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesSybmitRest } from '@/utils/replaceVariables';

import ResponseLoader from '../../ui/ResponseLoader/ResponseLoader';
import FormRest from '../formRest/formRest';

const RestFullClient = ({ initParams }: { initParams?: IInitParams }): ReactElement => {
  const t = useTranslations('RestClient');
  const [state, setState] = useState<Response | undefined | IErrorObj>(undefined);
  const [isLoading, setIsLoading] = useState(false);

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
      <FormRest inputData={initParams} getData={sumbiteHandler} />
      {isLoading && <ResponseLoader />}
      {!isLoading && state && <ResponseView response={state as object} />}
    </>
  );
};

export default RestFullClient;
