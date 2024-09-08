import type { GraphQLSchema } from 'graphql';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';

import type { RestAPI } from '@/types/types';

export function API(): RestAPI {
  const getSchema = async (url: string): Promise<GraphQLSchema | { message: string }> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      });

      const graphqlSchemaObj = buildClientSchema((await response.json()).data);

      return graphqlSchemaObj;
    } catch (error) {
      return { message: (error as Error).message };
    }
  };

  return Object.freeze({
    getSchema,
  });
}
