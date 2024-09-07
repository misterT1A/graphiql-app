import type { IEncryptParams } from '@/types/restFullTypes';

import { codeMirrorParser } from './codeMirrorParser';

export const convertToBase64 = (value: string): string => {
  try {
    return btoa(value).replace(/=+$/, '');
  } catch {
    return '';
  }
};

export const encryptHeadersToBase64 = (headers: { key: string; value: string }[]): string => {
  const queryParams = new URLSearchParams();

  headers.forEach(({ key, value }) => {
    if (convertToBase64(key) || value) {
      queryParams.append(key, encodeURIComponent(value));
    }
  });
  return queryParams.size ? `?${queryParams.toString()}` : '';
};

export const buildURL = (params: IEncryptParams, isBodyText = false): string => {
  const method = params.method && `/${params.method}`;
  const endopints = params.endpoint && convertToBase64(params.endpoint) && `/${convertToBase64(params.endpoint)}`;
  const bodyJSON = Object.keys(codeMirrorParser(params.bodyJSON) || {}).length
    ? `/${convertToBase64('json_' + JSON.stringify(codeMirrorParser(params.bodyJSON as string)))}`
    : '';
  const bodyText = params.bodyText && `/${convertToBase64('text_' + params.bodyText)}`;
  const headers = params.headers && encryptHeadersToBase64(params.headers);
  return `${params.startUrl}${method}${endopints}${isBodyText ? bodyText : bodyJSON}${headers}`;
};
