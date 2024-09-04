export interface IPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string };
}

export interface IRequestParams {
  method: string;
  endpoint: string;
  body: string | object;
  headers: { [key: string]: string };
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
