import type { RestAPI } from '@/types/types';
import { numberToMatrix } from '@/utils/number-to-matrix';

export function API(): RestAPI {
  const getData = async (
    inputData: { [key: string]: string },
    headersCount: number,
    bodyData: object,
  ): Promise<Response | unknown> => {
    console.log(bodyData); //DEBUG

    const keysArray: string[][] = numberToMatrix(headersCount);

    for (const key in inputData) {
      if (key.split('-')[0] === 'header') {
        keysArray[+key.split('-')[2] - 1].push(inputData[key]);
      }
    }

    try {
      const resp = await fetch(inputData.endpoint, {
        method: inputData.method,
        headers: Object.fromEntries(keysArray),
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

