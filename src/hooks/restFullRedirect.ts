'use client';

import { useRouterIntl } from '@/navigation';
import type { IFormParams } from '@/types/restFullTypes';
import convertToBase64 from '@/utils/convertToBase64';

const useRestFullRedirect = (): ((formParams: IFormParams) => void) => {
  const router = useRouterIntl();

  return (formParams: IFormParams) => {
    const url = convertToBase64(formParams);
    router.push(`/rest/${url}`);
  };
};

export default useRestFullRedirect;
