'use server';

import type { IErrorObj, IRequestParams } from '@/types/restFullTypes';

const getRestfullData = async (requestParams: IRequestParams): Promise<Response | IErrorObj> => {
  const payloadObj = { method: requestParams.method, headers: requestParams.headers };
  if (requestParams.method !== 'GET') Object.assign(payloadObj, { body: requestParams.body });

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

export default getRestfullData;
