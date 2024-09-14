import { format } from 'graphql-formatter';

import { addQuotesBody, removeQuotesBody } from './historyHelpers';

function prettifyGraphQLQuery(query: string): string {
  try {
    return format(query);
  } catch {
    return query;
  }
}

const codePrettify = (value: string): string => {
  try {
    const addedQoutes = addQuotesBody(value);
    const formattedJsCode = removeQuotesBody(JSON.stringify(JSON.parse(addedQoutes), null, '  '));
    return formattedJsCode;
  } catch {
    return value;
  }
};

export { codePrettify, prettifyGraphQLQuery };
