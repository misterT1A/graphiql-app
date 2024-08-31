export interface IPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string };
}

export interface IRequestParams {
  method: string;
  endpoint: string;
  body: string;
  headers: { [key: string]: string };
}

export interface IFormParams {
  method: string;
  endpoint: string;
  body: string;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
}
