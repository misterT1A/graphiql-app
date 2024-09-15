import { codePrettify, prettifyGraphQLQuery } from '@/utils/codePrettify';

describe('codePrettify', () => {
  it('Should return formated code', () => {
    const result = codePrettify('{"test":"value"}');
    const string = `{\n  "test": "value"\n}`;
    expect(result).toBe(string);
  });

  it('Should return formated code graph', () => {
    const result = prettifyGraphQLQuery('{test: {value}}');
    const string = `{ test: { value}}`;
    expect(result).toBe(string);
  });
});
