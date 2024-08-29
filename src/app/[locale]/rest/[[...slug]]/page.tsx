import { type ReactNode } from 'react';

import FormRest from '@/components/formRest/formRest';
import type { IPageProps, IRequestParams } from '@/types/restFullTypes';
import ResponseView from '@/ui/ResponseView/ResponseView';
import decodingFromBase64 from '@/utils/decodingFromBase64';

const sendRequest = async (requestParams: IRequestParams): Promise<Response | string> => {
  const payloadObj = { method: requestParams.method, headers: requestParams.headers };
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
  if (params.slug) {
    const requestParams: IRequestParams = decodingFromBase64(params.slug as unknown as string[], searchParams);

    response = await sendRequest(requestParams);
  }

  return (
    <>
      <h1>rest</h1>
      <FormRest
        inputData={{
          endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
          method: 'GET',
          body: { shrek: 'top' },
          headers: {
            'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
            'Content-Type': 'application/json',
          },
        }}
      />
      <ResponseView response={response} />
    </>
  );
};

export default Page;
