import { type ReactElement } from 'react';

import RestFullClient from '@/components/RestFullClient/RestFullClient';
import getRestfullData from '@/services/getRestfullData';
import type { IErrorObj, IInitParams, IPageProps } from '@/types/restFullTypes';
import decodingFromBase64 from '@/utils/decodingFromBase64';
import parseBody from '@/utils/parseBody';

const initializeData = async ({
  params,
  searchParams,
}: IPageProps): Promise<{ initFormData: IInitParams; response: Response | IErrorObj } | undefined> => {
  if (!params.slug && !searchParams) {
    return undefined;
  }

  const requestParams = decodingFromBase64(params.slug as unknown as string[], searchParams);
  const initFormData: IInitParams = { ...requestParams, body: parseBody(requestParams.body) };
  const response = await getRestfullData(requestParams);

  return { initFormData, response };
};

const Page = async ({ params, searchParams }: IPageProps): Promise<ReactElement> => {
  const initData = await initializeData({ params, searchParams });

  return (
    <>
      <h1 className="text-center">RestFull client</h1>
      <RestFullClient initParams={initData} />
    </>
  );
};

export default Page;
