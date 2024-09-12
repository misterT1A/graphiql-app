import { type ReactElement } from 'react';

import GraphQLClient from '@/components/GraphQLClient/GraphQLClient';
import type { IFormGraph } from '@/types/graphTypes';
import type { IPageProps } from '@/types/restFullTypes';
import { decodingFromBase64Graph } from '@/utils/decodingFromBase64';

const initializeData = ({ params, searchParams }: IPageProps): IFormGraph | undefined => {
  if (!params.slug && !Object.keys(searchParams).length) {
    return undefined;
  }

  const requestParams = decodingFromBase64Graph(params.slug as unknown as string[], searchParams);
  return requestParams;
};

const Page = ({ params, searchParams }: IPageProps): ReactElement => {
  const initData = initializeData({ params, searchParams });

  return <GraphQLClient initParams={initData} />;
};

export default Page;