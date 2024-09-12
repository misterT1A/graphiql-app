import type { IFormGraphEncrypt } from '@/types/graphTypes';
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

const convertEndpoint = (value: string): string => {
  return value && convertToBase64(value) && `/${convertToBase64(value)}`;
};

export const buildURLRest = (params: IEncryptParams, isBodyText = false): string => {
  const method = params.method && `/${params.method}`;
  const endopints = convertEndpoint(params.endpoint);
  const bodyJSON = Object.keys(codeMirrorParser(params.bodyJSON) || {}).length
    ? `/${convertToBase64('json_' + JSON.stringify(codeMirrorParser(params.bodyJSON as string)))}`
    : '';
  const bodyText = params.bodyText && `/${convertToBase64('text_' + params.bodyText)}`;
  const headers = params.headers && encryptHeadersToBase64(params.headers);
  return `${params.startUrl}${method}${endopints}${isBodyText ? bodyText : bodyJSON}${headers}`;
};

export const buildURLGraph = (params: IFormGraphEncrypt): string => {
  const endopints = convertEndpoint(params.endpoint);
  const bodyJSON = params.query && `/${convertToBase64('query_' + params.query)}`;

  const headers = params.headers && encryptHeadersToBase64(params.headers);
  return `${params.startUrl}${endopints}${bodyJSON}${headers}`;
};
