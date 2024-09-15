'use server';

import type { IFormGraphEncrypt } from '@/types/graphTypes';
import type { IErrorObj } from '@/types/restFullTypes';
import { InputsArrayToObject } from '@/utils/InputsArrayToObject';
import { redirectIfNotAuthenticated } from '@/utils/redirectIfNotAuthenticated';

const getGraphData = async (requestParams: IFormGraphEncrypt): Promise<Response | IErrorObj> => {
  await redirectIfNotAuthenticated();

  const payloadObj = {
    method: 'POST',
    headers: InputsArrayToObject(requestParams.headers),
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
