'use client';

import { type ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { FormGraphDataType } from '@/types/types';
import { geHistoryInitParamsGraph } from '@/utils/historyHelpers';

import GraphQLContent from './GraphQLContent';

const GraphQLClient = ({ initParams }: { initParams?: FormGraphDataType | IHistoryID }): ReactElement => {
  const { user } = useAuth();
  const formParams = geHistoryInitParamsGraph(initParams, user?.displayName || '');

  return <GraphQLContent initParams={formParams} />;
};

export default GraphQLClient;
