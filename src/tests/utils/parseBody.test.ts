import parseBody from '@/utils/parseBody';

describe('parseBody', () => {
  it('Should return string', () => {
    const initData: { type: 'string'; value: string } = { type: 'string', value: 'test' };
    const result = parseBody(initData);

    expect(result).toBe('test');
  });

  it('Should return correct object', () => {
    const initData: { type: 'json'; value: string } = { type: 'json', value: '{"test":"1"}' };
    const result = parseBody(initData);

    expect(result).toStrictEqual({ test: '1' });
  });

  it('Should return error message', () => {
    const initData: { type: 'json'; value: string } = { type: 'json', value: '{test}' };
    const result = parseBody(initData);

    expect(result).toStrictEqual("Error JSON: Expected property name or '}' in JSON at position 1");
  });
});
