import { type ReactElement } from 'react';

import RestFullClient from '@/components/RestFullClient/RestFullClient';
import type { IInitParams, IPageProps } from '@/types/restFullTypes';
import { decodingFromBase64Rest } from '@/utils/decodingFromBase64';
import parseBody from '@/utils/parseBody';

const initializeData = ({ params, searchParams }: IPageProps): IInitParams | undefined => {
  if (!params.method && !params.slug && !Object.keys(searchParams).length) {
    return undefined;
  }

  const requestParams = decodingFromBase64Rest(params.method as unknown as string, params.slug as unknown as string[], searchParams);
  const initFormData: IInitParams = { ...requestParams, body: parseBody(requestParams.body) || {} };

  return initFormData;
};

const Page = ({ params, searchParams }: IPageProps): ReactElement => {
  const initData = initializeData({ params, searchParams });

  return (
    <>
      <h1 className="text-center">RestFull client</h1>
      <RestFullClient initParams={initData} />
    </>
  );
};

export default Page;
