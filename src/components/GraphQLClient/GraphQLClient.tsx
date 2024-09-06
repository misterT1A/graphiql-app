'use client';

import { type ReactElement } from 'react';

// import getRestfullData from '@/services/getRestfullData';
// import ResponseView from '@/ui/ResponseView/ResponseView';
// import { replaceVariablesSybmit } from '@/utils/replaceVariables';

// import ResponseLoader from '../../ui/ResponseLoader/ResponseLoader';
import type { IErrorObj } from '@/types/restFullTypes';
import type { FormGraphDataType } from '@/types/types';

import FormGraph from '../FormGraph/formGraph';

const GraphQLClient = ({
  initParams,
}: {
  initParams?: { initFormData: FormGraphDataType; response: Response | IErrorObj };
}): ReactElement => {
  // const [state, setState] = useState<Response | undefined | IErrorObj>(initParams?.response || undefined);
  // const [isLoading, setIsLoading] = useState(false);

  // const sumbiteHandler = async (form: IFormParams): Promise<void> => {
  //   const replacedParams = replaceVariablesSybmit(form);
  //   setIsLoading(true);
  //   const resp = await getRestfullData(replacedParams);
  //   setIsLoading(false);
  //   setState(resp);
  // };

  return (
    <>
      <FormGraph
        inputData={initParams?.initFormData}
        // getData={sumbiteHandler}
      />
      {/* {isLoading && <ResponseLoader />}
      {!isLoading && state && <ResponseView response={state as object} />} */}
    </>
  );
};

export default GraphQLClient;
