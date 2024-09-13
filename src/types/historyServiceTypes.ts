import type { GraphQLSchema } from 'graphql';

export interface IFormParams {
  method: string;
  endpoint: string;
  body: IBodyHistory;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
}

export interface IBodyHistory {
  type: 'json' | 'string';
  value: string;
}

export interface IHistoryRequest {
  id: string;
  href: string;
  hrefHistory: string;
  endpoint: string;
  replacedEndpoint: string;
  method?: string;
  data: Date;
  headers?: { [key: string]: string };
  variables?: { [key: string]: string };
  body?: IBodyHistory;
  sdl?: string;
  query?: string;
  schema?: GraphQLSchema | object;
}

export interface IReturnType {
  requests?: IHistoryRequest[];
  setHistoryRest: (form: IFormParams, name: string) => void;
  setHistoryGraph: (form: IFormGraphHistory) => void;
  getHistory: IHistoryRequest[];
  // geHistoryInitParams: (initParams: IInitParams | IHistoryID | undefined) => IInitParams | undefined;
}

export interface IHistoryID {
  id: string;
}

export function instanceOfHistory(object: object): object is IHistoryID {
  return 'id' in object;
}

export interface IFormGraphHistory {
  endpoint: string;
  sdl: string;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
  query: string;
}
