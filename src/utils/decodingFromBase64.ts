import type { IFormParams } from '@/types/restFullTypes';

const decodeBase64 = (str: string): string | null => {
  try {
    const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
    return atob(str + padding);
  } catch {
    console.log(`error decoding Base64: ${str}`);
    return null;
  }
};

const decodingFromBase64 = (slug: string[], query: { [key: string]: string }): IFormParams => {
  const headers: [string, string][] = [];
  const variables: [string, string][] = [];

  Object.entries(query).forEach(([key, value]) => {
    if (key.startsWith('h_')) {
      headers.push([key.slice(2), decodeBase64(value) || '']);
    } else if (key.startsWith('v_')) {
      variables.push([key.slice(2), decodeBase64(value) || '']);
    }
  });

  const requestParams: IFormParams = {
    method: slug[0],
    endpoint: decodeBase64(slug[1]) || '',
    body: decodeBase64(slug[2]) || '',
    headers: Object.fromEntries(headers),
    variables: Object.fromEntries(variables),
  };

  return requestParams;
};

export default decodingFromBase64;
