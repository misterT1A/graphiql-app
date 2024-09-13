'use client';

import { type ReactElement } from 'react';

import type { IHistoryID } from '@/types/historyServiceTypes';
import type { FormGraphDataType } from '@/types/types';
import { geHistoryInitParamsGraph } from '@/utils/historyHelpers';

import GraphQLContent from './GraphQLContent';

const GraphQLClient = ({ initParams }: { initParams?: FormGraphDataType | IHistoryID }): ReactElement => {
  const formParams = geHistoryInitParamsGraph(initParams);

  return <GraphQLContent initParams={formParams} />;
};

export default GraphQLClient;
