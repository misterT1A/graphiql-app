export interface IFormGraph {
  endpoint: string;
  sdl: string;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
  query: string;
}

export interface IFormGraphEncrypt {
  startUrl?: string;
  endpoint: string;
  sdl: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  query: string;
}

export type ErrorSchema = { message: string };
