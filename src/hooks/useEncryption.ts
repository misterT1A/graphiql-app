import { usePathname } from 'next/navigation';

import validateJson from '@/utils/validateJson';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IReturnType {
  encriptMethod: (value: string) => void;
  encriptEndpoint: (value: string) => void;
  encriptBody: (value: string) => void;
}

const useEncryption = (): IReturnType => {
  const path = usePathname();
  // const searchPaams = useSearchParams();
  const startUrl = path.split('/').slice(0, 3).join('/');
  const parsePath = path.split('/').slice(3);
  // const parseSearchPrams = searchPaams.split('&');

  // window.history.pushState(null, '', `${newPath}${url}`);

  const encriptMethod = (value: string): void => {
    if (!value) return;
    if (Object.values(HttpMethod).includes(parsePath[0] as HttpMethod)) {
      parsePath[0] = value;
    } else {
      parsePath.unshift(value);
    }
    const newParsePath = parsePath.length > 1 ? parsePath.join('/') : parsePath.toString();
    window.history.pushState(null, '', `${startUrl}/${newParsePath}`);
  };

  const encriptEndpoint = (value: string): void => {
    const endpoint = btoa(value).replace(/=+$/, '');
    const endpointIndex = parsePath.findIndex((item) => atob(item).startsWith('http'));
    if (!value) return;
    if (endpointIndex !== -1) {
      parsePath[endpointIndex] = endpoint;
    } else if (Object.values(HttpMethod).includes(parsePath[0] as HttpMethod)) {
      parsePath.splice(1, 0, endpoint);
    } else {
      parsePath.unshift(endpoint);
    }
    const newParsePath = parsePath.length > 1 ? parsePath.join('/') : parsePath.toString();
    window.history.pushState(null, '', `${startUrl}/${newParsePath}`);
  };

  const encriptBody = (value: string): void => {
    const validatedBody = validateJson(value);
    const bodyIndex = parsePath.findIndex((item) => atob(item).startsWith('{'));
    console.log(validatedBody, bodyIndex);
    if (validatedBody && bodyIndex === -1) {
      const body = btoa(validatedBody || '').replace(/=+$/, '');
      parsePath.push(body);
    } else if (bodyIndex >= 0 && validatedBody) {
      parsePath[bodyIndex] = btoa(validatedBody || '');
    } else {
      return;
    }

    const newParsePath = parsePath.length > 1 ? parsePath.join('/') : parsePath.toString();
    window.history.pushState(null, '', `${startUrl}/${newParsePath}`);
  };

  return { encriptMethod, encriptEndpoint, encriptBody };
};

export default useEncryption;
