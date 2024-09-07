export interface IFormParams {
  method: string;
  endpoint: string;
  body: IBodyHistory;
  headers: { key: string; value: string }[];
  variables: { [key: string]: string };
}

export enum Client {
  REST = 'REST',
  GRAPH = 'GRAPH',
}

export interface IBodyHistory {
  type: 'json' | 'string';
  value: string;
}

export type request = { href: string; name: string; data: Date; variables: { [key: string]: string } };

export interface IReturnType {
  requests?: request[];
  setRequest: (form: IFormParams, name: Client) => void;
}
