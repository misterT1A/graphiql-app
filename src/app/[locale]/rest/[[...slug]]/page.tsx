import type { FC, ReactNode } from 'react';

import FormRest from '@/components/form-rest/form-rest';

interface ISlugProps {
  slug: string;
}

// interface IRequestProps {
//   urlCode: string;
// }

// const sendRequest: FC<IRequestProps> = async ({urlCode}): Promise<Response> => {

// };

const Page: FC<ISlugProps> = ({ slug }): ReactNode => {
  console.log(slug);

  return (
    <>
      <h1>rest</h1>
      <FormRest response={null} />
    </>
  );
};

export default Page;
