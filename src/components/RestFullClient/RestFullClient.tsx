'use client';

import { type ReactElement } from 'react';

import type { IHistoryID } from '@/types/historyServiceTypes';
import type { IInitParams } from '@/types/restFullTypes';
import { geHistoryInitParamsRest } from '@/utils/historyHelpers';

import RestFullContent from './RestFullContent';

const RestFullClient = ({ initParams }: { initParams?: IInitParams | IHistoryID }): ReactElement => {
  const formParams = geHistoryInitParamsRest(initParams);

  return <RestFullContent initParams={formParams} />;
};

export default RestFullClient;
