import { format } from 'graphql-prettier';

function prettifyGraphQLQuery(query: string): string {
  try {
    return format(query);
  } catch (error) {
    console.error('Error formatting GraphQL query:', error);
    return query;
  }
}

const codePrettify = (value: string): string => {
  try {
    const formattedJsCode = JSON.stringify(JSON.parse(value), null, '  ');
    return formattedJsCode;
  } catch {
    return value;
  }
};

export { codePrettify, prettifyGraphQLQuery };
