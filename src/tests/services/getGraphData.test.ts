import getGraphData from '@/services/getGraphData';
import type { IFormGraphEncrypt } from '@/types/graphTypes';

jest.mock('@/utils/redirectIfNotAuthenticated', () => ({ redirectIfNotAuthenticated: jest.fn() }));

describe('getRestfullData', () => {
  const requestParams: IFormGraphEncrypt = {
    endpoint: 'test',
    sdl: '',
    query: '',
    headers: [],
    variables: [],
  };

  beforeAll(() => {
    global.fetch = jest.fn();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a response object for a successful fetch', async () => {
    const mockResponse = { key: 'value' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      url: 'test',
      json: async () => mockResponse,
    });

    const result = await getGraphData(requestParams);

    expect(result).toEqual({
      status: 200,
      statusText: 'OK',
      body: mockResponse,
      url: 'test',
    });
  });

  it('should return an error object for a failed fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      url: 'test',
      headers: new Headers(),
    });
    const result = await getGraphData(requestParams);

    expect(result).toEqual({
      status: 404,
      statusText: 'Not Found',
      url: 'test',
      headers: expect.anything(),
    });
  });

  it('should handle network errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const result = await getGraphData(requestParams);

    expect(result).toEqual({
      errorName: 'Error',
      errorMessage: 'Network Error',
    });
  });

  it('should handle unknown errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue({});

    const result = await getGraphData(requestParams);

    expect(result).toEqual({
      errorMessage: 'An unknown error occurred',
    });
  });
});
