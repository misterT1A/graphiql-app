import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
// import * as nextIntl from 'next-intl';

// import FormRest from '@/components/FormRest/formRest';
import { RemoveIcon } from '@/ui/Icons/RemoveIcon';
import { codeMirrorParser } from '@/utils/codeMirrorParser';
import { fieldsCounter } from '@/utils/fieldsCounter';

// describe('FormRest', () => {
//   beforeEach(async () => {
//     const messages = await require('../messages/en.json');

//     jest.spyOn(nextIntl, 'useTranslations').mockImplementation((initValue: string) => {
//       return function Parsing(value: string, object = messages[initValue]): string | undefined {
//         if (value.split('.')[1]) {
//           Parsing(value.split('.')[1], object[value.split('.')[0]] as unknown as { [key: string]: string });
//         } else {
//           return object[value] as string;
//         }
//       };
//     });
//   });

//   it('should render FormRest corectly', async () => {
//     await act(async () => {
//       const component = render(
//         <FormRest
//           inputData={{
//             endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
//             method: 'GET',
//             body: { shrek: 'top' },
//             headers: {
//               'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
//             },
//             variables: {
//               '{{test}}': 'empty',
//             },
//           }}
//         />,
//       );

//       expect(component).toMatchSnapshot();
//     });
//   });

//   it('should render FormRest corectly', async () => {
//     await act(async () => {
//       const component = render(
//         <FormRest
//           inputData={{
//             endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
//             method: 'GET',
//             body: { shrek: 'top' },
//             headers: {
//               'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
//             },
//             variables: {
//               '{{test}}': 'empty',
//             },
//           }}
//         />,
//       );

//       expect(component).toMatchSnapshot();
//     });
//   });
// });

describe('FormRest utils', () => {
  it('should return correct numbers of object errors with fieldsCounter', async () => {
    const counterResult = fieldsCounter([{ message: 'firstError' }, { message: 'secondError' }]);
    expect(counterResult).toEqual(2);
  });

  it('should return "null" after wrong string submiting with codeMirrorParser', async () => {
    const parsedString = codeMirrorParser('{"test":"value"');
    expect(parsedString).toEqual(null);
  });
});

describe('FormRest icons', () => {
  it('should make default color for Remove icon while no colors are specified', async () => {
    const removeIcon = render(<RemoveIcon filled />);
    expect(removeIcon).toMatchSnapshot();
  });
});

