'use server';

import type { IErrorObj, IRequestParams } from '@/types/restFullTypes';
import { redirectIfNotAuthenticated } from '@/utils/redirectIfNotAuthenticated';

const getRestfullData = async (requestParams: IRequestParams): Promise<Response | IErrorObj> => {
  await redirectIfNotAuthenticated();

  const payloadObj = { method: requestParams.method, headers: requestParams.headers };
  if (requestParams.method !== 'GET' && requestParams.method !== 'HEAD') {
    Object.assign(payloadObj, { body: requestParams.body });
  }
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
    if (requestParams.method === 'HEAD' || requestParams.method === 'OPTIONS') {
      const headersObj: { [key: string]: string } = {
        status: String(response.status),
      };
      response.headers.forEach((value, key) => {
        headersObj[key] = value;
      });
      return headersObj;
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
