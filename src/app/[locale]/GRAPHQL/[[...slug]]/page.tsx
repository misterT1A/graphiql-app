import { type ReactElement } from 'react';

import GraphQLClient from '@/components/GraphQLClient/GraphQLClient';
import type { IFormGraph } from '@/types/graphTypes';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { IPageProps } from '@/types/restFullTypes';
import { decodingFromBase64Graph } from '@/utils/decodingFromBase64';

const initializeData = ({
  params,
  searchParams,
}: IPageProps): IFormGraph | IHistoryID | { headers: object; variables: object } => {
  if (!params.slug && !Object.keys(searchParams).length) {
    return { headers: { '': '' }, variables: { var_name: 'test_value' } };
  }

  const historyID = params.slug?.find((str) => str.startsWith('history_'));
  if (historyID) return { id: historyID.split('_')[1] };

  const requestParams = decodingFromBase64Graph(params.slug as unknown as string[], searchParams);
  return requestParams;
};

const Page = ({ params, searchParams }: IPageProps): ReactElement => {
  const initData = initializeData({ params, searchParams }) as IFormGraph;

  if (!Object.keys(initData?.variables || {}).length) initData.variables = { var_name: 'test_value' };

  return <GraphQLClient initParams={initData} />;
};

export default Page;
