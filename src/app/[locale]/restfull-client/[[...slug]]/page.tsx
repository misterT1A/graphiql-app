import { type ReactElement } from 'react';

import RestFullClient from '@/components/RestFullClient/RestFullClient';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { IInitParams, IPageProps } from '@/types/restFullTypes';
import decodingFromBase64 from '@/utils/decodingFromBase64';
import parseBody from '@/utils/parseBody';

const initializeData = ({ params, searchParams }: IPageProps): IInitParams | IHistoryID | undefined => {
  if (!params.slug && !Object.keys(searchParams).length) {
    return undefined;
  }
  const historyID = params.slug?.find((str) => str.startsWith('history_'));
  if (historyID) return { id: historyID.split('_')[1] };

  const requestParams = decodingFromBase64(params.slug as unknown as string[], searchParams);
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
