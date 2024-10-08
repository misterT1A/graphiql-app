export interface IPageProps {
  params: {
    slug?: string[];
    method?: string;
  };
  searchParams: { [key: string]: string };
}

export interface IRequestParams {
  method: string;
  endpoint: string;
  body: string | object;
  headers: { [key: string]: string };
}

export interface IErrorObj {
  status?: number;
  statusText?: string;
  url?: string;
  headers?: Headers;
  errorName?: string;
  errorMessage?: string;
}

export interface IInitParams {
  method: string;
  endpoint: string;
  body: string | object;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
}

export interface IBody {
  type: 'json' | 'string';
  value: string;
}

export interface IFormParams {
  method: string;
  endpoint: string;
  body: string;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
}

export interface IDecodingParams {
  method: string;
  endpoint: string;
  body: IBody;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
}

export interface IRestFormParams {
  endpoint: string;
  bodyJSON: string;
  bodyText: string;
}

export interface IEncryptParams {
  startUrl: string;
  method: string;
  endpoint: string;
  bodyJSON: string;
  bodyText: string;
  headers: { key: string; value: string }[];
}
