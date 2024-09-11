'use client';

import { useState, type ReactElement } from 'react';

// import getRestfullData from '@/services/getRestfullData';
// import ResponseView from '@/ui/ResponseView/ResponseView';
// import { replaceVariablesSybmit } from '@/utils/replaceVariables';

// import ResponseLoader from '../../ui/ResponseLoader/ResponseLoader';
import getGraphData from '@/services/getGraphData';
import type { IFormGraph } from '@/types/graphTypes';
import type { IErrorObj } from '@/types/restFullTypes';
import type { FormGraphDataType } from '@/types/types';
import ResponseLoader from '@/ui/ResponseLoader/ResponseLoader';
import ResponseView from '@/ui/ResponseView/ResponseView';

import FormGraph from '../FormGraph/formGraph';

const GraphQLClient = ({ initParams }: { initParams?: FormGraphDataType }): ReactElement => {
  const [state, setState] = useState<Response | undefined | IErrorObj>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const sumbiteHandler = async (form: IFormGraph): Promise<void> => {
    // const replacedParams = replaceVariablesSybmit(form);
    setIsLoading(true);
    const resp = await getGraphData(form);
    setIsLoading(false);
    setState(resp);
  };

  return (
    <>
      <FormGraph inputData={initParams} getData={sumbiteHandler} />
      {isLoading && <ResponseLoader />}
      {!isLoading && state && <ResponseView response={state as object} />}
    </>
  );
};

export default GraphQLClient;
