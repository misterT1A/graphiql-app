import { type ReactElement } from 'react';

import RestFullClient from '@/components/RestFullClient/RestFullClient';
import getRestfullData from '@/services/getRestfullData';
import type { IInitParams, IPageProps } from '@/types/restFullTypes';
import decodingFromBase64 from '@/utils/decodingFromBase64';
import parseBody from '@/utils/parseBody';

const Page = async ({ params, searchParams }: IPageProps): Promise<ReactElement> => {
  let initData = undefined;

  if (params.slug) {
    const requestParams = decodingFromBase64(params.slug as unknown as string[], searchParams);
    const initFormData: IInitParams = { ...requestParams, body: parseBody(requestParams.body) };

    const response = await getRestfullData(requestParams);

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
