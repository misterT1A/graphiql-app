import { usePathname } from 'next/navigation';

import type { IFormGraphEncrypt } from '@/types/graphTypes';
import type { FormRestType } from '@/types/types';
import { buildURLGraph, buildURLRest, checkEmptyGraphQuery } from '@/utils/encryptHelpers';
import { replaceVariablesGraph, replaceVariablesRest } from '@/utils/replaceVariables';

interface IReturnType {
  encryptRest: (form: FormRestType, isBodyText?: boolean) => void;
  encryptGraph: (form: IFormGraphEncrypt) => void;
}

const useEncryption = (): IReturnType => {
  const path = usePathname();
  const startUrlRest = path.split('/').slice(0, 2).join('/');
  const startUrlGraph = path.split('/').slice(0, 3).join('/');

  const encryptRest = (form: FormRestType, isBodyText = false): void => {
    const replecedForm = replaceVariablesRest(form);
    const data = {
      ...replecedForm,
      startUrl: startUrlRest,
      method: form.method,
      headers: form.headers,
    };

    const resultURL = buildURLRest(data, isBodyText);
    window.history.pushState(null, '', resultURL);
  };

  const encryptGraph = (form: IFormGraphEncrypt): void => {
    const replacedForm = replaceVariablesGraph(form);
    const data = {
      ...replacedForm,
      query: checkEmptyGraphQuery(replacedForm.query),
      startUrl: startUrlGraph,
    };

    const resultURL = buildURLGraph(data);
    window.history.pushState(null, '', resultURL);
  };

  return { encryptRest, encryptGraph };
};

export default useEncryption;
