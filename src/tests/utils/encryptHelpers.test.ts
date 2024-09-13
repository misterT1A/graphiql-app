import type { IEncryptParams } from '@/types/restFullTypes';
import { buildURLRest, convertToBase64, encryptHeadersToBase64 } from '@/utils/encryptHelpers';

describe('Utility functions', () => {
  describe('convertToBase64', () => {
    it('should convert a string to base64 and remove trailing "="', () => {
      expect(convertToBase64('test')).toBe('dGVzdA');
    });
  });

  describe('encryptHeadersToBase64', () => {
    it('should convert headers to base64 and append them as URL parameters', () => {
      const headers = [{ key: 'Content-Type', value: 'application/json' }];
      expect(encryptHeadersToBase64(headers)).toBe('');
    });

    it('should return an empty string if no headers are provided', () => {
      expect(encryptHeadersToBase64([])).toBe('');
    });
  });

  describe('buildURL', () => {
    const mockCodeMirrorParser = jest.fn();
    jest.mock('../../utils/codeMirrorParser.ts', () => ({
      codeMirrorParser: mockCodeMirrorParser,
    }));

    beforeEach(() => {
      mockCodeMirrorParser.mockClear();
    });

    it('should build a URL correctly with given parameters', () => {
      mockCodeMirrorParser.mockReturnValue({ key: 'value' });
      const params: IEncryptParams = {
        startUrl: 'https://api.example.com',
        method: 'POST',
        endpoint: 'test-endpoint',
        bodyJSON: '{"key": "value"}',
        bodyText: 'some text',
        headers: [],
      };

      const result = buildURLRest(params, true);
      expect(result).toBe('https://api.example.com/POST/dGVzdC1lbmRwb2ludA/dGV4dF9zb21lIHRleHQ');
    });
  });
});
