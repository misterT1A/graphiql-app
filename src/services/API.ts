import type { FormRestType, RestAPI } from '@/types/types';

export function API(): RestAPI {
  const getData = async (
    inputData: FormRestType,
    headers: { [key: string]: string },
    bodyData: object,
  ): Promise<Response | unknown> => {
    console.log(bodyData); //DEBUG

    try {
      const resp = await fetch(inputData.endpoint, {
        method: inputData.method,
        headers: headers,
      });
      return resp.json();
    } catch (error) {
      return error;
    }
  };

  return Object.freeze({
    getData,
  });
}

