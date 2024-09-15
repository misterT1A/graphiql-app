'use client';

import { useMemo, type ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { FormGraphDataType } from '@/types/types';
import { getHistoryInitParamsGraph } from '@/utils/historyHelpers';

import GraphQLContent from './GraphQLContent';

const GraphQLClient = ({ initParams }: { initParams?: FormGraphDataType | IHistoryID }): ReactElement => {
  const { user } = useAuth();
  const formParams = useMemo(() => getHistoryInitParamsGraph(initParams, user?.displayName || ''), [initParams, user]);

  return <GraphQLContent initParams={formParams} />;
};

export default GraphQLClient;
