import { graphql } from 'graphql';
import type { GraphQLSchema } from 'graphql';
import type { useTranslations } from 'next-intl';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

const GraphSchema = (t: ReturnType<typeof useTranslations<'Form'>>, graphSchema: GraphQLSchema | object): ZodSchema => {
  const errorCatcher = async (value: string): Promise<string | boolean> => {
    if (JSON.stringify(graphSchema) === '{}') return false;

    const output = await graphql({ schema: graphSchema as GraphQLSchema, source: value });

    if (output.errors) return output.errors[0].message;
    return false;
  };

  const schema = z.object({
    endpoint: z.string().min(1, t('errors.endpointMin')).url(t('errors.endpointURL')),
    headers: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    variables: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    query: z.string().superRefine(async (value, ctx) => {
      const output = await errorCatcher(value);

      if (output) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `"${output}"`,
        });
      }
    }),
  });

  return schema;
};

export default GraphSchema;
