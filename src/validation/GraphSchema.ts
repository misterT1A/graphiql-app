import type { useTranslations } from 'next-intl';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

import { codeMirrorParser } from '@/utils/codeMirrorParser';

const GraphSchema = (t: ReturnType<typeof useTranslations<'Form'>>): ZodSchema => {
  const errorCatcher = (value: string): string => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return (error as Error).message;
    }
  };

  const schema = z.object({
    endpoint: z.string().min(1, t('errors.endpointMin')).url(t('errors.endpointURL')),
    headers: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    variables: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    query: z.string().refine(
      (value) => codeMirrorParser(value),
      (value) => ({ message: `"${errorCatcher(value)}"` }),
    ),
  });

  return schema;
};

export default GraphSchema;
