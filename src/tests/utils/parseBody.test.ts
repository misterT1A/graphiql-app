import { notFound } from 'next/navigation';

import parseBody from '@/utils/parseBody';

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

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

  test('Should call notFound when JSON parsing fails', () => {
    const invalidData: { type: 'json'; value: string } = { type: 'json', value: '{"invalidJson": }' };

    parseBody(invalidData);

    expect(notFound).toHaveBeenCalled();
  });
});
