// // import { FilmResp } from '../../components/types'
// import { API } from '../../services/API'
// import App from '../app'

import type { ReactNode } from 'react';

import FormRest from '@/components/form-rest/form-rest';

// export const getFilms = async (query: { page: string; search: string }) => {
//   const data = await API().getFilms({ value: query.search, page: query.page })

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return data
// }

export default function Page(): ReactNode {
  // const results = (await getFilms({
  //   page: searchParams.page || '1',
  //   search: searchParams.search || '',
  // })) as unknown as FilmResp

  return <FormRest />;
}

