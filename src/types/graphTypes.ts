// import type { GraphQLSchema } from 'graphql';

export interface IFormGraph {
  endpoint: string;
  sdl: string;
  //   headers: { key: string; value: string }[];
  //   variables: { key: string; value: string }[];
  headers: { [key: string]: string };
  variables: { [key: string]: string };
  query: string;
  //   schema: GraphQLSchema | object;
}

export interface IFormGraphEncrypt {
  startUrl?: string;
  endpoint: string;
  sdl: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  query: string;
  //   schema: GraphQLSchema | object;
}

export interface IGraphRequestParams {
  endpoint: string;
  sdl: string;
  query: string;
  headers: { [key: string]: string };
}
