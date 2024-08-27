import type { IFormParams } from '@/types/types';

const decodeBase64 = (str: string): string | null => {
  try {
    const padding = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
    return atob(str + padding);
  } catch {
    console.log(`error decoding Base64: ${str}`);
    return null;
  }
};

const decodingFromBase64 = (url: string): IFormParams => {
  const parseUrl = url.split('/').slice(1);
  const [method, urlBase64] = parseUrl;
  const [endpoint, headersString] = urlBase64.split('?');
  const headers = headersString
    .split('&')
    .map((header) => header.split('='))
    .map(([key, value]) => [key, decodeBase64(value)]);

  return { method, endpoint, headers: Object.fromEntries(headers), body: '' };
};

export default decodingFromBase64;
