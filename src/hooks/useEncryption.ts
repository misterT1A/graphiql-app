import { usePathname } from 'next/navigation';

import type { FormRestType } from '@/types/types';
import { buildURL } from '@/utils/encryptHelpers';
import { replaceVariables } from '@/utils/replaceVariables';

interface IReturnType {
  encrypt: (form: FormRestType, isBodyText?: boolean) => void;
}

const useEncryption = (): IReturnType => {
  const path = usePathname();
  const startUrl = path.split('/').slice(0, 3).join('/');

  const encrypt = (form: FormRestType, isBodyText = false): void => {
    const replecedForm = replaceVariables(form);
    const data = {
      ...replecedForm,
      startUrl,
      method: form.method,
      headers: form.headers,
    };

    const resultURL = buildURL(data, isBodyText);
    window.history.pushState(null, '', resultURL);
  };

  return { encrypt };
};

export default useEncryption;
