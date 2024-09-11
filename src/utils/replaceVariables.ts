import type { IFormParams, IRequestParams, IRestFormParams } from '@/types/restFullTypes';
import type { FormRestType } from '@/types/types';

const replaceString = (
  str: string,
  variables: {
    [key: string]: string;
  },
  isBody = false,
): string => {
  const templateRegex = /(["'])?{{(.*?)}}(["'])?/g;

  return str.replace(templateRegex, (match, _, key) => {
    const trimmedKey = key.trim();
    return Object.prototype.hasOwnProperty.call(variables, trimmedKey)
      ? isBody
        ? `"${variables[trimmedKey]}"`
        : variables[trimmedKey]
      : match;
  });
};

const replaceVariables = (params: FormRestType): IRestFormParams => {
  const variables: { [key: string]: string } = {};
  params.variables.forEach((value) => (variables[value.key] = value.value));

  return {
    endpoint: replaceString(params.endpoint, variables),
    bodyJSON: replaceString(params.bodyJSON, variables, true),
    bodyText: replaceString(params.bodyText, variables),
  };
};

const replaceVariablesSybmit = (params: IFormParams): IRequestParams => {
  return {
    method: params.method,
    endpoint: replaceString(params.endpoint, params.variables),
    body: replaceString(params.body, params.variables, true),
    headers: params.headers,
  };
};

export { replaceVariables, replaceVariablesSybmit };
