import { act, renderHook, waitFor } from '@testing-library/react';

import useHistoryService from '@/hooks/useHistoryService';

const mockLocalStorage: Partial<Storage> = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

jest.mock('../../navigation', () => ({
  usePathnameIntl: (): { path: string } => ({
    path: '/en/client',
  }),
}));

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

  it('should save requests to localStorage upon update', () => {
    const { result } = renderHook(() => useHistoryService());
    act(() => {
      result.current.setHistory(
        {
          method: 'GET',
          headers: [],
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
});
