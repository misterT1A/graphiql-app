import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';
import { useState } from 'react';

import getRestfullData from '@/services/getRestfullData';
import type { IErrorObj, IFormParams, IInitParams } from '@/types/restFullTypes';
import ResponseLoader from '@/ui/ResponseLoader/ResponseLoader';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesSybmitRest } from '@/utils/replaceVariables';

import FormRest from '../FormRest/formRest';

const RestFullContent = ({ initParams }: { initParams?: IInitParams }): ReactElement => {
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

export default RestFullContent;
