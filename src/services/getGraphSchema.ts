// // 'use server';

// import type { GraphQLSchema } from 'graphql';
// import { buildClientSchema, getIntrospectionQuery } from 'graphql';
// // import type { GraphQLSchema } from 'graphql/type/schema';

// const getGraphSchema = async (url: string): Promise<GraphQLSchema | undefined> => {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ query: getIntrospectionQuery() }),
//     });
//     // const result = await response.json();
//     // return JSON.stringify(buildClientSchema(result.data));
//     return buildClientSchema(await response.json());
//   } catch (error) {
//     return undefined;
//   }
// };

// export default getGraphSchema;
