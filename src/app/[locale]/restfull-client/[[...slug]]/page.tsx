import { type ReactElement } from 'react';

import RestFullClient from '@/components/RestFullClient/RestFullClient';
import getRestfullData from '@/services/getRestfullData';
import type { IPageProps } from '@/types/restFullTypes';
import decodingFromBase64 from '@/utils/decodingFromBase64';
import prettyBodyJson from '@/utils/prettyBodyJson';
import replaceVariables from '@/utils/replaceVariables';

const Page = async ({ params, searchParams }: IPageProps): Promise<ReactElement> => {
  let initData = undefined;

  if (params.slug) {
    const requestParams = decodingFromBase64(params.slug as unknown as string[], searchParams);
    const initFormData = { ...requestParams, body: requestParams.body ? prettyBodyJson(requestParams.body) : '' };
    const replacedParams = replaceVariables(requestParams, requestParams.variables);

    const response = await getRestfullData(replacedParams);

    initData = {
      initFormData,
      response,
    };
  }

  return (
    <>
      <h1 className="text-center">RestFull client</h1>
      <RestFullClient initParams={initData} />
    </>
  );
};

export default Page;
