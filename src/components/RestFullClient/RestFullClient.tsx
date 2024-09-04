'use client';

import { useState, type ReactElement } from 'react';

import type { IErrorObj } from '@/services/getRestfullData';
import getRestfullData from '@/services/getRestfullData';
import type { IFormParams, IInitParams } from '@/types/restFullTypes';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesSybmit } from '@/utils/replaceVariables';

import ResponseLoader from '../../ui/ResponseLoader/ResponseLoader';
import FormRest from '../formRest/formRest';

const RestFullClient = ({
  initParams,
}: {
  initParams?: { initFormData: IInitParams; response: Response | IErrorObj };
}): ReactElement => {
  const [state, setState] = useState<Response | undefined | IErrorObj>(initParams?.response || undefined);
  const [isLoading, setLoading] = useState(false);

  const sumbiteHandler = async (form: IFormParams): Promise<void> => {
    const replacedParams = replaceVariablesSybmit(form);
    setLoading(true);

    const resp = await getRestfullData(replacedParams);

    setLoading(false);
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

export default RestFullClient;
