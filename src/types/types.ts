import type { GraphQLSchema } from 'graphql';

export type FormRestType = {
  method: string;
  endpoint: string;
  bodyJSON: string;
  bodyText: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
};

export type FormRestDataType = {
  method: string;
  endpoint: string;
  body: object | string;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
};

export type RestAPI = Readonly<{
  getSchema: (url: string) => Promise<unknown>;
}>;

export type FormGraphType = {
  endpoint: string;
  sdl: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  query: string;
};

export type FormGraphDataType = {
  endpoint: string;
  sdl: string;
  headers: { [key: string]: string };
  variables: { [key: string]: string };
  query: string;
  schema?: GraphQLSchema | object;
};

export type InputArrayErrors = {
  key: {
    message: string;
  };
  value: {
    message: string;
  };
};
