import type { IRequestParams } from '@/types/restFullTypes';

const replaceVariables = (params: IRequestParams, variables: { [key: string]: string }): IRequestParams => {
  const replaceString = (str: string): string => {
    const templateRegex = /{{(.*?)}}/g;

    return str.replace(templateRegex, (match, key) => {
      const trimmedKey = key.trim();
      return Object.prototype.hasOwnProperty.call(variables, trimmedKey) ? variables[trimmedKey] : match;
    });
  };

  return {
    method: replaceString(params.method),
    endpoint: replaceString(params.endpoint),
    body: replaceString(params.body),
    headers: Object.fromEntries(
      Object.entries(params.headers).map(([key, value]) => [replaceString(key), replaceString(value)]),
    ),
  };
};

export default replaceVariables;
