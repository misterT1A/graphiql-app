import { act, renderHook, waitFor } from '@testing-library/react';

import useHistoryService from '@/hooks/useHistoryService';
import type { IHistoryRequest } from '@/types/historyServiceTypes';
import type { IInitParams } from '@/types/restFullTypes';
import { getHistoryInitParamsRest } from '@/utils/historyHelpers';

const mockLocalStorage: Partial<Storage> = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

jest.mock('../../navigation', () => ({
  usePathnameIntl: (): { path: string } => ({
    path: '/en/client',
  }),
}));

jest.mock('../../utils/parseBody.ts', () => ({
  __esModule: true,
  default: jest.fn((): string => 'test'),
}));

jest.mock('../../utils/historyHelpers', () => {
  const originalModule = jest.requireActual('../../utils/historyHelpers');

  return {
    ...originalModule,
    getHistoryFromLS: jest.fn((): IHistoryRequest[] => [
      {
        id: '1',
        method: 'GET',
        headers: {},
        variables: {},
        endpoint: '/test',
        href: 'test',
        hrefHistory: 'test',
        data: new Date(),
        replacedEndpoint: 'test',
        body: { type: 'string', value: '{"key":"value"}' },
      },
    ]),
  };
});

global.localStorage = mockLocalStorage as Storage;

describe('useHistoryService', () => {
  beforeEach(() => {
    (mockLocalStorage.getItem as jest.Mock).mockClear();
    (mockLocalStorage.setItem as jest.Mock).mockClear();
  });

  it('should initialize with an empty request list', () => {
    const { result } = renderHook(() => useHistoryService());
    expect(result.current.getHistory).toEqual([]);
  });

  it('should save requests to localStorage upon update for rest', () => {
    const { result } = renderHook(() => useHistoryService());
    act(() => {
      result.current.setHistoryRest(
        {
          method: 'GET',
          headers: {},
          variables: {},
          endpoint: '/test',
          body: { type: 'json', value: '{"key":"value"}' },
        },
        'GET',
      );
    });

    waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  it('should save requests to localStorage upon update for graph', () => {
    const { result } = renderHook(() => useHistoryService());
    act(() => {
      result.current.setHistoryGraph({
        sdl: '',
        headers: {},
        variables: {},
        endpoint: '/test',
        query: 'test',
      });
    });

    waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  it('should get init requests params for rest', () => {
    const historyID = { id: '1' };
    const ititParams: IInitParams = {
      endpoint: '/test',
      headers: {},
      variables: {},
      method: 'GraphQL',
      body: 'test',
    };

    const result = getHistoryInitParamsRest(historyID, 'test');
    waitFor(() => {
      expect(result).toStrictEqual(ititParams);
    });
  });
});
