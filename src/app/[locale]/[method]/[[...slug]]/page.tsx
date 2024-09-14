import { notFound } from 'next/navigation';
import { type ReactElement } from 'react';

import RestFullClient from '@/components/RestFullClient/RestFullClient';
import { TEXT_CONTENT } from '@/constants/constants';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { IInitParams, IPageProps } from '@/types/restFullTypes';
import { decodingFromBase64Rest } from '@/utils/decodingFromBase64';
import parseBody from '@/utils/parseBody';

const initializeData = ({ params, searchParams }: IPageProps): IInitParams | IHistoryID | undefined => {
  if (!params.method && !params.slug && !Object.keys(searchParams).length) {
    return undefined;
  }
  const historyID = params.slug?.find((str) => str.startsWith('history_'));
  if (historyID) return { id: historyID.split('_')[1] };

  const requestParams = decodingFromBase64Rest(
    params.method as unknown as string,
    params.slug as unknown as string[],
    searchParams,
  );
  const initFormData: IInitParams = {
    ...requestParams,
    body: parseBody(requestParams.body) || {},
  };

  if (!Object.keys(initFormData.headers).length) initFormData.headers = { '': '' };
  if (!Object.keys(initFormData.variables).length) initFormData.variables = { varName: 'testValue' };

  return initFormData;
};

const Page = ({ params, searchParams }: IPageProps): ReactElement => {
  if (!params.method || !TEXT_CONTENT.methodValues.includes(params.method)) {
    notFound();
  }

  const initData = initializeData({ params, searchParams });

  return <RestFullClient initParams={initData} />;
};

export default Page;
