'use client';

import { usePathname } from 'next/navigation';
import { useState, type ReactElement } from 'react';

import type { IErrorObj } from '@/services/getRestfullData';
import getRestfullData from '@/services/getRestfullData';
import type { IFormParams } from '@/types/restFullTypes';
import ResponseView from '@/ui/ResponseView/ResponseView';
import convertToBase64 from '@/utils/convertToBase64';

import ResponseLoader from '../../ui/ResponseLoader/ResponseLoader';
import FormRest from '../formRest/formRest';

const RestFullClient = ({
  initParams,
}: {
  initParams?: { initFormData: IFormParams; response: Response | IErrorObj };
}): ReactElement => {
  const path = usePathname();
  const [state, setState] = useState<Response | undefined | IErrorObj>(initParams?.response || undefined);
  const [isLoading, setLoading] = useState(false);

  const sumbiteHandler = async (form: IFormParams): Promise<void> => {
    const url = convertToBase64(form);
    setLoading(true);

    const newPath = path.split('/').slice(0, 3).join('/');
    window.history.pushState(null, '', `${newPath}${url}`);

    const resp = await getRestfullData({
      method: form.method,
      endpoint: form.endpoint,
      headers: form.headers,
      body: form.body,
    });

    setLoading(false);
    setState(resp);
  };

  return (
    <>
      <FormRest inputData={initParams?.initFormData} getDataHandler={sumbiteHandler} />
      {isLoading && <ResponseLoader />}
      {!isLoading && state && <ResponseView response={state as object} />}
    </>
  );
};

export default RestFullClient;
