'use server';

import type { IGraphRequestParams } from '@/types/graphTypes';
import type { IErrorObj } from '@/types/restFullTypes';

const getGraphData = async (requestParams: IGraphRequestParams): Promise<Response | IErrorObj> => {
  const payloadObj = {
    method: 'POST',
    headers: requestParams.headers,
    body: JSON.stringify({ query: requestParams.query }),
  };

  try {
    const response = await fetch(requestParams.endpoint, payloadObj);

    if (!response.ok) {
      const errorObj = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: response.headers,
      };
      return errorObj;
    }

    const responseObj = {
      status: response.status,
      statusText: response.statusText,
      body: await response.json(),
      url: response.url,
    };

    return responseObj;
  } catch (e: unknown) {
    return e instanceof Error
      ? { errorName: e.name, errorMessage: e.message }
      : { errorMessage: 'An unknown error occurred' };
  }
};

export default getGraphData;
