import { decodingFromBase64Graph, decodingFromBase64Rest } from '@/utils/decodingFromBase64';

describe('DecodingFromBase64', () => {
  const bodyText = 'dGV4dF9ib2R5';
  const graphBody = 'cXVlcnlfeyJ0aXRsZSI6ICIxIn0';
  const jsnoBody = 'anNvbl97InRlc3QiOiJ0ZXN0In0';
  const errorBodyText = 'dGV4dF9ib2R5$#!';
  const method = 'GET';
  const errorMethod = 'Error';
  const endpoint = 'aHR0cHM';
  const errorEndpoint = 'dffaHR0cHM';
  const initQueryParams = { TestHeader: 'testValue' };

  const resultProps = {
    method: 'GET',
    endpoint: 'https',
    body: { type: 'json', value: '{"test":"test"}' },
    headers: { TestHeader: 'testValue' },
    variables: {},
  };

  it('Should return correct params with json body', () => {
    const initSlug = [endpoint, jsnoBody];
    const result = decodingFromBase64Rest(method, initSlug, initQueryParams);
    expect(result).toStrictEqual(resultProps);
  });

  it('Should return correct params with text body', () => {
    const initSlug = [endpoint, bodyText];
    const result = decodingFromBase64Rest(method, initSlug, initQueryParams);
    expect(result).toStrictEqual({
      ...resultProps,
      body: { type: 'string', value: 'body' },
    });
  });
  it('Should return correct params with error text body, method, endpoint', () => {
    const initSlug = [errorEndpoint, errorBodyText];
    const result = decodingFromBase64Rest(errorMethod, initSlug, initQueryParams);
    expect(result).toStrictEqual({
      method: '',
      endpoint: '',
      body: { type: 'string', value: '' },
      headers: { TestHeader: 'testValue' },
      variables: {},
    });
  });

  it('Should return correct params with text body, method, endpoint for graph', () => {
    const initSlug = [endpoint, graphBody];
    const result = decodingFromBase64Graph(initSlug, initQueryParams);
    expect(result).toStrictEqual({
      endpoint: 'https',
      query: '{"title": "1"}',
      headers: { TestHeader: 'testValue' },
      variables: {},
      sdl: '',
    });
  });
});
