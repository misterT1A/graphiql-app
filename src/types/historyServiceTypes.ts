// import type { IInitParams } from './restFullTypes';

export interface IFormParams {
  method: string;
  endpoint: string;
  body: IBodyHistory;
  headers: { key: string; value: string }[];
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
  method: string;
  data: Date;
  headers?: { [key: string]: string };
  variables?: { [key: string]: string };
  body?: IBodyHistory;
}

export interface IReturnType {
  requests?: IHistoryRequest[];
  setHistory: (form: IFormParams, name: string) => void;
  getHistory: IHistoryRequest[];
  // geHistoryInitParams: (initParams: IInitParams | IHistoryID | undefined) => IInitParams | undefined;
}

export interface IHistoryID {
  id: string;
}

export function instanceOfHistory(object: object): object is IHistoryID {
  return 'id' in object;
}
