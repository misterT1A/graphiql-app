import type { IBody, IDecodingParams } from '@/types/restFullTypes';

const decodeBase64 = (str: string): string => {
  try {
    const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
    return atob(str + padding);
  } catch {
    console.log(`error decoding Base64: ${str}`);
    return '';
  }
};

const decodingFromBase64 = (slug: string[], query: { [key: string]: string }): IDecodingParams => {
  const headers: [string, string][] = [];

  Object.entries(query).forEach(([key, value]) => {
    headers.push([key, decodeURIComponent(value) || '']);
  });

  const endpoint = (slug && slug.find((elem) => decodeBase64(elem).startsWith('http'))) || '';
  const bodyJson = (slug && slug.find((elem) => decodeBase64(elem).startsWith('json_'))) || '';
  const bodyText = (slug && slug.find((elem) => decodeBase64(elem).startsWith('text_'))) || '';

  const body: IBody = bodyJson
    ? { type: 'json', value: decodeBase64(bodyJson).slice(5) }
    : bodyText
      ? { type: 'string', value: decodeBase64(bodyText).slice(5) }
      : { type: 'string', value: '' };

  const requestParams: IDecodingParams = {
    method: (slug && slug.find((elem) => ['GET', 'POST', 'PUT', 'DELETE'].includes(elem))) || '',
    endpoint: decodeBase64(endpoint),
    body: body,
    headers: Object.fromEntries(headers),
    variables: {},
  };

  return requestParams;
};

export default decodingFromBase64;
