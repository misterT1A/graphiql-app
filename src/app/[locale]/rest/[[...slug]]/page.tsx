import { type ReactNode } from 'react';

import FormRest from '@/components/formRest/formRest';
import type { IFormParams, IPageProps, IRequestParams } from '@/types/restFullTypes';
import ResponseView from '@/ui/ResponseView/ResponseView';
import decodingFromBase64 from '@/utils/decodingFromBase64';
import prettyBodyJson from '@/utils/prettyBodyJson';
import replaceVariables from '@/utils/replaceVariables';

const sendRequest = async (requestParams: IRequestParams): Promise<Response | string> => {
  const payloadObj = { method: requestParams.method, headers: requestParams.headers, next: { revalidate: 5 } };
  if (requestParams.method !== 'GET') Object.assign(payloadObj, { body: requestParams.body });

  try {
    const response = await fetch(requestParams.endpoint, payloadObj);
    if (!response.ok) {
      const errorText = await response.text();
      return errorText;
    }
    return response.json();
  } catch (e: unknown) {
    return e instanceof Error ? e.message : 'An unknown error occurred';
  }
};

const Page = async ({ params, searchParams }: IPageProps): Promise<ReactNode> => {
  let response = {};
  let requestParams = {} as IFormParams;
  let initFormData: IFormParams | undefined = undefined;

  if (params.slug) {
    requestParams = decodingFromBase64(params.slug as unknown as string[], searchParams);
    initFormData = { ...requestParams, body: prettyBodyJson(requestParams.body) };
    const replacedParams = replaceVariables(requestParams, requestParams.variables);
    response = await sendRequest(replacedParams);
  }

  return (
    <>
      <h1>rest</h1>
      <FormRest inputData={initFormData} />
      <ResponseView response={response} />
    </>
  );
};

export default Page;
