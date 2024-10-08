import { notFound } from 'next/navigation';

import type { IFormGraph } from '@/types/graphTypes';
import type { IBody, IDecodingParams } from '@/types/restFullTypes';

const decodeBase64 = (str: string): string => {
  try {
    const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
    return atob(str + padding);
  } catch {
    notFound();
  }
};

const decodingFromBase64Rest = (method: string, slug: string[], query: { [key: string]: string }): IDecodingParams => {
  const headers: [string, string][] = [];

  Object.entries(query).forEach(([key, value]) => {
    try {
      headers.push([key, decodeURIComponent(value)]);
    } catch {
      notFound();
    }
  });

  const endpoint = (slug && slug.find((elem) => decodeBase64(elem)?.startsWith('http'))) || '';
  const bodyJson = (slug && slug.find((elem) => decodeBase64(elem)?.startsWith('json_'))) || '';
  const bodyText = (slug && slug.find((elem) => decodeBase64(elem)?.startsWith('text_'))) || '';

  const body: IBody = bodyJson
    ? { type: 'json', value: decodeBase64(bodyJson).slice(5) }
    : bodyText
      ? { type: 'string', value: decodeBase64(bodyText).slice(5) }
      : { type: 'string', value: '' };

  const requestParams: IDecodingParams = {
    method: (method && ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].includes(method) && method) || '',
    endpoint: decodeBase64(endpoint),
    body: body,
    headers: Object.fromEntries(headers),
    variables: {},
  };

  return requestParams;
};

const decodingFromBase64Graph = (slug: string[], query: { [key: string]: string }): IFormGraph => {
  const arrHeaders = Object.entries(query).map(([key, value]) => {
    try {
      return [key, decodeURIComponent(value)];
    } catch {
      notFound();
    }
  });

  const endpoint = (slug && slug.find((elem) => decodeBase64(elem).startsWith('http'))) || '';
  const body = (slug && slug.find((elem) => decodeBase64(elem).startsWith('query_'))) || '';

  return {
    endpoint: decodeBase64(endpoint),
    query: decodeBase64(body).slice(6),
    headers: Object.fromEntries(arrHeaders),
    variables: {},
    sdl: '',
  };
};

export { decodingFromBase64Rest, decodingFromBase64Graph };
