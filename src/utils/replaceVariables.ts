import type { IFormGraphEncrypt } from '@/types/graphTypes';
import type { IFormParams, IRequestParams, IRestFormParams } from '@/types/restFullTypes';
import type { FormRestType } from '@/types/types';

import { InputsArrayToObject } from './InputsArrayToObject';

const replaceVariables = (
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
    endpoint: replaceVariables(params.endpoint, variables),
    bodyJSON: replaceVariables(params.bodyJSON, variables, true),
    bodyText: replaceVariables(params.bodyText, variables),
  };
};

const replaceVariablesSybmitRest = (params: IFormParams): IRequestParams => {
  return {
    method: params.method,
    endpoint: replaceVariables(params.endpoint, params.variables),
    body: replaceVariables(params.body, params.variables, true),
    headers: params.headers,
  };
};

const replaceVariablesGraph = (params: IFormGraphEncrypt): IFormGraphEncrypt => {
  const variables = InputsArrayToObject(params.variables);

  return {
    ...params,
    query: replaceStringGraph(params.query, variables),
  };
};

export { replaceVariables, replaceVariablesRest, replaceVariablesSybmitRest, replaceVariablesGraph };
