import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import * as nextNav from 'next/navigation';
import * as nextIntl from 'next-intl';

import FormRest from '@/components/formRest/formRest';
import useEncryption from '@/hooks/useEncryption';
import { RemoveIcon } from '@/ui/Icons/RemoveIcon';
import { codeMirrorParser } from '@/utils/codeMirrorParser';
import { fieldsCounter } from '@/utils/fieldsCounter';
import { replaceVariablesRest, replaceVariablesSybmitRest } from '@/utils/replaceVariables';

jest.mock('next/navigation');

jest.mock('.../../../navigation.ts', () => ({
  usePathnameIntl: (): { path: string } => ({
    path: '/en/client',
  }),
}));

describe('FormRest', () => {
  beforeAll(async () => {
    const messages = await require('../messages/en.json');

    jest
      .spyOn(nextIntl, 'useTranslations')
      .mockImplementation((...[namespace]: Parameters<typeof messages>): ReturnType<typeof messages> => {
        let outputString = '';
        return function Parsing(value: string, object = messages[namespace as string]): string | undefined {
          if (value.split('.')[1]) {
            Parsing(value.split('.')[1], object[value.split('.')[0]] as unknown as { [key: string]: string });
          } else {
            outputString = object[value];
          }
          return outputString;
        };
      });

    jest.spyOn(nextNav, 'usePathname').mockReturnValue('test/en/restfull-client');

    document.createRange = (): Range => {
      const range = new Range();

      range.getBoundingClientRect = jest.fn();

      range.getClientRects = (): DOMRectList => {
        return {
          item: (): null => null,
          length: 0,
          [Symbol.iterator]: jest.fn(),
        };
      };

      return range;
    };
  });

  it('should render FormRest', async () => {
    let counter = 0;

    await act(async () => {
      return render(
        <FormRest
          getData={() => {
            counter++;
          }}
          inputData={{
            endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
            method: 'GET',
            body: { shrek: 'top' },
            headers: {
              'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
            },
            variables: {
              '{{test}}': 'empty',
            },
          }}
        />,
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Send'));
    });

    expect(counter).toEqual(1);
  });

  it('should render all tabs', async () => {
    await act(async () => {
      return render(<FormRest getData={() => {}} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Body'));
      fireEvent.click(screen.getByText('Variables'));
    });

    expect(screen.getByLabelText('Variable key')).toBeInTheDocument();
  });

  it('should show headers and variables errors', async () => {
    await act(async () => {
      render(<FormRest getData={() => {}} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Send'));
    });

    expect(screen.getByText('Enter endpoint URL')).toBeInTheDocument();
  });

  it('should switch body mode and show correct body value after submiting', async () => {
    await act(async () => {
      render(
        <FormRest
          getData={() => {}}
          inputData={{
            endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
            method: 'GET',
            body: 'RSS' as unknown as string,
            headers: {
              'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
            },
            variables: {
              '{{test}}': 'empty',
            },
          }}
        />,
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Body'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('JSON'));
      fireEvent.click(screen.getByText('Plain Text'));
      fireEvent.click(screen.getByText('Send'));
    });

    expect(screen.getByText('Request Body')).toBeInTheDocument();
  });

  it('should add and remove headers and variables inputs', async () => {
    await act(async () => {
      return render(<FormRest getData={() => {}} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('remove-btn'));
      fireEvent.click(screen.getByText('Add Header'));
    });

    expect(screen.getByLabelText('Header key')).toBeInTheDocument();
  });
});

describe('FormRest utils', () => {
  it('should return correct number of object errors with fieldsCounter', async () => {
    const counterResult = fieldsCounter([{ message: 'firstError' }, { message: 'secondError' }]);
    expect(counterResult).toEqual(2);
  });

  it('should return "null" after wrong string submiting with codeMirrorParser', async () => {
    const parsedString = codeMirrorParser('{"test":"value"');
    expect(parsedString).toEqual(null);
  });

  it('should return changed object with replaceVariables', async () => {
    const fixedObject = replaceVariablesRest({
      endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/{{testVar}}',
      method: 'GET',
      bodyText: '{{testVar}}',
      bodyJSON: '{"test" : {{testVar}}}',
      headers: [
        {
          key: 'test key',
          value: 'test value',
        },
      ],
      variables: [
        {
          key: 'testVar',
          value: 'testValue',
        },
      ],
    });

    expect(fixedObject).toEqual({
      endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/testValue',
      bodyJSON: '{"test" : "testValue"}',
      bodyText: 'testValue',
    });
  });

  it('should return changed object with replaceVariables', async () => {
    const fixedObject = replaceVariablesSybmitRest({
      endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/{{testVar}}',
      method: 'GET',
      body: '{{testVar}}',
      headers: {
        'test key': 'test value',
      },
      variables: {
        testVar: 'testValue',
      },
    });

    expect(fixedObject).toEqual({
      method: 'GET',
      endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/testValue',
      body: '"testValue"',
      headers: { 'test key': 'test value' },
    });
  });
});

describe('FormRest hooks', () => {
  it('should handle objectJSON field with useEncryption', async () => {
    const { encryptRest } = useEncryption();

    const encryptTest = encryptRest({
      endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
      method: 'GET',
      bodyText: 'Text',
      bodyJSON: '{"test" : 0}',
      headers: [
        {
          key: 'test key',
          value: 'test value',
        },
      ],
      variables: [
        {
          key: 'test key',
          value: 'test value',
        },
      ],
    });

    expect(encryptTest).toEqual(undefined);
  });
});

describe('FormRest icons', () => {
  it('should make default color for Remove icon while no colors are specified', async () => {
    render(<RemoveIcon filled />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
