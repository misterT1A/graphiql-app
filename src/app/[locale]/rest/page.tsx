import type { ReactNode } from 'react';

import FormRest from '@/components/FormRest/formRest';

export default function Page(): ReactNode {
  return (
    <FormRest
      inputData={{
        endpoint: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
        method: 'GET',
        body: { shrek: 'top' },
        headers: {
          'X-API-KEY': 'fe77bc0c-1287-4d70-adb2-d5f3b64ee3e7',
          'Content-Type': 'application/json',
        },
        variables: {
          '{{test}}': 'empty',
        },
      }}
    />
  );
}
