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

export type request = { href: string; endpoint: string; name: string; data: Date };

export interface IReturnType {
  requests?: request[];
  setHistory: (form: IFormParams, name: string) => void;
  getHistory: request[];
}
