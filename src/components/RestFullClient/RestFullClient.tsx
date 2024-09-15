'use client';

import { useMemo, type ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { IInitParams } from '@/types/restFullTypes';
import { getHistoryInitParamsRest } from '@/utils/historyHelpers';

import RestFullContent from './RestFullContent';

const RestFullClient = ({ initParams }: { initParams?: IInitParams | IHistoryID }): ReactElement => {
  const { user } = useAuth();
  const formParams = useMemo(() => getHistoryInitParamsRest(initParams, user?.displayName || ''), [initParams, user]);

  return <RestFullContent initParams={formParams} />;
};

export default RestFullClient;
