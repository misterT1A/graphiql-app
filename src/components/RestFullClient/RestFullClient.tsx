'use client';

import { type ReactElement } from 'react';

import { useAuth } from '@/context/AuthContext';
import type { IHistoryID } from '@/types/historyServiceTypes';
import type { IInitParams } from '@/types/restFullTypes';
import { geHistoryInitParamsRest } from '@/utils/historyHelpers';

import RestFullContent from './RestFullContent';

const RestFullClient = ({ initParams }: { initParams?: IInitParams | IHistoryID }): ReactElement => {
  const { user } = useAuth();

  const formParams = geHistoryInitParamsRest(initParams, user?.displayName || '');

  return <RestFullContent initParams={formParams} />;
};

export default RestFullClient;
