import { useTranslations } from 'next-intl';
import { useState, type ReactElement } from 'react';

import getGraphData from '@/services/getGraphData';
import type { IFormGraphEncrypt } from '@/types/graphTypes';
import type { IErrorObj } from '@/types/restFullTypes';
import type { FormGraphDataType } from '@/types/types';
import ResponseLoader from '@/ui/ResponseLoader/ResponseLoader';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesGraph } from '@/utils/replaceVariables';

import FormGraph from '../FormGraph/formGraph';

const GraphQLContent = ({ initParams }: { initParams?: FormGraphDataType }): ReactElement => {
  const t = useTranslations('GraphClient');
  const [response, setResponse] = useState<Response | undefined | IErrorObj>(undefined);
  // const [schema, setSchema] = useState<GraphQLSchema | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const sumbiteHandler = async (form: IFormGraphEncrypt): Promise<void> => {
    const replacedParams = replaceVariablesGraph(form);
    setIsLoading(true);
    const resp = await getGraphData(replacedParams);
    // const schemaResp = await getGraphSchema(form.endpoint);
    setIsLoading(false);
    setResponse(resp);

    // if (schemaResp) {
    //   setSchema(schemaResp);
    // }
  };

  return (
    <>
      <h1 className="text-center">{t('Title')}</h1>
      <FormGraph inputData={initParams} getData={sumbiteHandler} />
      {isLoading && <ResponseLoader />}
      {!isLoading && response && <ResponseView response={response} />}
      {/* {!isLoading && schema && <ResponseView response={schema.toConfig()} />} */}
    </>
  );
};

export default GraphQLContent;
