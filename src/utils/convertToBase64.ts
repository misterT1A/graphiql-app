import type { IFormParams } from '@/types/types';

const convertToBase64 = (formsParams: IFormParams): string => {
  const endpoint = btoa(formsParams.endpoint);

  const queryParams = new URLSearchParams();
  if (formsParams.headers) {
    Object.entries(formsParams.headers).forEach(([key, value]) => {
      queryParams.append(key, btoa(value).replace(/=+$/, ''));
    });
  }
  console.log('query', queryParams.get('Content-type'));
  const resultUrl = `/${formsParams.method}/${endpoint}?${queryParams.toString()}`;
  return resultUrl;
};

export default convertToBase64;
