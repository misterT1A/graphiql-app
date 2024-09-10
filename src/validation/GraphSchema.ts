// import { graphql } from 'graphql';
// import type { GraphQLSchema } from 'graphql';
import type { useTranslations } from 'next-intl';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

const GraphSchema = (t: ReturnType<typeof useTranslations<'Form'>>): ZodSchema => {
  const schema = z.object({
    endpoint: z.string().min(1, t('errors.endpointMin')).url(t('errors.endpointURL')),
    sdl: z.string(),
    headers: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    variables: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    query: z.string(),
    // .superRefine(async (value, ctx) => {
    //   if (JSON.stringify(graphSchema) === '{}') return false;

    //   const output = await graphql({ schema: graphSchema as GraphQLSchema, source: value });

    //   if (output.errors) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: `"${output.errors[0].message}"`,
    //     });
    //   }
    // }),
  });

  return schema;
};

export default GraphSchema;
