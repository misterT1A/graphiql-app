// 'use server';

import type { GraphQLSchema } from 'graphql';
import { getIntrospectionQuery } from 'graphql';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';

const getGraphSchema = async (url: string): Promise<GraphQLSchema | undefined> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    return fromIntrospectionQuery((await response.json()).data, {
      ignoreInternals: true,
      nullableArrayItems: true,
      idTypeMapping: 'string',
    }).properties;
  } catch (error) {
    return undefined;
  }
};

export default getGraphSchema;
