import type { IRequestParams } from '@/types/restFullTypes';

const decodeBase64 = (str: string): string | null => {
  try {
    const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
    return atob(str + padding);
  } catch {
    console.log(`error decoding Base64: ${str}`);
    return null;
  }
};

const decodingFromBase64 = (slug: string[], headers: { [key: string]: string }): IRequestParams => {
  const headersParams = Object.entries(headers).map(([key, value]) => [key, decodeBase64(value)]);
  const requestParams: IRequestParams = {
    method: slug[0],
    endpoint: decodeBase64(slug[1]) || '',
    body: decodeBase64(slug[2]) || '',
    headers: Object.fromEntries(headersParams),
  };

  return requestParams;
};

export default decodingFromBase64;
