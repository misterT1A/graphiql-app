import type { IFormGraphEncrypt } from '@/types/graphTypes';
import type { IFormParams, IRequestParams, IRestFormParams } from '@/types/restFullTypes';
import type { FormRestType } from '@/types/types';

const replaceStringRest = (
  str: string,
  variables: {
    [key: string]: string;
  },
  isbodyJSON = false,
): string => {
  const templateRegex = /(["'])?{{(.*?)}}(["'])?/g;

  return str.replace(templateRegex, (match, _, key) => {
    const trimmedKey = key.trim();
    return Object.prototype.hasOwnProperty.call(variables, trimmedKey)
      ? isbodyJSON
        ? `"${variables[trimmedKey]}"`
        : variables[trimmedKey]
      : match;
  });
};

const replaceStringGraph = (
  str: string,
  variables: {
    [key: string]: string;
  },
): string => {
  const templateRegex = /\$(\w+)/g;

  return str.replace(templateRegex, (match, key) => {
    if (typeof key !== 'string') {
      return match;
    }

    const trimmedKey = key.trim();

    return Object.prototype.hasOwnProperty.call(variables, trimmedKey) ? variables[trimmedKey] : match;
  });
};

const replaceVariablesRest = (params: FormRestType): IRestFormParams => {
  const variables: { [key: string]: string } = {};
  params.variables.forEach((value) => (variables[value.key] = value.value));

  return {
    endpoint: replaceStringRest(params.endpoint, variables),
    bodyJSON: replaceStringRest(params.bodyJSON, variables, true),
    bodyText: replaceStringRest(params.bodyText, variables),
  };
};

const replaceVariablesSybmitRest = (params: IFormParams): IRequestParams => {
  return {
    method: params.method,
    endpoint: replaceStringRest(params.endpoint, params.variables),
    body: replaceStringRest(params.body, params.variables, true),
    headers: params.headers,
  };
};

const replaceVariablesGraph = (params: IFormGraphEncrypt): IFormGraphEncrypt => {
  const variables: { [key: string]: string } = {};
  params.variables.forEach((value) => (variables[value.key] = value.value));

  return {
    ...params,
    query: replaceStringGraph(params.query, variables),
  };
};

export { replaceVariablesRest, replaceVariablesSybmitRest, replaceVariablesGraph };
