import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';
import { useState } from 'react';

import getRestfullData from '@/services/getRestfullData';
import type { IErrorObj, IFormParams, IInitParams } from '@/types/restFullTypes';
import ResponseLoader from '@/ui/ResponseLoader/ResponseLoader';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesSybmitRest } from '@/utils/replaceVariables';

import FormRest from '../formRest/formRest';

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
      <h1 className="text-center text-2xl">{t('Title')}</h1>
      <FormRest inputData={initParams} getData={sumbiteHandler} />
      {isLoading && (
        <div className="w-full flex justify-center">
          <ResponseLoader />
        </div>
      )}
      {!isLoading && state && (
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-5 w-full sm:w-[64%]">
            <hr className="w-full" />
            <h2 className="text-xl">Response</h2>
            <ResponseView response={state as object} />
          </div>
        </div>
      )}
    </>
  );
};

export default RestFullContent;
