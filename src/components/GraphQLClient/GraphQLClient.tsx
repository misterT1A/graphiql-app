'use client';

import { useState, type ReactElement } from 'react';

import getRestfullData from '@/services/getRestfullData';
import type { IErrorObj, IFormParams, IInitParams } from '@/types/restFullTypes';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesSybmit } from '@/utils/replaceVariables';

import ResponseLoader from '../../ui/ResponseLoader/ResponseLoader';
import FormRest from '../formRest/formRest';

const GraphQLClient = ({
  initParams,
}: {
  initParams?: { initFormData: IInitParams; response: Response | IErrorObj };
}): ReactElement => {
  const [state, setState] = useState<Response | undefined | IErrorObj>(initParams?.response || undefined);
  const [isLoading, setIsLoading] = useState(false);

  const sumbiteHandler = async (form: IFormParams): Promise<void> => {
    const replacedParams = replaceVariablesSybmit(form);
    setIsLoading(true);
    const resp = await getRestfullData(replacedParams);
    setIsLoading(false);
    setState(resp);
  };

  return (
    <>
      <FormRest inputData={initParams?.initFormData} getData={sumbiteHandler} />
      {isLoading && <ResponseLoader />}
      {!isLoading && state && <ResponseView response={state as object} />}
    </>
  );
};

export default GraphQLClient;
