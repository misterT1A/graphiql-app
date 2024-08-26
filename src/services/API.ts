import type { FormRestType, RestAPI } from '@/types/types';

export function API(): RestAPI {
  const getData = async (
    inputData: FormRestType,
    headers: { [key: string]: string },
    bodyData: object,
  ): Promise<Response | unknown> => {
    const payloadObj = { method: inputData.method, headers: headers };
    if (inputData.method !== 'GET') Object.assign(payloadObj, { body: JSON.stringify(bodyData) });

    try {
      const resp = await fetch(inputData.endpoint, payloadObj);
      return resp.json();
    } catch (error) {
      return error;
    }
  };

  return Object.freeze({
    getData,
  });
}

