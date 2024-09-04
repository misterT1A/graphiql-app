import { usePathname } from 'next/navigation';

import type { FormRestType } from '@/types/types';
import { codeMirrorParser } from '@/utils/codeMirrorParser';
import { replaceVariables } from '@/utils/replaceVariables';

interface IReturnType {
  encrypt: (form: FormRestType, isBodyText?: boolean) => void;
}

const useEncryption = (): IReturnType => {
  const path = usePathname();
  const startUrl = path.split('/').slice(0, 3).join('/');

  const convertToBase64 = (value: string): string => {
    return btoa(value).replace(/=+$/, '');
  };

  const encryptHeadersToBase64 = (headers: { key: string; value: string }[]): string => {
    const queryParams = new URLSearchParams();

    headers.forEach(({ key, value }) => {
      if (key || value) {
        queryParams.append(key, convertToBase64(value));
      }
    });
    return queryParams.size ? `?${queryParams.toString()}` : '';
  };

  const encrypt = (form: FormRestType, isBodyText = false): void => {
    const replecedForm = replaceVariables(form);
    const method = form.method && `/${form.method}`;
    const endopints = replecedForm.endpoint && `/${convertToBase64(replecedForm.endpoint)}`;
    const bodyJSON = Object.keys(codeMirrorParser(replecedForm.bodyJSON) || {}).length
      ? `/${convertToBase64('json_' + JSON.stringify(codeMirrorParser(replecedForm.bodyJSON as string)))}`
      : '';

    const bodyText = replecedForm.bodyText && `/${convertToBase64('text_' + replecedForm.bodyText)}`;
    const headers = form.headers && encryptHeadersToBase64(form.headers);

    window.history.pushState(null, '', `${startUrl}${method}${endopints}${isBodyText ? bodyText : bodyJSON}${headers}`);
  };

  return { encrypt };
};

export default useEncryption;
