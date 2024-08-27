import type { IFormParams } from '@/types/restFullTypes';

const convertToBase64 = (formsParams: IFormParams): string => {
  const endpoint = btoa(formsParams.endpoint).replace(/=+$/, '');

  const queryParams = new URLSearchParams();
  if (formsParams.headers) {
    Object.entries(formsParams.headers).forEach(([key, value]) => {
      queryParams.append(key, btoa(value).replace(/=+$/, ''));
    });
  }

  let body = '';

  if (formsParams.body) {
    body = '/' + btoa(formsParams.body).replace(/=+$/, '');
  }

  const resultUrl = `/${formsParams.method}/${endpoint}${body}?${queryParams.toString()}`;
  return resultUrl;
};

export default convertToBase64;
