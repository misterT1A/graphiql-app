import decodingFromBase64 from '@/utils/decodingFromBase64';

describe('DecodingFromBase64', () => {
  const bodyText = 'dGV4dF9ib2R5';
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
    const initSlug = [method, endpoint, jsnoBody];
    const result = decodingFromBase64(initSlug, initQueryParams);
    expect(result).toStrictEqual(resultProps);
  });

  it('Should return correct params with text body', () => {
    const initSlug = [method, endpoint, bodyText];
    const result = decodingFromBase64(initSlug, initQueryParams);
    expect(result).toStrictEqual({
      ...resultProps,
      body: { type: 'string', value: 'body' },
    });
  });
  it('Should return correct params with error text body, method, endpoint', () => {
    const initSlug = [errorMethod, errorEndpoint, errorBodyText];
    const result = decodingFromBase64(initSlug, initQueryParams);
    expect(result).toStrictEqual({
      method: '',
      endpoint: '',
      body: { type: 'string', value: '' },
      headers: { TestHeader: 'testValue' },
      variables: {},
    });
  });
});
