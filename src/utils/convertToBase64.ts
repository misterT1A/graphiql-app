import type { IFormParams } from '@/types/restFullTypes';

import validateJson from './validateJson';

const convertToBase64 = (formsParams: IFormParams): string => {
  const endpoint = btoa(formsParams.endpoint).replace(/=+$/, '');

  const queryParams = new URLSearchParams();
  if (formsParams.headers) {
    Object.entries(formsParams.headers).forEach(([key, value]) => {
      queryParams.append(`h_${key}`, btoa(value).replace(/=+$/, ''));
    });
  }
  if (formsParams.variables) {
    Object.entries(formsParams.variables).forEach(([key, value]) => {
      queryParams.append(`v_${key}`, btoa(value).replace(/=+$/, ''));
    });
  }

  let body = '';
  const validatedBody = validateJson(formsParams.body);
  if (validatedBody) {
    body = '/' + btoa(validatedBody || '').replace(/=+$/, '');
  }

  return `/${formsParams.method}/${endpoint}${body}?${queryParams.toString()}`;
};

export default convertToBase64;
