import { usePathname, useSearchParams } from 'next/navigation';

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
  encriptHeaders: (headers: { [key: string]: string }) => void;
}

const useEncryption = (): IReturnType => {
  const path = usePathname();
  const searchPaams = useSearchParams();
  const startUrl = path.split('/').slice(0, 3).join('/');
  const parsePath = path.split('/').slice(3);
  // const parseSearchPrams = searchPaams.split('&');

  // window.history.pushState(null, '', `${newPath}${url}`);

  const changeUrl = (): void => {
    const newParsePath = parsePath.length >= 1 ? '/' + parsePath.join('/') : parsePath.toString();
    window.history.pushState(null, '', `${startUrl}${newParsePath}`);
  };

  const encriptMethod = (value: string): void => {
    if (Object.values(HttpMethod).includes(parsePath[0] as HttpMethod)) {
      if (!value) {
        parsePath.splice(0, 1);
      } else {
        parsePath[0] = value;
      }
    } else if (value) {
      parsePath.unshift(value);
    }

    changeUrl();
  };

  const encriptEndpoint = (value: string): void => {
    const endpoint = btoa(value).replace(/=+$/, '');
    const endpointIndex = parsePath.findIndex((item) => atob(item).startsWith('http'));
    if (!value && endpointIndex === -1) return;
    if (!value && endpointIndex >= 0) {
      parsePath.splice(endpointIndex, 1);
    } else {
      if (endpointIndex !== -1) {
        parsePath[endpointIndex] = endpoint;
      } else if (Object.values(HttpMethod).includes(parsePath[0] as HttpMethod)) {
        parsePath.splice(1, 0, endpoint);
      } else {
        parsePath.unshift(endpoint);
      }
    }

    changeUrl();
  };

  const encriptBody = (value: string): void => {
    const validatedBody = validateJson(value);
    const bodyIndex = parsePath.findIndex((item) => atob(item).startsWith('{'));

    if (!validatedBody && bodyIndex === -1) return;
    if (validatedBody && bodyIndex === -1) {
      const body = btoa(validatedBody || '').replace(/=+$/, '');
      parsePath.push(body);
    } else if (bodyIndex >= 0 && validatedBody) {
      parsePath[bodyIndex] = btoa(validatedBody || '').replace(/=+$/, '');
    } else if (bodyIndex >= 0) {
      parsePath.splice(bodyIndex, 1);
    }

    changeUrl();
  };

  const encriptHeaders = (headers: { [key: string]: string }): void => {
    console.log(searchPaams);
    const queryParams = new URLSearchParams();
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        queryParams.append(`${key}`, btoa(value).replace(/=+$/, ''));
      });
    }
  };

  return { encriptMethod, encriptEndpoint, encriptBody, encriptHeaders };
};

export default useEncryption;
