'use server';

import type { IRequestParams } from '@/types/restFullTypes';
export interface IErrorObj {
  status?: number;
  statusText?: string;
  url?: string;
  headers?: Headers;
  errorName?: string;
  errorMessage?: string;
}

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
    return response.json();
  } catch (e: unknown) {
    return e instanceof Error
      ? { errorName: e.name, errorMessage: e.message }
      : { errorMessage: 'An unknown error occurred' };
  }
};

export default getRestfullData;
